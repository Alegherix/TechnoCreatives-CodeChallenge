import React, { useMemo } from 'react';
import {
  Provider,
  createClient,
  dedupExchange,
  fetchExchange,
  Exchange,
} from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';
import { retryExchange, RetryExchangeOptions } from '@urql/exchange-retry';

interface UrqlProviderProps {
  apiEndpoint: string | undefined;
}

const options: RetryExchangeOptions = {
  initialDelayMs: 1000,
  maxDelayMs: 2000,
  randomDelay: true,
  maxNumberAttempts: 2,
  retryIf: (err) => err && err.message !== null,
};

const cache: Exchange = cacheExchange({
  resolvers: {
    Query: {
      Balloons: relayPagination(),
    },
  },
});

/**
 * A Component that returns the urql provider to wrap the application with the urqlContext and throw errors if endpoint is missing
 * @param param0 the API endpoint for the GraphQL schema to consume
 */
export const UrqlProvider: React.FC<UrqlProviderProps> = ({
  apiEndpoint,
  children,
}) => {
  if (typeof apiEndpoint !== 'string') {
    throw new Error(
      'Missing API endpoint. Check `GRAPHQL_ENDPOINT` environment variable.'
    );
  }

  const client = useMemo(
    () =>
      createClient({
        url: apiEndpoint,
        exchanges: [
          dedupExchange,
          retryExchange(options),
          cache,
          fetchExchange,
        ],
      }),
    [apiEndpoint]
  );

  return <Provider value={client}>{children}</Provider>;
};

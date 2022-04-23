import React, { useMemo } from 'react';
import { Provider, createClient } from 'urql';

interface UrqlProviderProps {
  apiEndpoint: string | undefined;
}

/**
 * A Component that returns the urql provider to wrap the application with the urqlContext and throw errors if endpoint is missing
 * @param param0 the API endpoint for the GraphQL schema to consume
 */
const UrqlProvider: React.FC<UrqlProviderProps> = ({
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
      }),
    [apiEndpoint]
  );

  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;

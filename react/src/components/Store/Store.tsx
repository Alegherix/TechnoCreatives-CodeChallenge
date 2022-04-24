import React, { useState } from 'react';
import { Storefront } from '.';
import { FilterInput } from '../../graphql/generated';
import { useGetBalloons } from './useGetBalloons';

export const Store: React.VFC = () => {
  const [endCursor, setEndCursor] = useState<string>();
  const [filter, setFilter] = useState<FilterInput>();
  const { pageInfo, edges, error, fetching } = useGetBalloons({
    endCursor,
    filter,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!pageInfo || !edges) return <p></p>;

  return (
    <>
      <Storefront.Title>Balloon Store</Storefront.Title>
      <Storefront.Container>
        <Storefront.Filter setFilter={setFilter} />
        <Storefront.Gallery edges={edges} />
      </Storefront.Container>
    </>
  );
};

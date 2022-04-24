import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Balloon } from '../../graphql/generated';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { Button } from '../Button';
import { useGetBalloons } from './useGetBalloons';

export const Storefront: React.VFC = () => {
  const [endCursor, setEndCursor] = useState<string>();
  const { pageInfo, edges, error, fetching } = useGetBalloons({ endCursor });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!pageInfo || !edges) return <p></p>;

  return (
    <>
      <h1 className="my-4">Store</h1>
      <section className="flex">
        <StorefrontFilter />
        <div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-2">
          {edges?.map((edge) => (
            <StorefrontCard key={edge.cursor} {...edge.node} />
          ))}
        </div>
      </section>
      <Button onClick={() => setEndCursor(pageInfo.endCursor ?? '')}>
        Load more
      </Button>
    </>
  );
};

const StorefrontCard: React.VFC<Balloon> = ({
  name,
  imageUrl,
  price,
  color,
  description,
  id,
}) => {
  return (
    <Link to={`/product/${id}`}>
      <div
        className="p-4 border border-slate-200 shadow-xl flex flex-col rounded-md 
      hover:scale-105 transition-all duration-150"
      >
        <img className="rounded-md" src={formatImageUrl(imageUrl)} alt={name} />
        <h2 className="mt-1">{name}</h2>

        <var className="text-red-500 font-semibold">
          {new Intl.NumberFormat('sv-SE', {
            style: 'currency',
            currency: 'SEK',
          }).format(price)}
        </var>
        <span className="text-xs text-gray-600 block">(inkl. moms)</span>

        <p className="mt-3">{description}</p>
        <p>{color}</p>
      </div>
    </Link>
  );
};

const StorefrontFilter: React.VFC = () => {
  return (
    <aside className="w-40 flex flex-col">
      <h2>Filter</h2>
    </aside>
  );
};

export default Storefront;

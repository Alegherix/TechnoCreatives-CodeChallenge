import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, FormValues, Spinner } from '..';
import { Balloon } from '../../graphql/generated';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { PriceDisplay } from '../PriceDisplay';
import { useGetBalloons } from './useGetBalloons';

export const StorefrontGallery: React.VFC = () => {
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const { control } = useFormContext<FormValues>();
  const { color, variant, sort } = useWatch<FormValues>({
    control,
  });
  const { pageInfo, edges, error, fetching } = useGetBalloons({
    endCursor,
    filter: {
      color,
      variant,
    },
    sort: sort,
  });
  useEffect(() => {
    if (sort || color || variant || !pageInfo?.hasNextPage) setEndCursor(null);
  }, [sort, color, variant, pageInfo?.hasNextPage]);

  if (fetching && !edges) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!pageInfo || !edges) return <Spinner />;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2">
        {edges?.map((edge) => (
          <StorefrontCard key={edge.cursor} {...edge.node} />
        ))}
      </div>
      {pageInfo.hasNextPage && (
        <Button
          className="mt-4"
          onClick={() => setEndCursor(pageInfo.endCursor ?? null)}
        >
          Load more{' '}
          {fetching && <Spinner variant="Secondary" className="ml-2" />}
        </Button>
      )}
    </div>
  );
};

export const StorefrontCard: React.VFC<Balloon> = ({
  name,
  imageUrl,
  price,
  description,
  id,
}) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="card flex flex-col hover:scale-[1.02] transition-all duration-150 h-full">
        <img
          className="rounded-md "
          src={formatImageUrl(imageUrl)}
          alt={name}
        />
        <h2 className="mt-1">{name}</h2>
        <PriceDisplay price={price} />
        <span className="text-xs text-gray-600 block">(incl. vat)</span>
        <p className="mt-3">{description}</p>
      </div>
    </Link>
  );
};

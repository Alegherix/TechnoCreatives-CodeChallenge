import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '..';
import { Balloon, BalloonEdge } from '../../graphql/generated';
import { formatImageUrl } from '../../utils/formatImageUrl';

type StorefrontGalleryProps = { edges: BalloonEdge[]; fetching: boolean };
export const StorefrontGallery: React.VFC<StorefrontGalleryProps> = ({
  edges,
  fetching,
}) => {
  if (fetching) return <Spinner />;
  return (
    <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2">
      {edges?.map((edge) => (
        <StorefrontCard key={edge.cursor} {...edge.node} />
      ))}
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
        <var className="text-red-500 font-semibold">
          {new Intl.NumberFormat('sv-SE', {
            style: 'currency',
            currency: 'SEK',
          }).format(price)}
        </var>
        <span className="text-xs text-gray-600 block">(incl. vat)</span>
        <p className="mt-3">{description}</p>
      </div>
    </Link>
  );
};

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { useProduct } from './useProduct';

export const ProductPage: React.FC = () => {
  const pageId = useParams<{ id: string }>();
  const { product, fetching, error } = useProduct({ id: pageId.id as string });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!product) return <p>This product does not exist</p>;
  const {
    price,
    name,
    variant,
    imageUrl,
    color,
    availableSince,
    description,
    id,
  } = product;

  return (
    <div className="flex flex-col">
      <div className="">
        <h1>{name}</h1>
        <img src={formatImageUrl(imageUrl)} alt={`${name}`} />
        <div className="flex justify-between mt-4">
          <div>
            <var>
              {new Intl.NumberFormat('sv-SE', {
                style: 'currency',
                currency: 'SEK',
              }).format(price)}
            </var>
            <span className="text-xs text-gray-600 block">(inkl. moms)</span>
          </div>
          <div>
            <p>Release Date:</p>
            <time dateTime={availableSince}>
              {new Date(availableSince).toLocaleDateString('default', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
        <hr />

        <p>{description}</p>

        <button className="center p-4 bg-blue-600 text-white rounded-sm font-bold w-full">
          Add to cart
        </button>
      </div>
    </div>
  );
};

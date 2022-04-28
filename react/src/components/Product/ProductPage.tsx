import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { AddToCart } from '../AddToCart';
import { PriceDisplay } from '../PriceDisplay/';
import { useProduct } from './useProduct';

export const ProductPage: React.FC = () => {
  const pageId = useParams<{ id: string }>();
  const { product, fetching, error } = useProduct({ id: pageId.id as string });
  if (fetching) return <Spinner />;
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
    <>
      <h1 className="my-4">{name}</h1>
      <div className="flex flex-col gap-2 md:flex-row md:gap-10 w-full">
        <div className="max-w-[600px] max-h-[600px] w-full ">
          <img
            className="rounded-sm"
            src={formatImageUrl(imageUrl)}
            alt={`${name}`}
          />
        </div>

        <div className="flex flex-col w-full">
          <p className="text-xs self-end mt-2 font-semibold">
            Article id: <span className="font-normal">{id}</span>
          </p>

          <div className="my-4">
            <PriceDisplay price={price} />
            <span className="text-xs text-gray-600 block">(incl. vat)</span>
          </div>
          <AddToCart id={id} price={price} />

          <hr className="my-4" />

          <p className="mt-2 mb-4">{description}</p>
          <div className="flex flex-col text-gray-600 ">
            <div>
              <span>Release Date: </span>
              <time dateTime={availableSince}>
                {new Date(availableSince).toLocaleDateString('default', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
            </div>
            <span>Variant: {variant}</span>
            <span>Color: {color}</span>
          </div>
        </div>
      </div>
    </>
  );
};

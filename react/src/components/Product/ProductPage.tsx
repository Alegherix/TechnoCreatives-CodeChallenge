import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { Spinner, Button } from '../';
import { useProduct } from './useProduct';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

interface FormValues {
  amount: number;
}

const AddToCart = () => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      amount: 1,
    },
  });

  const { amount } = useWatch({
    control,
  });

  const handleCounter = (operation: 'Increment' | 'Decrement'): void => {
    // Have to force this to a number as getValues returns a string representation of the number on initial render, thus leading to errors when adding numbers and strings
    const currentCount = Number(getValues('amount'));
    operation === 'Increment'
      ? setValue('amount', currentCount + 1)
      : setValue('amount', Math.max(currentCount - 1, 1));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <>
      <form
        className="flex h-fit gap-2 flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex h-10 w-fit bg-gray-200 gap-[2px]">
          <Button
            type="button"
            onClick={() => handleCounter('Decrement')}
            variant="Secondary"
          >
            -
          </Button>
          <input
            className="flex items-center justify-center w-auto max-w-[80px] px-4"
            autoFocus
            {...register('amount', { required: true })}
            type="number"
            min={1}
          />
          <Button
            type="button"
            variant="Secondary"
            onClick={() => handleCounter('Increment')}
          >
            +
          </Button>
        </div>
        <Button className="h-10" type="submit">
          Add to cart ({amount})
        </Button>
      </form>
      {errors.amount && <p className="error">An amount is required</p>}
    </>
  );
};

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
      <div className="flex flex-col gap-2 md:flex-row md:gap-10">
        <div>
          <img
            className="rounded-sm"
            src={formatImageUrl(imageUrl)}
            alt={`${name}`}
          />
        </div>

        <div className="flex flex-col ">
          <p className="text-xs self-end mt-2 font-semibold">
            Article id: <span className="font-normal">{id}</span>
          </p>

          <div className="my-4">
            <var className="text-red-500 font-semibold text-2xl">
              {new Intl.NumberFormat('sv-SE', {
                style: 'currency',
                currency: 'SEK',
              }).format(price)}
            </var>
            <span className="text-xs text-gray-600 block">(incl. vat)</span>
          </div>
          <AddToCart />

          <hr className="my-4" />

          <p className="mt-2 mb-4">{description}</p>
          <div className="flex flex-col text-gray-600 ">
            <div>
              <span>Release Date:</span>
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

import React from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from '../';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { StoreState, useStore } from '../../provider';
import { BLUEPRINT_KEY } from '../../shared';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { StorefrontCard } from '../Store/Gallery';
import { useGetBalloons } from '../Store/useGetBalloons';
import { useProduct } from './useProduct';

interface FormValues {
  amount: number;
}

interface AddToCartProps {
  id: string;
  price: number;
}
const AddToCart: React.VFC<AddToCartProps> = ({ id, price }) => {
  const { state } = useStore();
  const [_, setSessionStorage] = useSessionStorage<StoreState>(BLUEPRINT_KEY);
  const { addToCart } = useStore();
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addToCart({ id, price, amount: Number(data.amount) });
    console.log(state);

    setSessionStorage(state);
  };

  return (
    <>
      <form
        className="flex h-fit gap-2 flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex h-10 w-fit bg-gray-200 gap-[2px]">
          <Button
            onClick={() => handleCounter('Decrement')}
            variant="Secondary"
          >
            -
          </Button>
          <input
            className="center max-w-[80px] px-4"
            autoFocus
            {...register('amount', { required: true })}
            type="number"
            min={1}
          />
          <Button
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
      <div className="flex flex-col gap-2 md:flex-row md:gap-10 w-full">
        <div className="max-w-[600px] max-h-[600px] w-full">
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
            <var className="text-red-500 font-semibold text-2xl">
              {new Intl.NumberFormat('sv-SE', {
                style: 'currency',
                currency: 'SEK',
              }).format(price)}
            </var>
            <span className="text-xs text-gray-600 block">(incl. vat)</span>
          </div>
          <AddToCart id={id} price={price} />

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
      <Featured />
    </>
  );
};

const Featured: React.VFC = () => {
  const { pageInfo, edges, error, fetching } = useGetBalloons({});

  if (fetching) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="mt-32">
      <h2 className="my-4">Maybe you'd also be interested in</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
};

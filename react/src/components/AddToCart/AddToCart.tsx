import React from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Button } from '..';
import { useStore } from '../../provider';
import { useAddToCart } from './useAddToCart';

interface FormValues {
  amount: number;
}

interface AddToCartProps {
  id: string;
  price: number;
}
export const AddToCart: React.VFC<AddToCartProps> = ({ id, price }) => {
  const { handleCounter, amount, errors, onSubmit, register, handleSubmit } =
    useAddToCart();
  return (
    <>
      <form
        className="flex h-fit gap-2 flex-wrap"
        onSubmit={handleSubmit((data) =>
          onSubmit({ amount: data.amount, id, price })
        )}
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

import React from 'react';
import { Button } from '..';
import { useAddToCart } from './useAddToCart';
interface AddToCartProps {
  id: string;
  price: number;
}

/**
 * A Components that's used to allow the user to add products to their shopping cart when browsing the store
 * @param id The id of the item to add to the cart
 * @param price The price of the item to add to the cart
 * @returns an add to Cart button
 */
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
            disabled={!!amount && amount <= 1}
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

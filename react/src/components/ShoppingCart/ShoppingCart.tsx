import { IconShoppingCart } from '@tabler/icons';
import { useStore } from '../../provider';
import { Button } from '../Button';

/**
 * The Shopping Cart component that shows the user the amount of items added and the total price
 * @returns
 */
export const ShoppingCart = () => {
  const { amountAdded, totalPrice } = useStore();

  return (
    <Button className="relative p-2">
      <IconShoppingCart className="text-white" />
      {amountAdded > 0 && (
        <>
          <span className="mx-2 font-bold">{`${totalPrice}:-`}</span>
          <span className="rounded-full bg-red-600 center text-sm absolute -top-2 -right-2 w-fit p-[2px] min-w-[24px] ">
            {amountAdded}
          </span>
        </>
      )}
    </Button>
  );
};

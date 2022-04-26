import { IconShoppingCart } from '@tabler/icons';
import { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { StoreState, useStore } from '../../provider';
import { Button } from '../Button';
import { BLUEPRINT_KEY } from '../../shared';

/**
 * The Shopping Cart component that shows the user the amount of items added and the total price
 * @returns
 */
export const ShoppingCart = () => {
  const { amountAdded, state } = useStore();

  const [_, setLocalStorage] = useLocalStorage<StoreState>(BLUEPRINT_KEY);

  const totalValue = 150;

  useEffect(() => {
    setLocalStorage(state);
  }, [amountAdded]);

  return (
    <Button className="relative p-2">
      <IconShoppingCart className="text-white" />
      {amountAdded > 0 && (
        <>
          <span className="mx-2 font-bold">{`${totalValue}:-`}</span>
          <span className="rounded-full bg-red-600 center text-sm absolute -top-2 -right-2 w-fit p-[2px] min-w-[24px] ">
            {amountAdded}
          </span>
        </>
      )}
    </Button>
  );
};

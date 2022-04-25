import { IconShoppingCart } from '@tabler/icons';

// TODO - Add LocalStorage hook and save added items to localStorage
/**
 * The Shopping Cart component that shows the user the amount of items added and the total price
 * @returns
 */
export const ShoppingCart = () => {
  const placeholderAmount = 4;
  const totalValue = 150;
  return (
    <button className="p-2 relative center gap-2 rounded-sm bg-blue-600 hover:bg-blue-500 transition-all duration-200">
      <IconShoppingCart className="text-white" />
      <span className="mr-2 font-bold">{totalValue}:-</span>
      <span className="rounded-full bg-red-600 h-5 w-5 center text-sm absolute -top-1 -right-1">
        {placeholderAmount}
      </span>
    </button>
  );
};

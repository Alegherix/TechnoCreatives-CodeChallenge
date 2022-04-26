import { createContext, useContext } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { useStoreReducer } from '../reducer';
import { BLUEPRINT_KEY } from '../shared';

/**
 * An interface that represents an Item that gets added to the Shopping cart
 */
export interface Blueprint {
  /**
   * The id of the Blueprint that get's added to the shoppingCart
   */
  id: string;

  /**
   * The amount that has been added to the shopping Cart.
   */
  amount: number;

  /**
   * The cost associated with the Blueprint item
   */
  price: number;
}

export interface StoreState {
  /**
   * An Array of blueprints that keeps track of all the items added to the shopping cart
   */
  bluePrints: Blueprint[];
}

export interface StoreContextProps {
  state: StoreState;
  amountAdded: number;
  totalPrice: number;
  addToCart: (payload: Blueprint) => void;
  removeFromCart: (payload: Blueprint) => void;
}

const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
  const [sessionStorageState] = useSessionStorage<StoreState>(BLUEPRINT_KEY, {
    bluePrints: [],
  });

  const { state, addToCart, removeFromCart, amountAdded, totalPrice } =
    useStoreReducer({
      bluePrints: sessionStorageState.bluePrints,
    });

  return (
    <StoreContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        amountAdded,
        totalPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('Need to be called from under StoreContext');
  return context;
};

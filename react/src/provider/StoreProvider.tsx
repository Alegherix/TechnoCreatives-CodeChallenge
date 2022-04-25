import { createContext, useContext } from 'react';

/**
 * An interface that represents an Item that gets added to the Shopping cart
 */
interface Blueprint {
  /**
   * The id of the Blueprint that get's added to the shoppingCart
   */
  id: string;

  /**
   * The amount that has been added to the shopping Cart.
   */
  amount: number;
}

export interface StoreState {
  /**
   * An Array of blueprints that keeps track of all the items added to the shopping cart
   */
  bluePrints: Blueprint[];
}

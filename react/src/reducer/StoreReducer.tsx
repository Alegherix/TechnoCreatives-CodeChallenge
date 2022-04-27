import React, { useReducer } from 'react';
import { Blueprint, StoreState } from '../provider';

export type Action =
  | { type: 'Add to cart'; payload: Blueprint }
  | { type: 'Remove from cart'; payload: Blueprint };

const reducer = (state: StoreState, action: Action) => {
  const bluePrintIndex = state.bluePrints.findIndex(
    (item) => item.id === action.payload.id
  );
  const bluePrintExist = bluePrintIndex !== -1;

  switch (action.type) {
    case 'Add to cart':
      if (bluePrintExist) {
        console.log(
          'blueprints pre addition ',
          state.bluePrints[bluePrintIndex].amount
        );
        console.log('Payload amount', action.payload.amount);

        state.bluePrints[bluePrintIndex].amount += action.payload.amount;

        console.log(
          'blueprints Post addition ',
          state.bluePrints[bluePrintIndex].amount
        );
      }

      return bluePrintExist
        ? { bluePrints: [...state.bluePrints] }
        : { bluePrints: [...state.bluePrints, action.payload] };

    case 'Remove from cart':
      if (!bluePrintExist) return { bluePrints: [...state.bluePrints] };

      state.bluePrints[bluePrintIndex].amount -= action.payload.amount;
      return state.bluePrints[bluePrintIndex].amount <= 0
        ? {
            bluePrints: state.bluePrints.filter(
              (blueprint) => blueprint.id !== action.payload.id
            ),
          }
        : { bluePrints: [...state.bluePrints] };

    default:
      throw new Error('This should never happend');
  }
};

export const useStoreReducer = (initialState: StoreState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (payload: Blueprint) => {
    console.log('Calling addToCart reducer');

    dispatch({ type: 'Add to cart', payload });
  };
  const removeFromCart = (payload: Blueprint) =>
    dispatch({ type: 'Remove from cart', payload });

  const amountAdded = state.bluePrints.reduce(
    (prev, acc) => prev + acc.amount,
    0
  );

  const totalPrice = state.bluePrints.reduce(
    (prev, acc) => prev + acc.price * acc.amount,
    0
  );

  return { state, addToCart, removeFromCart, amountAdded, totalPrice };
};

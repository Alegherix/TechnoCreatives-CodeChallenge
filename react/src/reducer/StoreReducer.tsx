import { useReducer } from 'react';
import { Blueprint, StoreState } from '../provider';

export type Action =
  | { type: 'Add to cart'; payload: Blueprint }
  | { type: 'Remove from cart'; payload: Blueprint };

const reducer = (state: StoreState, action: Action) => {
  const initialReducerState: Blueprint[] = [];
  const blueprintIndex = state.blueprints.findIndex(
    (blueprint) => blueprint.id === action.payload.id
  );

  switch (action.type) {
    case 'Add to cart':
      return {
        blueprints:
          blueprintIndex !== -1
            ? state.blueprints.reduce((prev, curr) => {
                return curr.id !== action.payload.id
                  ? [...prev, curr]
                  : [
                      ...prev,
                      { ...curr, amount: curr.amount + action.payload.amount },
                    ];
              }, initialReducerState)
            : [...state.blueprints, action.payload],
      };

    case 'Remove from cart':
      return {
        blueprints:
          blueprintIndex !== -1
            ? state.blueprints.reduce((prev, curr) => {
                if (curr.id !== action.payload.id) return [...prev, curr];
                return curr.amount - action.payload.amount <= 0
                  ? [...prev]
                  : [
                      ...prev,
                      { ...curr, amount: curr.amount - action.payload.amount },
                    ];
              }, initialReducerState)
            : [...state.blueprints],
      };

    default:
      throw new Error('This should never happend');
  }
};

export const useStoreReducer = (initialState: StoreState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (payload: Blueprint) => {
    dispatch({ type: 'Add to cart', payload });
  };

  const removeFromCart = (payload: Blueprint) =>
    dispatch({ type: 'Remove from cart', payload });

  const amountAdded = state.blueprints.reduce(
    (prev, acc) => prev + acc.amount,
    0
  );

  const totalPrice = state.blueprints.reduce(
    (prev, acc) => prev + acc.price * acc.amount,
    0
  );

  return { state, addToCart, removeFromCart, amountAdded, totalPrice };
};

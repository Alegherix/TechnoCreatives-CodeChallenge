import { IconShoppingCart } from '@tabler/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '..';
import { Blueprint, useStore } from '../../provider';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { Button } from '../Button';
import { Modal } from '../Modal/Modal';
import { PriceDisplay } from '../PriceDisplay';
import { useProduct } from '../Product/useProduct';

/**
 * The Shopping Cart component that shows the user the amount of items added and the total price
 * @returns
 */
export const ShoppingCart = () => {
  const { amountAdded, totalPrice, state } = useStore();

  const CartButton = () => (
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

  return (
    <Modal.ModalWrapper>
      <Modal.OpenButton>
        <CartButton />
      </Modal.OpenButton>
      <Modal.Content title="Your shopping cart">
        <div>
          {state.bluePrints.map((blueprint) => (
            <ShoppingCartCard key={blueprint.id} {...blueprint} />
          ))}
        </div>
        <Modal.DismissButton>
          <Link className="primaryBtn" to="/checkout">
            Go to checkout
          </Link>
        </Modal.DismissButton>
      </Modal.Content>
    </Modal.ModalWrapper>
  );
};

const ShoppingCartCard: React.VFC<Blueprint> = (props) => {
  const { price, id, amount } = props;
  const { product, fetching, error } = useProduct({ id });

  if (fetching) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!product) return <p>Failed to fetch the Product</p>;
  const { imageUrl, name, id: productID } = product;
  const productSum = price * amount;

  return (
    <>
      <div className="flex gap-2 items-center mb-4 flex-wrap justify-between">
        <img
          className="w-10 h-10 rounded-sm"
          src={formatImageUrl(imageUrl)}
          alt={product.name}
        />
        <div className="flex flex-col">
          <h3>
            <span className="text-red-500">{amount}x</span> {name}
          </h3>
          <span className="block">{productID}</span>
        </div>
        <PriceDisplay price={productSum} />
      </div>
      <ShoppingCartButtons id={productID} price={price} amount={amount} />
      <hr className="my-4" />
    </>
  );
};

const ShoppingCartButtons: React.VFC<Blueprint> = ({ id, price }) => {
  const { addToCart, removeFromCart } = useStore();
  const handleClick = (action: 'Add' | 'Remove') => {
    action === 'Add'
      ? addToCart({ amount: 1, id, price })
      : removeFromCart({ amount: 1, id, price });
  };

  return (
    <div className="flex gap-1">
      <Button variant="Secondary" onClick={() => handleClick('Remove')}>
        -
      </Button>
      <Button variant="Secondary" onClick={() => handleClick('Add')}>
        +
      </Button>
    </div>
  );
};

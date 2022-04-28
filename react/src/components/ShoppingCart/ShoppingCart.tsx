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
 * The Shopping Cart component that let's the user see what's been added, aswell as leting them toggle a modal to get an indepth view of the item added to their cart
 */
export const ShoppingCart: React.VFC = () => {
  const { state } = useStore();

  return (
    <Modal.ModalWrapper>
      <Modal.OpenButton>
        <OverviewButton />
      </Modal.OpenButton>
      <Modal.Content title="Your shopping cart">
        {state.blueprints.map((blueprint) => (
          <Card key={blueprint.id} {...blueprint} />
        ))}
        <Modal.DismissButton>
          <Link className="primaryBtn" to="/checkout">
            Go to checkout
          </Link>
        </Modal.DismissButton>
      </Modal.Content>
    </Modal.ModalWrapper>
  );
};

/**
 * A Cart overview component that's used to display the amount of items and total price accumulated in the ProductCart
 */
const OverviewButton: React.VFC = () => {
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

/**
 * A card component that's used to display a single item in the Shopping cart
 * @param props - A blueprint of a product to render in the Shoping Cart Modal
 */
const Card: React.VFC<Blueprint> = (props) => {
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
      <ProductButtons id={productID} price={price} amount={1} />
      <hr className="my-4" />
    </>
  );
};

/**
 * A component that's used for adding or removing a specic item when the inspecting what's been added to the Shopping Cart
 * @param id the id of the blueprint
 * @param price - the price of the blueprint item
 */
export const ProductButtons: React.VFC<Blueprint> = (props) => {
  const { addToCart, removeFromCart } = useStore();
  const handleClick = (action: 'Add' | 'Remove') => {
    action === 'Add' ? addToCart(props) : removeFromCart(props);
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

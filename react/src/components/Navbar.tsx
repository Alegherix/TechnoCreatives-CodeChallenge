import React from 'react';
import { ShoppingCart } from './ShoppingCart';
import { Link } from 'react-router-dom';

export const Navbar: React.VFC = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="p-4 flex items-center justify-between limitContent">
        <Link className="text-3xl font-bold" to="/">
          Balloons
        </Link>
        <ShoppingCart />
      </div>
    </nav>
  );
};

export default Navbar;

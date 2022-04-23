import React from 'react';
import { ShoppingCart } from './ShoppingCart';

export const Navbar: React.VFC = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="p-4 flex items-center justify-between limitContent">
        <h1>Balloons</h1>
        <ShoppingCart />
      </div>
    </nav>
  );
};

export default Navbar;

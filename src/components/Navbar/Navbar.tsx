import React from 'react';
import { ShoppingCart } from '..';
import { Link } from 'react-router-dom';

/**
 * A Navigation bar that renders on top of the page.
 * @returns
 */
export const Navbar: React.VFC = () => {
  return (
    <nav className="bg-gray-900 text-white sticky inset-0 z-10">
      <div className="p-4 flex items-center justify-between limitContent">
        <Link className="text-3xl font-bold" to="/">
          Balloons
        </Link>
        <ShoppingCart />
      </div>
    </nav>
  );
};

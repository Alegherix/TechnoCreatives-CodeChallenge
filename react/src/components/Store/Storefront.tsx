import React from 'react';
import { Link } from 'react-router-dom';

export const Storefront: React.VFC = () => {
  return (
    <div className="flex">
      <aside className="w-40 flex flex-col">
        <h2>Filter</h2>
      </aside>
      <Link to="/product/blue">Take me to product</Link>
    </div>
  );
};

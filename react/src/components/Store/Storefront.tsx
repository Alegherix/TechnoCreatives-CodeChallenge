import React from 'react';
import { Link } from 'react-router-dom';

const Storefront: React.VFC = () => {
  return (
    <div className="flex">
      <aside className="w-40 flex flex-col">
        <h2>Filter</h2>
      </aside>
      <Link to="/products/2">Take me to product</Link>
    </div>
  );
};

export default Storefront;

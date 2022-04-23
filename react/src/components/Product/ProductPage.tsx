import React from 'react';
import { Link } from 'react-router-dom';

const ProductPage: React.FC = () => {
  return (
    <div>
      <p>This is the balloon</p>
      <Link to="/">Take me to the homepage</Link>
    </div>
  );
};

export default ProductPage;

import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.VFC = () => {
  return (
    <div className="center flex-col gap-2">
      <h1 className="text-4xl">404 - Not Found!</h1>
      <p>Ohh no, it looks like you encountered a page that doesn't exist.</p>
      <Link className="cta " to="/">
        Go Home
      </Link>
    </div>
  );
};

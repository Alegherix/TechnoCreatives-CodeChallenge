import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.VFC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl">404 - Not Found!</h1>
      <Link className="bg-blue-500 p-4 text-white w-[fit-content]" to="/">
        Go Home
      </Link>
    </div>
  );
};

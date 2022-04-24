import React from 'react';

/**
 * A Title component that renders the Title for the store
 * @param param0 the argument of what to display in the title
 * @returns
 */
export const StorefrontTitle: React.FC = ({ children }) => {
  return <h1 className="mt-4">{children}</h1>;
};
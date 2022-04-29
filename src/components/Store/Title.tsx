import React from 'react';

/**
 * A Title component that renders the Title for the store
 * @param children the argument of what to display in the title
 * @returns
 */
export const StorefrontTitle: React.FC = ({ children }) => {
  return <h1 className="mt-4 mb-8">{children}</h1>;
};

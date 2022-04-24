import React from 'react';

/**
 * A Container component that serves to contain the inner workings of the storefront
 * @param param0 the components to render within
 */
export const StorefrontContainer: React.FC = ({ children }) => {
  return <section className="flex">{children}</section>;
};

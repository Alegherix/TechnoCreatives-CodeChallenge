import React from 'react';

/**
 * A Container component that serves to contain the inner workings of the storefront
 * @param children the components to render within
 */
export const StorefrontContainer: React.FC = ({ children }) => {
  return (
    <section className="flex flex-col gap-4 gap-x-10 md:flex-row">
      {children}
    </section>
  );
};

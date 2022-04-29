import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Storefront } from '.';
import { Color, SortInput, Variant } from '../../graphql/generated';

export type FormValues = {
  color: Color | null;
  variant: Variant | null;
  sort: SortInput | null;
};

/**
 * The StorefrontPage Component that renders the Store to show to the users.
 * @returns
 */
export const Store: React.VFC = () => {
  const methods = useForm<FormValues>();

  return (
    <FormProvider {...methods}>
      <Storefront.Title>Balloon Store</Storefront.Title>
      <Storefront.Container>
        <Storefront.Filter />
        <Storefront.Gallery />
      </Storefront.Container>
    </FormProvider>
  );
};

import React, { useEffect, useState } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Storefront } from '.';
import { Button } from '..';
import { Color, SortInput, Variant } from '../../graphql/generated';
import { Spinner } from '../Spinner';
import { useGetBalloons } from './useGetBalloons';

export const StoreFront: React.VFC = () => {
  return (
    <>
      <Storefront.Title>Balloon Store</Storefront.Title>
      <Storefront.Container>
        <Storefront.Filter />
        <Storefront.Gallery />
      </Storefront.Container>
    </>
  );
};

export type FormValues = {
  color: Color | null;
  variant: Variant | null;
  sort: SortInput | null;
};

/**
 * The exported store which is wrapped in a FormProvider to make sure that filters are can communicate with Storefront without needing to pass props
 * @returns The store
 */
export const Store: React.VFC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      color: null,
      variant: null,
      sort: null,
    },
  });
  return (
    <FormProvider {...methods}>
      <StoreFront />
    </FormProvider>
  );
};

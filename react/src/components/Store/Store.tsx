import React from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Storefront } from '.';
import { Color, SortInput, Variant } from '../../graphql/generated';
import { Spinner } from '../Spinner';
import { useGetBalloons } from './useGetBalloons';

export const StoreFront: React.VFC = () => {
  const { control } = useFormContext<FormValues>();
  const { color, variant, sort } = useWatch<FormValues>({
    control,
  });
  const { pageInfo, edges, error, fetching } = useGetBalloons({
    filter: {
      color,
      variant,
    },
    sort: sort,
  });

  if (fetching && !edges) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!pageInfo || !edges) return <p></p>;

  return (
    <>
      <Storefront.Title>Balloon Store</Storefront.Title>
      <Storefront.Container>
        <Storefront.Filter />
        <Storefront.Gallery edges={edges} fetching={fetching} />
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

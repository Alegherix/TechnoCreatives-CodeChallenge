import React, { useEffect, useState } from 'react';
import {
  useForm,
  FormProvider,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { Storefront } from '.';
import { Color, FilterInput, Variant } from '../../graphql/generated';
import { useGetBalloons } from './useGetBalloons';

export const StoreFront: React.VFC = () => {
  // const [endCursor, setEndCursor] = useState<string>();
  const { getValues, control } = useFormContext<FormValues>();
  const { color, variant } = useWatch<FormValues>({
    control,
  });
  const { pageInfo, edges, error, fetching } = useGetBalloons({
    // endCursor,
    filter: {
      color: getValues('color'),
      variant: getValues('variant'),
    },
  });

  useEffect(() => {
    console.log(color);
  }, [color, variant]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!pageInfo || !edges) return <p></p>;

  return (
    <>
      <Storefront.Title>Balloon Store</Storefront.Title>
      <Storefront.Container>
        <Storefront.Filter />
        <Storefront.Gallery edges={edges} />
      </Storefront.Container>
    </>
  );
};

export type FormValues = {
  color: Color | null;
  variant: Variant | null;
};

export const Store: React.VFC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      color: null,
      variant: null,
    },
  });
  return (
    <FormProvider {...methods}>
      <StoreFront />
    </FormProvider>
  );
};

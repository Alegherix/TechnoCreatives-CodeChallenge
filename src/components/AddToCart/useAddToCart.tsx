import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useStore } from '../../provider';

interface FormValues {
  amount: number;
}

interface SubmitDataProps {
  id: string;
  price: number;
}

export const useAddToCart = () => {
  const { addToCart } = useStore();
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      amount: 1,
    },
  });

  const { amount } = useWatch({
    control,
  });

  const handleCounter = (operation: 'Increment' | 'Decrement'): void => {
    // Have to force this to a number as getValues returns a string representation of the number on initial render, thus leading to errors when adding numbers and strings
    const currentCount = Number(getValues('amount'));
    operation === 'Increment'
      ? setValue('amount', currentCount + 1)
      : setValue('amount', Math.max(currentCount - 1, 1));
  };

  const onSubmit: SubmitHandler<FormValues & SubmitDataProps> = ({
    amount,
    id,
    price,
  }) => {
    addToCart({ id, price, amount: Number(amount) });
  };

  return { handleCounter, amount, errors, onSubmit, register, handleSubmit };
};

import React from 'react';

interface PriceDisplayProps {
  className?: string;
  price: number;
}
export const PriceDisplay: React.VFC<PriceDisplayProps> = ({
  className,
  price,
}) => {
  return (
    <var className={`text-red-500 font-semibold text-xl ${className}`}>
      {new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
      }).format(price)}
    </var>
  );
};

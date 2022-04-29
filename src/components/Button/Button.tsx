import React from 'react';
import { Variant } from '../../shared';

interface Buttonprops extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const stylesMap: Record<Variant, string> = {
  Primary: 'primaryBtn',
  Secondary: 'secondaryBtn',
};

export const Button: React.FC<Buttonprops> = ({
  type = 'button',
  variant = 'Primary',
  children,
  className,
  ...rest
}) => {
  const style = stylesMap[variant];
  return (
    <button className={`${style} ${className}`} type={type} {...rest}>
      {children}
    </button>
  );
};

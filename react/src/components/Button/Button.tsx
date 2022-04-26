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
  children,
  type = 'button',
  className,
  onClick,
  variant = 'Primary',
}) => {
  const style = stylesMap[variant];
  return (
    <button className={`${style} ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

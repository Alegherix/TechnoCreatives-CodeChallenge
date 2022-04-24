import React from 'react';

type Variant = 'Primary' | 'Secondary';

interface Buttonprops extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button: React.FC<Buttonprops> = ({
  children,
  type,
  className,
  onClick,
}) => {
  return (
    <button className={`cta ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

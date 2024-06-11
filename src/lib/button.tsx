import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  children,
  className,
  onClick,
  disabled,
}: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        'py-3 px-4 bg-button-primary hover:bg-button-primary-accent text-base transition-colors rounded',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

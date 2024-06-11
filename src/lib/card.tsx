import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twMerge('rounded-lg shadow p-4 bg-white border', className)}
    >
      {children}
    </div>
  );
};

export default Card;

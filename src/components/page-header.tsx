import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const PageHeader = ({
  children,
  className,
}: ComponentPropsWithoutRef<'div'>) => {
  return <h1 className={twMerge('text-3xl py-4', className)}>{children}</h1>;
};

export default PageHeader;

import { ModeToggle } from '@/components/common/ModeToggle';
import React from 'react';

const AuthLayout = ({
  children
}: {
  children: React.ReactNode,
}) => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='absolute top-2 right-4'>
        <ModeToggle />
      </div>
      {children}
    </div>
  )
}

export default AuthLayout;
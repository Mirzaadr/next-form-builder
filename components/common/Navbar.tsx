"use client"
import UserButton from '@/components/auth/UserButton';
import Logo from '@/components/common/Logo';
import { ModeToggle } from '@/components/common/ModeToggle';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='bg-secondary px-4 py-2 shadow-sm w-full flex justify-between items-center'>
      <Logo />
      <div className='flex gap-x-2 items-center'>
        <ModeToggle />
        {!pathname.startsWith("/submit") ? (
          <UserButton />
        ) : null}
      </div>
    </nav>
  )
}

export default Navbar;
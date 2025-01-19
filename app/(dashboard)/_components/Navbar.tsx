"use client"
import UserButton from '@/components/auth/UserButton';
import Logo from '@/components/common/Logo';
import { ModeToggle } from '@/components/common/ModeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='bg-secondary px-4 py-2 shadow-sm w-full flex justify-between items-center'>
      <Logo />
      <div className='flex gap-x-2 items-center'>
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar;
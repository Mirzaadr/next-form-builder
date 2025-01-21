"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { LogOutIcon, User2 } from 'lucide-react';
import SignoutButton from './SignoutButton';
import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import AuthButton from '@/components/auth/AuthButton';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/common/Spinner';

type Props = {
  label?: string;
};

const UserButton = (props: Props) => {
  const { user, isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Spinner size={"icon"}/>
  }

  if (!isAuthenticated) {
    return (
      <AuthButton asChild>
        <Button variant="outline" size="sm">
          Log In
        </Button>
      </AuthButton>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar style={{width: "40px", height: "40px"}} className='border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className='bg-background'>
              <User2 className='size-4'/>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40' align='end'>
          <SignoutButton>
            <DropdownMenuItem>
              <LogOutIcon className='size-4 mr-2' />
              Logout
            </DropdownMenuItem>
          </SignoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserButton;
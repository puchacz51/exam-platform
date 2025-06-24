'use client';

import { FC, HTMLProps } from 'react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileDropdownProps extends HTMLProps<HTMLDivElement> {}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ className }) => {
  const { data: session, status } = useSession();

  return (
    <div className={cn('flex items-center', className)}>
      {status === 'authenticated' ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={session?.user?.image || ''}
                  alt={session?.user?.name || ''}
                  className="object-cover"
                />
                <AvatarFallback className="text-sm font-medium">
                  {session?.user?.name?.[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 shadow-lg"
          >
            {' '}
            <DropdownMenuLabel className="line-clamp-1 px-2 py-1.5 text-sm font-medium">
              {session?.user?.firstname} {session?.user?.lastname}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/profile"
                className="cursor-pointer"
              >
                Profil użytkownika
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 focus:bg-red-50"
            >
              Wyloguj się
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          asChild
          className="transition-opacity hover:opacity-90"
        >
          <Link href="/login">Zaloguj się</Link>
        </Button>
      )}
    </div>
  );
};

export default ProfileDropdown;

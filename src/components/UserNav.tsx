'use client';
import { User } from 'next-auth';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface UserNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>;
}

const UserNav: FC<UserNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={user}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={'/'}>Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/r/create'}>Create community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/settings'}>Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({ callbackUrl: '/sign-in' });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;

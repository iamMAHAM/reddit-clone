import { FC } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User } from 'next-auth';
import Image from 'next/image';
import { Icons } from './Icons';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image'>;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  const { name, image } = user;
  return (
    <Avatar {...props}>
      {image ? (
        <Image
          src={image}
          fill
          alt="profile picture"
          referrerPolicy="no-referrer"
          sizes="100px"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.User className="h-6 w-6" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;

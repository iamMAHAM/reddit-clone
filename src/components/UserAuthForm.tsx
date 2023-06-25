'use client';
import { FC, useState } from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { Icons } from './Icons';

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoole = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      // toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn('flex justify-center', className)}
      {...props}
    >
      <Button
        size={'sm'}
        className="w-full"
        isLoading={isLoading}
      >
        {isLoading ? null : <Icons.Google />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;

'use client';
import { FC, useState } from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { Icons } from './Icons';
import { useToast } from './ui/use-toast';

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoole = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      // toast notification
      toast({
        title: 'There was a problem.',
        description: 'there was an error login with google',
        variant: 'destructive',
      });
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
        onClick={loginWithGoole}
      >
        {isLoading ? null : <Icons.Google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;

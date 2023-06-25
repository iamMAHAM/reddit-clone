import SignIn from '@/components/SignIn';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

const SignInPage: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-x-2xl mx-auto flex flex-col itemscenter justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'self-start -mt-20'
          )}
        >
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
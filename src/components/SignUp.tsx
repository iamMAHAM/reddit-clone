import { FC } from 'react';
import { Icons } from './Icons';
import UserAuthForm from './UserAuthForm';
import Link from 'next/link';

interface SignUpProps {
  isModal?: boolean;
}

const SignUp: FC<SignUpProps> = ({ isModal }) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.Logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="textsm max-w-ws mx-auto my-3">
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and pricacy Policy.
        </p>

        {/** sign in form */}
        <UserAuthForm />

        <p className="px-7 text-center text-sm text-zinc-700">
          Already Redditor ?{' '}
          <Link
            href={'/sign-in'}
            className="hover:text-zinc-800 text-sl underline-offset-4 underline"
            replace={isModal}
          >
            {' '}
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

import { FC } from 'react';
import { Icons } from './Icons';
import Link from 'next/link';
import UserAuthForm from './UserAuthForm';

const SignIn: FC = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.Logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="textsm max-w-ws mx-auto">
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and pricacy Policy.
        </p>

        {/** sign in form */}
        <UserAuthForm />

        <p className="px-7 rext-center text-sm text-zinc-700">
          new to Reddit ?{' '}
          <Link
            href={'/sign-up'}
            className="hover:text-zinc-800 text-sl underline-offset-4"
          >
            {' '}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

import SignIn from '@/components/SignIn';
import { FC } from 'react';

const SignInPage: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-x-2xl mx-auto flex flex-col itemscenter justify-center gap-20">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;

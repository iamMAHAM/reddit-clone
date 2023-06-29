import SignUp from '@/components/SignUp';
import { FC } from 'react';

const page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-x-2xl mx-auto flex flex-col itemscenter justify-center gap-20 relative bg-white w-full py-20 px-2 rounded-lg">
        <SignUp />
      </div>
    </div>
  );
};

export default page;

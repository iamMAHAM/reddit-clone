'use client';

import { FC } from 'react';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
  subredditId,
  subredditName,
}) => {
  const {} = useMutation({
    mutationFn: () => {
      return '';
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: 'Already in Subreddit',
            description:
              'You already subscribe to this subscribe please unuscribe first',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 401) {
          return toast({
            title: 'Login required',
            description: 'You need to login to do that',
            variant: 'destructive',
          });
        }
      }
      return toast({
        title: 'An error has occured',
        description: 'you can join a subredit for now...',
      });
    },
  });
  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      //   isLoading={isUnsubLoading}
      //   onClick={() => unsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      //   isLoading={isSubLoading}
      //   onClick={() => subscribe()}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;

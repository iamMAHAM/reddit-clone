'use client';

import { FC, startTransition } from 'react';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { SubscribetTosubredditPayload } from '@/lib/validators/subreddit';
import { useCustomToasts } from '@/hooks/use-custom-toast';
import { useRouter } from 'next/navigation';

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
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribetTosubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post<string>(
        '/api/subreddit/subscribe',
        payload
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Already in Subreddit',
            description:
              'You already subscribe to this subscribe please unuscribe first',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid subreddit name',
            description: 'Could not parse this subreddit name',
          });
        }

        if (err.response?.status === 401) {
          loginToast();
        }
      }
      return toast({
        title: 'An error has occured',
        description: 'you can join a subredit for now...',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: 'Subscribed',
        description: `You are now a subscriber to r/${subredditName}`,
      });
    },
  });

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribetTosubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post<string>(
        '/api/subreddit/unsubscribe',
        payload
      );
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            title: 'Forbidden',
            description:
              'You cannot unsubscribe to your own subreddit delete it instead',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid subreddit name',
            description: 'Could not parse this subreddit name',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 401) {
          loginToast();
        }
      }
      return toast({
        title: 'An error has occured',
        description: 'you can join a subredit for now...',
      });
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: 'UnSubscribed',
        description: `You are not a subscriber to r/${subredditName}`,
      });
    },
  });

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubLoading}
      onClick={() => subscribe()}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;

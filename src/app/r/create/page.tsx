'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CreateSubredditPayload } from '@/lib/validators/subreddit';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toast';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [communityName, setCommunityName] = useState<string>('');
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: communityName,
      };
      const { data } = await axios.post<string>('/api/subreddit', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Subreddit already exists',
            description: 'please choose a different subreddit name',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid Subreddit name',
            description: 'please choose name between 3 and 21 charactèrs',
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: 'there was an error',
        description: 'An unknown error has occured',
      });
    },
    onSuccess: (subredditname) => {
      router.push(`/r/${subredditname}`);
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="bg-red-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              className="pl-6"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="subtle"
            isLoading={isLoading}
            onClick={router.back}
          >
            Cancel
          </Button>
          <Button
            onClick={() => createCommunity()}
            isLoading={isLoading}
            disabled={communityName.length === 0}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

import { ExtendedPost } from '@/types/db';
import { FC, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { INFINITE_HANDLE_SCROL_RESULT } from '@/config';
import axios from 'axios';

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ['infinite-quey'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_HANDLE_SCROL_RESULT}?page=${pageParam}` +
        (!!subredditName ? subredditName : '');

      const { data } = await axios.get<ExtendedPost[]>(query);

      return data;
    },
    {
      getNextPageParam(_, pages) {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
  });

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const voteCount = post.votes.reduce((acc, curr) => {
          if (curr.type === 'UP') {
            return acc + 1;
          } else if (curr.type === 'DOWN') {
            return acc - 1;
          }
          return acc;
        }, 0);

        return <li key={index}></li>;
      })}
    </ul>
  );
};

export default PostFeed;

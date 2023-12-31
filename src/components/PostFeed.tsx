'use client';
import { ExtendedPost } from '@/types/db';
import { FC, useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { INFINITE_HANDLE_SCROL_RESULT } from '@/config';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Post from './Post';

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-quey'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_HANDLE_SCROL_RESULT}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : '');

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

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

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

        const currentVote = post.votes.find(
          (v) => v.userId === session?.user.id
        );

        if (index === posts.length - 1) {
          return (
            <li
              key={post.id}
              ref={ref}
            >
              <Post
                post={post}
                currentVote={currentVote}
                voteCount={voteCount}
                subredditName={post.subreddit.name}
                commentAmt={post.comments.length}
              />
            </li>
          );
        }
        return (
          <Post
            key={index}
            post={post}
            currentVote={currentVote}
            voteCount={voteCount}
            subredditName={post.subreddit.name}
            commentAmt={post.comments.length}
          />
        );
      })}
    </ul>
  );
};

export default PostFeed;

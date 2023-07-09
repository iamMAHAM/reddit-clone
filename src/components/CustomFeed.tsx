import { INFINITE_HANDLE_SCROL_RESULT } from '@/config';
import { db } from '@/lib/db';
import { FC, use } from 'react';
import PostFeed from './PostFeed';
import { getAuthSession } from '@/lib/auth';

interface CustomFeedProps {}

const CustomFeed: FC<CustomFeedProps> = ({}) => {
  const session = use(getAuthSession());

  const followedCommunities = use(
    db.subscription.findMany({
      where: {
        userId: session?.user.id,
      },
      include: {
        subreddit: true,
      },
    })
  );

  const posts = use(
    db.post.findMany({
      where: {
        subreddit: {
          name: {
            in: followedCommunities.map((sub) => sub.subreddit.id),
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        subreddit: true,
      },
      take: INFINITE_HANDLE_SCROL_RESULT,
    })
  );
  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;

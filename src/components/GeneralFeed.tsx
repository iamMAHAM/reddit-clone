import { INFINITE_HANDLE_SCROL_RESULT } from '@/config';
import { db } from '@/lib/db';
import { FC, use } from 'react';
import PostFeed from './PostFeed';

interface GeneralFeedProps {}

const GeneralFeed: FC<GeneralFeedProps> = ({}) => {
  const posts = use(
    db.post.findMany({
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

export default GeneralFeed;

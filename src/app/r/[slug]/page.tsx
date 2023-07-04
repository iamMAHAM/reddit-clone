import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';
import { INFINITE_HANDLE_SCROL_RESULT } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { FC, use } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: FC<PageProps> = ({ params: { slug } }) => {
  const session = use(getAuthSession());
  const subreddit = use(
    db.subreddit.findFirst({
      where: { name: slug },
      include: {
        posts: {
          include: {
            votes: true,
            author: true,
            comments: true,
            subreddit: true,
          },
          take: INFINITE_HANDLE_SCROL_RESULT,
        },
      },
    })
  );
  if (!subreddit) {
    return notFound();
  }

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed
        initialPosts={subreddit.posts}
        subredditName={subreddit.name}
      />
    </>
  );
};

export default Page;

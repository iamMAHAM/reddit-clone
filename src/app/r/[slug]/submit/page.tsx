import Editor from '@/components/Editor';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { FC, use } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: FC<PageProps> = ({ params: { slug } }) => {
  const subreddit = use(
    db.subreddit.findFirst({
      where: {
        name: slug,
      },
    })
  );

  if (!subreddit) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 leading-6 text-base font-semibold text-gray-900">
            Create Post
          </h3>
          <p className="truncate ml-2 mt-1 text-gray-500 text-sm">
            in r/{slug}
          </p>
        </div>
      </div>

      <Editor />

      <div className="w-full justify-end flex">
        <Button
          type="submit"
          className="w-full"
          form="subreddit-post-form"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default Page;

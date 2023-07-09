import { FC } from 'react';

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const PostIdPage: FC<PostIdPageProps> = ({ params: { postId } }) => {
  return <div>PostIdPage</div>;
};

export default PostIdPage;

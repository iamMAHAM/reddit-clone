import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PostValidator } from '@/lib/validators/post';
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError } from 'zod';

export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const payload = await req.json();

    const { subredditId, content, title } = PostValidator.parse(payload);

    const existingSubreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
      },
    });

    if (!existingSubreddit) {
      return new NextResponse('Invalid subreddit', { status: 400 });
    }

    await db.post.create({
      data: {
        authorId: session.user.id,
        title,
        subredditId,
        content,
      },
    });

    return new NextResponse('Succès');
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse('Invalid request payload', { status: 422 });
    }
    return new NextResponse('Could not subscribe to this subreddit', {
      status: 500,
    });
  }
};

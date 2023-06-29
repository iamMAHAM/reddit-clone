import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditValidator } from '@/lib/validators/subreddit';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name } = SubredditValidator.parse(body);

    const existingSubreddit = await db.subreddit.findFirst({
      where: { name },
    });

    if (existingSubreddit) {
      return new NextResponse('Subreddit already exists', { status: 409 });
    }

    const created = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: created.id,
      },
    });

    return new NextResponse(created.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 });
    }

    return new NextResponse('Cloud not create Subreddit', { status: 500 });
  }
};

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditSubscription } from '@/lib/validators/subreddit';
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError } from 'zod';

export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const payload = await req.json();

    const { subredditId } = SubredditSubscription.parse(payload);

    const existingSubscription = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (existingSubscription) {
      return new NextResponse('You are already subscribed to this subreddit', {
        status: 409,
      });
    }

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId,
      },
    });

    return new NextResponse(subredditId);
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse('Invalid request payload', { status: 422 });
    }
    return new NextResponse('Could not subscribe to this subreddit', {
      status: 500,
    });
  }
};

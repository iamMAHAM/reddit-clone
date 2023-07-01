import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditSubscription } from '@/lib/validators/subreddit';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse('Unautorized', { status: 401 });
    }

    const { subredditId } = SubredditSubscription.parse(payload);

    const existingSubscription = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!existingSubscription) {
      return new NextResponse('You are not a subscriber for this subreddit', {
        status: 400,
      });
    }

    // checks if user is a creator off subreddit
    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: session.user.id,
      },
    });

    if (subreddit) {
      // currentUser is a author of this subreddit
      return new NextResponse('You cannot unsubscribe to your subreddit', {
        status: 400,
      });
    }

    await db.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId: session.user.id,
        },
      },
    });

    return new NextResponse(subredditId);
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse('Invalid request payload', { status: 422 });
    }
    return new NextResponse('Could not unsubscribe to this subreddit', {
      status: 500,
    });
  }
};

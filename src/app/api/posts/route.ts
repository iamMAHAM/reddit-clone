import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);

  try {
    const session = await getAuthSession();

    let followedCommunitiesIds: string[] = [];

    if (session) {
      const followedCommunities = await db.subscription.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          subreddit: true,
        },
      });

      followedCommunitiesIds = followedCommunities.map(
        (sub) => sub.subreddit.id
      );
    }

    const { limit, page, subredditName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subredditName: z.string().nullish().optional(),
      })
      .parse({
        subredditName: url.searchParams.get('subredditName'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      });

    let whereClause = {};

    if (subredditName) {
      whereClause = {
        subreddit: {
          name: subredditName,
        },
      };
    } else if (session) {
      whereClause = {
        subreddit: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        subreddit: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return new NextResponse('Invalid request payload', { status: 422 });
    }
    return new NextResponse('Could not fetch more post', {
      status: 500,
    });
  }
};

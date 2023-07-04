import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const href = url.searchParams.get('url');
    if (!href) {
      return new NextResponse('Invalid Href', { status: 400 });
    }

    const res = await axios.get<string>(href);

    // matches regex
    const titleMatch = res.data.match(/<title>(.*?)<\/title>/);
    const descriptionMatch = res.data.match(
      /<meta name="description" content="(.*?)"/
    );
    const imageMatch = res.data.match(
      /<meta property="og:image" content="(.*?)"/
    );

    const title = titleMatch ? titleMatch[1] : '';
    const description = descriptionMatch ? descriptionMatch[1] : '';
    const imageUrl = imageMatch ? imageMatch[1] : '';

    return NextResponse.json({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return new NextResponse(error.message);
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

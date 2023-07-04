import { Post, Subreddit, User, Vote, Comment } from '@prisma/client';

export type ExtendedPost = Post & {
  author: User;
  subreddit: Subreddit;
  votes: Vote[];
  comments: Comment[];
};

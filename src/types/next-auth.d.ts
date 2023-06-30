import type { User } from 'next-auth';

type UserId = string;

declare module 'next-auth/jwt' {
  export interface JWT {
    id: UserId;
    username?: ?string;
  }
}

declare module 'next-auth' {
  export interface Session {
    user: User & {
      id: UserId;
      username?: ?string;
    };
  }
}

import { compare } from 'bcrypt-ts';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createGuestUser, getUser, createUser } from '@/lib/db/queries';
import { authConfig } from './auth.config';
import { DUMMY_PASSWORD } from '@/lib/constants';
import type { DefaultJWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

export type UserType = 'guest' | 'regular';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: UserType;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    email?: string | null;
    type: UserType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    type: UserType;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email);

        if (users.length === 0) {
          await compare(password, DUMMY_PASSWORD);
          return null;
        }

        const [user] = users;

        if (!user.password) {
          await compare(password, DUMMY_PASSWORD);
          return null;
        }

        const passwordsMatch = await compare(password, user.password);

        if (!passwordsMatch) return null;

        return { ...user, type: 'regular' };
      },
    }),
    Credentials({
      id: 'guest',
      credentials: {},
      async authorize() {
        const [guestUser] = await createGuestUser();
        return { ...guestUser, type: 'guest' };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user?.email) {
        let dbUser: any;
        const users = await getUser(user.email);
        if (users.length === 0) {
          // Create the user
          await createUser(user.email, Math.random().toString(36).slice(-8));
          // Fetch the user again to get the DB id
          const newUsers = await getUser(user.email);
          if (newUsers.length === 0) {
            // Still not found, abort sign-in
            return false;
          }
          dbUser = newUsers[0];
        } else {
          dbUser = users[0];
        }
        // Set all required fields
        user.id = String(dbUser.id);
        user.type = 'regular';
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = String(user.id);
        token.type = user.type || 'regular';
        if (typeof user.image === 'string') {
          token.image = user.image;
        } else if (typeof (user as any).picture === 'string') {
          token.image = (user as any).picture;
        } else if (profile && typeof profile.picture === 'string') {
          token.image = profile.picture;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type || 'regular';
        if (typeof token.image === 'string') {
          session.user.image = token.image;
        }
      }
      return session;
    },
  },
});

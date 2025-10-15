import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './db';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mongodb',
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 10,
    },
  },

  // Add callbacks to validate users
  // callbacks: {

  //   signIn: async (user: User) => {
  //     console.log({ user });
  //     // This runs after OAuth callback but before creating session

  //     // For GitHub OAuth, you can check the user's GitHub ID, username, or email
  //     if (user.account?.provider === 'github') {
  //       // const githubId = user.account.providerAccountId;
  //       const githubEmail = user.email;
  //       const githubUsername = user.account.username;
  //       // Check if this is your allowed account
  //       const isAllowed =
  //         ALLOWED_GITHUB_IDS.includes(githubUsername!) ||
  //         ALLOWED_GITHUB_EMAILS.includes(githubEmail!);

  //       if (!isAllowed) {
  //         throw new Error('Unauthorized user');
  //       }
  //     }

  //     return user;
  //   },
  // },
});

type User = {
  account: {
    provider: string;
    username: string;
  };
  email: string;
};

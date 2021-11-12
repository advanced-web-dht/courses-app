/* eslint-disable no-param-reassign */
import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';

import { submitSignIn } from '../../../src/api/auth';

declare module 'next-auth/jwt' {
	interface DefaultJWT {
		accessToken?: string | null;
		user?: User | null;
	}
}

export default NextAuth({
	providers: [
		Providers.Credentials({
			name: 'credentials',
			authorize: async (credentials) => {
				const response = await submitSignIn(credentials);

				if (response) {
					return { ...response };
				}

				return null;
			}
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async jwt(token, user) {
			if (user) {
				const { accessToken, ...rest } = user;
				token.accessToken = accessToken as string;
				token.user = rest;
			}
			return token;
		},

		// Extending session object
		async session(session, token) {
			const { user } = token;
			session.user = {
				...(user as User)
			};
			session.accessToken = token.accessToken;
			return session;
		}
	}
});

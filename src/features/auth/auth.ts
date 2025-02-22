import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Github],
	callbacks: {
		jwt({ token, profile }) {
			// if (user) {
			// 	// User is available during sign-in
			// 	token.id = user.id;
			// }
			if (profile) {
				token.id = profile.id;
			}
			return token;
		},
		session({ session, token }) {
			session.user.id = token.id as string;
			return session;
		},
	},
});

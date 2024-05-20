import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If a user is returned from the provider, add it to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image; // Add this line if you want to store the user's image
      }
      return token;
    },

    async session({ session, token }) {
      // Save the token to the session to be used in the frontend
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.image = token.image; // Add this line if you want to store the user's image
      return session;
    },
  },
});

export { handler as GET, handler as POST };

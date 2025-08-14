import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    {
      id: 'ibm-app-id',
      name: 'IBM App ID',
      type: 'oauth',
      wellKnown:
        process.env.APP_ID_DISCOVERY_URL ||
        'https://ca-tor.appid.cloud.ibm.com/oauth/v4/6494c4d1-514d-4c9e-832b-7d3616d4a9ba/.well-known/openid-configuration',
      clientId:
        process.env.APP_ID_CLIENT_ID ||
        '9b19bbe5-bdcc-4c14-beb5-9bc9a58649c9',
      clientSecret:
        process.env.APP_ID_CLIENT_SECRET ||
        'NjAwZGVjYTgtMzYzNC00OWI4LTgxZTgtN2VjNzlmODg1MWRk',
      authorization: { params: { scope: 'openid email profile' } },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.given_name || profile.email,
          email: profile.email,
        };
      },
    },
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.sub = account.providerAccountId || token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.id = token.sub;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

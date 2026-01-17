import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    
    // Credentials Provider (Mock Login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          // Use environment variable for API URL
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
          
          const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();

          if (res.ok && data.success) {
            return data.user;
          }
          return null;
        } catch (e) {
            console.error("Auth error:", e);
            return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Custom login page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role || 'user';
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.provider = token.provider;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

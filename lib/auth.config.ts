import { NextAuthConfig, User } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { SigninSchema } from "@/lib/validations";
import { getUserByEmail } from "@/lib/data/user";

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        pssword: {},
      },
      async authorize(credentials, request) {
        const validatedFields = SigninSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
    // add other credentials provider here
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.user) {
        session.user.name = token.name;
        session.user.email = token.email || session.user.email;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

import { MyFlaskAdapter } from "./myFlaskAdapter";
import { NextAuthOptions,DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "@/app/types/role";
import axios from "axios";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }
  interface JWT {
    id: string;
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MyFlaskAdapter(process.env.FLASK_ENDPOINT),
  session: {
    // DBセッションを使わずJWTを使う例
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
    
      try {
        const url = `${process.env.FLASK_ENDPOINT}/api/users/email/${encodeURIComponent(user.email)}`;
    
        const res = await axios.get(url);
        console.log("Flaskの確認結果:", res.status);
        return res.status === 200;
      } catch (err) {
        console.error("Flaskへの確認失敗:", err);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // Flask 由来のユーザ情報を JWT に詰める例
      if (user) {
        token.id = user.id;
        // 役割 (role) なども詰め込みたい場合はここで
      }
      return token;
    },
    async session({ session, token }) {
      // フロント側で参照できるように
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  // 検証用
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  }
};

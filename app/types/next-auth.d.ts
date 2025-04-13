import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;              // roleも必須
      name: string;           // nameも必須
      email: string;          // emailも必須
      image: string;          // imageも必須
    };
  }
}

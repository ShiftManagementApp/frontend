import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // トークンが存在しない場合、ログインページにリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // トークンが存在する場合、リクエストを続行
  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

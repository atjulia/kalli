// middleware.ts
import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const session = await auth();
  console.log("Session middleware:", session);

  // if (!session && !['/login', '/signup'].includes(pathname)) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // if (session?.user && !session.user.signupCompleted && !pathname.startsWith('/signup/complete')) {
  //   return NextResponse.redirect(new URL('/signup/complete', req.url));
  // }

  // if (session?.user?.signupCompleted && pathname.startsWith('/signup/complete')) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }

  return NextResponse.next();
});
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // const session = await auth.api.getSession({
  //   headers: request.headers,
  // });

  // // Protect all /dashboard routes
  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   if (!session) {
  //     // Redirect to login if not authenticated
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  if (!host.startsWith('atlas.')) return NextResponse.next();

  const url = request.nextUrl.clone();
  if (url.pathname === '/') {
    url.pathname = '/atlas';
    return NextResponse.rewrite(url);
  }
  if (url.pathname === '/id' || url.pathname === '/id/') {
    url.pathname = '/id/atlas';
    return NextResponse.rewrite(url);
  }
  if (url.pathname === '/map') {
    url.pathname = '/atlas';
    return NextResponse.rewrite(url);
  }
  if (url.pathname === '/id/map') {
    url.pathname = '/id/atlas';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};

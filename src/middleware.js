import { NextResponse } from 'next/server';

// Hosts that should land on the design & engineering portfolio. Besides the
// built-in studio./portfolio. subdomains, a standalone domain can be attached
// later by setting PORTFOLIO_DOMAIN (e.g. "barletta.engineering") in the env.
const PORTFOLIO_DOMAIN = process.env.PORTFOLIO_DOMAIN || '';

function isPortfolioHost(host) {
  if (host.startsWith('studio.') || host.startsWith('portfolio.')) return true;
  if (!PORTFOLIO_DOMAIN) return false;
  return host === PORTFOLIO_DOMAIN || host === `www.${PORTFOLIO_DOMAIN}`;
}

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  if (isPortfolioHost(host)) {
    if (url.pathname === '/') {
      url.pathname = '/portfolio';
      return NextResponse.rewrite(url);
    }
    if (url.pathname === '/id' || url.pathname === '/id/') {
      url.pathname = '/id/portfolio';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (!host.startsWith('atlas.')) return NextResponse.next();

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

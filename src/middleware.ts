import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

// Edge-compatible in-memory store for rate limiting (Token Bucket Concept)
// Note: In serverless environments, this resets per cold-start or isolate,
// but perfectly demonstrates the architectural pattern without external costs.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 50; // max requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

export default clerkMiddleware((auth, request) => {
  // 1. Edge Rate Limiting (Security & DDoS Protection)
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
  const now = Date.now();
  
  let userLimit = rateLimitMap.get(ip);
  if (!userLimit || now - userLimit.lastReset > WINDOW_MS) {
    userLimit = { count: 0, lastReset: now };
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
  
  userLimit.count += 1;
  rateLimitMap.set(ip, userLimit);

  // 2. Auth Protection
  if (!isPublicRoute(request)) {
    auth().protect()
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
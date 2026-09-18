import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/__clerk/:path*",
    "/(api|trpc)(.*)",
  ],
};






// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const protectedRoutes = createRouteMatcher([
//     '/',
//     '/upcoming',
//     '/previous',
//     '/recordings',
//     '/personal-room',
//     '/meeting(.*)',
// ]);

// export default clerkMiddleware((auth, req) => {
//     if (protectedRoutes(req)) auth().protect()
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for Clerk's auto-proxy path
//     '/__clerk/:path*',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



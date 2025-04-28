import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://46a7d473a8ac04106150db15c52ed0dc@o4509224099184640.ingest.us.sentry.io/4509224100167680",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Replay may only be enabled for the client-side
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

// This export will instrument router navigations, and is only relevant if you enable tracing.
// `captureRouterTransitionStart` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;


/*
Vercel docs:
// Set up performance monitoring
performance.mark('app-init');

// Initialize analytics
console.log('Analytics initialized');

// Set up error tracking
window.addEventListener('error', (event) => {
  // Send to your error tracking service
  reportError(event.error);
});
*/

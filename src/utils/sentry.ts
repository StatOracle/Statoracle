import * as Sentry from "@sentry/nextjs";

/**
 * Initialize Sentry for error tracking
 */
export function initSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring
      profilesSampleRate: 1.0, // Capture 100% of profiles for performance monitoring
      debug: process.env.NODE_ENV === "development",
      environment: process.env.NODE_ENV,
      // Add any custom tags you want to include with all events
      initialScope: {
        tags: {
          app: "statoracle",
        },
      },
    });
  }
}

/**
 * Capture an error with Sentry
 */
export function captureError(error: unknown, context?: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    console.error("Error:", error, "Context:", context);
  }
}

/**
 * Start a Sentry transaction for performance monitoring
 */
export function startTransaction(name: string, data?: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return Sentry.startTransaction({
      name,
      data,
    });
  }
  
  // Return a dummy transaction if Sentry is not initialized
  return {
    setStatus: () => {},
    setData: () => {},
    finish: () => {},
  };
}

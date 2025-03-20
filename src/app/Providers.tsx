"use client";

import type React from "react";
import { PostHogProvider } from "@/lib/posthog";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
        <Toaster />
      </ThemeProvider>
    </PostHogProvider>
  );
}

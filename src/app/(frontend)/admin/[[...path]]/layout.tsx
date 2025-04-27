import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StatOracle Admin",
  description: "Admin dashboard for StatOracle",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

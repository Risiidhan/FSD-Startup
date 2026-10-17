import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppProviders } from "@/app/providers/app-providers";

import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "FSD Starter",
  description: "Feature-Sliced Design starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

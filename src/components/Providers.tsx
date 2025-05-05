"use client";

import { CalProvider } from "@calcom/atoms";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <CalProvider
        clientId={process.env.CAL_OAUTH_CLIENT_ID!}
        options={{
          apiUrl: process.env.CAL_API_URL!,
          refreshUrl: process.env.REFRESH_URL!,
        }}
      >
        {children}
      </CalProvider>
    </ThemeProvider>
  );
}

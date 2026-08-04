// app/providers.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// HeroUI v3 (@heroui/styles) needs no provider — just next-themes for the class toggle
export function Providers({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
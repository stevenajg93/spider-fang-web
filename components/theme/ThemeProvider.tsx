"use client"

import * as React from "react"

import { ThemeProvider as NextThemesProvider } from "next-themes"

type Props = { children: React.ReactNode }

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" /* start in light mode */
      enableSystem={false} /* ignore OS theme so the button fully controls it */
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

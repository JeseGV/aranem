"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }) {
  return (
    <NextUIProvider className='w-full h-full'>
      <NextThemesProvider attribute='class' defaultTheme='light' className='w-full h-full'>
        <div className='w-full h-full'>{children}</div>
      </NextThemesProvider>
    </NextUIProvider>
  )
}



import { ThemeProvider as NextThemeProvider } from 'next-themes'
import React from 'react'

function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            themes={["light", "dark", "dark-blue", "dark-red"]}
        >
            {children}
        </NextThemeProvider>
    )
}

export default ThemeProvider
import React from 'react'
import ThemeProvider from './ThemeProvider'
import QueryProvider from './context/QueryProvider'
export default function Provider({ children }: { children: React.ReactNode }) {

    return (
        <QueryProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryProvider>
    )
}

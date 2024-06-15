

import React from 'react'
import ThemeProvider from './themesProvider/ThemeProvider'

export default function Provider({ children }: { children: React.ReactNode }) {


    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

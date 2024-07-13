"use client";

import React from 'react'
import ThemeProvider from './ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}

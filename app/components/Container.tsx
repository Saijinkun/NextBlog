


import React from 'react'
import { cn } from "@/lib/utils"

type Props = {
    hasHeader?: boolean;
    hasSidebar?: boolean;
    children: React.ReactNode;
    className?: string;
}

export default function Container({ hasHeader, hasSidebar, children, className }: Props) {
    return (
        <main className={cn(`w-full h-full px-3 ${hasHeader && 'pt-24'} ${hasSidebar && 'pl-96'} ${className}`)}>
            {children}
        </main>
    )
}
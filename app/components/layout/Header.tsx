
import React from 'react'
import { ModeToggle } from '../ModeToggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <header className="fixed top-0 w-full p-2 z-10">
                <div className="flex gap-1 justify-between items-center bg-secondary p-4 rounded-lg shadow-lg">
                    <Link href={'/'} className="text-xl font-bold text-primary">My Application</Link>
                    <div className='flex gap-2 items-center'>
                        <Button className='px-5 flex-2' variant={"link"} asChild>
                            <Link href={'/todo'}>Todo</Link>
                        </Button>
                        <Button className='px-5 flex-1' variant={"default"} asChild>
                            <Link href={'/auth/login'}>Login</Link>
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </header>
        </>
    )
}

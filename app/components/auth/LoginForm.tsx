
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function LoginForm() {
    return (
        <Card className=''>
            <CardHeader className='p-5'>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Make changes to your account here. Click save when you&apos;re done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="user_name">Username</Label>
                    <Input id="user_name" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="user_password">Password</Label>
                    <Input id="user_password" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className='w-full'>Login</Button>
            </CardFooter>
        </Card>
    )
}

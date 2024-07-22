import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const Sidebar = () => {
    return (
        <aside className="fixed top-0 left-0text-white w-96 pt-24 h-full p-2">
            <div className='bg-secondary p-2 h-full rounded-lg relative overflow-hidden'>
                <nav className=''>
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="block p-2 rounded hover:bg-gray-700">Home</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="block p-2 rounded hover:bg-gray-700">About</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="block p-2 rounded hover:bg-gray-700">Services</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="block p-2 rounded hover:bg-gray-700">Contact</a>
                        </li>
                    </ul>
                    <div className='absolute bottom-0 left-0 border rounded-lg w-full h-24 p-2'>
                        <Card className='h-full p-2'>
                            <div className='flex gap-2 items-center h-full'>
                                <div className='h-full w-1/5 rounded-lg bg-secondary flex shrink-0'>
                                    <div className='h-full w-full flex items-center justify-center'>U</div>
                                </div>
                                <div>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </div>
                            </div>
                        </Card>
                    </div>
                </nav>
            </div>


        </aside>
    );
};

export default Sidebar;

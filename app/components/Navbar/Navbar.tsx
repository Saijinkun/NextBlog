// components/Navbar.js
import React from 'react';
import { ModeToggle } from '../ModeToggle';

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full bg-secondary p-4 z-10">
            <div className="flex gap-1 justify-between items-center">
                <h1 className="text-xl font-bold text-primary">My Application</h1>
                <ModeToggle />
            </div>
        </header>

    );
};

export default Navbar;

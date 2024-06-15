// components/Navbar.js
import React from 'react';

const Navbar = () => {
    return (
        <header className="fixed top-0 left-64 right-0 bg-gray-900 text-white p-4 z-10">
            <div className="container mx-auto">
                <h1 className="text-xl">My Application</h1>
            </div>
        </header>
    );
};

export default Navbar;

import React from 'react';

const Sidebar = () => {
    return (
        <aside className="fixed top-0 left-0 bg-gray-800 text-white w-64 h-full p-4">
            <nav>
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
            </nav>
        </aside>
    );
};

export default Sidebar;

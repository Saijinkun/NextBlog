import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Provider from '../providers/Provider';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <Header />
            <Sidebar />
            {children}
        </React.Fragment>
    );
};

export default MainLayout;

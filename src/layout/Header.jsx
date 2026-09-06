import React from 'react'


import TopBar from '../components/TopBar';

import Navbar from '../components/Navbar';

function Header() {
    return (
        <>
            <div className="hidden md:block">
                <TopBar />
            </div>
            <Navbar />

        </>

    )
}

export default Header
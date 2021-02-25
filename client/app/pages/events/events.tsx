import React from 'react';
import Navbar from '../../components/Navbar';

const events = () => {
    return (
        <>
            <Navbar />
            <div className="events_page">
                <div className="container">
                    <div className="holder">
                        <h2> Upcoming Events </h2>
                        <div className="separator">
                            <span> January 2021 </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default events;
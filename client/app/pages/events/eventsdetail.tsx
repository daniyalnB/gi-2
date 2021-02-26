import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Event from '../events/eventsdetail/event';
import EventDescription from '../events/eventsdetail/eventdescription';
import EventAttendance from '../events/eventsdetail/eventattendance';
import EventCheckout from '../events/eventsdetail/eventcheckout';

const eventsdetail = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="ED_page">
                    <div className="container">
                        <Event />
                        <EventDescription />
                        <EventAttendance />
                        <EventCheckout />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default eventsdetail;
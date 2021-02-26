import React from 'react';
import { Link } from 'react-router-dom';

const EventCheckout = () => {
    return (
        <>
            <div className="checkout">
                <Link
                    to="/buyproduct"
                    className="btn"
                >
                    Proceed to Checkout
                </Link>
            </div>
        </>
    );
};

export default EventCheckout;
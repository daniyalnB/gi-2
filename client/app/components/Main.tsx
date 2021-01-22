import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Main() {
    return(
        <div className='sections'>
            <div className="container">
                <div className="discover_section">
                    <div className="row">
                        <div className="col text-left">
                            <span className="one"> Discover What Your Peers Already Have </span>
                            <br />
                            <span className="two"> Stop searching. Start writing. Save time & Money. </span>
                        </div>
                        <div className="col text-right">
                            
                                <Link
                                    to="/signup"
                                    className="btn btn_1"
                                >
                                    Get Started
                                </Link> 
                            <button className="btn btn_2"> Demo </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
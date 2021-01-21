import React from 'react';
import { Link } from 'react-router-dom';
import back from '../../../assets/left_arrow.png';
import email from '../../../assets/email.svg';

export default function signup () {
  return (
    <>
        <div className="signup_page">
            
            <div className="signup_header">
                <div className="container">
                    <div className="signUp_actions">
                        <ul>
                            <li>
                                <img src={back}></img>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="container">
                <div className="signup_holder">
                    <h2>
                        Hello! I'm Fevy. I'll get you signed up in
                        <br />
                        seconds. Ready to go?
                    </h2>
                    <div className="signup_inner_Container">
                        <form>
                            <div className="form-group SignupStepOne">
                                <div className="input-group">
                                    <img className="input_icon" src={email}></img>
                                    <input type="email" className="form-control" required />
                                    <div className="floating_label"> Email </div>
                                </div>
                            </div>
                            <button className="btn"> 
                                <span> Let's Do This </span>
                                <div className="loader"></div> 
                            </button>
                        </form>
                        <div className="login_devider">
                            <span className="one"> Already have an account? </span>
                            <Link
                                to="/login"
                                className="two"
                            > 
                                Sign In here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        
        </div> 
    </>
  );
};
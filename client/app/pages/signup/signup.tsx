import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../../../assets/left_arrow.png';
import email from '../../../assets/envelope.svg';
import phone from '../../../assets/phone.png';
import password from '../../../assets/passwordnew.png';

export default function signup () {
    const [active, setActive] = useState({
        one: true,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false
    });

    const [border, setBorder] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false
    });

    const lname= "waseem";
      
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
            
            {active.one ? 
                (
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
                                            <div className="label"> Email </div>
                                        </div>
                                    </div>
                                    <button 
                                        className="btn" 
                                        onClick={() => setActive({
                                            one: false,
                                            two: true,
                                            three: false,
                                            four: false,
                                            five: false,
                                            six: false
                                        })}
                                    > 
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
                ) : active.two ?
                (
                    <div className="container">
                        <div className="signup_holder">
                            <h2>
                                Thanks, What's your name?
                            </h2>
                            <form>
                                <div className="form-group justify-content-center row" style={{ marginTop: "50px"}}>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="input-group SignupStepTwo">
                                            <input type="text" className="form-control" required />
                                            <div 
                                                className="label"
                                                style={{ left: "20px"}}
                                            > 
                                                First Name 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="input-group SignupStepTwo">
                                            <input type="text" className="form-control" required />
                                            <div 
                                                className="label"
                                                style={{ left: "20px"}}
                                            > 
                                                Last Name 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className="btn" 
                                    onClick={() => setActive({
                                        one: false,
                                        two: false,
                                        three: true,
                                        four: false,
                                        five: false,
                                        six: false
                                    })}
                                > 
                                    <span> Next </span>
                                    <div className="loader"></div> 
                                </button>
                            </form>
                        </div>
                    </div>
                ) : active.three ?
                (
                    <div className="container">
                        <div className="signup_holder">
                            <h2>
                                Nice to meet you {lname} What's your
                                <br />
                                Mobile number?
                            </h2>
                            <form>
                                <div className="form-group text-center SignupStepThree">
                                    <div className="input-group">
                                        <img 
                                            style={{ width: "30px"}}
                                            className="input_icon" src={phone}
                                        />
                                        <input type="text" className="form-control" required />
                                        <div className="label"> Phone Number </div>
                                    </div>
                                </div>
                                <button 
                                    className="btn" 
                                    onClick={() => setActive({
                                        one: false,
                                        two: false,
                                        three: false,
                                        four: true,
                                        five: false,
                                        six: false
                                    })}
                                > 
                                    <span> Next </span>
                                    <div className="loader"></div> 
                                </button>
                            </form>
                        </div>
                    </div>
                ) : active.four ?
                (
                    <div className="container">
                        <div className="signup_holder">
                            <h2> 
                                Select Your Role:
                            </h2>
                            <form>
                                <div className="row justify-content-center" style={{ marginTop: "50px"}}>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div 
                                            className={border.one ? "form-group SignupStepFour new_border" : "form-group SignupStepFour"}
                                            onClick={() => setBorder({
                                                one: true,
                                                two: false,
                                                three: false,
                                                four: false,
                                                five: false,
                                                six: false
                                            })}
                                        >
                                            <input type="radio" id="staff" name="radio-group" className="radio-custom" />
                                            <label htmlFor="staff" className="radio-custom-label"> Staff Adjuster </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div 
                                            className={border.two ? "form-group SignupStepFour new_border" : "form-group SignupStepFour"}
                                            onClick={() => setBorder({
                                                one: false,
                                                two: true,
                                                three: false,
                                                four: false,
                                                five: false,
                                                six: false
                                            })}
                                        >
                                            <input type="radio" id="contractor" name="radio-group" className="radio-custom" />
                                            <label htmlFor="contractor" className="radio-custom-label"> Contractor </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div 
                                            className={border.three ? "form-group SignupStepFour new_border" : "form-group SignupStepFour"}
                                            onClick={() => setBorder({
                                                one: false,
                                                two: false,
                                                three: true,
                                                four: false,
                                                five: false,
                                                six: false
                                            })}
                                        >
                                            <input type="radio" id="independent" name="radio-group" className="radio-custom" />
                                            <label htmlFor="independent" className="radio-custom-label"> Independent Adjuster </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div 
                                            className={border.four ? "form-group SignupStepFour new_border" : "form-group SignupStepFour"}
                                            onClick={() => setBorder({
                                                one: false,
                                                two: false,
                                                three: false,
                                                four: true,
                                                five: false,
                                                six: false
                                            })}
                                        >
                                            <input type="radio" id="vendor" name="radio-group" className="radio-custom" />
                                            <label htmlFor="vendor" className="radio-custom-label"> Specialty Vendor </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div 
                                            className={border.five ? "form-group SignupStepFour new_border" : "form-group SignupStepFour"}
                                            onClick={() => setBorder({
                                                one: false,
                                                two: false,
                                                three: false,
                                                four: false,
                                                five: true,
                                                six: false
                                            })}
                                        >
                                            <input type="radio" id="pa" name="radio-group" className="radio-custom" />
                                            <label htmlFor="pa" className="radio-custom-label"> PA/ESQ </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div 
                                            className={border.six ? "form-group SignupStepFour new_border" : "form-group SignupStepFour"}
                                            onClick={() => setBorder({
                                                one: false,
                                                two: false,
                                                three: false,
                                                four: false,
                                                five: false,
                                                six: true
                                            })}
                                        >
                                            <input type="radio" id="other" name="radio-group" className="radio-custom" />
                                            <label htmlFor="other" className="radio-custom-label"> Other </label>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className="btn" 
                                    onClick={() => setActive({
                                        one: false,
                                        two: false,
                                        three: false,
                                        four: false,
                                        five: true,
                                        six: false
                                    })}
                                > 
                                    <span> Next </span>
                                    <div className="loader"></div> 
                                </button>
                            </form>
                        </div>
                    </div>
                ) : active.five ?
                (
                    <div className="container">
                        <div className="signup_holder">
                            <h2> 
                                Almost there! Setup your password and
                                <br />
                                get started.
                            </h2>
                            
                            <div className="SignupStepFive">
                                <form>
                                    <div className="row">
                                        <div className="col">

                                            <div className="form-group">
                                                <div className="input-group">
                                                <img className="input_icon" src={password}></img>
                                                <input type="password" className="form-control" required />
                                                <div className="label"> Password </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-group">
                                                <img className="input_icon" src={password}></img>
                                                <input type="password" className="form-control" required/>
                                                <div className="label"> Confirm Password </div>
                                                </div>                
                                            </div>

                                            <div className="form-group text-left">
                                                <input type="checkbox" required style={{ height: "11px"}}/>
                                                <label className="terms"> I have read and I agree to uphold the Actionable Insights Code of Ethics </label>
                                            </div>

                                            <div className="form-group text-left">
                                                <input type="checkbox" required style={{ height: "11px"}}/>
                                                <label className="terms"> I agree with the Terms and Conditions </label>
                                            </div>

                                            <button 
                                                style={{ marginTop: "40px"}}
                                                className="btn" 
                                                onClick={() => setActive({
                                                    one: false,
                                                    two: false,
                                                    three: false,
                                                    four: false,
                                                    five: false,
                                                    six: true
                                                })}
                                            > 
                                                <span> Get Started </span>
                                                <div className="loader"></div> 
                                            </button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : active.six ?
                (
                    <div className="container">
                        <div className="signup_holder">
                            <h2> 
                                You're all set! Please check your inbox and
                                <br />
                                verify your email.
                            </h2>
                            <form>
                                <button 
                                    style={{ marginTop: "70px"}}
                                    className="btn" 
                                    onClick={() => setActive({
                                        one: false,
                                        two: false,
                                        three: false,
                                        four: false,
                                        five: false,
                                        six: false
                                    })}
                                > 
                                    <span> Continue </span>
                                    <div className="loader"></div> 
                                </button>
                            </form>
                        </div>
                    </div>
                ) : ""
            }
        </div> 
    </>
  );
};
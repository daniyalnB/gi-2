import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
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
        <Navbar />
        <div className="signup_page">
            
            <div className="signup_header">
                <div className="container-fluid">
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
                    <div className="container-fluid">
                        <div className="signup_holder">
                            <h2>
                                Hello! I'm Fevy. I'll get you signed up in
                                <br />
                                seconds. Ready to go?
                            </h2>
                            <div className="signup_inner_Container">
                                <div className="form-holder">
                                    <form>
                                        <div className="form-group nogroup">
                                            <img 
                                                className="input_icon" 
                                                src={email}
                                            />
                                            <input
                                                type="text"
                                                name="Email"
                                                required
                                                id="inputField1"
                                                className="input-area"
                                            />
                                            <label htmlFor="inputField1" className="floating_label">
                                                {" "}
                                                Email{" "}
                                            </label>
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
                                        </button>
                                    </form>
                                </div>
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
                    <div className="container-fluid">
                        <div className="signup_holder">
                            <h2>
                                Thanks, What's your name?
                            </h2>
                            <div className="form-holder">
                                <form>
                                    <div className="form-group justify-content-center row">
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                            <div className="form-group nogroup SignupStepTwo">
                                                <input
                                                    type="text"
                                                    name="fname"
                                                    required
                                                    id="inputField2"
                                                    className="input-area"
                                                />
                                                <label htmlFor="inputField2" className="floating_label">
                                                    {" "}
                                                    First Name{" "}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                            <div className="form-group nogroup SignupStepTwo">
                                                <input
                                                    type="text"
                                                    name="lname"
                                                    required
                                                    id="inputField3"
                                                    className="input-area"
                                                />
                                                <label htmlFor="inputField3" className="floating_label">
                                                    {" "}
                                                    Last Name{" "}
                                                </label>
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
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : active.three ?
                (
                    <div className="container-fluid">
                        <div className="signup_holder">
                            <h2>
                                Nice to meet you {lname} What's your
                                <br />
                                Mobile number?
                            </h2>
                            <div className="signup_inner_Container">
                                <div className="form-holder">
                                    <form>
                                        <div className="form-group nogroup SignupStepThree">
                                            <img 
                                                className="input_icon" 
                                                src={phone}
                                            />
                                            <input
                                                type="text"
                                                name="phone"
                                                required
                                                id="inputField4"
                                                className="input-area"
                                            />
                                            <label htmlFor="inputField4" className="floating_label">
                                                {" "}
                                                Phone Number{" "}
                                            </label>
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
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : active.four ?
                (
                    <div className="container-fluid">
                        <div className="signup_holder">
                            <h2> 
                                Select Your Role:
                            </h2>
                            <form>
                                <div className="row justify-content-center" style={{ marginTop: "50px" }}>
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
                                    style={{ marginBottom: "30px"}}
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
                                </button>
                            </form>
                        </div>
                    </div>
                ) : active.five ?
                (
                    <div className="container-fluid">
                        <div className="signup_holder">
                            <h2> 
                                Almost there! Setup your password and
                                <br />
                                get started.
                            </h2>
                            
                            <div className="SignupStepFive">
                                <div className="form-holder">
                                    <form>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group nogroup">
                                                    <img 
                                                        className="input_icon" 
                                                        src={password}
                                                    />
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        required
                                                        id="inputField5"
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField5" className="floating_label">
                                                        {" "}
                                                        Password{" "}
                                                    </label>
                                                </div>
                                                <div className="form-group nogroup">
                                                    <img 
                                                        className="input_icon" 
                                                        src={password}
                                                    />
                                                    <input
                                                        type="password"
                                                        name="confirmpassword"
                                                        required
                                                        id="inputField6"
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField6" className="floating_label">
                                                        {" "}
                                                        Confirm Password{" "}
                                                    </label>
                                                </div>
                                                {/* <div className="form-group text-left">
                                                    <input type="checkbox" required />
                                                    <label className="terms"> I have read and I agree to uphold the Actionable Insights Code of Ethics </label>
                                                </div>

                                                <div className="form-group text-left">
                                                    <input type="checkbox" required />
                                                    <label className="terms"> I agree with the Terms and Conditions </label>
                                                </div> */}
                                                <div className="checkbox-one">
                                                    <input type="checkbox" id="c1" />
                                                    <label htmlFor="c1">
                                                        I have read and I agree to uphold the Actionable Insights Code of Ethics
                                                    </label>
                                                </div>
                                                <div className="checkbox-two">
                                                    <input type="checkbox" id="c2" />
                                                    <label htmlFor="c2">
                                                        I agree with the Terms and Conditions
                                                    </label>
                                                </div>

                                                <button 
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
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : active.six ?
                (
                    <div className="container-fluid">
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
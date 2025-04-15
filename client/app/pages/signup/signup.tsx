import React, { useState, useEffect, Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import queryString from "query-string";
import history from "../../../utils/history";
import InputMask from "react-input-mask";
import validator from "validator";
import {
  RegisterNewCustomerStep1,
  RegisterNewCustomerStep2,
  RegisterNewCustomerStep3,
  RegisterNewCustomerStep4,
  RegisterNewCustomerStep5,
} from "../../../utils/api-routes/api-routes.util";
import back from "assets/left_arrow.png";
import email from "assets/envelope.svg";
import phone from "assets/phone.png";
import password from "assets/passwordnew.png";
import showpassword from "assets/show_password.svg";
import hidepassword from "assets/hide_password.svg";

const Signup = (props) => {

  useEffect(() => {
    if (props.location.state) {
      if (props.location.state.path) {
      } else {
        setCustomerStep1({
          ...customerstep1,
          emailaddress: props.location.state.email,
        });
        setCustomerStep2({
          ...customerstep2,
          emailaddress: props.location.state.email,
        });
        setCustomerStep3({
          ...customerstep3,
          emailaddress: props.location.state.email,
        });
        setCustomerStep4({
          ...customerstep4,
          emailaddress: props.location.state.email,
        });
        setCustomerStep5({
          ...customerstep5,
          emailaddress: props.location.state.email,
        });
      }
    } else {
    }
  }, []);

  const data = queryString.parse(props.location.search);

  const referralcode = data.referralcode;

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer")) {
      history.push("/my-account");
    } else {
      if (referralcode) {
        if (props.location.state) {
          if (props.location.state.path) {
          } else {
            history.push({
              pathname: `/get-started${props.location.search}`,
              state: {
                email: props.location.state.email,
              },
            })
          }
        } else {
          history.push(`/get-started${props.location.search}`);
        }
      } else {
        if (props.location.state) {
          if (props.location.state.path) { 
          } else {
            history.push({
              pathname: "/get-started",
              state: {
                email: props.location.state.email,
              },
            })
          }
        } else {
          history.push("/get-started");
        }
      }
    }
  }, []);
  
  const [loginError, setLoginError] = useState("");

  const [loading, setLoading] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  const [step, setStep] = useState(1);

  const [border, setBorder] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
  });

  const [customerstep1, setCustomerStep1] = useState({
    emailaddress: "",
  });

  const validemail = validator.isEmail(customerstep1.emailaddress);

  const handleSubmit1 = () => {
    setLoading({
      one: true,
      two: false,
      three: false,
      four: false,
      five: false,
    });
    setTimeout(() => {
      const payload = {
        emailaddress: customerstep1.emailaddress,
      };

      const stringified = queryString.stringify(payload);

      RegisterNewCustomerStep1(stringified).subscribe(
        (response) => {
          setCustomerStep1({
            emailaddress: customerstep1.emailaddress,
          });
          setLoading({
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
          });
          setStep(step + 1);
          setLoginError("");
        },
        (error) => {
          setLoginError(error.response.Message);
          setLoading({
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
          });
        }
      );
    }, 2000);
  };

  const [customerstep2, setCustomerStep2] = useState({
    emailaddress: "",
    firstname: "",
    lastname: "",
  });

  const handleSubmit2 = () => {
    setLoading({
      one: false,
      two: true,
      three: false,
      four: false,
      five: false,
    });
    setTimeout(() => {
      const payload = {
        emailaddress: customerstep2.emailaddress,
        firstname: customerstep2.firstname,
        lastname: customerstep2.lastname,
      };

      const stringified = queryString.stringify(payload);

      RegisterNewCustomerStep2(stringified).subscribe((response) => {
        if (response) {
          setCustomerStep2({
            emailaddress: customerstep2.emailaddress,
            firstname: customerstep2.firstname,
            lastname: customerstep2.lastname,
          });
          setLoading({
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
          });
          setStep(step + 1);
        } else {
        }
      });
    }, 2000);
  };

  const [customerstep3, setCustomerStep3] = useState({
    emailaddress: "",
    phonenumber: "",
  });

  const handleSubmit3 = () => {
    setLoading({
      one: false,
      two: false,
      three: true,
      four: false,
      five: false,
    });
    setTimeout(() => {
      const payload = {
        emailaddress: customerstep3.emailaddress,
        phonenumber: customerstep3.phonenumber,
      };

      const stringified = queryString.stringify(payload);

      RegisterNewCustomerStep3(stringified).subscribe((response) => {
        if (response) {
          setCustomerStep3({
            emailaddress: customerstep3.emailaddress,
            phonenumber: customerstep3.phonenumber,
          });
          setLoading({
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
          });
          setStep(step + 1);
        } else {
        }
      });
    }, 2000);
  };

  const [customerstep4, setCustomerStep4] = useState({
    emailaddress: "",
    role: "",
  });

  const handleSubmit4 = () => {
    setLoading({
      one: false,
      two: false,
      three: false,
      four: true,
      five: false,
    });
    setTimeout(() => {
      const payload = {
        emailaddress: customerstep4.emailaddress,
        role: customerstep4.role,
      };

      const stringified = queryString.stringify(payload);

      RegisterNewCustomerStep4(stringified).subscribe((response) => {
        if (response) {
          setCustomerStep4({
            emailaddress: customerstep4.emailaddress,
            role: customerstep4.role,
          });
          setLoading({
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
          });
          setStep(step + 1);
        } else {
        }
      });
    }, 2000);
  };

  const [customerstep5, setCustomerStep5] = useState({
    emailaddress: "",
    password: "",
  });

  const handleSubmit5 = () => {
    setLoading({
      one: false,
      two: false,
      three: false,
      four: false,
      five: true,
    });
    setTimeout(() => {
      const payload = {
        emailaddress: customerstep5.emailaddress,
        firstname: customerstep2.firstname,
        lastname: customerstep2.lastname,
        phonenumber: customerstep3.phonenumber,
        role: customerstep4.role,
        password: customerstep5.password,
        referralcode: referralcode,
      };

      const stringified = queryString.stringify(payload);

      RegisterNewCustomerStep5(stringified).subscribe(
        (response) => {
          setCustomerStep5({
            emailaddress: customerstep5.emailaddress,
            password: customerstep5.password,
          });
          setLoading({
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
          });
          setStep(step + 1);
          setLoginError("");
        },
        (error) => {
          setLoginError(error.response.Message);
          setLoading({
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
          });
        }
      );
    }, 2000);
  };

  const [confirmpassword, setConfirmPassword] = useState("");

  let str1 = customerstep5.password;
  let str2 = confirmpassword;

  const [codeofethics, setCodeofEthics] = useState(false);
  const [termsandconditions, setTermsandConditions] = useState(false);

  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePassword1 = () => setPasswordShown1(!passwordShown1);

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePassword2 = () => setPasswordShown2(!passwordShown2);

  return (
    <>
      <SEO
        title="Get Started - Actionable Insights"
        description="Hello! I'm Fevy. I'll get you signed up in seconds. Ready to go? Thanks, What's your name? Nice to meet you ! What's your mobile number?"
        link="get-started"
      />
			<Suspense
				fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
			>
        <ScrollToTop />
        <Navbar />
        <Breadcrumbs />
        <div className="signup_page">
          <div className="signup_header">
            <div className="container-fluid">
              {step == 6 ? (
                <div className="signUp_actions" style={{ visibility: "hidden" }}>
                  <ul>
                    <li>
                      <img src={back} />
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="signUp_actions">
                  <ul>
                    <li>
                      {step < 2 ? (
                        <img src={back} />
                      ) : (
                        <img
                          src={back}
                          onClick={() => setStep(step - 1)}
                        />
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {step == 1 && (
            <div className="container-fluid">
              <div className="signup_holder">
                <h2>
                  Hello! I'm Fevy. I'll get you signed up in
                  <br />
                  seconds. Ready to go?
                </h2>
                <div
                  className="signup_inner_Container"
                  style={{ paddingBottom: "50px" }}
                >
                  <div className="form-holder">
                    <div className="upInputs form-group nogroup">
                      <img className="input_icon" src={email} />
                      <input
                        type="email"
                        name="emial"
                        placeholder=" "
                        required
                        value={customerstep1.emailaddress}
                        onChange={(e) => {
                          setCustomerStep1({
                            ...customerstep1,
                            emailaddress: e.currentTarget.value,
                          });
                          setCustomerStep2({
                            ...customerstep2,
                            emailaddress: e.currentTarget.value,
                          });
                          setCustomerStep3({
                            ...customerstep3,
                            emailaddress: e.currentTarget.value,
                          });
                          setCustomerStep4({
                            ...customerstep4,
                            emailaddress: e.currentTarget.value,
                          });
                          setCustomerStep5({
                            ...customerstep5,
                            emailaddress: e.currentTarget.value,
                          });
                        }}
                      />
                      <label className="upLabel"> Email </label>
                    </div>
                    {loginError && (
                      <div className="form-group alert alert-danger mt-4">
                        {loginError}
                      </div>
                    )}
                    {!loading.one && (
                      <button
                        className="btn"
                        onClick={() => handleSubmit1()}
                        disabled={
                          customerstep1.emailaddress == "" || validemail == false
                            ? true
                            : false
                        }
                      >
                        <span> Let's Do This </span>
                      </button>
                    )}
                    {loading.one && (
                      <button className="btn" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    )}
                  </div>
                  <div className="login_devider">
                    <span className="one"> Already have an account? </span>
                    <Link to="/my-account" className="two">
                      Sign In here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step == 2 && loading.one == false && (
            <div className="container-fluid">
              <div className="signup_holder">
                <h2>Thanks, What's your name?</h2>
                <div className="form-holder">
                  <div className="form-group justify-content-center row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group nogroup SignupStepTwo">
                        <input
                          type="text"
                          name="fname"
                          required
                          id="inputField2"
                          className="input-area"
                          value={customerstep2.firstname}
                          onChange={(e) =>
                            setCustomerStep2({
                              ...customerstep2,
                              firstname: e.currentTarget.value,
                            })
                          }
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
                          value={customerstep2.lastname}
                          onChange={(e) =>
                            setCustomerStep2({
                              ...customerstep2,
                              lastname: e.currentTarget.value,
                            })
                          }
                        />
                        <label htmlFor="inputField3" className="floating_label">
                          {" "}
                          Last Name{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  {!loading.two && (
                    <button
                      className="btn"
                      onClick={() => handleSubmit2()}
                      disabled={
                        customerstep2.firstname == "" ||
                        customerstep2.lastname == ""
                          ? true
                          : false
                      }
                    >
                      <span> Next </span>
                    </button>
                  )}
                  {loading.two && (
                    <button className="btn" disabled>
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {step == 3 && loading.two == false && (
            <div className="container-fluid">
              <div className="signup_holder">
                <h2>
                  Nice to meet you {customerstep2.lastname}! What's your
                  <br />
                  Mobile number?
                </h2>
                <div className="signup_inner_Container">
                  <div className="form-holder">
                    <div className="form-group nogroup SignupStepThree">
                      <img className="input_icon" src={phone} />
                      <InputMask
                        mask="999-999-9999"
                        value={customerstep3.phonenumber}
                        onChange={(e) =>
                          setCustomerStep3({
                            ...customerstep3,
                            phonenumber: e.currentTarget.value,
                          })
                        }
                      >
                        {(inputProps) => (
                          <input
                            type="text"
                            name="phone"
                            required
                            id="inputField4"
                            className="input-area"
                            {...inputProps}
                          />
                        )}
                      </InputMask>
                      <label htmlFor="inputField4" className="floating_label">
                        {" "}
                        Phone Number{" "}
                      </label>
                    </div>
                    {!loading.three && (
                      <button
                        className="btn"
                        onClick={() => handleSubmit3()}
                        disabled={
                          customerstep3.phonenumber == "___-___-____" ||
                          customerstep3.phonenumber == ""
                            ? true
                            : false
                        }
                      >
                        <span> Next </span>
                      </button>
                    )}
                    {loading.three && (
                      <button className="btn" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {step == 4 && loading.three == false && (
            <div className="container-fluid">
              <div className="signup_holder">
                <h2>Select Your Role:</h2>
                <div
                  className="row justify-content-center"
                  style={{ marginTop: "50px" }}
                >
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div
                      className={
                        border.one
                          ? "form-group SignupStepFour new_border"
                          : "form-group SignupStepFour"
                      }
                    >
                      <input
                        type="radio"
                        id="staff"
                        name="radio-group"
                        className="radio-custom"
                        checked={border.one}
                      />
                      <label
                        htmlFor="staff"
                        className="radio-custom-label"
                        onClick={(e) => {
                          setBorder({
                            one: true,
                            two: false,
                            three: false,
                            four: false,
                            five: false,
                            six: false,
                          });
                          setCustomerStep4({
                            ...customerstep4,
                            role: e.currentTarget.innerHTML,
                          });
                        }}
                      >
                        Staff Adjuster
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div
                      className={
                        border.two
                          ? "form-group SignupStepFour new_border"
                          : "form-group SignupStepFour"
                      }
                    >
                      <input
                        type="radio"
                        id="contractor"
                        name="radio-group"
                        className="radio-custom"
                        checked={border.two}
                      />
                      <label
                        htmlFor="contractor"
                        className="radio-custom-label"
                        onClick={(e) => {
                          setBorder({
                            one: false,
                            two: true,
                            three: false,
                            four: false,
                            five: false,
                            six: false,
                          });
                          setCustomerStep4({
                            ...customerstep4,
                            role: e.currentTarget.innerHTML,
                          });
                        }}
                      >
                        Contractor
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div
                      className={
                        border.three
                          ? "form-group SignupStepFour new_border"
                          : "form-group SignupStepFour"
                      }
                    >
                      <input
                        type="radio"
                        id="independent"
                        name="radio-group"
                        className="radio-custom"
                        checked={border.three}
                      />
                      <label
                        htmlFor="independent"
                        className="radio-custom-label"
                        onClick={(e) => {
                          setBorder({
                            one: false,
                            two: false,
                            three: true,
                            four: false,
                            five: false,
                            six: false,
                          });
                          setCustomerStep4({
                            ...customerstep4,
                            role: e.currentTarget.innerHTML,
                          });
                        }}
                      >
                        Independent Adjuster
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div
                      className={
                        border.four
                          ? "form-group SignupStepFour new_border"
                          : "form-group SignupStepFour"
                      }
                    >
                      <input
                        type="radio"
                        id="vendor"
                        name="radio-group"
                        className="radio-custom"
                        checked={border.four}
                      />
                      <label
                        htmlFor="vendor"
                        className="radio-custom-label"
                        onClick={(e) => {
                          setBorder({
                            one: false,
                            two: false,
                            three: false,
                            four: true,
                            five: false,
                            six: false,
                          });
                          setCustomerStep4({
                            ...customerstep4,
                            role: e.currentTarget.innerHTML,
                          });
                        }}
                      >
                        Specialty Vendor
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div
                      className={
                        border.five
                          ? "form-group SignupStepFour new_border"
                          : "form-group SignupStepFour"
                      }
                    >
                      <input
                        type="radio"
                        id="pa"
                        name="radio-group"
                        className="radio-custom"
                        checked={border.five}
                      />
                      <label
                        htmlFor="pa"
                        className="radio-custom-label"
                        onClick={(e) => {
                          setBorder({
                            one: false,
                            two: false,
                            three: false,
                            four: false,
                            five: true,
                            six: false,
                          });
                          setCustomerStep4({
                            ...customerstep4,
                            role: e.currentTarget.innerHTML,
                          });
                        }}
                      >
                        PA/ESQ
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div
                      className={
                        border.six
                          ? "form-group SignupStepFour new_border"
                          : "form-group SignupStepFour"
                      }
                    >
                      <input
                        type="radio"
                        id="other"
                        name="radio-group"
                        className="radio-custom"
                        checked={border.six}
                      />
                      <label
                        htmlFor="other"
                        className="radio-custom-label"
                        onClick={(e) => {
                          setBorder({
                            one: false,
                            two: false,
                            three: false,
                            four: false,
                            five: false,
                            six: true,
                          });
                          setCustomerStep4({
                            ...customerstep4,
                            role: e.currentTarget.innerHTML,
                          });
                        }}
                      >
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                {!loading.four && (
                  <button
                    style={{ marginBottom: "30px" }}
                    className="btn"
                    onClick={() => handleSubmit4()}
                    disabled={customerstep4.role == "" ? true : false}
                  >
                    <span> Next </span>
                  </button>
                )}
                {loading.four && (
                  <button className="btn" disabled>
                    <i className="fas fa-spinner fa-spin"></i>
                  </button>
                )}
              </div>
            </div>
          )}
          {step == 5 && loading.four == false && (
            <div className="container-fluid">
              <div className="signup_holder">
                <h2>
                  Almost there! Setup your password and
                  <br />
                  get started.
                </h2>
                <div className="SignupStepFive">
                  <div className="form-holder">
                    <div className="row">
                      <div className="col">
                        <div className="form-group nogroup">
                          <img className="input_icon" src={password} />
                          <input
                            type={passwordShown1 ? "text" : "password"}
                            name="password"
                            required
                            id="inputField5"
                            className="input-area"
                            value={customerstep5.password}
                            onChange={(e) =>
                              setCustomerStep5({
                                ...customerstep5,
                                password: e.currentTarget.value,
                              })
                            }
                          />
                          <label htmlFor="inputField5" className="floating_label">
                            {" "}
                            Password{" "}
                          </label>
                          <img 
                            className="input_icon"
                            style={{
                              right: "0",
                              cursor: "pointer",
                            }}
                            src={passwordShown1 ? showpassword : hidepassword}
                            onClick={togglePassword1}
                          />
                        </div>
                        <div className="form-group nogroup">
                          <img className="input_icon" src={password} />
                          <input
                            type={passwordShown2 ? "text" : "password"}
                            name="confirmpassword"
                            required
                            id="inputField6"
                            className="input-area"
                            value={confirmpassword}
                            onChange={(e) =>
                              setConfirmPassword(e.currentTarget.value)
                            }
                          />
                          <label htmlFor="inputField6" className="floating_label">
                            {" "}
                            Confirm Password{" "}
                          </label>
                          <img 
                            className="input_icon"
                            style={{
                              right: "0",
                              cursor: "pointer",
                            }}
                            src={passwordShown2 ? showpassword : hidepassword}
                            onClick={togglePassword2}
                          />
                        </div>
                        {customerstep5.password !== "" &&
                        confirmpassword !== "" &&
                        (str1 === str2) == true ? (
                          // <div className="password-height">
                          //   <span className="password-strength strong">
                          //     {" "}
                          //     Password Matched{" "}
                          //   </span>
                          // </div>
                          ""
                        ) : customerstep5.password !== "" &&
                          confirmpassword !== "" &&
                          (str1 === str2) == false ? (
                          <div className="password-height">
                            <span className="password-strength">
                              {" "}
                              Password Mismatch{" "}
                            </span>
                          </div>
                        ) : customerstep5.password == "" &&
                          confirmpassword == "" &&
                          (str1 === str2) == true ? (
                          ""
                        ) : (
                          ""
                        )}
                        <div className="SignupStepFive-checkbox">
                          <ul>
                            <li>
                              <label htmlFor="c1">
                                <input
                                  id="c1"
                                  type="checkbox"
                                  checked={codeofethics}
                                />
                                <span onClick={() => setCodeofEthics(!codeofethics)}>
                                </span>
                                <span onClick={() => setCodeofEthics(!codeofethics)}>
                                  I have read and I agree to uphold the Actionable Insights{" "}
                                  <Link
                                    to="/code-of-ethics"
                                    target="_blank"
                                    style={{ color: "#26A69A" }}
                                  >
                                    Code of Ethics
                                  </Link>
                                </span>
                              </label>
                            </li>
                            <li>
                              <label htmlFor="c2">
                                <input
                                  id="c2"
                                  type="checkbox"
                                  checked={termsandconditions}
                                />
                                <span onClick={() => setTermsandConditions(!termsandconditions)}>
                                  I agree with the&nbsp;
                                  <Link
                                    to="/terms-and-conditions"
                                    target="_blank"
                                    style={{ color: "#26A69A" }}
                                  >
                                    Terms and Conditions
                                  </Link>
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        {loginError && (
                          <div className="form-group alert alert-danger mt-4">
                            {loginError}
                          </div>
                        )}
                        {!loading.five && (
                          <button
                            onClick={() => handleSubmit5()}
                            className="btn"
                            disabled={
                              customerstep5.password == "" ||
                              confirmpassword == "" ||
                              str1 === str2 == false ||
                              codeofethics == false ||
                              termsandconditions == false
                                ? true
                                : false
                            }
                          >
                            <span> Get Started </span>
                          </button>
                        )}
                        {loading.five && (
                          <button className="btn" disabled>
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step == 6 && loading.five == false && (
            <div className="container-fluid">
              <div className="signup_holder">
                <h2>
                  You're all set! Please check your inbox and
                  <br />
                  verify your email.
                </h2>
                <button
                  onClick={() => history.push("/my-account")}
                  style={{ marginTop: "70px" }}
                  className="btn"
                >
                  <span> Continue </span>
                </button>
              </div>
            </div>
          )}
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
}

export default withRouter(Signup);
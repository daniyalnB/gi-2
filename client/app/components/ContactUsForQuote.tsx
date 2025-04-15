import React, { Suspense, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { ContactUsForPlan } from "../../utils/api-routes/api-routes.util";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import InputMask from "react-input-mask";
import bbe from "assets/bbe.svg";
import info from "assets/info-green.svg";

const ContactUsForQuote = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const width = window.innerWidth;
      if (width < 1221) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);

  const [loading, setLoading] = useState(false);

  const [Msg, setMsg] = useState(false);

  const [userData, setUserData] = useState({
    anythingElse: "",
    companyName: "",
    email: "",
    estimators: "",
    firstName: "",
    kindOfEstimates: "",
    lastName: "",
    phoneNumber: "",
    xactimateInstances: "",
    xactimateLicenses: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const contactUsForPlanDTO = userData;

    ContactUsForPlan(contactUsForPlanDTO).subscribe((response) => {
      if (response.response.Requested_Action) {
        setUserData({
          anythingElse: "",
          companyName: "",
          email: "",
          estimators: "",
          firstName: "",
          kindOfEstimates: "",
          lastName: "",
          phoneNumber: "",
          xactimateInstances: "",
          xactimateLicenses: "",
        });
        setMsg(response.response.Message);
        setLoading(false);
      } else {
        setMsg(false);
        setLoading(false);
      }
    });
  };

  return (
    <>
      <SEO
        title="Actionable Profile Enterprise Plan"
        description="Contact the Membership Services team for a customized Actionable Insights Enterprise Plan quote."
        link="request-a-quote"
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
        <div className="main-container">
          <div className="contact-us">
            <div className="">
              <div className="sub-holder-quote">
                <div className="text-sec">
                  <h1> Let’s build your Actionable Insights Enterprise Plan </h1>
                  {isSmallScreen ? (
                    <p> Fill out the form below and our team will contact you with a customized quote tailored to your needs. </p>
                  ) : (
                    <p>
                      Fill out the form below and our team will contact you with a customized
                      <br />
                      quote tailored to your needs.
                    </p>
                  )}
                </div>
                <div className="bg-image">
                  <img
                    src={bbe}
                    alt="bbe"
                    loading="lazy"
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="holder-quote">
                  <h1> Contact Information </h1>
                </div>
                <div className="contact-us-form">
                  <div className="row">
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> First Name </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder="First Name"
                          required
                          value={userData.firstName}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              firstName: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> Last Name </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder="Last Name"
                          required
                          value={userData.lastName}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              lastName: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> Phone Number </label>
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <InputMask
                          mask="999-999-9999"
                          value={userData.phoneNumber}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              phoneNumber: e.currentTarget.value,
                            })
                          }
                        >
                          {(inputProps) => (
                            <input
                              type="text"
                              name="phoneNumber"
                              className="form-control"
                              placeholder="Phone Number"
                              required
                              {...inputProps}
                            />
                          )}
                        </InputMask>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> Email </label>
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email Address"
                          required
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              email: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mt-2">
                      <div className="form-group">
                        <label> Company Name </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="text"
                          name="companyName"
                          className="form-control"
                          placeholder="Company Name"
                          required
                          value={userData.companyName}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              companyName: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mt-5 mb-5" />
                <div className="holder-quote">
                  <h1> Tell Us About Your Company </h1>
                  <p> To better help our team prepare for your meeting, please provide us some additional details about your company. </p>
                </div>
                <div className="contact-us-form">
                  <div className="row">
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> How many estimators does your company have? </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="number"
                          name="estimators"
                          className="form-control"
                          placeholder="Number of Estimators"
                          min={0}
                          required
                          value={userData.estimators}
                          onWheel={e => e.currentTarget.blur()}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              estimators: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> How many Xactimate licenses does your company have? </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="number"
                          name="xactimateLicenses"
                          className="form-control"
                          placeholder="Number Xactimate Licenses"
                          min={0}
                          required
                          value={userData.xactimateLicenses}
                          onWheel={e => e.currentTarget.blur()}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              xactimateLicenses: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> What kind of estimates does your company write? </label>
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 900 }}
                          overlay={
                            <Tooltip id="Estimate-Type">
                              i.e. Repair, Mitigation, Contents, Asbestos Abatement, etc.
                            </Tooltip>
                          }
                        >
                          <div style={{ display: "initial" }}>
                            <img src={info} />
                          </div>
                        </OverlayTrigger>
                        <input
                          type="text"
                          name="kindOfEstimates"
                          className="form-control"
                          placeholder="Estimate Type"
                          required
                          value={userData.kindOfEstimates}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              kindOfEstimates: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label> How many Xactimate instances does your company have? </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-5px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="number"
                          name="xactimateInstances"
                          className="form-control"
                          placeholder="Number Xactimate Instances"
                          min={0}
                          required
                          value={userData.xactimateInstances}
                          onWheel={e => e.currentTarget.blur()}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              xactimateInstances: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mt-2">
                      <div className="form-group">
                        <label> Anything else you would like to let the Membership Services team know before your meeting? </label>
                        <textarea
                          name="anythingElse"
                          className="form-control"
                          style={{
                            height: "245px",
                            marginTop: "5px"
                          }}
                          placeholder="Write here"
                          value={userData.anythingElse}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              anythingElse: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="submit">
                    {!loading && (
                      <button
                        className="btn"
                        type="submit"
                      >
                        Submit
                      </button>
                    )}
                    {loading && (
                      <button className="btn" disabled> 
                        <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    )}
                  </div>
                  {Msg && (
                    <div 
                      style={{
                        display: "inline-block",
                        fontSize: "15px",
                        margin: "20px 0px",
                        padding: "10px",
                        border: "2px solid #398f14",
                        borderRadius: "4px",
                      }}
                    >
                      {Msg}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
			</Suspense>
    </>
  );
};

export default withRouter(ContactUsForQuote);
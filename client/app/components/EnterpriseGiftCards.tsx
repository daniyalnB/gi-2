import React, { Suspense, useState } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { ContactUsForm } from "../../utils/api-routes/api-routes.util";
import queryString from "query-string";
import InputMask from "react-input-mask";

const EnterpriseGiftCards = () => {

  const [loading, setLoading] = useState(false);

  const [Msg, setMsg] = useState(false);

  const [userData, setUserData] = useState({
    yourname: "",
    youremail: "",
    yourphone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      yourname: userData.yourname,
      youremail: userData.youremail,
      yourphone: userData.yourphone,
      subject: userData.subject,
      message: userData.message,
    };

    const stringified = queryString.stringify(payload);

    ContactUsForm(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setUserData({
          yourname: "",
          youremail: "",
          yourphone: "",
          subject: "",
          message: "",
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
        title="Enterprise Gift Cards - Actionable Insights"
        description="A customized way to say thanks to those in your network! Give them the gift of the Insight Sheet Database, Macros and much more."
        link="resources/gift-cards/enterprise-gift-cards"
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
					<div className="Enterprise_Gift_Cards">
						<div className="">
              <div className="holder">
								<h2> A customized way to say thanks to those in your network! </h2>
							</div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-4">
                  <img
                    src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/23151739/gift_cards_membership_large.jpg"
                    loading="lazy"
                    alt="gift_cards_membership"
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-4">
                  <img
                    src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/05/07100842/gift_cards_membership_large_back.jpg"
                    loading="lazy"
                    alt="gift_cards_membership_back"
                  />
                </div>
              </div>
              <div className="row text-center">
                <div className="col mt-4">
                  <p> Give the gift of the Insight Sheet Database, As Seen in Xact, Macros and much more. Choose between Standard, Plus and Professional Plans. </p>
                </div>
              </div>
              <div className="holder" style={{ padding: "50px 0px" }}>
								<h2> Contact us for more details </h2>
							</div>
              <div className="row contact-us-form">
                <div className="col">
                  <form onSubmit={handleSubmit}>
                    <div className="contact-us-form">
                      <div className="row">
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> YOUR NAME (REQUIRED) </label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              required
                              value={userData.yourname}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  yourname: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> YOUR EMAIL (REQUIRED) </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              required
                              value={userData.youremail}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  youremail: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> YOUR PHONE (REQUIRED) </label>
                            <InputMask
                              mask="999-999-9999"
                              value={userData.yourphone}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  yourphone: e.currentTarget.value,
                                })
                              }
                            >
                              {(inputProps) => (
                                <input
                                  type="text"
                                  name="phone"
                                  className="form-control"
                                  placeholder=" "
                                  required
                                  {...inputProps}
                                />
                              )}
                            </InputMask>
                          </div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> SUBJECT </label>
                            <input
                              type="text"
                              name="subject"
                              className="form-control"
                              value={userData.subject}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  subject: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label> YOUR MESSAGE </label>
                            <textarea
                              name="your-message"
                              className="form-control"
                              style={{ height: "200px" }}
                              value={userData.message}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  message: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="send">
                        {!loading && (
                          <button
                            className="btn"
                            type="submit"
                          >
                            Send
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
                            display: "block",
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
					</div>
				</div>
				<WrongBrowserDisclaimer />
				<CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(EnterpriseGiftCards);
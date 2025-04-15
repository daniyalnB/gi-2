import React, { Suspense, useState } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { FeatureRequestForm } from "../../../utils/api-routes/api-routes.util";
import queryString from "query-string";
import Modal from "react-bootstrap/Modal";
import InputMask from "react-input-mask";
import alert from "assets/tick2.svg";

const FormElement = (props) => {

  const closeModal = () => {
    props.handlecardclose();
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p>
            If the Actionable Team has any questions regarding your request, we may reach out to clarify. Thank you!
          </p>
        </div>
      </div>
      <div className="modal-save">
        <button 
          className="btn"
          onClick={closeModal}
        >
          <span> Close </span>
        </button>
      </div>
    </>
  );
};

const XactimateFeatureRequest = () => {

  const [loading, setLoading] = useState(false);

  const [Msg, setMsg] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobilenumber: "",
    email: "",
    companyname: "",
    message: "",  
  });

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      MobileNumber: formData.mobilenumber,
      Email: formData.email,
      CompanyName: formData.companyname,
      Message: formData.message
    };

    const stringified = queryString.stringify(payload);

    FeatureRequestForm(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setFormData({
          firstName: "",
          lastName: "",
          mobilenumber: "",
          email: "",
          companyname: "",
          message: "",  
        });
        setMsg(response.response.Message);
        setLoading(false);
        handlecardshow();
      } else {
        setMsg(false);
        setLoading(false);
      }
    });
  };

	return (
		<>
      <Modal 
        show={cardpopupshow} 
        onHide={handlecardclose}
        backdrop="static" 
        keyboard={false}
        className="Invite_Sub-User_Modal"
      >
        <Modal.Header>
          <div className="modal-title h4"> 
            <img src={alert} />
          </div>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElement
            handlecardclose={handlecardclose}
          ></FormElement>
        </Modal.Body>
      </Modal>
			<SEO
        title="Xactimate Feature Request | Actionable Insights"
        description="Do you have a unique idea for a new Xactimate feature? We are here to champion your suggestion! Submit your idea & we will take it to the stakeholders."
				link="advance-the-cause/xactimate-feature-request"
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
					<div className="XFR">
						<div className="">
							<div className="holder">
								<h2> Xactimate Feature Request </h2>
							</div>
							<div className="text-section">
                Do you have a unique idea for a new Xactimate feature? We are here to champion your suggestion! Actionable Insights engages with providers like Verisk to promote the inclusion and implementation of new and improved functionalities, tools, and resources that streamline your work.
                <br /><br />
                <strong>Share your idea with us by filling out the form below and let the most innovative ideas come to life!</strong>
              </div>
              <div className="form-section">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 mt-3">
                      <div className="form-group">
                        <label> First Name </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="text"
                          name="firstname"
                          className="form-control"
                          placeholder="Enter First Name"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 mt-3">
                      <div className="form-group">
                        <label> Last Name </label> 
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="text"
                          name="lastname"
                          className="form-control"
                          placeholder="Enter Last Name"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 mt-3">
                      <div className="form-group">
                        <label> Phone Number </label>
                        <b
                          style={{
                            color: "red",
                            fontSize: "25px",
                            visibility: "hidden",
                          }}
                        >
                          *
                        </b>
                        <InputMask
                          mask="999-999-9999"
                          value={formData.mobilenumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mobilenumber: e.currentTarget.value,
                            })
                          }
                        >
                          {(inputProps) => (
                            <input
                              type="text"
                              name="mobilenumber"
                              className="form-control"
                              placeholder="Enter Phone Number"
                              {...inputProps}
                            />
                          )}
                        </InputMask>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 mt-3">
                      <div className="form-group">
                        <label> Email </label>
                        <b
                          style={{
                            color: "red",
                            fontSize: "25px",
                          }}
                        >
                          *
                        </b>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 mt-3">
                      <div className="form-group">
                        <label> Company Name </label>
                        <input
                          type="text"
                          name="companyname"
                          className="form-control"
                          placeholder="Enter Company Name"
                          value={formData.companyname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyname: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 mt-3">
                      <div className="form-group">
                        <label style={{ display: "inline" }}> What feature/utility do you want to add to Xactimate? </label>
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                            marginLeft: "-4px",
                          }}
                        >
                          *
                        </b>
                        <textarea
                          name="message"
                          className="form-control"
                          placeholder="Write a Message"
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.currentTarget.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    {!loading && (
                      <button	
                        type="submit"
                        className="btn"
                        disabled={
                          formData.firstName == "" ||
                          formData.lastName == "" ||
                          formData.email == "" ||
                          formData.message == ""
                          ? true
                          : false
                        }
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
                </form>
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

export default withRouter(XactimateFeatureRequest);
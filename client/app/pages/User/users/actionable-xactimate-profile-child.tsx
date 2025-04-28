import React, { Suspense, useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import queryString from "query-string";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import { Modal } from "react-bootstrap";
import { Helmet } from "react-helmet";
import {
  updateChildUserXactProfile,
  getMyChildAccounts,
} from "../../../../utils/api-routes/api-routes.util";
import info from "assets/Info.svg";
import modalclose from "assets/modal-close.svg";

const ActionableXactimateProfileChild = (props) => {

  const navigate = useNavigate();
  const { id } = useParams();
  
  const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    childuserid: "", 
    xactProfileCompanyEmailAddress: "",
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    getMyChildAccounts().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (childs) => childs.childuserid === parseInt(id)
        )[0];
        if (x == undefined) {
          navigate("/");
        }
        setActionableXactimateProfile({
          childuserid: x.childuserid,
          xactProfileCompanyEmailAddress: x.user.emailaddress,
          xactProfileveriskid: x.xactProfileveriskid,
          xactProfileStatus: x.xactProfileStatus,
        });
        setLoadingPage(false);
      }
    });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);

  const handleActionableXactimateProfile = (e) => {
    e.preventDefault();
    handleShow();
  };

  const submitData = () => {
    setLoading(true);

    const payload = {
      childuserid: ActionableXactimateProfile.childuserid,
      XactProfileveriskid: ActionableXactimateProfile.xactProfileveriskid,
    };

    const stringified = queryString.stringify(payload);

    updateChildUserXactProfile(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        handleClose();
        update();
      } else {
        setLoading(false);
        handleClose();
      }
    });
  }

  function update () {
    getMyChildAccounts().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (childs) => childs.childuserid === parseInt(props.match.params.id)
        )[0];
        if (x == undefined) {
          navigate("/");
        }
        setActionableXactimateProfile({
          childuserid: x.childuserid,
          xactProfileCompanyEmailAddress: x.user.emailaddress,
          xactProfileveriskid: x.xactProfileveriskid,
          xactProfileStatus: x.xactProfileStatus,
        });
      }
    });
  }

  return (
    <>
      <Helmet>
				<title> 
          Actionable Xactimate Profile Users - Actionable Insights
				</title>
			</Helmet>
			<Suspense
				fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
			>
        <Modal 
          show={show} 
          onHide={handleClose}
          backdrop="static" 
          keyboard={false}
          className="Cancel_Subscription_Modal"
        >
          <Modal.Header>
            <div 
              className="cancel_subscription_title modal-title h4"
            > 
              Confirmation
            </div>
            <button 
              type="button" 
              className="close" 
              data-dismiss="modal" 
              onClick={handleClose}
            >
              <img 
                src={modalclose}
              />
            </button>
          </Modal.Header>
          <Modal.Body>
            Thank you for submitting your information.
            The Actionable Xactimate Profile is currently in Closed Beta.
            We have received your application and will reach out to you shortly to either confirm access or prepare you for the next round of participants.
          </Modal.Body>
          <Modal.Footer>
            {!loading &&
              <button
                className="btn btn_pm"
                onClick={submitData}
              >
                Proceed
              </button>
            }
            {loading &&
              <button
                className="btn btn_pm"
                disabled
              > 
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            }
          </Modal.Footer>
        </Modal>
        <ScrollToTop />
        <Navbar />
        <Breadcrumbs />
        <div className="main-container">
          <div className="xactimate-data-set-child">
            <div className="">
              <div className="holder">
                <h2> ACTIONABLE XACTIMATE PROFILE </h2>
              </div>
              {!loadingPage && (
                <div className="xactimate-data-set">
                  <div>
                    {/* <h5 className="beta">
                      Closed Beta
                    </h5>
                    <br /> */}
                    <span className="h3">
                      Actionable Xactimate Profile
                    </span>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 900 }}
                      overlay={(
                        <Tooltip
                          id={
                            ActionableXactimateProfile.xactProfileStatus === "Inactive" ? "xactimate-tooltip-Inactive" :
                            ActionableXactimateProfile.xactProfileStatus === "Pending" ? "xactimate-tooltip-Pending" : "xactimate-tooltip-Active"
                          }
                        >
                          {ActionableXactimateProfile.xactProfileStatus === "Inactive" && (
                            <>
                              Enter the information below to apply for access to the Actionable Xactimate Profile.
                            </>
                          )}
                          {ActionableXactimateProfile.xactProfileStatus === "Pending" && (
                            <>
                              Your information has been locked in and received.
                              We will reach out to you shortly to either confirm access or prepare you for the next round of participants.
                            </>
                          )}
                          {ActionableXactimateProfile.xactProfileStatus === "Active" && (
                            <>
                              Active - You currently have access to the Actionable Xactimate Profile. If you need to sync our profile to your Xactimate login, please see this video:{" "}
                              <a
                                href="https://www.youtube.com/watch?v=vb7HKJVTAmA"
                                target="_blank"
                              >
                                Xact Hacks | Logging In To X1 and Syncing Profiles
                              </a>
                            </>
                          )}
                        </Tooltip>
                      )}
                    >
                      <span className={`status_${ActionableXactimateProfile.xactProfileStatus} status`}>
                        <p>{ActionableXactimateProfile.xactProfileStatus}</p>
                      </span>
                    </OverlayTrigger>
                    <p>
                      Enter your company email address and Xactware/Verisk ID to apply for access to the Actionable Xactimate Profile that converts the Insight Sheet Database into real-time estimating guidance.
                      With equal credence given to both overages and warranted omissions, you can finally estimate within a Xactimate Profile that was conceived without bias and designed for swift and noble claims settlement.
                    </p>
                  </div>
                  <div className="form-holder">
                    <form onSubmit={handleActionableXactimateProfile}>
                      <div className="row">
                        <div className="col-12">
                          <div className="upInputs form-group nogroup">
                            <input
                              type="email"
                              name="xactProfileCompanyEmailAddress"
                              placeholder=" "
                              required
                              readOnly={true}
                              value={ActionableXactimateProfile.xactProfileCompanyEmailAddress}
                              style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ? 
                                {
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                } : {}
                              }
                              // onChange={(e) => 
                              //   setActionableXactimateProfile({
                              //     ...ActionableXactimateProfile,
                              //     xactProfileCompanyEmailAddress: e.currentTarget.value,
                              //   })
                              // }
                            />
                            <label
                              className="upLabel"
                              style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ? 
                                {
                                  color: "#B8B8B8",
                                } : {}
                              }
                            >
                              Company Email Address 
                            </label>
                            <div className="info">
                              <img src={info} />
                              <span> Ex. john.doe@yourcompany.com </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mt-3">
                          <div className="upInputs form-group nogroup">
                            <input
                              type="text"
                              name="XactProfileveriskid"
                              placeholder=" "
                              required
                              readOnly={ActionableXactimateProfile.xactProfileStatus === "Inactive" ? false : true}
                              value={ActionableXactimateProfile.xactProfileveriskid}
                              style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ? 
                                {
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                } : {}
                              }
                              onChange={(e) => 
                                setActionableXactimateProfile({
                                  ...ActionableXactimateProfile,
                                  xactProfileveriskid: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              className="upLabel"
                              style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ? 
                                {
                                  color: "#B8B8B8",
                                } : {}
                              }
                            >
                              Xactware/Verisk ID
                            </label>
                            <div className="info">
                              <img src={info} />
                              <span> Ex. The email address they use to log in to Xactimate </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="video-link">
                        Your company email and Xactware/Verisk ID are likely the same. If so, please enter the same email address in both fields above.
                      </div>
                      <div className="text-right mt-5">
                        <button 
                          className="btn back"
                          onClick={() => navigate("/users")}
                        >
                          <span> Back </span>
                        </button>
                        {ActionableXactimateProfile.xactProfileStatus === "Inactive" && (
                          <button 
                            className="btn update"
                            type="submit"
                          >
                            Update
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {loadingPage && (
                <div className="loader-inner">
                  <LottieLoader />
                </div>
              )}
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
  
export default ActionableXactimateProfileChild;
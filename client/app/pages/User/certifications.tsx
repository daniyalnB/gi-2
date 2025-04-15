import React, { Suspense, useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import history from "../../../utils/history";
import moment from "moment";
import { AppContext } from "../../../contexts/appContext";
import { 
  getCertificateDetails,
} from "utils/api-routes/api-routes.util";
import twitter from "assets/twitter_points.svg";
import facebook from "assets/facebook_points.svg";
import instagram from "assets/instagram_points.svg";
import linkedin from "assets/linkedin_points.svg";
import link from "assets/Link.svg";
import copy from "assets/Copy.svg";
import download_certification from "assets/download_certification.webp";
import IIRC_logo from "assets/IIRC_logo.webp";
import loading_certification from "assets/loading_certification.gif";

const DownloadCertificate = (props) => {

  const [loadingPage, setLoadingPage] = useState(true);

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const [customerInfo, setCustomerInfo] = useState([]);
  const [check, setCheck] = useState(false);
  const [results, setResults] = useState([]);
  const [isResultsEmpty, setIsResultsEmpty] = useState(100);

  const [triggered, setTriggered] = useState(false);
  const [sixtySecDone, setSixtySecDone] = useState(false);

  const tri = () => {
    setLoadingPage(false);
    setTriggered(true);
    setTimeout(() => {
      setSixtySecDone(true);
    }, 60000);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (triggered) {
      const startTime = new Date().getTime();
      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsed_time = (currentTime - startTime) / 1000;
        const progressPercentage = (elapsed_time / 60) * 100;
        setProgress(progressPercentage);
        if (progressPercentage >= 100) {
          clearInterval(timer);
        }
      }, 16);
    }
  }, [triggered]);

  useEffect(() => {
    if (myInfo) {
      if (myInfo.customercertficationinfo.cerstatus.length !== 0) {
        setCustomerInfo(myInfo.ownerinfo);
        setCheck(true);
      } else {
        console.log("You are not currently registered for any certification courses");
        history.push("/my-account");
      }
    }
  }, [myInfo]);

  useEffect(() => {
    if (check) {
      processCertifications(myInfo.customercertficationinfo.cerstatus);
    }
  }, [check]);

  const processCertifications = (cetifications) => {
    let arr = [];
    const promises = cetifications.map((item) => {
      const certificationId = item.certificationid;
      return getCertificateDetails(certificationId).toPromise();
    });
  
    Promise.all(promises).then((responses) => {
      responses.forEach((response) => {
        if (response.response.Requested_Action && response.response.data.status === 3) {
          arr.push(response.response.data);
          if (response.response.data.iicrcCertificateUrl !== null) {
            const iicrcCertificationData = { ...response.response.data };
            iicrcCertificationData.certificateUrl = null;
            arr.push(iicrcCertificationData);
          }
        } else {
          console.log("error");
          tri();
        }
      });
      setIsResultsEmpty(arr.length);
      setResults(arr);
      setLoadingPage(false);
      return arr;
    });
  };

  // useEffect(() => {
  //   if (isResultsEmpty === 0) {
  //     console.log("empty");
  //     history.push("/my-account");
  //   } else {
  //     console.log("not empty");
  //   }
  // }, [isResultsEmpty]);

  function pcsh1 () {
    var x = document.getElementById("pc1");
    x.classList.add("show");
    setTimeout(() => {
      x.classList.remove("show");
    }, 1500);
  };

  function pcsh2 () {
    var x = document.getElementById("pc1");
    x.classList.add("visible");
    setTimeout(() => {
      x.classList.remove("visible");
    }, 2500);
  };

	return (
		<>
			<SEO
        title="Actionable Insights Matterport Certified Diploma"
        description="Download your Actionable Insights Matterport Certified Diploma"
        link="download-certificate"
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
        <div className="custom-copy-text" id="pc1">
          Copied to Clipboard
        </div>
				<div className="main-container">
					<div className="Insighter_Points">
            {!loadingPage && (
              <>
                {triggered ? (
                  <div className="loading-certification">
                    {sixtySecDone ? (
                      <h2>
                        Your certificate is ready!
                        <br />
                        Thank you for your patience
                      </h2>
                    ) : (
                      <h2>
                        Hold tight, graduate!
                        <br />
                        We are preparing your diploma and it will be ready in ~60 seconds
                      </h2>
                    )}
                    <img
                      src={loading_certification}
                      loading="lazy"
                    />
                    {sixtySecDone && (
                      <div className="get-it-now">
                        <button className="btn" onClick={() => window.location.reload()}>
                          Get it Now
                        </button>
                      </div>
                    )}
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${progress}%` }}
                      >
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div className="holder">
                      <h2> CERTIFICATIONS & DIPLOMAS </h2>
                      <h3> Congratulations, {customerInfo.lastname}. Share your achievement. </h3>
                    </div>
                    <div className="insighter-points-inner">
                      {results.map((val) => {
                        return (
                          <div className="col">
                            <div className="row points-sec-2 border-0">
                              <div className="col-xl-6 col-lg-6 col-md-12 sec-3 p-0">
                                <img
                                  src={val.certificateUrl ? download_certification : IIRC_logo} 
                                  alt="share"
                                  loading="lazy"
                                />
                                <div className="ml-3">
                                  <h2> {val.certificateUrl ? val.certificationtitle : "IICRC Diploma"} </h2>
                                  {val.certificateUrl && (
                                    <>
                                      <p> Certification code: {val.certCode ? val.certCode : "N/A"} </p>
                                      <p> Date certified: {val.passdate ? val.passdate : "N/A"} </p>
                                    </>
                                  )}
                                  <a
                                    href={val.certificateUrl ? val.certificateUrl : val.iicrcCertificateUrl}
                                    target="_blank"
                                  >
                                    Download
                                  </a>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-12 sec-2 p-0">
                                <p className="custom-refer-message">
                                  <div className="row">
                                    <div className="col-xl-1 col-md-1 col-2">
                                      <img
                                        src={link}
                                        alt="link"
                                        loading="lazy"
                                      />
                                    </div>
                                    <div className="col-xl-7 col-md-7 col-10 text-left">
                                      <span> {val.certificateUrl ? val.certificateUrl : val.iicrcCertificateUrl} </span>
                                    </div>
                                    <div className="col-xl-4 col-md-4 col-12 text-right" style={{ paddingLeft: "0px" }}>
                                      <button
                                        className="btn"
                                        onClick={() => {
                                          navigator.clipboard.writeText(`${val.certificateUrl ? val.certificateUrl : val.iicrcCertificateUrl}`);
                                          pcsh1();
                                          pcsh2();
                                        }}
                                      >
                                        <img
                                          src={copy}
                                          alt="copy"
                                          loading="lazy"
                                          style={{ marginRight: "5px" }}
                                        />
                                        Copy code
                                      </button>
                                    </div>
                                  </div>
                                </p>
                                <div className="social-links">
                                  <a
                                    href={`https://www.facebook.com/sharer.php?u=${val.certificateUrl ? val.certificateUrl : val.iicrcCertificateUrl}`}
                                    target="_blank"
                                  >
                                    <img 
                                      src={facebook}
                                      alt="facebook"
                                      loading="lazy"
                                    />
                                  </a>
                                  <a
                                    href="https://www.instagram.com/actionable_insights/"
                                    target="_blank"
                                  >
                                    <img
                                      src={instagram}
                                      alt="instagram"
                                      loading="lazy"
                                    />
                                  </a>
                                  <a
                                    href={`https://www.linkedin.com/shareArticle?url=${val.certificateUrl ? val.certificateUrl : val.iicrcCertificateUrl}`}
                                    target="_blank"
                                  >
                                    <img
                                      src={linkedin}
                                      alt="linkedin"
                                      loading="lazy"
                                    />
                                  </a>
                                  <a
                                    href={`https://twitter.com/share?url=${val.certificateUrl ? val.certificateUrl : val.iicrcCertificateUrl}`}
                                    target="_blank"
                                  >
                                    <img
                                      src={twitter}
                                      alt="twitter"
                                      loading="lazy"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })} 
                    </div>
                  </div>
                )}
              </>
            )}
            {loadingPage && (
              <div className="loader-inner">
                <LottieLoader />
              </div>
            )}
					</div>
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(DownloadCertificate);
import React, { Suspense, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const MD_Responsive = React.lazy(() => import("../MediaRelease/mediareleaseresponsive"));
import { GetAllMediaReleaseCustomer } from "../../../utils/api-routes/api-routes.util";

const MediaRelease = () => {
  
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllMediaReleaseCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  return (
    <>
      <SEO
        title="Media Release - Actionable Insights"
        description="View the latest news, announcements and media releases from Actionable Insights."
        link="media-release"
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
          <div className="Video_Gallery">
            <div className="">
              <div className="holder">
                <h2> Media Release </h2>
              </div>
              <div className="videos remove">
                {!loading && (
                  <>
                    <div className="row">
                      {data.length > 0 ? (
                        <>
                          {data.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <a href={`${val.hubspotLink}`} target="_blank">
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </a>
                                  <div className="description">
                                    {val.description.substring(0, 200)}
                                    ...{" "}
                                    <a href={`${val.hubspotLink}`} target="_blank">
                                      Read More
                                    </a>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <div className="col">
                          <div className="no-result">
                            <hr />
                            <h3> No Posts Yet </h3>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
              </div>
              <MD_Responsive
                data={data}
              />
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

export default withRouter(MediaRelease);
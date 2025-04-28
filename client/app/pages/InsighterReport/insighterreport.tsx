import React, { Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllPriceInsighterReportsCustomer } from "../../../utils/api-routes/api-routes.util";
import moment from "moment";

const InsighterReport = () => {
  
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllPriceInsighterReportsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const sortedReports = data.sort((a, b) => moment(b.dateforsorting, "DD.MM.YYYY").format("YYYYMMDD") - moment(a.dateforsorting, "DD.MM.YYYY").format("YYYYMMDD"));

  return (
    <>
      <SEO
        title="Insighter Report | A resource library by Actionable Insights"
        description="Our Insighter Report contains resources for restoration and claims professionals including industry news, white papers, and more. Check it out."
        link="resources/insighter-report"
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
          <div className="IR_page">
            <div className="">
              <div className="holder">
                <h2> The Insighter Report </h2>
                <h3>
                  {" "}
                  A resource library for restoration and claims professionals.{" "}
                </h3>
              </div>
              {!loading && (
                <>
                  <div className="row">
                    {sortedReports.map((val, key) => {
                      return (
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div className="reports">
                            <div className="insighter_report">
                              <Link to={`/resources/insighter-report/${val.permalink}`}>
                                <img
                                  src={val.featureimage}
                                  alt={val.featuredtitle}
                                  loading="lazy"
                                />
                              </Link>
                              <h3 className="name">
                                <Link to={`/resources/insighter-report/${val.permalink}`}>
                                  {val.featuredtitle}
                                </Link>
                              </h3>
                              <h3 className="date">
                              {/* moment(x.dateforsorting, "DD.MM.YYYY").format("yyyy-MM-DD") */}
                                {moment(val.dateforsorting, "DD.MM.YYYY").format(
                                  "MMMM DD, YYYY"
                                )}
                              </h3>
                              <div className="description">
                                {val.featureddescription.substring(0, 250)}
                                ...{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {loading && (
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

export default InsighterReport;
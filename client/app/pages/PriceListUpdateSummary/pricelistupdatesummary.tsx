import React, { Suspense, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllPriceListUpdateSummaryCustomer } from "../../../utils/api-routes/api-routes.util";
import moment from "moment";

const PriceListUpdateSummary = () => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllPriceListUpdateSummaryCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        const publisheddata = x.filter((val) => val.draft === false || val.draft === null);
        setData(publisheddata);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const years = data.map(x => moment(x.selecteddate).format("YYYY"));
  const uniqueYears = [...new Set(years)];

  const sortedYears = uniqueYears.sort((a, b) => b - a);
  const sortedMonths = data.sort((a, b) => moment(a.selecteddate).format("M") - moment(b.selecteddate).format("M"));

  return (
    <>
      <SEO
        title="Price List Update Summary | Stay Tuned to Latest Xactimate Prices"
        description="Check out our free Price List Update Summary covering all the changes in the Xactimate price list, the addition of new line items, and much more."
        link="resources/price-list-update-summary"
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
        <div className="main-container" style={{ paddingBottom: "50px" }}> 
          <div className="PLUS">
            <div className="">
              <div className="holder">
                <h2> Price List Update Summary </h2>
                <h3>
                  {" "}
                  Do you know what line items were added to the Price List last
                  month?{" "}
                </h3>
                <h3> Do you know why they were adopted? </h3>
                <h3 className="nyd"> Now you do… </h3>
                <h3>
                  {" "}
                  Have you identified a need for a new line item? Submit your
                  request&nbsp;
                  <Link
                    to="/advance-the-cause/line-item-request"
                    className="here"
                  >
                    here
                  </Link>
                  .
                </h3>
              </div>
              {!loading && (
                <>
                  <div className="summary">
                    {sortedYears.map((x) => (
                      <div className="summary_inner">
                        <div className="heading">
                          <h3> Price List Update Summary – {x} </h3>
                        </div>
                        <div className="summary_months">
                          <div className="row months">
                            {sortedMonths.filter((val) => moment(val.selecteddate).format("YYYY") == x).map((val) => {
                              return (
                                <div className="col-md-4 col-sm-12 month">
                                  <Link
                                    to={`/resources/price-list-update-summary/${val.permalink}`}
                                    target="_blank"
                                  >
                                    {val.title}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default withRouter(PriceListUpdateSummary);
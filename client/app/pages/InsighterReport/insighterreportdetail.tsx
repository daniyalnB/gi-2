import React, { Suspense, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
import NotFound from "../../components/NotFound";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllPriceInsighterReportsCustomer } from "../../../utils/api-routes/api-routes.util";
import history from "../../../utils/history";
import Lightbox from "react-image-lightbox";

const InsighterReportDetail = (props) => {

  const [show, setShow] = useState(true);
  
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(false);

  const [previews, setPreviews] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    GetAllPriceInsighterReportsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (insighterreport) => insighterreport.permalink === props.match.params.permalink
        )[0];
        if (x == undefined) {
          setShow(false);
        }
        setData(x);
        setLoading(false);
        var element = document.getElementsByClassName("imagepreview");
        if (element) {
          console.log(element);
          var images = [];
          for (var i = 0; i < element.length; i++) {
            images.push(element[i].src);
            if (images.length > 1) {
              setPreviews(images);
              console.log(previews, "previews");
            } else {
              setPreviews(images);
              console.log(previews, "previews");
            }
            element[i].addEventListener("click", function () {
              handleOpen();
            });
          }
        }
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <>
      {show ? (
        <>
          <SEO
            title={
              data
                ? data.metatitle
                  ? `${data.metatitle}`
                  : `${data.tabtitle}`
                : "Insighter Report - Actionable Insights"
            }
            description={data.metadescription ? `${data.metadescription}` : ""}
            link={`resources/insighter-report/${data.permalink}`}
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
            <Breadcrumbs data={data} />
            <div className="main-container">
              <div className="IR_page">
                <div className="">
                  {!loading && (
                    <>
                      <div className="holder">
                        <h2> {data.pagetitle} </h2>
                      </div>
                      <div className="reports">
                        <div className="row">
                          <div className="col">
                            <div className="insighter_report_detail">
                              <img
                                src={data.featureimage}
                                alt={data.pagetitle}
                                loading="lazy"
                              />
                              <div className="description">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `${
                                      data.description
                                        ? data.description
                                            .replace(/(<p><\/p>)/g, `<br>`)
                                            .replace(
                                              /<img/g,
                                              `<img class='imagepreview'`
                                            )
                                        : ""
                                    }`,
                                  }}
                                ></div>
                              </div>
                              {data.attachedPDF == null ? (
                                ""
                              ) : (
                                <div className="cr">
                                  <a href={data.attachedPDF} target="_blank">
                                    Continue Reading
                                  </a>
                                </div>
                              )}
                              <div>
                                {isOpen && previews.length > 1 && (
                                  <Lightbox
                                    mainSrc={previews[photoIndex]}
                                    nextSrc={
                                      previews[(photoIndex + 1) % previews.length]
                                    }
                                    prevSrc={
                                      previews[
                                        (photoIndex + previews.length - 1) %
                                          previews.length
                                      ]
                                    }
                                    onCloseRequest={() => setIsOpen(false)}
                                    onMovePrevRequest={() =>
                                      setPhotoIndex(
                                        (photoIndex + previews.length - 1) %
                                          previews.length
                                      )
                                    }
                                    onMoveNextRequest={() =>
                                      setPhotoIndex(
                                        (photoIndex + 1) % previews.length
                                      )
                                    }
                                  />
                                )}
                                {isOpen && previews.length == 1 && (
                                  <Lightbox
                                    mainSrc={previews[photoIndex]}
                                    onCloseRequest={() => setIsOpen(false)}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
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
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default withRouter(InsighterReportDetail);
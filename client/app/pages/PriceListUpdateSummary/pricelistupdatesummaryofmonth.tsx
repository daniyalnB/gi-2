import React, { Suspense, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
import NotFound from "../../components/NotFound";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const Comments = React.lazy(() => import("../../components/Comments"));
import { GetPriceListUpdateSummaryByPermalink } from "../../../utils/api-routes/api-routes.util";
import Lightbox from "react-image-lightbox";
import moment from "moment";

const PriceListUpdateSummaryOfMonth = (props) => {

  const { permalink } = useParams();

  const [show, setShow] = useState(true);

  const [loading, setLoading] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  };

  const [data, setData] = useState(false);

  const [previews, setPreviews] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    GetPriceListUpdateSummaryByPermalink(permalink).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        if (x == undefined || x == null) {
          setShow(false);
        }
        setData(x);
        setLoading(false);
        var element = document.getElementsByClassName("link");
        if (element) {
          console.log(element);
          for (var i = 0; i < element.length; i++) {
            element[i].addEventListener("click", function () {
              scrollToTop();
            });
          }
        }
        var elementimage = document.getElementsByClassName("imagepreview");
        if (elementimage) {
          console.log(elementimage);
          var images = [];
          for (var i = 0; i < elementimage.length; i++) {
            images.push(elementimage[i].src);
            if (images.length > 1) {
              setPreviews(images);
              console.log(previews, "previews");
            } else {
              setPreviews(images);
              console.log(previews, "previews");
            }
            elementimage[i].addEventListener("click", function () {
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
                ? data.metatitle || data.metatitle !== null
                  ? `${data.metatitle}`
                  : `${data.tabtitle}`
                : "Price List Update Summary"
            }
            description={data.metadescription ? `${data.metadescription}` : ""}
            link={`resources/price-list-update-summary/${data.permalink}`}
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
              <div className="PLUS_OM">
                <div className="">
                  {!loading && (
                    <>
                      <div className="holder">
                        {data.iframeurl.includes("https") ? (
                          <>
                            <h2>
                              Price List Update Summary - {data.title}{" "}
                              {moment(data.selecteddate).format("YYYY")}
                            </h2>
                            <h5>New Xactimate Line Items</h5>
                          </>
                        ) : (
                          <h2>
                            Price List Commentary & New Line Items - {data.title}{" "}
                            {moment(data.selecteddate).format("YYYY")}
                          </h2>
                        )}
                      </div>
                      {data.iframeurl.includes("https") ? (
                        <>
                          <div className="youtube_video">
                            <div className="video">
                              <div className="fluid-width-video-wrapper">
                                <iframe
                                  src={data.iframeurl}
                                  frameBorder="0"
                                  allow="autoplay; encrypted-media"
                                  allowFullScreen
                                  name="plus-video-frame"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="CTA">
                            <h3>
                              {" "}
                              Looking for more helpful Xactimate estimating
                              information? Check out the Commonly Overlooked Line
                              Items database of Xactimate line items that are often
                              warranted but rarely included in invoices/estimates!{" "}
                            </h3>
                            <Link
                              to="/commonly-overlooked-line-items"
                              className="btn"
                            >
                              COMMONLY OVERLOOKED LINE ITEMS
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="new-line-item">
                          <p>
                            Have you identified a need for a new line item? Submit
                            your request&nbsp;
                            <Link to="/advance-the-cause/line-item-request">
                              here
                            </Link>
                            .
                          </p>
                        </div>
                      )}
                      <div className="changes">
                        {data.iframeurl.includes("https") ? (
                          <h2>
                            {data.title} {moment(data.selecteddate).format("YYYY")}{" "}
                            Price List Changes Report
                          </h2>
                        ) : (
                          <h2> Price List Commentary </h2>
                        )}
                        <div className="change_list">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${
                                data.description
                                  ? data.description
                                      .replace(/<a/g, `<a class='link'`)
                                      .replace(/_self/g, `plus-video-frame`)
                                      .replace(/(<p><\/p>)/g, `<br>`)
                                      .replace(/<img/g, `<img class='imagepreview'`)
                                  : ""
                              }`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        {isOpen && previews.length > 1 && (
                          <Lightbox
                            mainSrc={previews[photoIndex]}
                            nextSrc={previews[(photoIndex + 1) % previews.length]}
                            prevSrc={
                              previews[
                                (photoIndex + previews.length - 1) % previews.length
                              ]
                            }
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() =>
                              setPhotoIndex(
                                (photoIndex + previews.length - 1) % previews.length
                              )
                            }
                            onMoveNextRequest={() =>
                              setPhotoIndex((photoIndex + 1) % previews.length)
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
                      <Comments pricelistid={data.id} page="pricelist" />
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

export default PriceListUpdateSummaryOfMonth;
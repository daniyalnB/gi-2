import React, { Suspense, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
import NotFound from "../../components/NotFound";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetVideoGallaryItemsCustomer } from "../../../utils/api-routes/api-routes.util";
import Lightbox from "react-image-lightbox";

const VideoGalleryDetail = (props) => {

  const { permalink } = useParams();

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
    if (props.location.pathname === "/video-gallery/academy-insights-aitc-solidifai-estimate-edit-engine" || props.location.pathname === "/video-gallery/academy-insights-solidifai-estimate-edit-engine") {
      setShow(false);
		}
  }, [props]);

  useEffect(() => {
    GetVideoGallaryItemsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (vg) => vg.permalink === permalink
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
                : "Video Gallery - Actionable Insights"
            }
            description={data.metadescription ? `${data.metadescription}` : ""}
            link={`video-gallery/${data.permalink}`}
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
              <div className="Video_Gallery">
                <div className="">
                  {!loading && (
                    <>
                      <div className="holder">
                        <h2> Video Gallery </h2>
                      </div>
                      <div className="videos">
                        <div className="row">
                          <div className="col">
                            <div className="youtube_video">
                              <div className="video_border">
                                <div className="fluid-width-video-wrapper">
                                  <iframe
                                    src={data.videolink}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    name="example"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="video_gallery_detail">
                              {/* <img
                                src={data.bannerimage}
                                alt={data.title}
                                loading="lazy"
                              /> */}
                              <h3 className="name">{data.title} </h3>
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

export default VideoGalleryDetail;
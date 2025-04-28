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
const Event = React.lazy(() => import("../events/eventsdetail/event"));
const EventAttendance = React.lazy(() => import("../events/eventsdetail/eventattendance"));
const Comments = React.lazy(() => import("../../components/Comments"));
import { GetEventByEventId } from "../../../utils/api-routes/api-routes.util";
import Lightbox from "react-image-lightbox";

const EventsDetail = (props) => {

  const { permalink } = useParams();

	const [show, setShow] = useState(true);
  
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(false);
  const id = data.id;

  const [previews, setPreviews] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    GetEventByEventId(permalink).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        if (x == undefined) {
          setShow(false);
        }
        setData(x);
        setLoading(false);
        var element = document.getElementsByClassName("imagepreview");
        setTimeout(() => {
          if (element) {
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
        }, 1000);
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
                : "Event - Actionable Insights"
            }
            description={data.metadescription ? `${data.metadescription}` : ""}
            link={`event/${data.permalink}`}
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
              <div className="ED_page">
                {!loading && (
                  <>
                    <Event data={data} />
                    {data.type == "Private" ? "" : <EventAttendance data={data} />}
                    {/* <Comments eventid={id} page="event" /> */}
                  </>
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
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
              </div>
            </div>
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

export default EventsDetail;
import React, { Suspense, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import moment from "moment";
import { GetLiveSessionDetails } from "../../utils/api-routes/api-routes.util";

const Live = () => {

  const [loading, setLoading] = useState(true);

  const [liveSessionDetails, setLiveSessionDetails] = useState([]);

  useEffect(() => {
    GetLiveSessionDetails().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setLiveSessionDetails(x);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const currDate = new Date().toLocaleString();
  const currDateMoment = `${moment(currDate).format("YYYY-MM-DDTHH:mm:ss.SSS")}`;

  const currYear = new Date().toLocaleString();
  const currYearMoment = `${moment(currYear).format("YYYY")}`;

	return (
		<>
			<SEO
        title="Actionable Reaction Live Stream Zone - Actionable Insights"
        description="Actionable Insights is Live! Come join in for an exciting Live Actionable Reaction!"
        link="live"
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
					<div className="Live">
						<div className="">
              <div className="holder">
                <h2> Actionable Reaction </h2>
              </div>
              {!loading && (
                <>
                  {liveSessionDetails ? (
                    <>
                      {liveSessionDetails.currentstate ? (
                        <>
                          {liveSessionDetails.startdatetime && liveSessionDetails.enddatetime ? (
                            <>
                              {moment.utc(new Date(`${liveSessionDetails.startdatetime} UTC`)).local().format("YYYY") == currYearMoment && moment.utc(new Date(`${liveSessionDetails.enddatetime} UTC`)).local().format("YYYY") == currYearMoment ? (
                                <>
                                  {moment.utc(new Date(`${liveSessionDetails.startdatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") <= currDateMoment && moment.utc(new Date(`${liveSessionDetails.enddatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") >= currDateMoment ? (
                                    <>
                                      <div className="youtube_video_main">
                                        <div className="video">
                                          <div className="fluid-width-video-wrapper">
                                            <iframe
                                              src={liveSessionDetails.iframeurl}
                                              frameBorder="0"
                                              allow="autoplay; encrypted-media"
                                              allowFullScreen
                                              name="actionable-reaction-live"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="live_youtube_video_title">
                                        <div className="circle"></div>
                                        <p>{liveSessionDetails.title}</p>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="youtube_video_main">
                                      <div className="video">
                                        <div className="fluid-width-video-wrapper">
                                          <iframe
                                            src="https://www.youtube.com/embed/videoseries?list=PLtF55NJwJ_ZNxH9EdctVs25xcVsyECYZS"
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            name="actionable-reaction-live"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="youtube_video_main">
                                  <div className="video">
                                    <div className="fluid-width-video-wrapper">
                                      <iframe
                                        src="https://www.youtube.com/embed/videoseries?list=PLtF55NJwJ_ZNxH9EdctVs25xcVsyECYZS"
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        name="actionable-reaction-live"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="youtube_video_main">
                              <div className="video">
                                <div className="fluid-width-video-wrapper">
                                  <iframe
                                    src="https://www.youtube.com/embed/videoseries?list=PLtF55NJwJ_ZNxH9EdctVs25xcVsyECYZS"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    name="actionable-reaction-live"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="youtube_video_main">
                          <div className="video">
                            <div className="fluid-width-video-wrapper">
                              <iframe
                                src="https://www.youtube.com/embed/videoseries?list=PLtF55NJwJ_ZNxH9EdctVs25xcVsyECYZS"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                name="actionable-reaction-live"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="youtube_video_main">
                      <div className="video">
                        <div className="fluid-width-video-wrapper">
                          <iframe
                            src="https://www.youtube.com/embed/videoseries?list=PLtF55NJwJ_ZNxH9EdctVs25xcVsyECYZS"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            name="actionable-reaction-live"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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

export default withRouter(Live);
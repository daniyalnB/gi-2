import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const RaceWithTheMachinesRecap = () => {
	return (
		<>
		  <SEO
        title="Race With The Machines Recap - Actionable Insights"
        description="Visit some memorable events in the restoration industry, like the time Actionable Insights had the nation's best Xactimate users face off. - (What a great night! At our inaugural sketch-off competition, seven of the nation's best Xactimate users faced off in a dash to sketch a complex portion of)"
        link="race-machines-recap"
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
					<div className="missing_pages">
						<div className="">
              <div className="holder">
								<h2> Race With The Machines Recap </h2>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/04132108/roof_grandamerica.jpg"
                  alt="roof_grandamerica"
                  loading="lazy"
                />
                <p>
                  What a great night! At our inaugural sketch-off competition, seven of the nation’s best Xactimate users faced off in a dash to sketch a complex portion of the Grand America’s roof.
                  Our ambassador, Travis Chancey from Abbott’s Fire &amp; Flood, put together this 60 second highlight video for you to enjoy.
                </p>
							</div>
              <div className="Machines_Recap_Video">
                <iframe
                  src="https://www.youtube.com/embed/EZ4BQptB5PY?iv_load_policy=3&amp;playlist=EZ4BQptB5PY&amp;enablejsapi=1&amp;disablekb=1&amp;autoplay=0&amp;controls=1&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;origin=https%3A%2F%2Fwww.getinsights.org&amp;widgetid=2"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="Machines_Recap_Image">
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/04134946/rwtm_roof3.jpg"
                  alt="rwtm_roof"
                  loading="lazy"
                />
              </div>
              <div className="divider_line">
                <div className="divider_inner divider_line3">
                  <span className="line_text"> Contestants </span>
                </div>
              </div>
              <div className="Contestants">
                <h5> Congratulations to the 2019 Xactimate Ninja, Ben Justesen </h5>
                <div className="row">
                  <div className="col-12">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/05/07130817/ben_400.jpg"
                      alt="ben"
                      loading="lazy"  
                    />
                    <div className="content-title"> Ben Justesen </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-4">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/10/06161735/Khoa1.jpg"
                      alt="Khoa1"
                      loading="lazy"
                    />
                    <div className="content-title"> Khoa Truong </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-4">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/10/06162226/Parker.jpg"
                      alt="Parker"
                      loading="lazy"  
                  />
                    <div className="content-title"> Parker B. Olsen </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-4">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/05/07130128/alena_headshot_2501.jpg"
                      alt="alena_headshot"
                      loading="lazy"
                    />
                    <div className="content-title"> Alena Wilson </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-4">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/10/06162302/Robb.jpg"
                      alt="Robb"
                      loading="lazy"
                    />
                    <div className="content-title"> Robb Harrell </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-4">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/10/06162348/Stephen.jpg"
                      alt="Stephen"
                      loading="lazy"
                    />
                    <div className="content-title"> Stephen Harmon </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-4">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/05/07142028/Chris2_250.jpg"
                      alt="Chris"
                      loading="lazy"
                    />
                    <div className="content-title"> Chris Carman </div>
                  </div>
                </div>
              </div>
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

export default withRouter(RaceWithTheMachinesRecap);
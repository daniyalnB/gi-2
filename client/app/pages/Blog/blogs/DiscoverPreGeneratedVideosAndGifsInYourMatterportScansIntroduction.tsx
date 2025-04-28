import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import { HideOn } from "react-hide-on-scroll";
import blog_image9 from "assets/blog_image9.png";
import blog_image10 from "assets/blog_image10.png";
import blog_gif1 from "assets/blog_gif1.gif";

const DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction = () => {

  const [isScreenHeight, setIsScreenHeight] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const height = window.innerHeight;
      if (height < 786) {
        setIsScreenHeight(true);
      } else {
        setIsScreenHeight(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);
  
	return (
		<>
			<SEO
        title="Increase Your Marketing with Matterport's Auto-Generated Videos and GIFs"
        description="Learn how Matterport empowers you with auto-generated videos and GIFs from your scans to fuel your marketing campaigns, educate your team, and impress stakeholders. Discover Matter Hacks and explore the possibilities today!"
        link="blog/discover-pre-generated-videos-and-gifs-in-your-matterport-scans-introduction"
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
        <HideOn showOnPageInit height={isScreenHeight ? 3200 : 3000}>
          <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#finding-auto-generated-videos-and-gifs">
              —
              <span>
                Finding Auto-Generated
                <br />
                Videos And GIF's
              </span>
            </a>
            <a href="#video-types">
              — <span>Video Types</span>
            </a>
            <a href="#using-auto-generated-videos-and-gifs">
              — 
              <span>
                Using Auto-Generated
                <br />
                Videos And GIF's
              </span>
            </a>
            <a href="#conclusion">
              — <span>Conclusion</span>
            </a>
            <a href="#video">
              — <span>Video</span>
            </a>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="Blog_Page">
						<div className="">
              <div className="holder DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction">
                <div id="introduction">
                  <h2 className="mb-4">
                    Where to Find Auto-Generated Videos and GIFs
                    <br />
                    From Your Matterport Scans
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | September 25th, 2024 </span>
                  <br />
                  <img
                    src={blog_image9}
                    className="mt-3 mb-4"
                  />
                  <div id="finding-auto-generated-videos-and-gifs">
                    <p>
                      Welcome to another blog post by Actionable Insights! Did you know that Matterport automatically generates short videos and GIFs from your Matterport pre- and post-mitigation scans? This Matter Hack allows you to quickly share your scanning assets with your marketing team and other key stakeholders.
                    </p>
                  </div>
                  <div>
                    <h5 className="mt-5 mb-3"> Finding Auto-Generated Videos and GIFs </h5>
                    <p>
                      To access the pre-generated videos and GIFs, visit my.matterport.com and navigate to an uploaded scan on your account. Once there, select the "Downloads" tab, where you'll find three types of videos:
                      <br /><br />
                      <span className="d-inline-block pl-2">
                        1. Long intro (480p MP4)
                        <br />
                        2. Short intro (480p MP4)
                        <br />
                        3. Short intro (320 x 240 GIF)
                      </span>
                      <br /><br />
                      You can download these individually by clicking the download buttons on the top-right corner of the thumbnail or view them directly on the website by clicking the "Play" button.
                    </p>
                    <img
                      src={blog_image10}
                      className="mt-3"
                      style={{ marginBottom: "-100px" }}
                    />
                  </div>
                  <div
                    className="mb-5"
                    id="video-types"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mb-3"> Video Types </h5>
                  <p>
                    1. Long Intro: A 12-second video showcasing the main selling points of the property, such as spacious bedrooms, living rooms, kitchens, and garages.
                    <br /><br />
                    2. Short Intro: A 9-second video primarily focuses on one area, such as the kitchen, followed by a quick dollhouse view of the entire property and ending back in the highlighted area.
                    <br /><br />
                    3. GIF: A small-format file providing a quick glimpse of a specific area, such as the kitchen, followed by a dollhouse view.
                  </p>
                  <img
                    src={blog_gif1}
                    className="mt-3 mb-3"
                  />
                  <div>
                    <p style={{ marginBottom: "-100px" }}> Note that you won’t be able to edit these videos. </p>
                  </div>
                  <div
                    className="mb-5"
                    id="using-auto-generated-videos-and-gifs"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <div id="conclusion">
                    <h5 className="mb-3"> Using Auto-Generated Videos and GIFs </h5>
                    <p> While these videos and GIFs may not directly aid in settling claims, they can be valuable for your marketing efforts, educational and training purposes, and sharing with important stakeholders. Most importantly, they help showcase the excellent work your company does and the range of projects your team can handle. </p>
                  </div>
                  <div>
                    <h5 className="mt-5 mb-3"> Conclusion </h5>
                    <p>
                      These pre-generated videos and GIFs are just one of many untapped Matter Hacks we love talking about — and they always leave a great impression on viewers! Accessing these assets is simple through <a href="https://my.matterport.com/" target="_blank" className="red">my.matterport.com</a>.
                      <br /><br />
                      Stay tuned for more Matter Hacks! If you have any additional questions or comments, feel free to send us a message at <a href="mailto:support@getinsights.org">support@getinsights.org</a>. Until next time, happy scanning!
                    </p>
                  </div>
                  <div id="video">
                    <h5 className="mt-5 mb-4"> Check out the video guide: </h5>
                    <div className="youtube_video_main mb-5">
                      <div className="video">
                        <div className="fluid-width-video-wrapper">
                          <iframe
                            src="https://www.youtube.com/embed/zA-ck1ecb6I"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            name="actionable-xactimate-profile"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <Link to="/demo" target="_blank" className="btn">
                      BOOK A CALL
                    </Link>
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

export default DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction;
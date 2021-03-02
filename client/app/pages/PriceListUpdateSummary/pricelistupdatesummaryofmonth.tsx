import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Comments = React.lazy(() => import("../../components/Comments"));

const pricelistupdatesummaryofmonth = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Suspense
        fallback={
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ margin: "0 auto", height: "100vh" }}
          >
            {" "}
            <div className="loader"></div>
          </div>
        }
      >
        <Navbar />
        <div className="main-container">
          <div className="PLUS_OM">
            <div className="container">
              <div className="holder">
                <h2> Price List Update Summary - January 2020 </h2>
              </div>
              <div className="youtube_video">
                <div className="video">
                  <div className="fluid-width-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/iCsft6QVlXY?start=1"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      name="example"
                    />
                  </div>
                </div>
              </div>
              <div className="changes">
                <h2> January 2020 Price List Changes Report </h2>
                <h3> Major changes and new items added </h3>
                <div className="change_list">
                  <ul>
                    <li>
                      <a
                        href="https://www.youtube.com/embed/iCsft6QVlXY?start=813&autoplay=1"
                        target="example"
                        onClick={scrollToTop}
                      >
                        ELE (Electrical) – Additional items added for metal clad
                        110-volt copper wiring.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/embed/iCsft6QVlXY?start=573&autoplay=1"
                        target="example"
                        onClick={scrollToTop}
                      >
                        EXC (Excavation) – Item added for silt fencing.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/embed/iCsft6QVlXY?start=588&autoplay=1"
                        target="example"
                        onClick={scrollToTop}
                      >
                        FEN (Fencing) – Item added for 2 3/8" diameter metal
                        posts for 7′ to 8′ fencing.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/embed/iCsft6QVlXY?start=75&autoplay=1"
                        target="example"
                        onClick={scrollToTop}
                      >
                        HMR (Hazardous Material Remediation) – Items added for
                        plastic glove bags for hazardous material cleanup.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/embed/iCsft6QVlXY?start=383&autoplay=1"
                        target="example"
                        onClick={scrollToTop}
                      >
                        HVC (Heat, Vent & Air Conditioning) – Item added for a
                        recessed clothes dryer vent box.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/embed/iCsft6QVlXY?start=1650&autoplay=1"
                        target="example"
                        onClick={scrollToTop}
                      >
                        TCR (Trauma/Crime Scene Remediation) – Items added for
                        plastic glove bags for trauma or crime scene cleanup.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/embed/iCsft6QVlXY?start=1075&autoplay=1"
                        target="example"
                        onClick={scrollToTop}
                      >
                        WTR (Water Extraction & Remediation) – Items added for
                        plastic glove bags for hazardous material cleanup.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <Comments />
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default pricelistupdatesummaryofmonth;

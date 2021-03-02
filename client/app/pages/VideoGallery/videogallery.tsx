import { Link } from "react-router-dom";
import React, { Suspense, useState } from "react";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Search = React.lazy(() => import("../../components/Search"));
const VG_Responsive = React.lazy(
  () => import("../VideoGallery/videogallery/videogalleryresponsive")
);

const VG = () => {
  const [active, setActive] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
  });

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
          <div className="Video_Gallery">
            <div className="container">
              <div className="holder">
                <h2> Video Gallery </h2>
                <div className="separator">
                  <Search />
                </div>
              </div>
              <div className="youtube-videos-tabs remove">
                <ul className="tabs">
                  <li
                    className={active.one ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: true,
                        two: false,
                        three: false,
                        four: false,
                        five: false,
                        six: false,
                        seven: false,
                      })
                    }
                  >
                    Academy Insights
                  </li>
                  <li
                    className={active.two ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: true,
                        three: false,
                        four: false,
                        five: false,
                        six: false,
                        seven: false,
                      })
                    }
                  >
                    Price List Update Summary
                  </li>
                  <li
                    className={active.three ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: true,
                        four: false,
                        five: false,
                        six: false,
                        seven: false,
                      })
                    }
                  >
                    Membership Resources
                  </li>
                  <li
                    className={active.four ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: false,
                        four: true,
                        five: false,
                        six: false,
                        seven: false,
                      })
                    }
                  >
                    Matter Hacks
                  </li>
                  <li
                    className={active.five ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: false,
                        four: false,
                        five: true,
                        six: false,
                        seven: false,
                      })
                    }
                  >
                    Xact Hacks
                  </li>
                  <li
                    className={active.six ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: false,
                        four: false,
                        five: false,
                        six: true,
                        seven: false,
                      })
                    }
                  >
                    Hotkey Highlights
                  </li>
                  <li
                    className={active.seven ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: false,
                        four: false,
                        five: false,
                        six: false,
                        seven: true,
                      })
                    }
                  >
                    Equipment Corral
                  </li>
                </ul>
              </div>
              <div className="videos remove">
                <div className="row">
                  <div className="col">
                    <div className="video">
                      <Link to="/videogallerydetail">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220734/matterport_certofied_thmbnail.png" />
                        <h3 className="name">
                          {" "}
                          Actionable Insights Matterport Certification{" "}
                        </h3>
                      </Link>
                      <p className="description">
                        The Actionable Insights Matterport Certification course
                        is an online, self-paced learning management system
                        designed to certify attendees in all things Matterport…
                        <span style={{ color: "#38ADA2", fontWeight: "bold" }}>
                          {" "}
                          Read More{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="video">
                      <Link to="/videogallerydetail">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220519/tools_certified_thumbnail.png" />
                        <h3 className="name">
                          {" "}
                          Actionable Insights Tools Certification{" "}
                        </h3>
                      </Link>
                      <p className="description">
                        The Actionable Insights Tools Certification course is an
                        online, self-paced learning management system designed
                        to certify you in Actionable Insights tools and
                        resources. Becoming AI Tools…
                        <span style={{ color: "#38ADA2", fontWeight: "bold" }}>
                          {" "}
                          Read More{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="video">
                      <Link to="/videogallerydetail">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/08/27030901/AIMC_How-to-purchase.png" />
                        <h3 className="name"> How to Purchase AIMC </h3>
                      </Link>
                      <p className="description">
                        So, you’re ready to start investing in AIMC? The only
                        question left is HOW? Watch this video and we’ll walk
                        you through the process. Are you AI Matterport
                        Certified?
                        <span style={{ color: "#38ADA2", fontWeight: "bold" }}>
                          {" "}
                          Read More{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <VG_Responsive />
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default VG;

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
const SearchVG = React.lazy(() => import("../../components/SearchVideoGallery"));
const VG_Responsive = React.lazy(() => import("../VideoGallery/videogallery/videogalleryresponsive"));
import { GetVideoGallaryItemsCustomer } from "../../../utils/api-routes/api-routes.util";

const VideoGallery = () => {

  const [active, setActive] = useState({
    zero: true,
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
  });

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [ActionableProfile, setActionableProfile] = useState([]);
  const [AcademyInsights, setAcademyInsights] = useState([]);
  const [PriceListUpdateSummary, setPriceListUpdateSummary] = useState([]);
  const [MembershipResources, setMembershipResources] = useState([]);
  const [MatterHacks, setMatterHacks] = useState([]);
  const [XactHacks, setXactHacks] = useState([]);
  const [HotkeyHighlights, setHotkeyHighlights] = useState([]);
  const [EquipmentCorral, setEquipmentCorral] = useState([]);

  useEffect(() => {
    GetVideoGallaryItemsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {   
        const x = response.response.data;
        const publisheddata = x.filter((val) => val.draft === false); 
        setData(publisheddata);
        setActionableProfile(
          x.filter((vg) => vg.catagory === "Actionable Profile" && vg.draft === false)
        );
        setAcademyInsights(
          x.filter((vg) => vg.catagory === "Academy Insights" && vg.draft === false)
        );
        setPriceListUpdateSummary(
          x.filter((vg) => vg.catagory === "Price List Update Summary" && vg.draft === false)
        );
        setMembershipResources(
          x.filter((vg) => vg.catagory === "Membership Resources" && vg.draft === false)
        );
        setMatterHacks(
          x.filter((vg) => vg.catagory === "Matter Hacks" && vg.draft === false)
        );
        setXactHacks(
          x.filter((vg) => vg.catagory === "Xact Hacks" && vg.draft === false)
        );
        setHotkeyHighlights(
          x.filter((vg) => vg.catagory === "Hotkey Highlights" && vg.draft === false)
        );
        setEquipmentCorral(
          x.filter((vg) => vg.catagory === "Equipment Corral" && vg.draft === false)
        );
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  return (
    <>
      <SEO
        title="Video Gallery by Actionable Insights | Xactimate Matterport"
        description="An archive of Actionable Insights videos including Xactimate tips, Matterport tricks, Xactimate price list updates, & more informative content accessible for free."
        link="video-gallery"
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
          <div className="Video_Gallery">
            <div className="">
              <div className="holder">
                <h2> Video Gallery </h2>
                <div className="separator">
                  <SearchVG
                    data={data}
                  />
                </div>
              </div>
              <div className="youtube-videos-tabs remove">
                <ul className="tabs">
                  <li
                    className={active.zero ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: true,
                        one: false,
                        two: false,
                        three: false,
                        four: false,
                        five: false,
                        six: false,
                        seven: false,
                      })
                    }
                  >
                    Actionable Profile
                  </li>
                  <li
                    className={active.one ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: false,
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
                    Price List Update Summary
                  </li>
                  <li
                    className={active.two ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: false,
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
                    Matter Hacks
                  </li>
                  <li
                    className={active.three ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: false,
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
                    Xact Hacks
                  </li>
                  <li
                    className={active.four ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: false,
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
                    Membership Resources
                  </li>
                  <li
                    className={active.five ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: false,
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
                    Academy Insights
                  </li>
                  <li
                    className={active.six ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: false,
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
                  {/* <li
                    className={active.seven ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        zero: false,
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
                  </li> */}
                </ul>
              </div>
              <div className="videos remove">
                {!loading && (
                  <>
                    <div className="row">
                      {active.zero && (
                        <>
                          {ActionableProfile.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {active.one && (
                        <>
                          {PriceListUpdateSummary.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {active.two && (
                        <>
                          {MatterHacks.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {active.three && (
                        <>
                          {XactHacks.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {active.four && (
                        <>
                          {MembershipResources.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {active.five && (
                        <>
                          {AcademyInsights.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {active.six && (
                        <>
                          {HotkeyHighlights.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {/* {active.seven && (
                        <>
                          {EquipmentCorral.map((val, key) => {
                            return (
                              <div className="col-md-4" key={key}>
                                <div className="video">
                                  <Link to={`/video-gallery/${val.permalink}`}>
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                      loading="lazy"
                                    />
                                    <h3 className="name">
                                      {val.title}
                                    </h3>
                                  </Link>
                                  <div className="description">
                                    {val.featureddescription.substring(0, 200)}
                                    ...{" "}
                                    <Link to={`/video-gallery/${val.permalink}`}>
                                      Read More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )} */}
                    </div>
                  </>
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
              </div>
              <VG_Responsive
                ActionableProfile={ActionableProfile}
                AcademyInsights={AcademyInsights}
                PriceListUpdateSummary={PriceListUpdateSummary}
                MembershipResources={MembershipResources}
                MatterHacks={MatterHacks}
                XactHacks={XactHacks}
                HotkeyHighlights={HotkeyHighlights}
                EquipmentCorral={EquipmentCorral}
              />
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

export default withRouter(VideoGallery);
import React, { Suspense, useState, useEffect } from "react";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const SearchBG = React.lazy(() => import("../../components/SearchBlog"));
const BG_Responsive = React.lazy(() => import("../Blog/blogresponsive"));
import moment from "moment";
import { GetBlogsCustomer } from "../../../utils/api-routes/api-routes.util";

const Blog = () => {

  const [active, setActive] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    all: true,
  });

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [ActionableProfile, setActionableProfile] = useState([]);
  const [Resources, setResources] = useState([]);
  const [MatterHacks, setMatterHacks] = useState([]);
  const [XactHacks, setXactHacks] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);

  useEffect(() => {
    GetBlogsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {   
        const x = response.response.data;
        const lb = x.reduce((latest, current) => {
          return current.createdAt > latest.createdAt ? current : latest;
        }, x[0]);
        setLatestBlog(lb);
        setData(x);
        setActionableProfile(
          x.filter((vg) => vg.category === "Actionable Profile")
        );
        setResources(
          x.filter((vg) => vg.category === "Resources")
        );
        setMatterHacks(
          x.filter((vg) => vg.category === "Matter Hacks")
        );
        setXactHacks(
          x.filter((vg) => vg.category === "Xact Hacks")
        );
        const script = document.createElement("script");
        script.src = "https://js.hsforms.net/forms/embed/v2.js";
        document.body.appendChild(script);
        
        script.addEventListener("load", () => {
          if(window.hbspt) {
            window.hbspt.forms.create({
              portalId: "3936526",
              formId: "28cf6aab-c770-41bf-80ce-80238cf7ad40",
              target: "#hubspotFormLatestNews",
            });
          }
          setLoading(false);
        });
      } else {
        alert("error");
      }
    });
  }, []);

  useEffect(() => {
    if (active.all && window.hbspt && !loading) {
      window.hbspt.forms.create({
        portalId: "3936526",
        formId: "28cf6aab-c770-41bf-80ce-80238cf7ad40",
        target: "#hubspotFormLatestNews",
      });
    }
  }, [active.all, loading]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);

  return (
    <>
      <SEO
        title="Blog - Actionable Insights"
        description="Looking for the latest education tools and resources for the property insurance industry? Check out our Actionable Insights blog for valuable training tips, industry trends, and best practices to help you stay ahead of the curve. Learn how to leverage technology like Matterport and Xactimate to become more accurate and efficient. Browse our comprehensive blog library today! Gain a competitive edge in the property insurance industry with our expert tips and tricks."
        link="blog"
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
                <h2> Blog </h2>
                <div className="separator">
                  <SearchBG
                    data={data}
                  />
                </div>
              </div>
              <div className="youtube-videos-tabs remove">
                <ul className="tabs">
                  <li
                    className={active.all ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: false,
                        four: false,
                        all: true,
                      })
                    }
                  >
                    All Blogs
                  </li>
                  <li
                    className={active.one ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: true,
                        two: false,
                        three: false,
                        four: false,
                        all: false,
                      })
                    }
                  >
                    Actionable Profile
                  </li>
                  <li
                    className={active.two ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: true,
                        three: false,
                        four: false,
                        all: false,
                      })
                    }
                  >
                    Resources
                  </li>
                  <li
                    className={active.three ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: true,
                        four: false,
                        all: false,
                      })
                    }
                  >
                    Matter Hacks
                  </li>
                  <li
                    className={active.four ? "item active" : "item"}
                    onClick={() =>
                      setActive({
                        one: false,
                        two: false,
                        three: false,
                        four: true,
                        all: false,
                      })
                    }
                  >
                    Xact Hacks
                  </li>
                </ul>
              </div>
              <div className="videos remove">
                {!loading && (
                  <>
                    <div className="row">
                      {active.all && (
                        <>
                          <div className="col">
                            <div className="all-blogs">
                              <h1> The Actionable Blog </h1>
                              <p> Articles on Actionable Xact Profile, AIMC, Matter Hacks, and more </p>
                              <hr />
                              <div className="latest-blog">
                                <h2> Latest Blog </h2>
                                <a href={latestBlog.hubspotLink} target="_blank">
                                  <div className="row">
                                    <div className="col-xl-8 col-md-12">
                                      <img
                                        src={latestBlog.featuredImage}
                                        alt={latestBlog.title}
                                        loading="lazy"
                                      />
                                    </div>
                                    <div className="col-xl-4 col-md-12">
                                      <h1> {latestBlog.title} </h1>
                                      <h3> {moment(latestBlog.createdAt).format("MMMM DD, YYYY")} </h3>
                                      <p>
                                        {latestBlog.description.substring(0, 200)}
                                        ...{" "}
                                        <span>Read More</span>
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              </div>
                              {XactHacks.length > 0 && (
                                <>
                                  <hr />
                                  <h2 className="pt-2"> Latest Actionable Xact Blogs </h2>
                                  <div className="row">
                                    {XactHacks.map((val, key) => {
                                      return (
                                        <div className="col-md-4" key={key}>
                                          <div className="video">
                                            <a href={`${val.hubspotLink}`} target="_blank">
                                              <img
                                                src={val.featuredImage}
                                                alt={val.title}
                                                loading="lazy"
                                              />
                                              <h3 className="name">
                                                {val.title}
                                              </h3>
                                              <h2 className="date">
                                                {moment(val.createdAt).format("MMMM DD, YYYY")} 
                                              </h2>
                                            </a>
                                            <div className="description">
                                              {val.description.substring(0, 200)}
                                              ...{" "}
                                              <a href={`${val.hubspotLink}`} target="_blank">
                                                Read More
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                              {!isSmallScreen && (
                                <div className="latest-news">
                                  <hr />
                                  <div className="row pt-4 pb-4">
                                    <div className="col-6">
                                      <h4> Subscribe to get update about our latest news in your email. </h4>
                                    </div>
                                    <div className="col-6">
                                      <div id="hubspotFormLatestNews"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {ActionableProfile.length > 0 && (
                                <>
                                  <hr />
                                  <h2 className="pt-2"> Latest Actionable Xactimate Profile Blogs </h2>
                                  <div className="row">
                                    {ActionableProfile.map((val, key) => {
                                      return (
                                        <div className="col-md-6" key={key}>
                                          <div className="video">
                                            <a href={`${val.hubspotLink}`} target="_blank">
                                              <img
                                                src={val.featuredImage}
                                                alt={val.title}
                                                loading="lazy"
                                              />
                                              <h3 className="name">
                                                {val.title}
                                              </h3>
                                              <h2 className="date">
                                                {moment(val.createdAt).format("MMMM DD, YYYY")} 
                                              </h2>
                                            </a>
                                            <div className="description">
                                              {val.description.substring(0, 200)}
                                              ...{" "}
                                              <a href={`${val.hubspotLink}`} target="_blank">
                                                Read More
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                              {MatterHacks.length > 0 && (
                                <>
                                  <hr />
                                  <h2 className="pt-2"> Latest Matter Hacks Blogs </h2>
                                  <div className="row">
                                    {MatterHacks.map((val, key) => {
                                      return (
                                        <div className="col-md-4" key={key}>
                                          <div className="video">
                                            <a href={`${val.hubspotLink}`} target="_blank">
                                              <img
                                                src={val.featuredImage}
                                                alt={val.title}
                                                loading="lazy"
                                              />
                                              <h3 className="name">
                                                {val.title}
                                              </h3>
                                              <h2 className="date">
                                                {moment(val.createdAt).format("MMMM DD, YYYY")} 
                                              </h2>
                                            </a>
                                            <div className="description">
                                              {val.description.substring(0, 200)}
                                              ...{" "}
                                              <a href={`${val.hubspotLink}`} target="_blank">
                                                Read More
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                              {Resources.length > 0 && (
                                <>
                                  <hr />
                                  <h2 className="pt-2"> Latest Resources Blogs </h2>
                                  <div className="row">
                                    {Resources.map((val, key) => {
                                      return (
                                        <div className="col-md-6" key={key}>
                                          <div className="video">
                                            <a href={`${val.hubspotLink}`} target="_blank">
                                              <img
                                                src={val.featuredImage}
                                                alt={val.title}
                                                loading="lazy"
                                              />
                                              <h3 className="name">
                                                {val.title}
                                              </h3>
                                              <h2 className="date">
                                                {moment(val.createdAt).format("MMMM DD, YYYY")} 
                                              </h2>
                                            </a>
                                            <div className="description">
                                              {val.description.substring(0, 200)}
                                              ...{" "}
                                              <a href={`${val.hubspotLink}`} target="_blank">
                                                Read More
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {active.one && (
                        <>
                          {ActionableProfile.length > 0 ? (
                            <>
                              {ActionableProfile.map((val, key) => {
                                return (
                                  <div className="col-md-4" key={key}>
                                    <div className="video">
                                      <a href={`${val.hubspotLink}`} target="_blank">
                                        <img
                                          src={val.featuredImage}
                                          alt={val.title}
                                          loading="lazy"
                                        />
                                        <h3 className="name">
                                          {val.title}
                                        </h3>
                                      </a>
                                      <div className="description">
                                        {val.description.substring(0, 200)}
                                        ...{" "}
                                        <a href={`${val.hubspotLink}`} target="_blank">
                                          Read More
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="col">
                              <div className="no-result">
                                <hr />
                                <h3> No Posts Yet </h3>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {active.two && (
                        <>
                          {Resources.length > 0 ? (
                            <>
                              {Resources.map((val, key) => {
                                return (
                                  <div className="col-md-4" key={key}>
                                    <div className="video">
                                      <a href={`${val.hubspotLink}`} target="_blank">
                                        <img
                                          src={val.featuredImage}
                                          alt={val.title}
                                          loading="lazy"
                                        />
                                        <h3 className="name">
                                          {val.title}
                                        </h3>
                                      </a>
                                      <div className="description">
                                        {val.description.substring(0, 200)}
                                        ...{" "}
                                        <a href={`${val.hubspotLink}`} target="_blank">
                                          Read More
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="col">
                              <div className="no-result">
                                <hr />
                                <h3> No Posts Yet </h3>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {active.three && (
                        <>
                          {MatterHacks.length > 0 ? (
                            <>
                              {MatterHacks.map((val, key) => {
                                return (
                                  <div className="col-md-4" key={key}>
                                    <div className="video">
                                      <a href={`${val.hubspotLink}`} target="_blank">
                                        <img
                                          src={val.featuredImage}
                                          alt={val.title}
                                          loading="lazy"
                                        />
                                        <h3 className="name">
                                          {val.title}
                                        </h3>
                                      </a>
                                      <div className="description">
                                        {val.description.substring(0, 200)}
                                        ...{" "}
                                        <a href={`${val.hubspotLink}`} target="_blank">
                                          Read More
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="col">
                              <div className="no-result">
                                <hr />
                                <h3> No Posts Yet </h3>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {active.four && (
                        <>
                          {XactHacks.length > 0 ? (
                            <>
                              {XactHacks.map((val, key) => {
                                return (
                                  <div className="col-md-4" key={key}>
                                    <div className="video">
                                      <a href={`${val.hubspotLink}`} target="_blank">
                                        <img
                                          src={val.featuredImage}
                                          alt={val.title}
                                          loading="lazy"
                                        />
                                        <h3 className="name">
                                          {val.title}
                                        </h3>
                                      </a>
                                      <div className="description">
                                        {val.description.substring(0, 200)}
                                        ...{" "}
                                        <a href={`${val.hubspotLink}`} target="_blank">
                                          Read More
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="col">
                              <div className="no-result">
                                <hr />
                                <h3> No Posts Yet </h3>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
              </div>
              {isSmallScreen && (
                <BG_Responsive
                  ActionableProfile={ActionableProfile}
                  Resources={Resources}
                  MatterHacks={MatterHacks}
                  XactHacks={XactHacks}
                  latestBlog={latestBlog}
                  loading={loading}
                />
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

export default Blog;
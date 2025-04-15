import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import ActionableInsightsDemo from "../components/ActionableInsightsDemo";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import right from "assets/ArrowRight.svg";
import Actionable_Profile from "assets/Actionable_Profile_Demo.png";
import Insight_Sheet_Database from "assets/Insight_Sheet_Database_Demo.png";
import COLI_Database from "assets/COLI_Database_Demo.png";
import Price_List_Update_Summary from "assets/Price_List_Update_Summary_Demo.png";
import AIMC_CE_Crests from "assets/AIMC_CE_Crests_Demo.png";
import Xact_Hacks from "assets/Xact_Hacks_Demo.png";
import Matter_Hacks from "assets/Matter_Hacks_Demo.png";
import Hotkey_Highlights from "assets/Hotkey_Highlights_Demo.png";
import Xactimate_Ninjas from "assets/Xactimate_Ninjas_Demo.png";
import Matterport_Ninjas from "assets/Matterport_Ninjas_Demo.png";
import The_Insighter_Report from "assets/The_Insighter_Report_Demo.png";
import Xactimate_White_Paper from "assets/Xactimate_White_Paper_Demo.png";
import Xactimate_Sketch_Gallery from "assets/Xactimate_Sketch_Gallery_Demo.png";

const Demo = () => {
  return (
    <>
      <SEO
        title="Demo - Actionable Insights"
        description="Get a glimpse of how Actionable Insights enables contractors and adjusters by providing resources and digital assets they can leverage."
        link="demo"
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
        <ActionableInsightsDemo />
        <div className="main-container">
          <div className="Demo">
            <div className="page-links">
              <p> If you’d like a demo on any/all of the below resources, choose the best date and time on the calendar above to schedule a call! </p>
              <div className="Tabs">
                <a
                  href="/actionable-xactimate-profile"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Actionable_Profile}
                          alt="Actionable_Profile"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/actionable-xactimate-profile"
                          target="_blank"
                        >
                          Actionable Profile{" "}
                        </a>
                        – Elevate your Xactimate profile. Industry standard profile settings that help create accurate estimates that can be approved without hesitation.
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/insight-sheets"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Insight_Sheet_Database}
                          alt="Insight_Sheet_Database"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/insight-sheets"
                          target="_blank"
                        >
                          Insight Sheet Database{" "}
                        </a>
                        – 3700+ pages of Xactimate invoicing templates
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/commonly-overlooked-line-items"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={COLI_Database}
                          alt="COLI_Database"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/commonly-overlooked-line-items"
                          target="_blank"
                        >
                          Commonly Overlooked Line Item Database{" "}
                        </a>
                        – 200+ of often warranted but overlooked line items
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/resources/price-list-update-summary"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Price_List_Update_Summary}
                          alt="Price_List_Update_Summary"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/resources/price-list-update-summary"
                          target="_blank"
                        >
                          Price List Update Summary{" "}
                        </a>
                        – Monthly review of what new Xact line items came out and how to use them
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/aimc"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={AIMC_CE_Crests}
                          alt="AIMC_CE_Crests"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/aimc"
                          target="_blank"
                        >
                          AI Matterport Certified Course{" "}
                        </a>
                        – Online, self-paced certification course to leverage Matterport within the property insurance ecosystem
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/video-gallery"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Xact_Hacks}
                          alt="Xact_Hacks"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/video-gallery"
                          target="_blank"
                        >
                          Xact Hacks {" "}
                        </a>
                        – Video Series | Exploring the Nuances of Xactimate
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/video-gallery"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Matter_Hacks}
                          alt="Matter_Hacks"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/video-gallery"
                          target="_blank"
                        >
                          Matter Hacks{" "}
                        </a>
                        – Video Series | Adapting to the Future of Claims Settlement
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/video-gallery"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Hotkey_Highlights}
                          alt="Hotkey_Highlights"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/video-gallery"
                          target="_blank"
                        >
                          Hotkey Highlights{" "}
                        </a>
                        – Video Series | Master Efficiency within Xactimate
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="https://www.facebook.com/groups/XactimateNinjas"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Xactimate_Ninjas}
                          alt="Xactimate_Ninjas"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="https://www.facebook.com/groups/XactimateNinjas"
                          target="_blank"
                        >
                          Xactimate Ninjas{" "}
                        </a>
                        – Facebook Group to have Xactimate questions answered
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="https://www.facebook.com/groups/MatterportNinjas"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={Matterport_Ninjas}
                          alt="Matterport_Ninjas"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="https://www.facebook.com/groups/MatterportNinjas"
                          target="_blank"
                        >
                          Matterport Ninjas{" "}
                        </a>
                        – Facebook Group to have Matterport questions answered
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/resources/insighter-report"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          src={The_Insighter_Report}
                          alt="The_Insighter_Report"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/resources/insighter-report"
                          target="_blank"
                        >
                          The Insighter Report{" "}
                        </a>
                        – Publications from some of the brightest minds in restoration
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/resources/insighter-report/xactimate-history-future"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          className="img-alt"
                          src={Xactimate_White_Paper}
                          alt="Xactimate_White_Paper"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/resources/insighter-report/xactimate-history-future"
                          target="_blank"
                        >
                          Xactimate White Paper{" "}
                        </a>
                        – a must-read!
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
              </div>
              <div className="Tabs">
                <a
                  href="/online-sketch-gallery"
                  target="_blank"
                >
                  <div className="row">
                    <div className="col-10 data-sec">
                      <div className="image">
                        <img
                          className="img-alt"
                          src={Xactimate_Sketch_Gallery}
                          alt="Xactimate_Sketch_Gallery"
                        />
                      </div>
                      <div className="data">
                        <a
                          href="/online-sketch-gallery"
                          target="_blank"
                        >
                          Xactimate Sketch Gallery{" "}
                        </a>
                        – 100+ Xactimate Sketch templates ready for your next estimate.
                      </div>
                    </div>
                    <div className="col-2 link-sec">
                      <img src={right} />
                    </div>
                  </div>
                </a>
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

export default withRouter(Demo);
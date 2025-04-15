import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Mitigation_Manual from "assets/Mitigation_Manual.webp";
import Repair_Manual from "assets/Repair_Manual.webp";

const ManualSection = () => {
  return (
    <>
      <div className="Manual_section">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="manual">
                <Link
                  to="/code-of-ethics"
                  className="links"
                >
                  ACTIONABLE INSIGHTS
                  <br />
                  CODE OF ETHICS
                </Link>
                <div className="text-1">
                  <p>I care deeply about the property insurance ecosystem</p>
                  <p>
                    I intend to be a good steward of the restoration ecosystem
                  </p>
                  <p>
                    I intend to give more to the restoration ecosystem than I
                    take away
                  </p>
                  <p>
                    I intend to strive for mastery, consistently choosing to
                    participate in education and training events
                  </p>
                  <p>
                    I agree to be polite, be professional and have a plan to
                    thoughtfully justify every position that I take
                  </p>
                  <p>
                    I agree to champion an environment of reasonable profits and
                    well managed claims
                  </p>
                  <p>
                    I am here to learn and contribute in a meaningful way, not
                    to carelessly market or poach talent
                  </p>
                </div>
              </div>
              <div className="manual Top">
                <Link
                  to="/actionable-insights-mitigation-and-repair-manual"
                  className="links"
                >
                  SO YOU WANT IT IN
                  <br />
                  YOUR HANDS
                </Link>
                <div className="text-1">
                  <p>
                    Purchase a thoughtful compilation of all our Insights Sheets
                    in bound text.
                  </p>
                  <div className="BTN">
                    <Link to="/actionable-insights-mitigation-and-repair-manual" className="btn btn_1">
                      Umpire’s Mitigation Manual
                    </Link>
                    <Link to="/actionable-insights-mitigation-and-repair-manual" className="btn">
                      Umpire’s Repair Manual
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="manual">
                <Link
                  to="/transcending-the-restoration-paradox"
                  className="links"
                >
                  TRANSCENDING THE
                  <br />
                  RESTORATION PARADOX
                </Link>
                <div className="text-1 text-2">
                  <p>
                    If contractors generate sloppy, overpriced Xactimate sheets,
                    then premiums skyrocket and claims processing becomes
                    arduous for all materially interested parties. Conversely,
                    if carriers are unwilling to reimburse their policyholders
                    for reasonably incurred costs, then financially sound,
                    capable contractors who can warranty their work will become
                    scarce.
                  </p>
                </div>
              </div>
              <div className="manual-picture">
                <div className="carousel-border">
                  <Carousel controls={false} interval={5000} indicators={false} pause={false}>
                    <Carousel.Item>
                      <Link to="/actionable-insights-mitigation-and-repair-manual">
                        <div>
                          <img
                            src={Repair_Manual}
                            alt="Repair_Manual"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Link to="/actionable-insights-mitigation-and-repair-manual">
                        <div>
                          <img
                            src={Mitigation_Manual}
                            alt="Mitigation_Manual"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManualSection;
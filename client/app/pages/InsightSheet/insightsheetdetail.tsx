import React, { Suspense } from "react";
import { Link } from "react-router-dom";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Search = React.lazy(() => import("../../components/Search"));
const StarRatingDemo = React.lazy(() => import("../../components/StarRating"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Comments = React.lazy(() => import("../../components/Comments"));
import detail from "assets/detailpic.jpg";
import xact from "assets/xact.png";

const ISDetail = () => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
        }
      >
        <Navbar />
        <div className="main-container">
          <div className="ISDetail_page">
            <div className="container">
              <div className="holder">
                <h2> Insight Sheets </h2>
                <div className="separator">
                  <Search />
                  <div className="detail">
                    <h2> Door Jamb Retrofit </h2>
                    <div className="row">
                      <div className="col-lg-7 image-section">
                        <div
                          style={{
                            backgroundColor: "#000",
                            borderRadius: "10px",
                          }}
                        >
                          <img src={detail} />
                        </div>
                        <Link to="/login">
                          <button className="btn"> Sign In </button>
                        </Link>
                      </div>
                      <div className="col-lg-5 data-section">
                        <div className="data">
                          <span className="heading"> Category: </span>
                          <span className="value"> Repair </span>
                        </div>
                        <div className="data">
                          <span className="heading">
                            {" "}
                            Principal Author(s):{" "}
                          </span>
                          <span className="value">
                            {" "}
                            Mark Whatley, Seth Harrison{" "}
                          </span>
                        </div>
                        <div className="data">
                          <span className="heading"> AI Board Approval: </span>
                          <span className="value"> 06/14/2017 </span>
                        </div>
                        <div className="data">
                          <span className="heading"> Last Update: </span>
                          <span className="value"> 02/02/2020 </span>
                        </div>
                        <div className="data">
                          <span className="heading"> Tags: </span>
                          <span className="value">
                            {" "}
                            Angle Stop, Backsplash, Cabinet, Caulk.{" "}
                          </span>
                        </div>
                        <div>
                          <StarRatingDemo />
                        </div>
                        <div className="MACRO">
                          <Link to="/product" className="btn">
                            Purchase MACRO*
                          </Link>
                          <br />
                          <div className="Subscription">
                            <span style={{ color: "#B8B8B8" }}>
                              Purchasing Requires
                            </span>
                            <span
                              style={{ color: "#38ADA2", marginLeft: "0.3rem" }}
                            >
                              Plus Plan Subscription
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    <h2> Description </h2>
                    <div className="row">
                      <div className="col word">
                        <p>
                          This was a residential single story (Class 3 | Cat 1)
                          water loss that transitioned into a Cat 3. The
                          property owners were out of the home on holiday, and
                          the water ran for days unencumbered. It was eventually
                          shut off by the utility company after an observant
                          neighbor noticed water pouring out over the front door
                          threshold. The property had a tankless water heater
                          installed. The bathroom sink hot water supply line
                          suffered a catastrophic failure and the fact that it
                          was spraying scalding hot water everywhere made the
                          situation infinitely worse because it essentially
                          turned the home into a sauna. After engaging the
                          project, the restoration contractor called for an
                          Industrial Hygienist to write a scope of work and
                          conduct an asbestos/lead survey. The texture in the
                          drywall came back hot for 3% chrysotile asbestos. As
                          such, the non-salvageable drywall was abated 4′ up the
                          perimeter floor, and the drywall above the 4′ flood
                          cut was micro-cleaned. The R13 insulation would be
                          removed all the way up the wall and the interior of
                          the property would undergo an antimicrobial fogging
                          treatment.
                        </p>
                        <br />
                        <p>
                          The affected flooring, drywall, and R13 were removed
                          by the environmental abatement company and these
                          activities reside beyond the scope of this Insight
                          Sheet©.
                        </p>
                        <br />
                        <p>Property Built: 1981</p>
                        <br />
                        <p>Room Dimensions: 12′ x 12′ x 8’</p>
                        <br />
                        <p>
                          This Insight Sheet© exists to clarify how one might
                          invoice for microbial remediation. This does not seek
                          to include or make concessions for all equipment
                          and/or activities as it relates to a loss of this
                          nature.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="xact">
                    <h2> As Seen In Xact </h2>
                    <div className="row xact-image-section">
                      <div className="col">
                        <div className="image-bg">
                          <div style={{ backgroundColor: "#000" }}>
                            <img src={xact} />
                            <Link to="/login">
                              <button className="btn"> Sign In </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comments">
                    <Comments />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default ISDetail;

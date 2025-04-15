import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import { GetAllInsightSheetsCustomer } from "../../../../utils/api-routes/api-routes.util";
import IST_Banner from "assets/IST_Banner.webp";

const TemplatesSection = () => {

  const [loading, setLoading] = useState(true);

  const [mitigation, setMitigation] = useState([]);
  const [repair, setRepair] = useState([]);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    GetAllInsightSheetsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter((val) => val.draft === false);
        setMitigation(shuffleArray(x.filter((val) => val.catagory == "Mitigation")));
        setRepair(shuffleArray(x.filter((val) => val.catagory == "Repair")));
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  return (
    <>
      <div className="Templates_section">
        <div className="container">
          <h2> 3700+ Pages of Xactimate invoicing Templates </h2>
          <br />
          <p>
            {" "}
            We created this database to clarify what line items should be used
            in a restoration claims environment. Write your{" "}
          </p>
          <p>
            {" "}
            Xactimate estimates faster and in a more informed manner – all
            materially interested parties will thank you.{" "}
          </p>
          {!loading && (
            <>
              <div className="row sub_section">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                  <div className="row section1">
                    <div className="col-12">
                      <h4> Mitigation Insight Sheets </h4>
                      <hr />
                      {mitigation.slice(0, 1).map((val) => (
                        <div className="section1_1">
                          <div className="image-link">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              <img
                                src={val.featureimage}
                                alt={val.title}
                                width={100}
                                height={100}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <div className="mg">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              {val.title}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-12">
                      {mitigation.slice(1, 2).map((val) => (
                        <div className="section1_1">
                          <div className="image-link">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              <img
                                src={val.featureimage}
                                alt={val.title}
                                width={100}
                                height={100}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <div className="mg">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              {val.title}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="row section2">
                    <div className="col">
                      <div className="section2_1">
                        <h4> Insight Sheet Tutorial </h4>
                        <hr />
                      </div>
                      <div className="section2_2">
                        <div className="image-link">
                          <Link to="/insight-sheet-tutorial">
                            <img
                              src={IST_Banner}
                              alt="insight-sheet-tutorial"
                              width={100}
                              height={100}
                              loading="lazy" 
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                  <div className="row section3">
                    <div className="col-12">
                      <h4> Repair Insight Sheets </h4>
                      <hr />
                      {repair.slice(0, 1).map((val) => ( 
                        <div className="section3_3">
                          <div className="image-link">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              <img
                                src={val.featureimage}
                                alt={val.title}
                                width={100}
                                height={100}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <div className="mg">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              {val.title}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-12">
                      {repair.slice(1, 2).map((val) => ( 
                        <div className="section3_3">
                          <div className="image-link">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              <img
                                src={val.featureimage}
                                alt={val.title}
                                width={100}
                                height={100}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <div className="mg">
                            <Link to={`/insight-sheets/${val.permalink}`}>
                              {val.title}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="Actionable_Profile">
                <h3> Do you know the Actionable Profile? </h3>
                <span> Explore our live estimating guidance while you write your scope in Xactimate </span>
                <br /><br />
                <Link
                  to="/actionable-xactimate-profile"
                  target="_blank"
                  className="btn"
                >
                  Learn more
                </Link>
              </div>
            </>
          )}
          {loading && (
            <div className="loader-inner">
              <LottieLoader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplatesSection;
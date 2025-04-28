import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchInsightSheets } from "../../utils/api-routes/api-routes.util";
import history from "../../utils/history";
import queryString from "query-string";
import search1 from "assets/search1.png";
import search2 from "assets/search2.png";
import cancel from "assets/Cancel.svg";

const Search = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [filter, setFilter] = useState(false);

  const [searchfield, setSearchField] = useState("");

  const [searchPage, setSearchPage] = useState("");

  useEffect(() => {
    setSearchPage(props.sfield);
  }, [props]);

  const [mitigation, setMitigation] = useState(true);
  const [repair, setRepair] = useState(true);

  useEffect(() => {
    if (!location.state) {
      setMitigation(true);
      setRepair(true);
    } else {
      setMitigation(location.state.mitigation);
      setRepair(location.state.repair);
    }
  }, [location]);

  const [limit, setLimit] = useState(5);

  const [data, setData] = useState([]);
  const [insightSheets, setInsightSheets] = useState([]);
  const [mitiagtionData, setMitiagtionData] = useState([]);
  const [repairData, setRepairData] = useState([]);

  useEffect(() => {
    const x = props.data;
    setData(x);
  }, [props]);

  const SearchKeyword = (e) => {
    setLoadingSearch(true);

    const payload = {
      keywords: e,
    };

    const stringified = queryString.stringify(payload);

    SearchInsightSheets(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        const mergedData = merge(x, data);
        setInsightSheets(mergedData);
        const y = mergedData.filter(
          (insightsheet) => insightsheet.catagory === "Mitigation"
        );
        setMitiagtionData(y);
        const z = mergedData.filter(
          (insightsheet) => insightsheet.catagory === "Repair"
        );
        setRepairData(z);
        setLoadingSearch(false);
      } else {
        setLoadingSearch(false);
      }
    });
  };

  const merge = (arr1, arr2) => {
    const temp = [];
    arr1.forEach((x) => {
      arr2.forEach((y) => {
        if (x.id === y.id) {
          temp.push({ ...x, ...y });
        }
      });
    });
    return temp;
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      if (searchPage == undefined || searchPage == "") {
      } else {
        navigate(`/s/${
            searchfield
              ? searchfield.replace(/\//gi, "%2F")
              : searchPage.replace(/\//gi, "%2F")
          }`, {
          state: {
            mitigation: mitigation,
            repair: repair,
          }
        });
        setSearchField("");
      }
    }
  };

  // const newS = newArr.filter((val) => {
  // 	if (val.title !== "" && val.catagory == "Repair" && repair == true && mitigation == false) {
  // 		return val
  // 	} else if (val.title !== "" && val.catagory == "Mitigation" && mitigation == true && repair == false) {
  // 		return val
  // 	} else if (val.title !== "" && mitigation == true && repair == true) {
  // 		return val
  // 	}
  // })
  // console.log(newS, "newS");
  // console.log(newArr.length);
  // const l = newArr.length
  // const [a, seta] = useState(l);
  // console.log(l, "L");

  return (
    <>
      <div className="main-search">
        <div className="form-group nogroup">
          <div className="input-group">
            {/* <img
              className="input_icon"
              src={search1}
              alt="search1"
              onClick={() => setFilter(!filter)}
            /> */}
            <input
              type="text"
              className="form-control"
              placeholder="Search by keywords"
              required
              readOnly={data.length == 0 ? true : false}
              value={
                location.pathname == "/insight-sheets"
                  ? searchfield
                  : searchPage
              }
              onChange={(e) => {
                setSearchField(e.target.value);
                setSearchPage(e.target.value);
                SearchKeyword(e.target.value);
              }}
              onKeyPress={(e) => handleKeypress(e)}
            />
            {loadingSearch && (
              <div style={{ fontSize: "35px", color: "#DB422D" }}>
                <i className="fas fa-circle-notch fa-spin"></i>
              </div>
            )}
            {searchfield !== "" ? (
              <img
                style={{ width: "20px", height: "20px", marginTop: "15px" }}
                className="input_icon"
                src={cancel}
                alt="cancel"
                onClick={() => {
                  setSearchField("");
                  setSearchPage("");
                }}
              />
            ) : (
              ""
            )}
            {searchPage == undefined || searchPage == "" ? (
              <img className="input_icon" src={search2} alt="search2" />
            ) : (
              <Link
                to={`/s/${
                  searchfield
                    ? searchfield.replace(/\//gi, "%2F")
                    : searchPage.replace(/\//gi, "%2F")
                }`}
                state={{
                  mitigation: mitigation,
                  repair: repair,
                }}
              >
                <img
                  className="input_icon"
                  src={search2}
                  alt="search2"
                  onClick={() => setSearchField("")}
                />
              </Link>
            )}
          </div>
        </div>
        {/* <div className={filter ? "active" : "dropdown-content"}>
          <h5> Filter by Categories </h5>
          <div className="filter">
            <input type="checkbox" id="s1" checked={mitigation} />
            <label htmlFor="s1" onClick={() => setMitigation(!mitigation)}>
              Mitigation
            </label>
          </div>
          <hr />
          <div className="filter">
            <input type="checkbox" id="s2" checked={repair} />
            <label htmlFor="s2" onClick={() => setRepair(!repair)}>
              Repair
            </label>
          </div>
        </div> */}
        {searchfield !== "" ? (
          <>
            <div className="col-12" style={{ padding: "0px" }}>
              <div className="active_search">
                {mitigation && repair ? (
                  <>
                    {insightSheets.length <= 0 ? (
                      <div className="no-result">
                        <h3> No results! </h3>
                      </div>
                    ) : (
                      <div className="insightsheets">
                        {insightSheets.map((val, key) => {
                          return (
                            <div key={val.id}>
                              <Link
                                to={`/insight-sheets/${val.permalink}`}
                                target="_blank"
                              >
                                <div className="row">
                                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4">
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                    />
                                  </div>
                                  <div className="col-xl-10 col-lg-10 col-md-8 col-sm-8">
                                    <h3 className="search_h3"> {val.title} </h3>
                                    <p className="search_p">
                                      {val.featureddescription.substring(0,250)}
                                      ...{" "}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              <hr />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : mitigation && !repair ? (
                  <>
                    {mitiagtionData.length <= 0 ? (
                      <div className="no-result">
                        <h3> No results! </h3>
                      </div>
                    ) : (
                      <div className="insightsheets">
                        {mitiagtionData.map((val, key) => {
                          return (
                            <div key={val.id}>
                              <Link
                                to={`/insight-sheets/${val.permalink}`}
                                target="_blank"
                              >
                                <div className="row">
                                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                    />
                                  </div>
                                  <div className="col-xl-10 col-lg-10 col-md-8 col-sm-8">
                                    <h3 className="search_h3"> {val.title} </h3>
                                    <p className="search_p">
                                      {val.featureddescription.substring(0,250)}
                                      ...{" "}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              <hr />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : !mitigation && repair ? (
                  <>
                    {repairData.length <= 0 ? (
                      <div className="no-result">
                        <h3> No results! </h3>
                      </div>
                    ) : (
                      <div className="insightsheets">
                        {repairData.map((val, key) => {
                          return (
                            <div key={val.id}>
                              <Link
                                to={`/insight-sheets/${val.permalink}`}
                                target="_blank"
                              >
                                <div className="row">
                                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                                    <img
                                      src={val.featureimage}
                                      alt={val.title}
                                    />
                                  </div>
                                  <div className="col-xl-10 col-lg-10 col-md-8 col-sm-8">
                                    <h3 className="search_h3"> {val.title} </h3>
                                    <p className="search_p">
                                      {val.featureddescription.substring(0,250)}
                                      ...{" "}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              <hr />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-result">
                    <h3> No results! </h3>
                  </div>
                )}
              </div>
            </div>
            {/* {newArr.length <= 0 ? (
							""
						) : newArr.length >= 0 && mitigation == false && repair == false ? (
							""
						) : (
							<div className="col-12" style={{ padding: "0px"}}>
								<div className="active-more-result">
									<h3
										className="more-result"
										onClick={() => setLimit(limit + 5)}
									>
										More results... ({newArr.length})
									</h3>
								</div>
							</div>
						)} */}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Search;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchVideoGallary } from "../../utils/api-routes/api-routes.util";
import queryString from "query-string";
import search2 from "assets/search2.png";
import cancel from "assets/Cancel.svg";

const SearchVG = (props) => {

  const [loadingSearch, setLoadingSearch] = useState(false);

	const [searchfield, setSearchField] = useState("");
	
	const [data, setData] = useState([]);
  const [videoGallery, setVideoGallery] = useState([]);

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

    SearchVideoGallary(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        const mergedData = merge(x, data)
        setVideoGallery(mergedData);
        setLoadingSearch(false);
      } else {
        setLoadingSearch(false);
      }
    });
  };

  const merge = (arr1, arr2) => {
    const temp = []
    arr1.forEach(x => {
      arr2.forEach(y => {
        if (x.id === y.id) {
          temp.push({ ...x, ...y })
        }
      })
    })
    return temp
  }

	return (
		<>
			<div className="main-search">
				<div className="form-group nogroup">
					<div className="input-group">
						<input 
							type="text" 
							className="form-control" 
							placeholder="Search by keywords"
							required
              readOnly={data.length == 0 ? true : false}
							value={searchfield}  
							onChange={(e) => {
                setSearchField(e.target.value);
                SearchKeyword(e.target.value);
              }}
						/>
            {loadingSearch && (                      
              <div
                style={{ fontSize: "35px", color: "#DB422D" }}
              >
                <i className="fas fa-circle-notch fa-spin"></i>
              </div>
            )}
						{searchfield !== "" ?                        
							<img 
							  style={{ width: "20px", height: "20px", marginTop: "15px" }}
								className="input_icon"
								src={cancel}
                alt="cancel"
                loading="lazy"
								onClick={() => setSearchField("")}
							/>
						: 
							""
						}
						<img
              className="input_icon"
              src={search2}
              alt="search2"
              loading="lazy"
            />
					</div>
				</div>
				{searchfield !== "" ? (
					<>
						<div className="col-12" style={{ padding: "0px"}}>
							<div className="active_search">
                {videoGallery.length <= 0 ? (
                  <div className="no-result">
                    <h3> No results! </h3>
                  </div>
                ) : (
                  <div className="insightsheets">
                    {videoGallery.map((val, key) => {
                      return (
                        <div key={val.id}>
                          <Link 
                            to={`/video-gallery/${val.permalink}`}
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
                                  {val.featureddescription.substring(0, 250)}
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
							</div>
						</div>
					</>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default SearchVG;
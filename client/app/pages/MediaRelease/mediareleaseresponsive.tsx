import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";

const MR_Responsive = (props) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
   if (props.data.length > 0) {
    setLoading(false);
   }
  }, [props]);

  return (
    <>
      <div className="youtube-videos-tabs-new">
        {!loading && (
          <div className="Dropdown">
            {props.data.length > 0 ? (
              <>
                {props.data.map((val, key) => {
                  return (
                    <div className="video" key={key}>
                      <a href={`${val.hubspotLink}`} target="_blank">
                        <img
                          src={val.featureimage}
                          alt={val.title}
                          loading="lazy"
                        />
                        <h3 className="name"> {val.title} </h3>
                      </a>
                      <div className="description">
                        {val.description.substring(0, 200)}
                        ...{" "}
                        <a href={`${val.hubspotLink}`} target="_blank">
                          Read More
                        </a>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="no-result">
                <h3> No Posts Yet </h3>
              </div>
            )}
          </div>
        )}
        {loading && (
          <div className="loader-inner">
            <LottieLoader />
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(MR_Responsive);
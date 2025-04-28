import React, { useState } from "react";
import { Link } from "react-router-dom";

const VG_Responsive = (props) => {

  const [zero, setZero] = useState(false);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);
  const [seven, setSeven] = useState(false);

  return (
    <>
      <div className="youtube-videos-tabs-new">
        <div 
          className={zero == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(!zero);
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(false);
            setFive(false);
            setSix(false);
            setSeven(false);
          }}
        >
          <h1> Actionable Profile </h1>
        </div>
        {zero == true ? (
          <div className="Dropdown">
            {props.ActionableProfile.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )}
        <div 
          className={one == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(false);
            setOne(!one);
            setTwo(false);
            setThree(false);
            setFour(false);
            setFive(false);
            setSix(false);
            setSeven(false);
          }}
        >
          <h1> Price List Update Summary </h1>
        </div>
        {one == true ? (
          <div className="Dropdown">
            {props.PriceListUpdateSummary.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )}
        <div 
          className={two == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(false);
            setOne(false);
            setTwo(!two);
            setThree(false);
            setFour(false);
            setFive(false);
            setSix(false);
            setSeven(false);
          }}
        >
          <h1> Matter Hacks </h1>
        </div>
        {two == true ? (
          <div className="Dropdown">
            {props.MatterHacks.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )}
        <div 
          className={three == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(false);
            setOne(false);
            setTwo(false);
            setThree(!three);
            setFour(false);
            setFive(false);
            setSix(false);
            setSeven(false);
          }}
        >
          <h1> Xact Hacks </h1>
        </div>
        {three == true ? (
          <div className="Dropdown">
            {props.XactHacks.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )}
        <div 
          className={four == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(false);
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(!four);
            setFive(false);
            setSix(false);
            setSeven(false);
          }}
        >
          <h1> Membership Resources </h1>
        </div>
        {four == true ? (
          <div className="Dropdown">
            {props.MembershipResources.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )}
        <div 
          className={five == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(false);
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(false);
            setFive(!five);
            setSix(false);
            setSeven(false);
          }}
        >
          <h1> Academy Insights </h1>
        </div>
        {five == true ? (
          <div className="Dropdown">
            {props.AcademyInsights.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )}
        <div 
          className={six == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(false);
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(false);
            setFive(false);
            setSix(!six);
            setSeven(false);
          }}
        >
          <h1> Hotkey Highlights  </h1>
        </div>
        {six == true ? (
          <div className="Dropdown">
            {props.HotkeyHighlights.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )}
        {/* <div 
          className={seven == true ? "Tabs active_new" : "Tabs"}
          onClick={() => {
            setZero(false);
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(false);
            setFive(false);
            setSix(false);
            setSeven(!seven);
          }}
        >
          <h1> Equipment Corral  </h1>
        </div>
        {seven == true ? (
          <div className="Dropdown">
            {props.EquipmentCorral.map((val, key) => {
              return (
                <div className="video" key={key}>
                  <Link to={`/video-gallery/${val.permalink}`}>
                    <img
                      src={val.featureimage}
                      alt={val.title}
                      loading="lazy"
                    />
                    <h3 className="name"> {val.title} </h3>
                  </Link>
                  <div className="description">
                    {val.featureddescription.substring(0, 200)}
                    ...{" "}
                    <Link to={`/video-gallery/${val.permalink}`}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "" 
        )} */}
      </div>
    </>
  );
};

export default VG_Responsive;
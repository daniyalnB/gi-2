import React, { useState, useEffect } from "react";
import LottieLoader from "../../components/LottieLoader";
import moment from "moment";

const BG_Responsive = (props) => {

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [all, setAll] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      setLoading(false);
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (all && window.hbspt && !loading) {
      window.hbspt.forms.create({
        portalId: "3936526",
        formId: "28cf6aab-c770-41bf-80ce-80238cf7ad40",
        target: "#hubspotFormLatestNews",
      });
    }
  }, [all, loading]);

  return (
    <>
      {!props.loading && (
        <div className="youtube-videos-tabs-new">
          <div 
            className={all == true ? "Tabs active_new" : "Tabs"}
            onClick={() => {
              setOne(false);
              setTwo(false);
              setThree(false);
              setFour(false);
              setAll(!all);
            }}
          >
            <h1> All Blogs </h1>
          </div>
          {all == true && (
            <div className="Dropdown">
              <div className="all-blogs">
                <h1> The Actionable Blog </h1>
                <p> Articles on Actionable Xact Profile, AIMC, Matter Hacks, and more </p>
                <hr />
                <div className="latest-blog">
                  <h2> Latest Blog </h2>
                  <a href={props.latestBlog.hubspotLink} target="_blank">
                    <div className="row">
                      <div className="col-12">
                        <img
                          src={props.latestBlog.featuredImage}
                          alt={props.latestBlog.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="col-12">
                        <h1> {props.latestBlog.title} </h1>
                        <h3> {moment(props.latestBlog.createdAt).format("MMMM DD, YYYY")} </h3>
                        <p>
                          {props.latestBlog.description.substring(0, 200)}
                          ...{" "}
                          <span>Read More</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                {props.XactHacks.length > 0 && (
                  <>
                    <hr />
                    <h2 className="pt-2"> Latest Actionable Xact Blogs </h2>
                    {props.XactHacks.map((val, key) => {
                      return (
                        <div className="video" key={key}>
                          <a href={`${val.hubspotLink}`} target="_blank">
                            <img
                              src={val.featuredImage}
                              alt={val.title}
                              loading="lazy"
                            />
                            <h3 className="name"> {val.title} </h3>
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
                      );
                    })}
                  </>
                )}
                <div className="latest-news">
                  <hr />
                  <div className="row pt-4 pb-4">
                    <div className="col-12">
                      <h4> Subscribe to get update about our latest news in your email. </h4>
                    </div>
                    <div className="col-12">
                      <div id="hubspotFormLatestNews"></div>
                    </div>
                  </div>
                </div>
                {props.ActionableProfile.length > 0 && (
                  <>
                    <hr />
                    <h2 className="pt-2"> Latest Actionable Xactimate Profile Blogs </h2>
                    {props.ActionableProfile.map((val, key) => {
                      return (
                        <div className="video" key={key}>
                          <a href={`${val.hubspotLink}`} target="_blank">
                            <img
                              src={val.featuredImage}
                              alt={val.title}
                              loading="lazy"
                            />
                            <h3 className="name"> {val.title} </h3>
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
                      );
                    })}
                  </>
                )}
                {props.MatterHacks.length > 0 && (
                  <>
                    <hr />
                    <h2 className="pt-2"> Latest Matter Hacks Blogs </h2>
                    {props.MatterHacks.map((val, key) => {
                      return (
                        <div className="video" key={key}>
                          <a href={`${val.hubspotLink}`} target="_blank">
                            <img
                              src={val.featuredImage}
                              alt={val.title}
                              loading="lazy"
                            />
                            <h3 className="name"> {val.title} </h3>
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
                      );
                    })}
                  </>
                )}
                {props.Resources.length > 0 && (
                  <>
                    <hr />
                    <h2 className="pt-2"> Latest Resources Blogs </h2>
                    {props.Resources.map((val, key) => {
                      return (
                        <div className="video" key={key}>
                          <a href={`${val.hubspotLink}`} target="_blank">
                            <img
                              src={val.featuredImage}
                              alt={val.title}
                              loading="lazy"
                            />
                            <h3 className="name"> {val.title} </h3>
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
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}
          <div 
            className={one == true ? "Tabs active_new" : "Tabs"}
            onClick={() => {
              setOne(!one);
              setTwo(false);
              setThree(false);
              setFour(false);
              setAll(false);
            }}
          >
            <h1> Actionable Profile </h1>
          </div>
          {one == true ? (
            <div className="Dropdown">
              {props.ActionableProfile.length > 0 ? (
                <>
                  {props.ActionableProfile.map((val, key) => {
                    return (
                      <div className="video" key={key}>
                        <a href={`${val.hubspotLink}`} target="_blank">
                          <img
                            src={val.featuredImage}
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
          ) : (
            "" 
          )}
          <div 
            className={two == true ? "Tabs active_new" : "Tabs"}
            onClick={() => {
              setOne(false);
              setTwo(!two);
              setThree(false);
              setFour(false);
              setAll(false);
            }}
          >
            <h1> Resources </h1>
          </div>
          {two == true ? (
            <div className="Dropdown">
              {props.Resources.length > 0 ? (
                <>
                  {props.Resources.map((val, key) => {
                    return (
                      <div className="video" key={key}>
                        <a href={`${val.hubspotLink}`} target="_blank">
                          <img
                            src={val.featuredImage}
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
          ) : (
            "" 
          )}
          <div 
            className={three == true ? "Tabs active_new" : "Tabs"}
            onClick={() => {
              setOne(false);
              setTwo(false);
              setThree(!three);
              setFour(false);
              setAll(false);
            }}
          >
            <h1> Matter Hacks </h1>
          </div>
          {three == true ? (
            <div className="Dropdown">
              {props.MatterHacks.length > 0 ? (
                <>
                  {props.MatterHacks.map((val, key) => {
                    return (
                      <div className="video" key={key}>
                        <a href={`${val.hubspotLink}`} target="_blank">
                          <img
                            src={val.featuredImage}
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
          ) : (
            "" 
          )}
          <div 
            className={four == true ? "Tabs active_new" : "Tabs"}
            onClick={() => {
              setOne(false);
              setTwo(false);
              setThree(false);
              setFour(!four);
              setAll(false);
            }}
          >
            <h1> Xact Hacks </h1>
          </div>
          {four == true ? (
            <div className="Dropdown">
              {props.XactHacks.length > 0 ? (
                <>
                  {props.XactHacks.map((val, key) => {
                    return (
                      <div className="video" key={key}>
                        <a href={`${val.hubspotLink}`} target="_blank">
                          <img
                            src={val.featuredImage}
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
          ) : (
            "" 
          )}      
        </div>
      )}
      {props.loading && (
        <div className="loader-inner">
          <LottieLoader />
        </div>
      )}
    </>
  );
};

export default BG_Responsive;
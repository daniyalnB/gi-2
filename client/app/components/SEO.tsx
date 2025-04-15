import React from "react";
import { Helmet } from "react-helmet";

const SEO = (props) => {

  const host =  window.location.host;
  const pageLink = `${host === "localhost:8000" || host === "reactdev.getinsights.org" ? "https://reactdev.getinsights.org/" : "https://www.getinsights.org/"}`
  
  return (
    <>
      <Helmet>
        <title> {props.title} </title>
        <meta name="description" content={props.description} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        {/* <link rel="canonical" href={`${pageLink}${props.link}`} /> */}
      </Helmet>
    </>
  );
};

export default SEO;

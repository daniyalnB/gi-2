import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../contexts/appContext";
import history from "utils/history";
import axp from "assets/actionable_xactimate_profile.webp";
import academy from "assets/icon_academy_crest.webp";
import colid from "assets/icon_colid.webp";
import insight from "assets/icon_insight_sheet.webp";
import price from "assets/icon_price_list.webp";
import video from "assets/icon_video_player.webp";
import solidifai from "assets/solidifai.webp";

const DAESSection = () => {

  const { getCustomerInfo, myInfo, getMyEncryptedDataFunction, encryptedData, } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
      getMyEncryptedDataFunction();
    }
  }, []);

  const [ownerInfo, setOwnerInfo] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setOwnerInfo(myInfo.ownerinfo);
    }
  }, [myInfo]);

  const [EncryptedData, setEncryptedData] = useState(false);

  useEffect(() => {
    if (encryptedData) {
      setEncryptedData(encryptedData);
    }
  }, [encryptedData]);

  const ssoauth = () => {
    if (localStorage.getItem("tokenCustomer") == null) {
      history.push("/my-account");
    } else {
      const host =  window.location.host;
      const LMS_KEY = "mXu8EfYLQVgh8n3iEH6zFl97UPfNwwUf";
      const LMS_SECRET = "PRVfWX16FziQkMcdsAKHfeX9WyZJhW49";
      const url = `${host === "localhost:8000" || host === "reactdev.getinsights.org" ? "http://dev.actionableacademy.org" : "https://actionableacademy.org"}`
      const endpoint = `${url}/sso?secret=${LMS_SECRET}&key=${LMS_KEY}&identifier=${ownerInfo.emailaddress}&data=${EncryptedData}`;
      window.open(endpoint, "_blank");
    }
  }

  return (
    <>
      <div className="section-2">
        <div className="container">
          <div className="DAES_section">
            <h2> Digital Assets & Educational Solutions </h2>
            <h3>
              {" "}
              Our non-profit 501(c)(6) status ensures that all of Actionable
              Insights products are delivered at cost.{" "}
            </h3>
            <div className="DAES-sub-section">
              <div className="row section2">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <Link
										to="/actionable-xactimate-profile"
									>
                    <img
                      src={axp}
                      alt="actionable-xactimate-profile"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
									</Link>
                  <h5 className="heading">
                    <Link
                      to="/actionable-xactimate-profile"
                    >
                      Actionable Xactimate
                      <br />
                      Profile
                    </Link>
                  </h5>
                  <span> No more mistakes, no more missed line items. </span>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <Link
										to="/resources/price-list-update-summary"
									>
                    <img
                      src={price}
                      alt="price-list-update-summary"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
									</Link>
                  <h5 className="heading">
                    <Link
                      to="/resources/price-list-update-summary"
                    >
                      Price List Update
                      <br />
                      Summary
                    </Link>
                  </h5>
                  <span> Summarized list of hot new line items. </span>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <Link
										to="/insight-sheets"
									>
										<img
                      src={insight}
                      alt="insight-sheets"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
									</Link>
                  <h5 className="heading">
                    <Link
                      to="/insight-sheets"
                    >
                      Insight Sheet
                      <br />
                      Database
                    </Link>
                  </h5>
                  <span> 3700+ pages of Xactimate invoicing templates. </span>
                </div>
              </div>
              <div className="row section2">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <Link
										to="/commonly-overlooked-line-items"
									>
										<img
                      src={colid}
                      alt="commonly-overlooked-line-items"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
									</Link>
                  <h5 className="heading">
                    <Link
                      to="/commonly-overlooked-line-items"
                    >
                      Commonly Overlooked
                      <br />
                      Line Item DATABASE
                    </Link>
                  </h5>
                  <span> You don't know what you don't know. </span>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <span onClick={ssoauth} className="cpointer">
                    <img
                      src={academy}
                      alt="actionable-academy"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
									</span>
                  <h5 className="heading">
                    <p onClick={ssoauth} className="cpointer">
                      ACTIONABLE ACADEMY
                    </p>
                  </h5>
                  <span> On Demand Learning and Certifications. </span>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <Link
										to="/video-gallery"
									>
                    <img
                      src={video}
                      alt="video-gallery"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
									</Link>
                  <h5 className="heading">
                    <Link
                      to="/video-gallery"
                    >
                      VIDEO GALLERY
                    </Link>
                  </h5>
                  <span> Hundreds of Matterport and Xactimate Hacks. </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DAESSection;
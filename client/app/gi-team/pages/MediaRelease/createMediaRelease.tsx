import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { AddOrUpdateMediaRelease } from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const CreateMediaRelease = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [mediarelease, setMediaRelease] = useState({
    title: "",
    hubspotLink: "",
    description: "",
    featureimage: "",
  });

  const onSelect = (e) =>
  setMediaRelease({ ...mediarelease, [e.target.name]: e.target.files[0] });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      title: mediarelease.title,
      hubspotLink: mediarelease.hubspotLink,
    };
    const formData = new FormData();
    formData.append("description", mediarelease.description);
    formData.append("featureimage", mediarelease.featureimage);

    const stringified = queryString.stringify(payload);

    AddOrUpdateMediaRelease(stringified, formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setMediaRelease({
          title: "",
          hubspotLink: "",
          description: "",
          featureimage: "",
        });
        setLoading(false);
        setError(false);
        history.push("/gi-team/media-release");
        document.getElementById("form").reset()
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>
          Create Media Release - Actionable Insights Admin
        </title>
      </Helmet>
      <div className="createInsightSheet">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <ScrollToTop />
              <SideMenu />
            </div>
            <div className="col-9">
              <div className="row">
                <UserTab />
              </div>
              <div className="createInsightSheet-section">
                <div className="row header">
                  <div className="col-9">
                    <h3 className="heading">
                      Create Media Release
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/media-release"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit} id="form">
                  <div className="info-data">
                    <div className="form-holder">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <input
                              type="text"
                              name="title"
                              required
                              id="inputField0"
                              className="input-area"
                              onChange={(e) =>
                                setMediaRelease({
                                  ...mediarelease,
                                  title: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField0" className="floating_label"> Title </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="hubspotLink" 
                              required 
                              id="inputField3" 
                              className="input-area"
                              onChange={(e) =>
                                setMediaRelease({
                                  ...mediarelease,
                                  hubspotLink: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField3" className="floating_label"> Hubspot Link </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <textarea
                              name="description"
                              required
                              id="textField1"
                              className="input-area"
                              onChange={(e) =>
                                setMediaRelease({
                                  ...mediarelease,
                                  description: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField1" className="floating_label"> Description </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <label className="file">
                              <input
                                type="file"
                                name="featureimage"
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={onSelect}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <span className="file-custom"> Featured Image </span>
                            </label>
                            <div className="resolution"> Image size XXX x XXX </div>
                            {mediarelease.featureimage ? (
                              <div className="facebook-image-name">
                                {"   " + mediarelease.featureimage.name}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="second-hr" />
                  <div className="Buttons">
                    <div className="row">
                      {!loading &&
                        <button
                          className="btn"
                          type="submit"
                          disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                      >
                          <span> Save </span>
                        </button>
                      }
                      {loading && (
                        <button className="btn" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}
                    </div>
                  </div>
                  {localStorage.getItem("role") == "Analyst" && (
                    <div
                      style={{
                        padding: "0px 20px 20px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        className="form-group alert alert-danger"
                        style={{
                          margin: "0px",
                          width: "270px",
                        }}
                      >
                        You need to be an Admin or Editor to Create
                      </div>
                    </div>
                  )}
                  {error ? (
                    <div
                      style={{
                        padding: "0px 20px 20px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        className="form-group alert alert-danger"
                        style={{ margin: "0px" }}
                      >
                        {error}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateMediaRelease);
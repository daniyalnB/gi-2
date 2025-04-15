import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { AddOrUpdateXactimateSketch } from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const CreateXactimateSketchGallery = (props) => {

  const [publish, setPublish] = useState(false);
  const [draft, setDraft] = useState(false);

  const [error, setError] = useState(false);

  const [xactimatesketch, setXactimateSketch] = useState({
    title: "",
    tabtitle: "",
    submittedby: "",
    version: "",
    skxfile: "",
    featuredimage: "",
    tags: "",
    comments: "",
    keywords: "",
    isdraft: true,
  });

  const onSelect = (e) =>
  setXactimateSketch({ ...xactimatesketch, [e.target.name]: e.target.files[0] });

  const handleSubmit = (e) => {
    if (xactimatesketch.isdraft == false) {
      setPublish(true);
      setDraft(false);
    } else {
      setPublish(false);
      setDraft(true);
    }
    e.preventDefault();
    const payload = {
      title: xactimatesketch.title,
      tabtitle: xactimatesketch.tabtitle,
      submittedby: xactimatesketch.submittedby,
      version: xactimatesketch.version,
      tags: xactimatesketch.tags,
      comments: xactimatesketch.comments,
      keywords: xactimatesketch.keywords,
      isdraft: xactimatesketch.isdraft,
    };
    const formData = new FormData();
    formData.append("skxfile", xactimatesketch.skxfile);
    formData.append("featuredimage", xactimatesketch.featuredimage);
  
    const stringified = queryString.stringify(payload);
  
    AddOrUpdateXactimateSketch(stringified, formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setXactimateSketch({
          title: "",
          tabtitle: "",
          submittedby: "",
          version: "",
          skxfile: "",
          featuredimage: "",
          tags: "",
          comments: "",
          keywords: "",
          isdraft: true,
        });
        setPublish(false);
        setDraft(false);
        setError(false);
        history.push("/gi-team/xactimate-sketch-gallery");
        document.getElementById("form").reset()
      } else {
        setPublish(false);
        setDraft(false);
        setError(response.response.Message);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          Create Xactimate Sketch - Actionable Insights Admin
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
                      Create Xactimate Sketch 
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/xactimate-sketch-gallery"
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
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="title" 
                              required 
                              id="inputField1" 
                              className="input-area"
                              onChange={(e) =>
                                setXactimateSketch({
                                  ...xactimatesketch,
                                  title: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField1" className="floating_label"> Title </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="tabtitle" 
                              required 
                              id="inputField2" 
                              className="input-area"
                              onChange={(e) =>
                                setXactimateSketch({
                                  ...xactimatesketch,
                                  tabtitle: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField2" className="floating_label"> Tab Title </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="submittedby" 
                              required 
                              id="inputField3" 
                              className="input-area"
                              onChange={(e) =>
                                setXactimateSketch({
                                  ...xactimatesketch,
                                  submittedby: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField3" className="floating_label"> Submitted By </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="version" 
                              required 
                              id="inputField4" 
                              className="input-area"
                              onChange={(e) =>
                                setXactimateSketch({
                                  ...xactimatesketch,
                                  version: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField4" className="floating_label"> Version </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <label className="file">
                              <input
                                type="file"
                                name="skxfile"
                                onChange={onSelect}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <span className="file-custom"> Attach PDF </span>
                            </label>
                            {xactimatesketch.skxfile ? (
                              <div className="facebook-image-name">
                                {"   " + xactimatesketch.skxfile.name}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <label className="file">
                              <input
                                type="file"
                                name="featuredimage"
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={onSelect}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <span className="file-custom"> Featured Image </span>
                            </label>
                            <div className="resolution"> Image size XXX x XXX </div>
                            {xactimatesketch.featuredimage ? (
                              <div className="facebook-image-name">
                                {"   " + xactimatesketch.featuredimage.name}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="tags" 
                              required 
                              id="inputField4" 
                              className="input-area"
                              onChange={(e) =>
                                setXactimateSketch({
                                  ...xactimatesketch,
                                  tags: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField4" className="floating_label"> Tags </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <textarea
                              name="comments"
                              required
                              id="textField1"
                              className="input-area"
                              onChange={(e) =>
                                setXactimateSketch({
                                  ...xactimatesketch,
                                  comments: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField1" className="floating_label"> Comments </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <textarea
                              name="keywords"
                              required
                              id="textField2"
                              className="input-area"
                              onChange={(e) =>
                                setXactimateSketch({
                                  ...xactimatesketch,
                                  keywords: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField2" className="floating_label"> Keywords </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="second-hr" />
                  <div className="Buttons">
                    <div className="row">
                      {!publish && (
                        <button 
                          className="btn" 
                          type="submit"
                          disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          onClick={() => setXactimateSketch({ ...xactimatesketch, isdraft: false })}
                        > 
                          <span> Save </span>
                        </button>
                      )}
                      {publish && (
                        <button className="btn" disabled> 
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}
                      {!draft && (
                        <button 
                          className="btn draft" 
                          type="submit"
                          disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          onClick={() => setXactimateSketch({ ...xactimatesketch, isdraft: true })}
                        > 
                          <span> Save as Draft </span>
                        </button>
                      )}
                      {draft && (
                        <button className="btn draft" disabled> 
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

export default withRouter(CreateXactimateSketchGallery);
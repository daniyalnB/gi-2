import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { 
  AddOrUpdateXactimateSketch,
  GetAllXactimateSketch,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const UpdateXactimateSketchGallery = (props) => {

  const [loading, setLoading] = useState(true);

  const [publish, setPublish] = useState(false);
  const [draft, setDraft] = useState(false);

  const [error, setError] = useState(false);

  function parse (val) {
		const name = queryString.parse(`name=${val}`).name;
		return name;
	}

  const [xactimatesketch, setXactimateSketch] = useState({
    id: "",
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

  useEffect(() => {
    GetAllXactimateSketch().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (xactimatesketch) => xactimatesketch.id === props.match.params.id
        )[0];
        if (x == undefined) {
          history.push("/gi-team/xactimate-sketch-gallery");
        }
        setXactimateSketch({
          ...xactimatesketch,
          id: x.id,
          title: x.title,
          tabtitle: x.tabtitle,
          submittedby: x.submittedby,
          version: x.version,
          skxfile: x.skxfile,
          featuredimage: x.featuredimage,
          tags: x.tags,
          comments: x.comments,
          keywords: x.keywords,
          isdraft: x.draft,
        });
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

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
      id: xactimatesketch.id,
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
        setPublish(false);
        setDraft(false);
        setError(false);
        history.push("/gi-team/xactimate-sketch-gallery");
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
          Update Xactimate Sketch - Actionable Insights Admin
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
                      Xactimate Sketch 
                    </h3>
                    {xactimatesketch.isdraft == true ? (
                      <div className="status_draft">
                        <span> Draft </span>
                      </div>
                    ) : (
                      <div className="status_published">
                        <span> Published </span>
                      </div>
                    )}
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
                {!loading && (
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
                                value={xactimatesketch.title}
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
                                value={xactimatesketch.tabtitle}
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
                                value={xactimatesketch.submittedby}
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
                                value={xactimatesketch.version}
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
																	<a href={xactimatesketch.skxfile} target="_blank">
																		{xactimatesketch.skxfile.name ? (
																			`${"   " + xactimatesketch.skxfile.name}`
																		) : (
																			parse(`${xactimatesketch.skxfile.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
																		)}
																	</a>
																</div>
															) : (
																<div className="facebook-image-name">
																	Not Available
																</div>
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
																	<a href={xactimatesketch.featuredimage} target="_blank">
																		{xactimatesketch.featuredimage.name ? (
																			`${"   " + xactimatesketch.featuredimage.name}`
																		) : (
																			parse(`${xactimatesketch.featuredimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
																		)}
																	</a>
																</div>
															) : (
																<div className="facebook-image-name">
																	Not Available
																</div>
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
                                value={xactimatesketch.tags}
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
                                value={xactimatesketch.comments}
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
                                value={xactimatesketch.keywords}
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
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
              </div>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(UpdateXactimateSketchGallery);
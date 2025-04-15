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
  AddOrUpdateBlog,
  GetBlogByBlogId,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";

const CreateBlog = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  const [cat, setCat] = useState(false);
  const [category, setCategory] = useState("");

  const [blog, setBlog] = useState({
    id: "",
    title: "",
    category: "",
    hubspotLink: "",
    description: "",
    featuredImage: "",
  });

  useEffect(() => {
    GetBlogByBlogId(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setBlog({
          ...blog,
          id: x.id,
          title: x.title,
          category: x.category,
          hubspotLink: x.hubspotLink,
          description: x.description,
          featuredImage: x.featuredImage,
        });
        setLoadingData(false);
      } else {
        history.push("/gi-team/blog");
      }
    });
  }, []);

  const onSelect = (e) =>
  setBlog({ ...blog, [e.target.name]: e.target.files[0] });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      id: blog.id,
      title: blog.title,
      category: blog.category,
      hubspotLink: blog.hubspotLink,
      description: blog.description,
    };
    const formData = new FormData();
    formData.append("featuredImage", blog.featuredImage);

    const stringified = queryString.stringify(payload);

    AddOrUpdateBlog(stringified, formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setError(false);
        history.push("/gi-team/blog");
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
          Update Blog - Actionable Insights Admin
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
                      Edit Blog
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/blog"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingData && (
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
                                value={blog.title}
                                onChange={(e) =>
                                  setBlog({
                                    ...blog,
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
                                onClick={(e) => setCat(!cat)} 
                                value={blog.category} 
                                type="text" 
                                name="category" 
                                required 
                                id="inputField2" 
                                className="input-area"
                                style={{ 
                                  color: "transparent",
                                  textShadow: "0 0 0 #000",
                                  cursor: "pointer",
                                }}
                              />
                              <label htmlFor="inputField2" className="floating_label"> Category </label>
                              <label className="file_input_label">
                                {cat ?
                                  <img 
                                    className="select size"
                                    src={up} 
                                    onClick={() => setCat(!cat)}
                                  />
                                :
                                  <img 
                                    className="select size"
                                    src={down} 
                                    onClick={() => setCat(!cat)}
                                  />
                                }
                              </label>
                              <div className={cat ? "active" : "dropdown-content" }>
                                <h3 
                                  onClick={(e) => {
                                    setCategory(e.currentTarget.innerHTML);
                                    setCat(!cat);
                                    setBlog({
                                      ...blog,
                                      category: e.currentTarget.innerHTML,
                                    });
                                  }}
                                > 
                                  Actionable Profile
                                </h3>
                                <h3 
                                  onClick={(e) => {
                                    setCategory(e.currentTarget.innerHTML);
                                    setCat(!cat);
                                    setBlog({
                                      ...blog,
                                      category: e.currentTarget.innerHTML,
                                    });
                                  }}
                                > 
                                  Resources
                                </h3>
                                <h3 
                                  onClick={(e) => {
                                    setCategory(e.currentTarget.innerHTML);
                                    setCat(!cat);
                                    setBlog({
                                      ...blog,
                                      category: e.currentTarget.innerHTML,
                                    });
                                  }}
                                > 
                                  Matter Hacks 
                                </h3>
                                <h3 
                                  onClick={(e) => {
                                    setCategory(e.currentTarget.innerHTML);
                                    setCat(!cat);
                                    setBlog({
                                      ...blog,
                                      category: e.currentTarget.innerHTML,
                                    });
                                  }}
                                > 
                                  Xact Hacks 
                                </h3>
                              </div>
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
                                value={blog.hubspotLink}
                                onChange={(e) =>
                                  setBlog({
                                    ...blog,
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
                                value={blog.description}
                                onChange={(e) =>
                                  setBlog({
                                    ...blog,
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
                                  name="featuredImage"
                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                  onChange={onSelect}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <span className="file-custom">  Featured Image  </span>
                              </label>
                              <div className="resolution"> Image size XXX x XXX </div>
                              {blog.featuredImage ? (
                                <div className="facebook-image-name">
                                  <a href={blog.featuredImage} target="_blank">
                                    {blog.featuredImage.name ? (
                                      `${"   " + blog.featuredImage.name}`
                                    ) : (
                                      parse(`${blog.featuredImage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
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
                            <span> Update </span>
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
                )}
                {loadingData && (
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

export default withRouter(CreateBlog);
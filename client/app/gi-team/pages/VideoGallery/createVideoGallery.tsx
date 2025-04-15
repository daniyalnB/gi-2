import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { AddOrUpdateVideoGallaryItem } from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";

const CreateVideoGallery = (props) => {

  const [error, setError] = useState(false);

  const [save, setSave] = useState(false);
  const [draft, setDraft] = useState(false);

  const [cat, setCat] = useState(false);
  const [category, setCategory] = useState("");

  const [videogallery, setVideoGallery] = useState({
    permalink: "",
    title: "",
    tabtitle: "",
    featureimage: "",
    bannerimage: "",
    videolink: "",
    isdraft: true,
    catagory: "",
    description: "",
    metadescription: "",
    metatitle: "",
    featureddescription: "",
    facebookogimage: "",
    keywords: "",
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  
  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setConvertedContent(currentContentAsHTML);
  };

  const onSelect = (e) =>
  setVideoGallery({ ...videogallery, [e.target.name]: e.target.files[0] });

  const handleSubmit = (e) => {
    if (videogallery.isdraft == false) {
      setSave(true);
      setDraft(false);
    } else {
      setSave(false);
      setDraft(true);
    }
    e.preventDefault();
    const payload = {
      permalink: videogallery.permalink.replace(/\/$/, ""),
      title: videogallery.title,
      tabtitle: videogallery.tabtitle,
      videolink: videogallery.videolink,
      catagory: videogallery.catagory,
      metadescription: videogallery.metadescription,
      metatitle: videogallery.metatitle,
      isdraft: videogallery.isdraft,
      keywords: videogallery.keywords,
    };
    const formData = new FormData();
    formData.append("featureimage", videogallery.featureimage);
    formData.append("facebookogimage", videogallery.facebookogimage);
    formData.append("bannerimage", videogallery.bannerimage);
    formData.append("description", convertedContent);
    formData.append("featureddescription", videogallery.featureddescription);
  
    const stringified = queryString.stringify(payload);
  
    AddOrUpdateVideoGallaryItem(stringified, formData).subscribe((response) => {
      console.log(response, "response");
      if (response.response.Requested_Action) {
        setVideoGallery({
          permalink: "",
          title: "",
          tabtitle: "",
          featureimage: "",
          bannerimage: "",
          videolink: "",
          isdraft: true,
          catagory: "",
          description: "",
          metadescription: "",
          metatitle: "",
          featureddescription: "",
          facebookogimage: "",
          keywords: "",
        });
        setSave(false);
        setDraft(false);
        setError(false);
        history.push("/gi-team/video-gallery");
        document.getElementById("form").reset();
      } else {
        setSave(false);
        setDraft(false);
        setError(response.response.Message);
      }
    });
  };

  const imageUploadCallBack = (file) => new Promise (
    (resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let img = new Image();
      reader.onload = function (e) {
        img.src = this.result
      };

      img.onload = function () {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        let originWidth = this.width;
        let originHeight = this.height;

        let maxWidth = 1000,
          maxHeight = 1000;
        let targetWidth = originWidth,
          targetHeight = originHeight;
        if(originWidth > maxWidth || originHeight > maxHeight) {
          if(originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        context.clearRect(0, 0, targetWidth, targetHeight);
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        let newUrl = canvas.toDataURL('image/jpeg', 0.92);

        resolve({
          data: {
            link: newUrl
          }
        })
      }
    }
  )

  return (
    <>
      <Helmet>
        <title> 
          Create New Video - Actionable Insights Admin
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
                      Create New Video
                    </h3>
                    <div className="status_draft">
                      <span> Draft </span>
                    </div>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/video-gallery"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit} id="form" noValidate={videogallery.isdraft ? true : false}>
                  <div className="info-data">
                    <div className="form-holder">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="Permalink" 
                              required 
                              id="inputField0" 
                              className="input-area"
                              onChange={(e) =>
                                setVideoGallery({
                                  ...videogallery,
                                  permalink: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField0" className="floating_label"> Permalink </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="Title" 
                              required 
                              id="inputField1" 
                              className="input-area"
                              onChange={(e) =>
                                setVideoGallery({
                                  ...videogallery,
                                  title: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField1" className="floating_label"> Title </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="videolink" 
                              required 
                              id="inputField2" 
                              className="input-area"
                              onChange={(e) =>
                                setVideoGallery({
                                  ...videogallery,
                                  videolink: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField2" className="floating_label"> Video Link </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              onClick={(e) => setCat(!cat)} 
                              value={category} 
                              type="text" 
                              name="Catagory" 
                              required 
                              id="inputField3" 
                              className="input-area"
                              style={{ 
                                color: "transparent",
                                textShadow: "0 0 0 #000",
                                cursor: "pointer",
                              }}
                            />
                            <label htmlFor="inputField3" className="floating_label"> Category </label>
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
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Actionable Profile
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCategory(e.currentTarget.innerHTML);
                                  setCat(!cat);
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Academy Insights 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCategory(e.currentTarget.innerHTML);
                                  setCat(!cat);
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Price List Update Summary 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCategory(e.currentTarget.innerHTML);
                                  setCat(!cat);
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Membership Resources 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCategory(e.currentTarget.innerHTML);
                                  setCat(!cat);
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Matter Hacks 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCategory(e.currentTarget.innerHTML);
                                  setCat(!cat);
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Xact Hacks 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCategory(e.currentTarget.innerHTML);
                                  setCat(!cat);
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Hotkey Highlights 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCategory(e.currentTarget.innerHTML);
                                  setCat(!cat);
                                  setVideoGallery({
                                    ...videogallery,
                                    catagory: e.currentTarget.innerHTML,
                                  });
                                }}
                              > 
                                Equipment Corral 
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <textarea
                              name="tabtitle"
                              required
                              id="textField1"
                              className="input-area"
                              onChange={(e) =>
                                setVideoGallery({
                                  ...videogallery,
                                  tabtitle: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField1" className="floating_label"> Tab Title </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <textarea
                              name="featureddescription"
                              required
                              id="textField2"
                              className="input-area"
                              onChange={(e) =>
                                setVideoGallery({
                                  ...videogallery,
                                  featureddescription: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField2" className="floating_label"> Featured Description </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <textarea
                              name="metatitle"
                              required
                              maxLength={160}
                              id="textField3"
                              className="input-area"
                              onChange={(e) =>
                                setVideoGallery({
                                  ...videogallery,
                                  metatitle: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField3" className="floating_label"> Meta Title </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <textarea
                              name="metadescription"
                              required
                              maxLength={160}
                              id="textField4"
                              className="input-area"
                              onChange={(e) =>
                                setVideoGallery({
                                  ...videogallery,
                                  metadescription: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField4" className="floating_label"> Meta Description </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
												<div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
													<div className="form-group nogroup">
														<textarea
															name="keywords"
															// required
															id="textField5"
															className="input-area"
															onChange={(e) =>
																setVideoGallery({
																	...videogallery,
																	keywords: e.currentTarget.value,
																})
															}
														/>  
														<label htmlFor="textField5" className="floating_label"> Keywords </label>
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
                              <span className="file-custom">  Featured Image  </span>
                            </label>
                            <div className="resolution"> Image size XXX x XXX </div>
                            {videogallery.featureimage ? (
                              <div className="facebook-image-name">
                                {"   " + videogallery.featureimage.name}
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
                                name="bannerimage"
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={onSelect}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <span className="file-custom">  Banner Image  </span>
                            </label>
                            <div className="resolution"> Image size XXX x XXX </div>
                            {videogallery.bannerimage ? (
                              <div className="facebook-image-name">
                                {"   " + videogallery.bannerimage.name}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    <h3> Description </h3>
                    <div className="row">
                      <div className="col-8 Text_Editor">
                        <div className="inside">
                          <Editor
                            editorState={editorState}
                            onEditorStateChange={handleEditorChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            placeholder="Type something here..."
                            toolbar={{
                              inline: { inDropdown: false },
                              list: { inDropdown: true },
                              textAlign: { inDropdown: false },
                              link: { inDropdown: true },
                              history: { inDropdown: false },
                              image: {
                                urlEnabled: true,
                                uploadEnabled: true,
                                alignmentEnabled: true,
                                uploadCallback: imageUploadCallBack,
                                previewImage: true,
                                inputAccept: 'image/*',
                                alt: {present: false, mandatory: false}
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info-data">
                    <div className="form-holder">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <label className="file">
                              <input
                                type="file"
                                name="facebookogimage"
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={onSelect}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <span className="file-custom">  Facebook OG Image  </span>
                            </label>
                            <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                            {videogallery.facebookogimage ? (
                              <div className="facebook-image-name">
                                {"   " + videogallery.facebookogimage.name}
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
                      {!save && (
                        <button 
                          className="btn"
                          type="submit"
                          disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          onClick={() => setVideoGallery({ ...videogallery, isdraft: false })}
                        > 
                          <span> Save </span>
                        </button>
                      )}
                      {save && (
                        <button className="btn" disabled> 
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}
                      {!draft && (
                        <button 
                          className="btn draft"
                          type="submit"
                          disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          onClick={() => setVideoGallery({ ...videogallery, isdraft: true })}
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
                        You need to be an Admin or Editor to Save
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

export default withRouter(CreateVideoGallery);
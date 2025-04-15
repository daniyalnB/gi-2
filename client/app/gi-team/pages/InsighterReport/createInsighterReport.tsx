import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import moment from "moment";
import history from "../../../../utils/history";
import { AddOrUpdateInsighterReport } from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const CreateInsighterReport = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [insighterreport, setInsighterReport] = useState({
    permalink: "",
    featuredtitle: "",
    pagetitle: "",
    tabtitle: "",
    metadescription: "",
    metatitle: "",
    attachedPDF: "",
    featureimage: "",
    description: "",
    featureddescription: "",
    dateforsorting: date,
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
  setInsighterReport({ ...insighterreport, [e.target.name]: e.target.files[0] });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      permalink: insighterreport.permalink.replace(/\/$/, ""),
      featuredtitle: insighterreport.featuredtitle,
      pagetitle: insighterreport.pagetitle,
      dateforsorting: `${moment(insighterreport.dateforsorting).format("DD.MM.yyyy")}`,
      tabtitle: insighterreport.tabtitle,
      metadescription: insighterreport.metadescription,
      metatitle: insighterreport.metatitle,
    };
    const formData = new FormData();
    formData.append("attachedPDF", insighterreport.attachedPDF);
    formData.append("featureimage", insighterreport.featureimage);
    formData.append("facebookogimage", insighterreport.facebookogimage);
    formData.append("description", convertedContent);
    formData.append("featureddescription", insighterreport.featureddescription);
    formData.append("keywords", insighterreport.keywords);

    const stringified = queryString.stringify(payload);

    AddOrUpdateInsighterReport(stringified, formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setInsighterReport({
          permalink: "",
          featuredtitle: "",
          pagetitle: "",
          tabtitle: "",
          metadescription: "",
          metatitle: "",
          attachedPDF: "",
          featureimage: "",
          description: "",
          featureddescription: "",
          dateforsorting: date,
          facebookogimage: "",
          keywords: "",
        });
        setLoading(false);
        setError(false);
        history.push("/gi-team/insighter-report");
        document.getElementById("form").reset();
      } else {
        setLoading(false);
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
          Create Insighter Report - Actionable Insights Admin
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
                      Create Insighter Report
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/insighter-report"
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
                              name="Permalink"
                              required
                              id="inputField0"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterReport({
                                  ...insighterreport,
                                  permalink: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField0" className="floating_label"> Permalink </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input
                              type="text"
                              name="featuredtitle"
                              required
                              id="inputField1"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterReport({
                                  ...insighterreport,
                                  featuredtitle: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField1" className="floating_label"> Featured Title </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input
                              type="text"
                              name="pagetitle"
                              required
                              id="inputField2"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterReport({
                                  ...insighterreport,
                                  pagetitle: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField2" className="floating_label"> Page Title </label>
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
                                setInsighterReport({
                                  ...insighterreport,
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
                                setInsighterReport({
                                  ...insighterreport,
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
                                setInsighterReport({
                                  ...insighterreport,
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
                                setInsighterReport({
                                  ...insighterreport,
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
																setInsighterReport({
																	...insighterreport,
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
                                name="attachedPDF"
                                onChange={onSelect}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <span className="file-custom"> Attach PDF </span>
                            </label>
                            {insighterreport.attachedPDF ? (
                              <div className="facebook-image-name">
                                {"   " + insighterreport.attachedPDF.name}
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
                                name="featureimage"
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={onSelect}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <span className="file-custom"> Featured Image </span>
                            </label>
                            <div className="resolution"> Image size XXX x XXX </div>
                            {insighterreport.featureimage ? (
                              <div className="facebook-image-name">
                                {"   " + insighterreport.featureimage.name}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input
                              defaultValue={date}
                              type="date"
                              name="DateForSorting"
                              required
                              id="inputField3"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterReport({
                                  ...insighterreport,
                                  dateforsorting: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField3" className="floating_label"> Date </label>
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
                          />{" "}
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
                              <span className="file-custom"> Facebook OG Image </span>
                            </label>
                            <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                            {insighterreport.facebookogimage ? (
                              <div className="facebook-image-name">
                                {"   " + insighterreport.facebookogimage.name}
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

export default withRouter(CreateInsighterReport);
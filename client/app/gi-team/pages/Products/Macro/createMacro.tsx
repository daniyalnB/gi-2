import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import queryString from "query-string";
import CurrencyInput from "react-currency-input";
import { Helmet } from "react-helmet";
import history from "../../../../../utils/history";
import { AddOrUpdateMacro } from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const CreateMacro = (props) => {

    const [save, setSave] = useState(false);
    const [draft, setDraft] = useState(false);

    const [error, setError] = useState(false);
    const [priceerror, setPriceError] = useState(false);

    const [macro, setMacro] = useState({
        permalink: "",
        title: "",
        tabtitle: "",
        price: 0,
        metadescription: "",
        metatitle: "",
        featureimage: "",
        description: "",
        facebookogimage: "",
        isoutofstock: false,
        isdraft: true,
        versionedfile: "",
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
    setMacro({ ...macro, [e.target.name]: e.target.files[0] });

    const handleSubmit = (e) => {
        if (macro.isdraft == false) {
            setSave(true);
            setDraft(false);
        } else {
            setSave(false);
            setDraft(true);
        }
        e.preventDefault();
        const payload = {
            permalink: macro.permalink.replace(/\/$/, ""),
            title: macro.title,
            tabtitle: macro.tabtitle,
            price: macro.price,
            metadescription: macro.metadescription,
            metatitle: macro.metatitle,
            isoutofstock: macro.isoutofstock,
            isdraft: macro.isdraft,
            keywords: macro.keywords,
        };
        const formData = new FormData();
        formData.append("featureimage", macro.featureimage);
        formData.append("facebookogimage", macro.facebookogimage);
        formData.append("versionedfile", macro.versionedfile);
        formData.append("description", convertedContent);
    
        const stringified = queryString.stringify(payload);
    
        AddOrUpdateMacro(stringified, formData).subscribe((response) => {
            if (response.response.Requested_Action) {
                setMacro({
                    permalink: "",
                    title: "",
                    tabtitle: "",
                    price: 0,
                    metadescription: "",
                    metatitle: "",
                    featureimage: "",
                    description: "",
                    facebookogimage: "",
                    isoutofstock: false,
                    isdraft: true,
                    versionedfile: "",
                    keywords: "",
                });
                setSave(false);
                setDraft(false);
                setError(false);
                history.push("/gi-team/products/macro");
                document.getElementById("form").reset()
            } else {
                setSave(false);
                setDraft(false);
                setError(response.response.Message);
            }
        });
    };

    function checkPrice (val) {
        if (val >= 50) {
            setPriceError(false);
        } else {
            setPriceError(true);
        }
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
                    Create Macro Product - Actionable Insights Admin
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
                                            Create Macro Product
                                        </h3>
                                        <div className="status_draft">
                                            <span> Draft </span>
                                        </div>
                                    </div>
                                    <div className="col-3 text-right back">
                                        <Link
                                            className="bk"
                                            to="/gi-team/products/macro"
                                        >
                                            <img src={back} className=""/>
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                <hr />
                                <form onSubmit={handleSubmit} id="form" noValidate={macro.isdraft ? true : false}>
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
                                                                setMacro({
                                                                    ...macro,
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
                                                            name="Title" 
                                                            required 
                                                            id="inputField1" 
                                                            className="input-area"
                                                            onChange={(e) =>
                                                                setMacro({
                                                                    ...macro,
                                                                    title: e.currentTarget.value,
                                                                })
                                                            }
                                                        />
                                                        <label htmlFor="inputField1" className="floating_label"> Title </label>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="form-group nogroup">
                                                        <CurrencyInput
                                                            thousandSeparator=","
                                                            value={macro.price / 100}
                                                            name="Price"
                                                            id="inputField3"
                                                            className="input-area"
                                                            onChange={(e, maskedvalue) => {
                                                                setMacro({
                                                                    ...macro,
                                                                    price: parseInt((maskedvalue * 100)),
                                                                });
                                                                checkPrice(parseInt((maskedvalue * 100)));
                                                            }}
                                                        />
                                                        <label htmlFor="inputField3" className="floating_label"> Price </label>
                                                    </div>
                                                    {priceerror ? (
                                                        <div
                                                            style={{
                                                                color: "#db422d",
                                                                marginBottom: "20px",
                                                                marginTop: "-10px",
                                                                fontSize: "12px",
                                                                fontWeight: 600,
                                                                padding: "0px 4px",
                                                            }}
                                                        > 
                                                            Price must be at least $0.50 usd
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="form-group nogroup">
                                                        <label className="file">
                                                            <input
                                                                type="file"
                                                                name="versionedfile"
                                                                onChange={onSelect}
                                                                onClick={(e) => (e.target.value = null)}
                                                            />
                                                            <span className="file-custom">  Macro File  </span>
                                                        </label>
                                                        {macro.versionedfile ? (
                                                            <div className="facebook-image-name">
                                                                {"   " + macro.versionedfile.name}
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
                                                            <span className="file-custom">  Featured Image  </span>
                                                        </label>
                                                        <div className="resolution"> Image size XXX x XXX </div>
                                                        {macro.featureimage ? (
                                                            <div className="facebook-image-name">
                                                                {"   " + macro.featureimage.name}
                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="form-group nogroup">
                                                        <textarea
                                                            name="metatitle"
                                                            required
                                                            maxLength={160}
                                                            id="textField1"
                                                            className="input-area"
                                                            onChange={(e) =>
                                                                setMacro({
                                                                    ...macro,
                                                                    metatitle: e.currentTarget.value,
                                                                })
                                                            }
                                                        />  
                                                        <label htmlFor="textField1" className="floating_label"> Meta Title </label>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="form-group nogroup">
                                                        <textarea
                                                            name="metadescription"
                                                            required
                                                            maxLength={160}
                                                            id="textField2"
                                                            className="input-area"
                                                            onChange={(e) =>
                                                                setMacro({
                                                                    ...macro,
                                                                    metadescription: e.currentTarget.value,
                                                                })
                                                            }
                                                        />  
                                                        <label htmlFor="textField2" className="floating_label"> Meta Description </label>
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
																setMacro({
																	...macro,
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
                                                        <textarea
                                                            name="tabtitle"
                                                            required
                                                            id="textField3"
                                                            className="input-area"
                                                            onChange={(e) =>
                                                                setMacro({
                                                                    ...macro,
                                                                    tabtitle: e.currentTarget.value,
                                                                })
                                                            }
                                                        />  
                                                        <label htmlFor="textField3" className="floating_label"> Tab Title </label>
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
                                                            <span className="file-custom">  Facebook OG Image  </span>
                                                        </label>
                                                        <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                                                        {macro.facebookogimage ? (
                                                            <div className="facebook-image-name">
                                                                {"   " + macro.facebookogimage.name}
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
                                                    onClick={() => setMacro({ ...macro, isdraft: false })}
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
                                                    onClick={() => setMacro({ ...macro, isdraft: true })}
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

export default withRouter(CreateMacro);
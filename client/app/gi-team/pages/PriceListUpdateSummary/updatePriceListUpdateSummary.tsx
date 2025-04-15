import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import {
    convertToRaw,
    EditorState,
    ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import queryString from "query-string";
import moment from "moment";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { 
    AddOrUpdatePriceListUpdateSummary,
    GetAllPriceListUpdateSummary,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const UpdatePriceListUpdateSummary = (props) => {
    
    const [loadingData, setLoadingData] = useState(true);

    const [publish, setPublish] = useState(false);
    const [draft, setDraft] = useState(false);

    const [error, setError] = useState(false);

    function parse (val) {
        const name = queryString.parse(`name=${val}`).name;
        return name;
    }

    var someDate = new Date();
    someDate.setDate(someDate.getDate() + 0);
    var date = someDate.toISOString().substr(0, 10);

    const [data, setData] = useState([]);

    const [pricelist, setPriceList] = useState({
        id: "",
        permalink: "",
        tabtitle: "",
        title: "",
        iframeurl : "",
        metadescription: "",
        metatitle: "",
        selecteddate: date,
        description: "",
        facebookogimage: "",
        keywords: "",
        isdraft: true,
    });

    useEffect(() => {
        GetAllPriceListUpdateSummary().subscribe((response) => {
            if (response.response.Requested_Action) {
                const x = response.response.data.filter(
                    (pricelist) => pricelist.id === props.match.params.id
                )[0];
                setData(x);
                const contentBlock = htmlToDraft(x.description);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState);
                }
                setPriceList({
                    ...pricelist,
                    id: x.id,
                    permalink: x.permalink,
                    title: x.title,
                    tabtitle: x.tabtitle,
                    iframeurl: x.iframeurl,
                    metadescription: x.metadescription,
                    metatitle: x.metatitle,
                    selecteddate: moment(x.selecteddate).format("yyyy-MM-DD"),
                    description: x.description,
                    facebookogimage: x.facebookogimage,
                    keywords: x.keywords,
                    isdraft: x.draft,
                });
                setConvertedContent(x.description);
                setLoadingData(false);
            } else {
               alert("error");
            }
        });
    }, []);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [convertedContent, setConvertedContent] = useState(null);
    // console.log(convertedContent, "convertedContent");
  
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        setConvertedContent(html);
    };

    const onSelect = (e) =>
    setPriceList({ ...pricelist, [e.target.name]: e.target.files[0] });

    const handleSubmit = (e) => {
        if (pricelist.isdraft == false) {
            setPublish(true);
            setDraft(false);
        } else {
            setPublish(false);
            setDraft(true);
        }
        e.preventDefault();
        setTimeout(() => {
            const payload = {
                id: pricelist.id,
                permalink: pricelist.permalink.replace(/\/$/, ""),
                title: pricelist.title,
                tabtitle: pricelist.tabtitle,
                iframeurl: pricelist.iframeurl,
                metadescription: pricelist.metadescription,
                metatitle: pricelist.metatitle,
                selecteddate: `${moment(pricelist.selecteddate).format("01.MM.yyyy")}`,
                keywords: pricelist.keywords,
                isdraft: pricelist.isdraft,
            };
            const formData = new FormData();
            formData.append("facebookogimage", pricelist.facebookogimage);
            formData.append("description", convertedContent);
        
            const stringified = queryString.stringify(payload);
        
            AddOrUpdatePriceListUpdateSummary(stringified, formData).subscribe((response) => {
                if (response.response.Requested_Action) {
                    setPublish(false);
                    setDraft(false);
                    setError(false);
                    history.push("/gi-team/price-list-update-summary");
                } else {
                    setPublish(false);
                    setDraft(false);
                    setError(response.response.Message);
                }
            });
        }, 1000);
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
                    Update Price List Update Summary - Actionable Insights Admin
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
                                            Price List Update Summary
                                        </h3>
                                        {pricelist.isdraft == true ? (
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
                                            to={props.location.state ? props.location.state.path : "/gi-team/price-list-update-summary"}
                                        >
                                            <img src={back} className=""/>
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                <hr />
                                {!loadingData && (
                                    <form onSubmit={handleSubmit} noValidate={pricelist.isdraft ? true : false}>
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
                                                                value={pricelist.permalink}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
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
                                                                name="title" 
                                                                required 
                                                                id="inputField1" 
                                                                className="input-area"
                                                                value={pricelist.title}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
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
                                                                name="url" 
                                                                required 
                                                                id="inputField2" 
                                                                className="input-area"
                                                                value={pricelist.iframeurl}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
                                                                        iframeurl: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField2" className="floating_label"> iframe URL </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input
                                                                type="date"
                                                                name="Date" 
                                                                required 
                                                                id="inputField4" 
                                                                className="input-area"
                                                                value={pricelist.selecteddate}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
                                                                        selecteddate: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField4" className="floating_label"> Select Date </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <textarea
                                                                name="tabtitle"
                                                                required
                                                                id="textField1"
                                                                className="input-area"
                                                                value={pricelist.tabtitle}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
                                                                        tabtitle: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField1" className="floating_label"> Tab Title </label>
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
                                                                id="textField2"
                                                                className="input-area"
                                                                value={pricelist.metatitle}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
                                                                        metatitle: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField2" className="floating_label"> Meta Title </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <textarea
                                                                name="metadescription"
                                                                required
                                                                maxLength={160}
                                                                id="textField3"
                                                                className="input-area"
                                                                value={pricelist.metadescription}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
                                                                        metadescription: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField3" className="floating_label"> Meta Description </label>
                                                        </div>
                                                    </div>
                                                </div>
												<div className="row">
                                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                                        <div className="form-group nogroup">
                                                            <textarea
                                                                name="keywords"
                                                                // required
                                                                id="textField4"
                                                                className="input-area"
                                                                value={pricelist.keywords}
                                                                onChange={(e) =>
                                                                    setPriceList({
                                                                        ...pricelist,
                                                                        keywords: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField3" className="floating_label"> Keywords </label>
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
                                                            {pricelist.facebookogimage ? (
                                                                <div className="facebook-image-name">
                                                                    <a href={pricelist.facebookogimage} target="_blank">
                                                                        {pricelist.facebookogimage.name ? (
                                                                            `${"   " + pricelist.facebookogimage.name}`
                                                                        ) : (
                                                                            parse(`${pricelist.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
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
                                                {!publish && (
                                                    <button 
                                                        className="btn" 
                                                        type="submit"
                                                        disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                                                        onClick={() => setPriceList({ ...pricelist, isdraft: false })}
                                                    > 
                                                        <span> Update </span>
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
                                                        onClick={() => setPriceList({ ...pricelist, isdraft: true })}
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
                                                    You need to be an Admin or Editor to Update
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

export default withRouter(UpdatePriceListUpdateSummary);
import React, { useState, useEffect } from 'react';
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
import { Helmet } from "react-helmet";
import moment from "moment";
import history from "../../../../utils/history";
import { 
    AddOrUpdateInsightSheet,
    GetAllInsightSheets,
    GetAllMacros,
} from "../../../../utils/api-routes/api-routes.util";
import mnew from "assets/new.png"
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";

const UpdateInsightSheet = (props) => {

    const [loading, setLoading] = useState(true);

    const [publish, setPublish] = useState(false);
    const [draft, setDraft] = useState(false);

    const [error, setError] = useState(false);

    const [searchMacro, setSearchMacro] = useState('');

    const [cat, setCat] = useState(false);
    const [macro, setMacro] = useState(false);
    const [category, setCategory] = useState("");
    const [mp, setMP] = useState("");

    function parse (val) {
        const name = queryString.parse(`name=${val}`).name;
        return name;
    }

    var someDate = new Date();
    someDate.setDate(someDate.getDate() + 0);
    var date = someDate.toISOString().substr(0, 10);

    const [macroData, setMacroData] = useState([]);

    useEffect(() => {
        GetAllMacros().subscribe((response) => {
            if (response.response.Requested_Action) {
                setMacroData(response.response.data);
            } else {
                alert("error");
            }
        });
    }, []);

    const [insightsheet, setInsightSheet] = useState({
        id: "",
        permalink: "",
        title: "",
        tabtitle: "",
        catagory: "",
        alboardapproval: date,
        lastupdate: date,
        contributer: "",
        iframeurl: "",
        principleauthor: "",
        macroid: "",
        xacttitle: "",
        xactiframeurl: "",
        metadescription: "",
        metatitle: "",
        xactiframeimage: "",
        featureimage: "",
        tags: "",
        description: "",
        featureddescription: "",
        keywords: "",
        facebookogimage: "",
        isdraft: true,
    });

    useEffect(() => {
        GetAllInsightSheets().subscribe((response) => {
            if (response.response.Requested_Action) {
                const x = response.response.data.filter(
                    (insightsheet) => insightsheet.id === props.match.params.id
                )[0];
                if (x == undefined) {
                    history.push("/gi-team/insight-sheets");
                }
                const contentBlock = htmlToDraft(x.description);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState);
                }
                setInsightSheet({
                    ...insightsheet,
                    id: x.id,
                    permalink: x.permalink,
                    title: x.title,
                    tabtitle: x.tabtitle,
                    catagory: x.catagory,
                    alboardapproval: `${moment(x.alboardapproval).format("YYYY-MM-DD")}`,
                    lastupdate: `${moment(x.lastupdate).format("YYYY-MM-DD")}`,
                    contributer: x.contributer,
                    iframeurl: x.iframeurl,
                    principleauthor: x.principleauthor,
                    macroid: x.macro.id,
                    xacttitle: x.xacttitle,
                    xactiframeurl: x.xactiframeurl,
                    metadescription: x.metadescription,
                    metatitle: x.metatitle,
                    xactiframeimage: x.xactiframeimage,
                    featureimage: x.featureimage,
                    tags: x.tags,
                    description: x.description,
                    featureddescription: x.featureddescription,
                    keywords: x.keywords,
                    facebookogimage: x.facebookogimage,
                    isdraft: x.draft, 
                });
                setMP(x.macro.title);
                setConvertedContent(x.description);
                setLoading(false);
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
    setInsightSheet({ ...insightsheet, [e.target.name]: e.target.files[0] });

    const handleSubmit = (e) => {
        if (insightsheet.isdraft == false) {
            setPublish(true);
            setDraft(false);
        } else {
            setPublish(false);
            setDraft(true);
        }
        e.preventDefault();
        setTimeout(() => {
            const payload = {
                id: insightsheet.id,
                permalink: insightsheet.permalink.replace(/\/$/, ""),
                title: insightsheet.title,
                tabtitle: insightsheet.tabtitle,
                catagory: insightsheet.catagory,
                alboardapproval: insightsheet.alboardapproval,
                lastupdate: insightsheet.lastupdate,
                contributer: insightsheet.contributer,
                iframeurl: insightsheet.iframeurl,
                principleauthor: insightsheet.principleauthor,
                macroid: insightsheet.macroid,
                xacttitle: insightsheet.xacttitle,
                xactiframeurl: insightsheet.xactiframeurl,
                metadescription: insightsheet.metadescription,
                metatitle: insightsheet.metatitle,
                tags: insightsheet.tags,
                isdraft: insightsheet.isdraft,
            };
            const formData = new FormData();
            formData.append("xactiframeimage", insightsheet.xactiframeimage);
            formData.append("featureimage", insightsheet.featureimage);
            formData.append("facebookogimage", insightsheet.facebookogimage);
            formData.append("description", convertedContent);
            formData.append("featureddescription", insightsheet.featureddescription);
            formData.append("keywords", insightsheet.keywords);

            const stringified = queryString.stringify(payload);
    
            AddOrUpdateInsightSheet(stringified, formData).subscribe((response) => {
                if (response.response.Requested_Action) {
                    setPublish(false);
                    setDraft(false);
                    setError(false);
                    history.push("/gi-team/insight-sheets");
                } else {
                    setPublish(false);
                    setDraft(false);
                    setError(response.response.Message);
                }
            });
        }, 1000);
    };

    const publishedMacro = macroData.filter((val) => val.draft === false);

    const filterMacro = publishedMacro.filter((val) =>
        val.title.toLowerCase().includes(searchMacro.toLowerCase())
    );

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
                    Update Insight Sheet - Actionable Insights Admin
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
                                            Insight Sheet
                                        </h3>
                                        {insightsheet.isdraft == true ? (
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
                                            to="/gi-team/insight-sheets"
                                        >
                                            <img src={back} className=""/>
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                <hr />
                                <div className="row info">
                                    <h3> Information </h3>
                                </div>
                                {!loading && (
                                    <form onSubmit={handleSubmit} noValidate={insightsheet.isdraft ? true : false}>
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
                                                                value={insightsheet.permalink}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
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
                                                                value={insightsheet.title}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
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
                                                                value={insightsheet.catagory} 
                                                                type="text" 
                                                                name="Catagory" 
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
                                                                        setInsightSheet({
                                                                            ...insightsheet,
                                                                            catagory: e.currentTarget.innerHTML,
                                                                        });
                                                                    }}
                                                                > 
                                                                    Repair 
                                                                </h3>
                                                                <h3 
                                                                    onClick={(e) => {
                                                                        setCategory(e.currentTarget.innerHTML);
                                                                        setCat(!cat);
                                                                        setInsightSheet({
                                                                            ...insightsheet,
                                                                            catagory: e.currentTarget.innerHTML,
                                                                        });
                                                                    }}
                                                                > 
                                                                    Mitigation 
                                                                </h3> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input
                                                                type="date" 
                                                                name="AL" 
                                                                required 
                                                                id="inputField3" 
                                                                className="input-area"
                                                                value={insightsheet.alboardapproval} 
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        alboardapproval: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField3" className="floating_label"> AL board approval </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                type="date"
                                                                name="LU" 
                                                                required 
                                                                id="inputField4" 
                                                                className="input-area"
                                                                value={insightsheet.lastupdate}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        lastupdate: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField4" className="floating_label"> Last update </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                type="text" 
                                                                name="Contributor" 
                                                                required 
                                                                id="inputField5" 
                                                                className="input-area"
                                                                value={insightsheet.contributer}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        contributer: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField5" className="floating_label"> Contributor </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                type="text" 
                                                                name="URL" 
                                                                required 
                                                                id="inputField6" 
                                                                className="input-area"
                                                                value={insightsheet.iframeurl}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        iframeurl: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField6" className="floating_label"> iframe URL </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                type="text" 
                                                                name="PA" 
                                                                required 
                                                                id="inputField7" 
                                                                className="input-area"
                                                                value={insightsheet.principleauthor}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        principleauthor: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField7" className="floating_label"> Principal Author </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                onClick={() => setMacro(!macro)} 
                                                                value={mp}
                                                                type="text" 
                                                                name="Category" 
                                                                required 
                                                                id="inputField8" 
                                                                className="input-area"
                                                                style={{ 
                                                                    color: "transparent",
                                                                    textShadow: "0 0 0 #000",
                                                                    cursor: "pointer",
                                                                }}
                                                            />
                                                            <label htmlFor="inputField8" className="floating_label"> Macro Products </label>
                                                            <label className="file_input_label">
                                                                {macro ?
                                                                    <img 
                                                                        className="select size"
                                                                        src={up} 
                                                                        onClick={() => setMacro(!macro)}
                                                                    />
                                                                :
                                                                    <img 
                                                                        className="select size"
                                                                        src={down} 
                                                                        onClick={() => setMacro(!macro)}
                                                                    />
                                                                }
                                                            </label>
                                                            <div className={macro ? "active_new" : "dropdown-content"}>
                                                                <div className="form-group nogroup">
                                                                    <div className="input-group">
                                                                        <input 
                                                                            type="text" 
                                                                            className="form-control" 
                                                                            placeholder="Search"
                                                                            onChange={(e) => {
                                                                                setSearchMacro(e.target.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="macro-options">
                                                                    {filterMacro.length <= 0 ? (
                                                                            <div className="no-result">
                                                                                <h3 style={{ cursor: "auto" }}>
                                                                                    No results!
                                                                                </h3>
                                                                            </div>
                                                                    ) : (
                                                                        <>
                                                                            {filterMacro.map((val,key) => {
                                                                                return (
                                                                                    <div key={key}>
                                                                                        <h3
                                                                                            onClick={(e) => [
                                                                                                setMP(e.currentTarget.innerHTML), 
                                                                                                setMacro(!macro),
                                                                                                setInsightSheet({
                                                                                                    ...insightsheet,
                                                                                                    macroid: val.id
                                                                                                })
                                                                                                ]
                                                                                            }
                                                                                        > 
                                                                                            {val.title}
                                                                                        </h3>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <hr />
                                                                <div  className="add_new">
                                                                    <Link
                                                                        to="/gi-team/products/create-macro"
                                                                    >
                                                                        <img src={mnew} />
                                                                        Add new
                                                                    </Link> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                type="text" 
                                                                name="xtitle" 
                                                                required 
                                                                id="inputField9" 
                                                                className="input-area"
                                                                value={insightsheet.xacttitle}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        xacttitle: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField9" className="floating_label"> Xact title </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                type="text" 
                                                                name="xurl" 
                                                                required 
                                                                id="inputField10" 
                                                                className="input-area"
                                                                value={insightsheet.xactiframeurl}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        xactiframeurl: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField10" className="floating_label"> Xact iframe URL </label>
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
                                                                value={insightsheet.tabtitle}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
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
                                                                value={insightsheet.featureddescription}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        featureddescription: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField2" className="floating_label"> Featured Description </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                                        <div className="form-group nogroup">
                                                            <textarea
                                                                name="keywords"
                                                                // required
                                                                id="textField3"
                                                                className="input-area"
                                                                value={insightsheet.keywords}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        keywords: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField3" className="floating_label"> Keywords </label>
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
                                                                id="textField4"
                                                                className="input-area"
                                                                value={insightsheet.metatitle}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        metatitle: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField4" className="floating_label"> Meta Title </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <textarea
                                                                name="metadescription"
                                                                required
                                                                maxLength={160}
                                                                id="textField5"
                                                                className="input-area"
                                                                value={insightsheet.metadescription}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        metadescription: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />  
                                                            <label htmlFor="textField5" className="floating_label"> Meta Description </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                        <div className="form-group nogroup">
                                                            <label className="file">
                                                                <input
                                                                    type="file"
                                                                    name="xactiframeimage"
                                                                    accept="image/png, image/jpg, image/jpeg, image/webp"
                                                                    onChange={onSelect}
                                                                    onClick={(e) => (e.target.value = null)}
                                                                />
                                                                <span className="file-custom">  Xact Iframe Image  </span>
                                                            </label>
                                                            {insightsheet.xactiframeimage ? (
                                                                <div className="facebook-image-name">
                                                                    <a href={insightsheet.xactiframeimage} target="_blank">
                                                                        {insightsheet.xactiframeimage.name ? (
                                                                            `${"   " + insightsheet.xactiframeimage.name}`
                                                                        ) : (
                                                                            parse(`${insightsheet.xactiframeimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
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
                                                                    name="featureimage"
                                                                    accept="image/png, image/jpg, image/jpeg, image/webp"
                                                                    onChange={onSelect}
                                                                    onClick={(e) => (e.target.value = null)}
                                                                />
                                                                <span className="file-custom">  Featured Image  </span>
                                                            </label>
                                                            {insightsheet.featureimage ? (
                                                                <div className="facebook-image-name">
                                                                    <a href={insightsheet.featureimage} target="_blank">
                                                                        {insightsheet.featureimage.name ? (
                                                                            `${"   " + insightsheet.featureimage.name}`
                                                                        ) : (
                                                                            parse(`${insightsheet.featureimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
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
                                        <div className="row info">
                                            <h3> Other </h3>
                                        </div>
                                        <div className="info-data">
                                            <div className="form-holder">
                                                <div className="row">
                                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                                        <div className="form-group nogroup">
                                                            <input 
                                                                type="text" 
                                                                name="tags" 
                                                                required 
                                                                id="inputField13" 
                                                                className="input-area"
                                                                value={insightsheet.tags}
                                                                onChange={(e) =>
                                                                    setInsightSheet({
                                                                        ...insightsheet,
                                                                        tags: e.currentTarget.value,
                                                                    })
                                                                }
                                                            />
                                                            <label htmlFor="inputField13" className="floating_label"> Tags </label>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                            {insightsheet.facebookogimage ? (
                                                                <div className="facebook-image-name">
                                                                    <a href={insightsheet.facebookogimage} target="_blank">
                                                                        {insightsheet.facebookogimage.name ? (
                                                                            `${"   " + insightsheet.facebookogimage.name}`
                                                                        ) : (
                                                                            parse(`${insightsheet.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
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
                                                        onClick={() => setInsightSheet({ ...insightsheet, isdraft: false })}
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
                                                        onClick={() => setInsightSheet({ ...insightsheet, isdraft: true })}
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

export default withRouter(UpdateInsightSheet);
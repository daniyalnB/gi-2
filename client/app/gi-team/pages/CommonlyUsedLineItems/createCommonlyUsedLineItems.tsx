import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import history from "../../../../utils/history";
import { AddOrUpdateCommonlyOverlookedLineItems } from "../../../../utils/api-routes/api-routes.util";
import browse from "assets/upload.svg";
import back from "assets/arrowleft.svg";

const CreateCommonlyUsedLineItems = (props) => {

    const [loading, setLoading] = useState(false);

    const [lineitems, setLineItems] = useState({
        iframeURL: "",
        coverimage: "",
        facebookogimage: "",
    });

    const onSelect = (e) =>
    setLineItems({ ...lineitems, [e.target.name]: e.target.files[0] });

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const payload = {
            iframeURL: lineitems.iframeURL,
        };
        const formData = new FormData();
        formData.append("coverimage", lineitems.coverimage);
        formData.append("facebookogimage", lineitems.facebookogimage);
    
        const stringified = queryString.stringify(payload);
    
        AddOrUpdateCommonlyOverlookedLineItems(stringified, formData).subscribe((response) => {
            if (response.response.Requested_Action) {
                setLineItems({
                    iframeURL: "",
                    coverimage: "",
                    facebookogimage: "",
                });
                setLoading(false);
                history.push("/gi-team/commonly-used-line-items");
                document.getElementById("form").reset()
            } else {
                alert("error");
            }
        });
    };

    return (
        <>
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
                                            Create Commonly Used Line Items
                                        </h3>
                                    </div>
                                    <div className="col-3 text-right back">
                                        <Link
                                            className="bk"
                                            to="/gi-team/commonly-used-line-items"
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
                                                            name="url" 
                                                            required 
                                                            id="inputField1" 
                                                            className="input-area"
                                                            onChange={(e) =>
                                                                setLineItems({
                                                                    ...lineitems,
                                                                    iframeURL: e.currentTarget.value,
                                                                })
                                                            }
                                                        />
                                                        <label htmlFor="inputField1" className="floating_label"> iframe URL </label>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="form-group nogroup">
                                                        <input 
                                                            type="button" 
                                                            name="cimage" 
                                                            required 
                                                            id="inputField2" 
                                                            className="input-area"
                                                        />
                                                        <label htmlFor="inputField2" className="floating_label"> Cover image </label>
                                                        <label className="file_input_label">
                                                            <input
                                                                type="file"
                                                                name="coverimage"
                                                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                                                style={{ display: "none"}}
                                                                onChange={onSelect}
                                                                onClick={(e) => (e.target.value = null)}
                                                            />
                                                            <img 
                                                                className={lineitems.coverimage == "" ? "upload" : "upload-new"}
                                                                src={browse} 
                                                            />
                                                        </label>
                                                        {lineitems.coverimage ? (
                                                        <div className="image-name">{"   " + lineitems.coverimage.name}</div>
                                                        ) : (
                                                        <div></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-data" style={{ margin: "0 0 0 5px" }}>
                                        <div className="form-holder">
                                            <div className="row">
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                    <div className="form-group nogroup">
                                                        <input 
                                                            type="button" 
                                                            name="fimage" 
                                                            required 
                                                            id="inputField14" 
                                                            className="input-area"
                                                            style={{marginBottom: "0px"}}
                                                        />
                                                        <label htmlFor="inputField14" className="floating_label"> Facebook OG Image </label>
                                                        <label className="file_input_label">
                                                            <input
                                                                type="file"
                                                                name="facebookogimage"
                                                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                                                style={{ display: "none"}}
                                                                onChange={onSelect}
                                                                onClick={(e) => (e.target.value = null)}
                                                            />
                                                            <img 
                                                                className={lineitems.facebookogimage == "" ? "facebook" : "facebook-new"}
                                                                src={browse} 
                                                            />
                                                        </label>
                                                        <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                                                        {lineitems.facebookogimage ? (
                                                        <div className="facebook-image-name">{"   " + lineitems.facebookogimage.name}</div>
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
                                                > 
                                                    <span> Save </span>
                                                </button>
                                            }
                                            {loading && (
                                                <button className="btn" disabled> 
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                    <span> Saving... </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(CreateCommonlyUsedLineItems);
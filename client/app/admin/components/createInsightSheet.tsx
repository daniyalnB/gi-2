import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideMenu from "../../admin/components/SideMenu";
import UserTab from "../../admin/components/UserTab";
import Text_Editor from "../../admin/components/Editor";
import browse from "assets/upload.png";
import mnew from "assets/new.png"
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";

export default function CreateInsightSheet (props) {

    const [cat, setcat] = useState(false);
    const [macro, setmacro] = useState(false);
    const [category, setCategory] = useState("");
    const [mp, setMP] = useState("");

    return (
        <>
            <div className="createInsightSheet">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
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
                                            Create Insight Sheet
                                        </h3>
                                        <div className="status">
                                            <span> Draft </span>
                                        </div>
                                    </div>
                                    <div className="col-3 text-right back">
                                        <Link
                                            className="bk"
                                            to="/admin/insightsheet"
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
                                <div className="info-data">
                                    <div className="form-holder">
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="Title" 
                                                        required 
                                                        id="inputField1" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField1" className="floating_label"> Title </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        onClick={() => setcat(!cat)} 
                                                        value={category} 
                                                        type="text" 
                                                        name="Category" 
                                                        required 
                                                        id="inputField2" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField2" className="floating_label"> Category </label>
                                                    <label className="file_input_label">
                                                        { cat 
                                                            ?
                                                            <img 
                                                                className="select size"
                                                                src={up} 
                                                                onClick={() => setcat(!cat)}
                                                            />
                                                            :
                                                            <img 
                                                                className="select size"
                                                                src={down} 
                                                                onClick={() => setcat(!cat)}
                                                            />
                                                        }
                                                    </label>
                                                    <div className={cat ? "active" : "dropdown-content" }>
                                                        <h3 
                                                            onClick={(e) => [
                                                                setCategory(e.currentTarget.innerHTML), 
                                                                setcat(!cat)
                                                                ]
                                                            }> 
                                                            Repair 
                                                        </h3>
                                                        <h3 
                                                            onClick={(e) => [
                                                                setCategory(e.currentTarget.innerHTML), 
                                                                setcat(!cat)
                                                                ]
                                                            }> 
                                                            Mitigation 
                                                        </h3> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="AL" 
                                                        required 
                                                        id="inputField3" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField3" className="floating_label"> AL board approval </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="LU" 
                                                        required 
                                                        id="inputField4" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField4" className="floating_label"> Last update </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="Contributor" 
                                                        required 
                                                        id="inputField5" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField5" className="floating_label"> Contributor </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="URL" 
                                                        required 
                                                        id="inputField6" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField6" className="floating_label"> iframe URL </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="PA" 
                                                        required 
                                                        id="inputField7" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField7" className="floating_label"> Principal Author </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        onClick={() => setmacro(!macro)} 
                                                        value={mp} 
                                                        type="text" 
                                                        name="Category" 
                                                        required 
                                                        id="inputField8" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField8" className="floating_label"> Macro Products </label>
                                                    <label className="file_input_label">
                                                        { macro 
                                                            ?
                                                            <img 
                                                                className="select size"
                                                                src={up} 
                                                                onClick={() => setmacro(!macro)}
                                                            />
                                                            :
                                                            <img 
                                                                className="select size"
                                                                src={down} 
                                                                onClick={() => setmacro(!macro)}
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
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="macro-options">
                                                            <h3 
                                                                onClick={(e) => [
                                                                    setMP(e.currentTarget.innerHTML), 
                                                                    setmacro(!macro)
                                                                    ]
                                                                }> 
                                                                Insulation & Drywall Behind Toilet V1.0 
                                                            </h3>
                                                            <h3 
                                                                onClick={(e) => [
                                                                    setMP(e.currentTarget.innerHTML), 
                                                                    setmacro(!macro)
                                                                    ]
                                                                }> 
                                                                Vinyl Windows with Stucco Elevations V1.1 
                                                            </h3>
                                                        </div>
                                                        <hr />
                                                        <div  className="add_new">
                                                            <Link
                                                                to=""
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
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="xtitle" 
                                                        required 
                                                        id="inputField9" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField9" className="floating_label"> Xact title </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="xurl" 
                                                        required 
                                                        id="inputField10" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField10" className="floating_label"> Xact iframe URL </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="button" 
                                                        name="ximage" 
                                                        required 
                                                        id="inputField11" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField11" className="floating_label"> Xact iframe image </label>
                                                    <label className="file_input_label">
                                                        <input
                                                            type="file" 
                                                            style={{ display: "none"}}
                                                        />
                                                        <img 
                                                            className="upload"
                                                            src={browse} 
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="button" 
                                                        name="fimage" 
                                                        required 
                                                        id="inputField12" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField12" className="floating_label"> Featured image </label>
                                                    <label className="file_input_label">
                                                        <input
                                                            type="file" 
                                                            style={{ display: "none"}}
                                                        />
                                                        <img 
                                                            className="upload"
                                                            src={browse} 
                                                        />
                                                    </label>
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
                                                <Text_Editor />
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
                                            <div className="col-8">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="tags" 
                                                        required 
                                                        id="inputField13" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField13" className="floating_label"> Tags </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 newcol">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="button" 
                                                        name="fimage" 
                                                        required 
                                                        id="inputField14" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField14" className="floating_label"> Facebook OG Image </label>
                                                    <label className="file_input_label">
                                                        <input
                                                            type="file" 
                                                            style={{ display: "none"}}
                                                        />
                                                        <img 
                                                            className="upload"
                                                            src={browse} 
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="second-hr" />
                                <div className="Buttons">
                                    <div className="row">
                                        <button className="btn"> 
                                            <span> Publish </span>
                                        </button>
                                        <button className="btn draft"> 
                                            <span> Save as Draft </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};
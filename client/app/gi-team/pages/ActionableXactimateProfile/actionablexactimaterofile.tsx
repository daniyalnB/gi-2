import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import {
  AddAIProfilelogo,
  GetAllAILogos,
  DeleteAILogo,
} from "../../../../utils/api-routes/api-routes.util";
import aiprofilelogosred from "assets/AiProfileLogosRed.svg";
import create from "assets/create.png";
import modalclose from "assets/modal-close.svg";
import Delete from "assets/delete.svg";

const ActionableXactimateProfileLogos = () => {
	
  const [loadingData, setLoadingData] = useState(true);

  const [logos, setLogos] = useState([]);

	function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  useEffect(() => {
    GetAllAILogos().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLogos(response.response.data);
        setLoadingData(false);
      }
    });
  }, []);

  const [error, setError] = useState(false);
  const [logo, setLogo] = useState({});
  const [companyurl, setCompanyurl] = useState("");
  const [validCompanyurl, setValidCompanyurl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardpopupshow, setCardpopupshow] = useState(false);
  const handlecardclose = () => setCardpopupshow(!cardpopupshow);

  const handleLogos = (e) => {
    if (e.target.files) {
      setLogo({ logo: [...e.target.files] });
    }
  };

  const isCompanyUrlValid = (url) => {
    var pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    if(!pattern.test(url)) {
			setValidCompanyurl(false)
		} else {
			setValidCompanyurl(true);
		}
  };

  const uploadLogos = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      companyurl: companyurl,
    }
    const formData = new FormData();
    formData.append("logo", logo.logo[0]);

    const stringified = queryString.stringify(payload);

    AddAIProfilelogo(stringified, formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLogo({});
        setCompanyurl("");
        setLoading(false);
        setError(false);
        handlecardclose();
        update();
      } else {
        setLoading(false);
        setError(true);
      }
    });
  };

  const handleDeleteLogo = (data) => {
    const payload = { logourl: data };
    const stringify = queryString.stringify(payload);
    DeleteAILogo(stringify).subscribe((response) => {
      if (response.response.Requested_Action) {
        update();
      }
    });
  };

  function update() {
    GetAllAILogos().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLogos(response.response.data);
        setLoadingData(false);
      }
    });
  }

  return (
    <>
      <Helmet>
        <title>AI Profile Logos</title>
      </Helmet>
      <Modal
        show={cardpopupshow}
        onHide={handlecardclose}
        backdrop="static"
        keyboard={false}
        centered
        className="uploadiconphotos"
      >
        <Modal.Header>
          <div className="duplicate_title modal-title h4">AI Profile Logos</div>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={handlecardclose}
          >
            <img src={modalclose} />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <form onSubmit={uploadLogos}>
            <div className="row">
              <div className="col">
                <div className="form-group nogroup">
                  <label className="file">
                    <input
                      type="file"
                      required
                      name="logo"
                      accept="image/png, image/jpg, image/jpeg, image/webp"
                      onChange={handleLogos}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <span className="file-custom"> Upload Images </span>
                  </label>
                  <div className="facebook-image-name">
                    {logo.logo &&
                      logo.logo.map((val, index) => {
                        return (
                          <div style={{ margin: "10px auto" }} key={index}>
                            <a href={val} target="_blank">
                              {logo.logo[0].name ? `${"   " + val.name}` : ""}
                            </a>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-group nogroup">
                  <input 
                    type="text" 
                    name="CompanyURL" 
                    required
                    id="inputField0" 
                    className="input-area"
                    onChange={(e) => {
                      setCompanyurl(e.currentTarget.value);
                      isCompanyUrlValid(e.currentTarget.value);
                    }}
                  />
                  <label htmlFor="inputField0" className="floating_label"> Company URL </label>
                </div>
                {!validCompanyurl && companyurl != "" && (
                  <p
                    style={{
                      margin: "10px 0px 0px 0px",
                      color: "#DB422D",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    This URL is invalid
                  </p>
                )}
              </div>
            </div>
            {error ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontStyle: "italic",
                }}
              >
                Failed to upload logo.
              </p>
            ) : (
              ""
            )}
            <div className="modalFooter">
              <button
                className="btn"
                type="submit"
                disabled={!validCompanyurl && companyurl != "" ? true : loading ? true : false}
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="insightsheet">
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
              <div className="insightsheet-section">
                <div className="row header">
                  <div className="col-9">
                    <div className="page_icon">
                      <img src={aiprofilelogosred} />
                    </div>
                    <h3 className="heading">AI Profile Logos</h3>
                  </div>
                  {localStorage.getItem("role") == "Analyst" ? (
                    ""
                  ) : (
                    <div className="col-3 text-right">
                      <button
                        className="btn"
                        onClick={() => {
                          handlecardclose();
                          setError(false);
                        }}
                      >
                        <img src={create} />
                        Add New
                      </button>
                    </div>
                  )}
                </div>
                <hr />
                {!loadingData && (
                  <div className="inner_sub_area" style={{ padding: "10px" }}>
                    {logos?.length > 0 ? (
                      logos.map((logo) => {
                        return (
                          <div className="row products-data" key={logo.id}>
                            <div className="col">
                              <div className="data">
                                <div className="row">
                                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12">
                                    <div className="data-image-one d-flex align-items-center justify-content-center">
                                      <img src={logo.logourl} />
                                    </div>
                                  </div>
                                  <div className="reporting col-xl-8 col-lg-8 col-md-6 col-sm-10">
																		<h3> {parse(logo.logourl?.replace("https://getinsights2-data.s3.amazonaws.com/", ""))} </h3>
                                    <p> {logo.companyurl ? logo.companyurl : "N/A"} </p>
                                  </div>
                                  <div className="delete-icon col-xl-1 col-lg-1 col-md-2 col-sm-2">
                                    <img
                                      src={Delete}
                                      alt="delete"
                                      onClick={() =>
                                        handleDeleteLogo(logo.logourl)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="row products-data">
                        <div className="col">
                          <div className="data">
                            <div className="row">
                              <div className="no-logo-found col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <h3> No logos available to show. </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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

export default withRouter(ActionableXactimateProfileLogos);

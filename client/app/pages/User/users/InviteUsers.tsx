import React, { Suspense, useEffect, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../../../contexts/appContext";
import history from "../../../../utils/history";
import { Helmet } from "react-helmet";
import validator from "validator";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import down from "assets/down-arrow-user.svg";

const InviteUsers = () => {

  const [path, setPath] = useState(location.pathname);

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const [users, setUsers] = useState(1);

  const [key, setKey] = useState(0);

  const [check, setCheck] = useState(false);

  const handleOnChange = (value) => {

    if (value > 100) {
      setCheck(true);
    } else {
      setCheck(false);
    }

    const obj = {
      toInvite: "",
      firstname: "",
      lastname: "",
      branch: "",
      role: "",
      inviteMessage: `It's me, the account administrator of your new Actionable ${subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan Monthly" : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan Annual" : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan Monthly" : "Enterprise Plan Annual"}! Please follow the instructions in this email to finish setting up your account and gain access to the Actionable Xactimate Profile.`,
      XactProfileveriskid: "",
      useparentspaymentmethod: true,
    };

    const obj1 = {
      check: 0,
    };

    const obj2 = {
      emailCheck: false,
      veriskCheck: false,
    };

    const num = value - users;

    setUsers(value);

    if (num > 0) {
      for (let x = 0; x < num; x++) {
        setFields((prevFields) => [...prevFields, obj]);
        setFilled((prevFields) => [...prevFields, obj1]);
        setEmailsCheck((prevFields) => [...prevFields, obj2]);
      }
    } else {
      fields.length = fields.length + num;
      setFields(fields);
      filled.length = filled.length + num;
      setFilled(filled);
      emailsCheck.length = emailsCheck.length + num;
      setEmailsCheck(emailsCheck);
    }
  };

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  useEffect(() => {
    setSubscriptionInfo(myInfo.subscriptioninfo);
    setFields([
      {
        toInvite: "",
        firstname: "",
        lastname: "",
        branch: "",
        role: "",
        inviteMessage: `It's me, the account administrator of your new Actionable ${subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan Monthly" : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan Annual" : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan Monthly" : "Enterprise Plan Annual"}! Please follow the instructions in this email to finish setting up your account and gain access to the Actionable Xactimate Profile.`,
        XactProfileveriskid: "",
        useparentspaymentmethod: true,
      },
    ]);
  }, [myInfo]);

  const [fields, setFields] = useState([
    {
      toInvite: "",
      firstname: "",
      lastname: "",
      branch: "",
      role: "",
      inviteMessage: "",
      XactProfileveriskid: "",
      useparentspaymentmethod: true,
    },
  ]);

  const [filled, setFilled] = useState([
    {
      check: 0,
    },
  ]);

  const [emailsCheck, setEmailsCheck] = useState([
    {
      emailCheck: false,
      veriskCheck: false,
    },
  ]);

  const validation = fields.every(person => person.toInvite && person.firstname && person.lastname && person.branch && person.role && person.inviteMessage && person.XactProfileveriskid);

  const onChange = (e, index) => {
    const indexed = index + 1;
    let target = e.currentTarget;

    setFields((prevFields) =>
      prevFields.map((pF, i) =>
        i + 1 === indexed ? { ...pF, [target.name]: target.value === "Collaborator" ? "ProfessionalPlanChild" : target.value} : pF
      )
    );
  };

  const EmailCheck = (value) => {
    for (let i = 0; i < users; i++) {
      if (validator.isEmail(value)) {
        const indexed = i + 1;
        setEmailsCheck((prevFields) =>
          prevFields.map((pF, i) =>
            i + 1 === indexed ? { ...pF, emailCheck: true } : pF
          )
        );
      } else {
        const indexed = i + 1;
        setEmailsCheck((prevFields) =>
          prevFields.map((pF, i) =>
            i + 1 === indexed ? { ...pF, emailCheck: false } : pF
          )
        );
      }
    }
  };

  const VeriskCheck = (value) => {
    for (let i = 0; i < users; i++) {
      if (validator.isEmail(value)) {
        const indexed = i + 1;
        setEmailsCheck((prevFields) =>
          prevFields.map((pF, i) =>
            i + 1 === indexed ? { ...pF, veriskCheck: true } : pF
          )
        );
      } else {
        const indexed = i + 1;
        setEmailsCheck((prevFields) =>
          prevFields.map((pF, i) =>
            i + 1 === indexed ? { ...pF, veriskCheck: false } : pF
          )
        );
      }
    }
  };

  const filledChange = (value) => {
    for (let i = 0; i < value; i++) {
      if (Object.values(fields[i]).every(x => (x !== null && x !== "" && x !== ''))) {
        const indexed = i + 1;
        setFilled((prevFields) =>
          prevFields.map((pF, i) =>
            i + 1 === indexed ? { ...pF, check: 1 } : pF
          )
        );
      } else {
        const indexed = i + 1;
        setFilled((prevFields) =>
          prevFields.map((pF, i) =>
            i + 1 === indexed ? { ...pF, check: 0 } : pF
          )
        );
      }
    }
  };

  const [role, setRole] = useState(false);

  const renderInputs = (value) => {

    const inputs = [];

    for (let i = 0; i < value; i++) {
      inputs.push(
        <Tab eventKey={i} title={i + 1} tabClassName={filled[i].check == 1 ? "new_id" : "old_id"}>
          <div className="user_info">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> Company Email Address </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="email"
                    name="toInvite"
                    required
                    className="form-control"
                    placeholder="Enter Company Email Address"
                    onChange={(e) => {
                      onChange(e, i);
                      EmailCheck(e.currentTarget.value);
                    }}
                    onPaste={(e) => EmailCheck(e.currentTarget.value)}
                  />
                  {!emailsCheck[i].emailCheck && fields[i].toInvite !== "" && (
                    <p
                      style={{
                        margin: "10px 0px 0px 0px",
                        color: "#DB422D",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Oops! That doesn't look like a valid email address.
                    </p>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> Xactware/Verisk ID </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="XactProfileveriskid"
                    required
                    className="form-control"
                    placeholder="Enter Xactware/Verisk ID"
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                  <label
                    style={{
                      fontSize: "12px",
                      color: "#B8B8B8",
                      margin: "5px 0px 0px 0px",
                    }}
                  >
                    Ex. The email address they use to log in to Xactimate
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> First Name </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="firstname"
                    required
                    className="form-control"
                    placeholder="Enter First Name"
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> Last Name </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="lastname"
                    required
                    className="form-control"
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> Branch/Location </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="branch"
                    required
                    className="form-control"
                    placeholder="Enter Branch/Location"
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 invite_select">
                <div className="form-group">
                  <label> Role </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="role"
                    required
                    className="form-control"
                    placeholder="Enter Role"
                    value={fields[i].role == "" ? "" : fields[i].role == "ProfessionalPlanCoAdmin" ? "Co-Admin" : "Collaborator"}
                    onClick={() => setRole(!role)}
                  />
                  <label className="file_input_label">
                    <img
                      className="select size"
                      src={down}
                      onClick={() => setRole(!role)}
                    />
                  </label>
                  <div className={role ? "active-dropdown" : "dropdown-content"}>
                    {/* <input
                      className="role"
                      type="text"
                      name="role"
                      value="Co-Admin"
                      onClick={(e) => {
                        onChange(e, i);
                        setRole(!role);
                      }}
                    /> */}
                    <input
                      className="role"
                      type="text"
                      name="role"
                      value="Collaborator"
                      onClick={(e) => {
                        onChange(e, i);
                        setRole(!role);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 message">
                <div className="form-group">
                  <label> Invitation Message </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <textarea
                    name="inviteMessage"
                    className="form-control bd"
                    placeholder={`It's me, the account administrator of your new Actionable ${subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan Monthly" : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan Annual" : subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan Monthly" : "Enterprise Plan Annual"}! Please follow the instructions in this email to finish setting up your account and gain access to the Actionable Xactimate Profile.`}
                    value={fields[i].inviteMessage}
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Tab>
      );
    }
    return inputs;
  };

  const [objContactInformationForOrderDTO, setObjContactInformationForOrderDTO] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    companyname: "",
    branch: "",
    streetaddress: "",
    aptorunitorsuite: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    profilepicture: "",
  });

  useEffect(() => {
    if (myInfo) {
      setObjContactInformationForOrderDTO({
        ...objContactInformationForOrderDTO,
        firstname: myInfo.ownerinfo.firstname,
        lastname: myInfo.ownerinfo.lastname,
        phonenumber: myInfo.ownerinfo.phonenumber,
        companyname: myInfo.ownerinfo.companyname ? myInfo.ownerinfo.companyname : "",
        branch: myInfo.ownerinfo.branch ? myInfo.ownerinfo.branch : "",
        streetaddress: myInfo.ownerinfo.streetaddress ? myInfo.ownerinfo.streetaddress : "",
        aptorunitorsuite: myInfo.ownerinfo.aptorunitorsuite ? myInfo.ownerinfo.aptorunitorsuite : "",
        city: myInfo.ownerinfo.city ? myInfo.ownerinfo.city : "",
        state: myInfo.ownerinfo.state ? myInfo.ownerinfo.state : "",
        zipcode: myInfo.ownerinfo.zipcode ? myInfo.ownerinfo.zipcode : "",
        profilepicture: myInfo.ownerinfo.profilepicture,
      });
    }
  }, [myInfo]);

  const handleSubmit = () => {
    localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
    history.push({
      pathname: "/checkout",
      state: {
        invite_users: fields,
        type: "invite_users",
        planName: (myInfo.subscriptioninfo.planname === "EnterprisePlan" || myInfo.subscriptioninfo.planname === "EnterprisePlanAnnual") ? "EP" : "PP",
        path: path,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message = "The page that you're refreshing may cause loss of entered information. Do you want to continue?";
    e.returnValue = message;
    return message;
  };

  return (
    <>
      <Helmet>
        <title>Invite Users - Actionable Insights</title>
      </Helmet>
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
        {subscriptionInfo ? (
          <>
						{subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual" &&
							(subscriptionInfo.subscriptionstatus === "Active" ||
							subscriptionInfo.subscriptionstatus === "Paused" ||
							subscriptionInfo.subscriptionstatus === "PausedDueToPaymentFailure" ||
							subscriptionInfo.subscriptionstatus === "PendingCancellation") &&
							localStorage.getItem("roleCustomer") !== "ReadOnly" ? (
              <>
                <ScrollToTop />
                <Navbar />
                <Breadcrumbs />
                <div className="main-container">
                  <div className="Invite_Users">
                    <div className="">
                      <div className="holder">
                        <h2> Invite Users </h2>
                      </div>
                      <div>
                        <Link className="back-to-my-account" to="/users">
                          Back to Manage Users
                        </Link>
                        <form onSubmit={handleSubmit} autoComplete="off">
                          <div className="multiple_users">
                            <div className="users">
                              <div className="nousers" id="nousers">
                                <h3 className="text-left">
                                  {" "}
                                  Number of Users:{" "}
                                </h3>
                                <input
                                  type="number"
                                  defaultValue={users}
                                  required
                                  autoComplete="new-password"
                                  id="search-users"
                                  min="1"
                                  max="100"
                                  name="search-users"
                                  onKeyDown={(e) =>
                                    (e.keyCode === 69 ||
                                      e.keyCode === 190 ||
                                      e.keyCode === 189 ||
                                      e.keyCode === 187) &&
                                    e.preventDefault()
                                  }
                                  step="1"
                                  className="form-control"
                                  onBlur={(value) => handleOnChange(value.currentTarget.value)}
                                  onKeyPress={(e) => {e.key === "Enter" && e.preventDefault()}}
                                />
                              </div>
                              {check ? (
                                <div
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#DB422D",
                                    padding: "20px",
                                  }}
                                >
                                  Number of Users must be less than or equal to 100
                                </div>
                              ) : (
                                <div className="inner_users">
                                  <div className="row">
                                    <div className="col">
                                      <div className="subs_filters">
                                        <Tabs
                                          activeKey={key}
                                          onSelect={(k) => {
                                            setKey(k);
                                            filledChange(users);
                                          }}
                                          transition={false}
                                          id="noanim-tab-example"
                                        >
                                          {renderInputs(users)}
                                        </Tabs>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            {check ? (
                              ""
                            ) : (
                              <>
                                {!validation && users >= 2 && (
                                  <div className="error-msg">
                                    <h2> Please add details of all sub users. </h2>
                                  </div>
                                )}
                                <div className="checkout">
                                  <button
                                    className="btn"
                                    type="submit"
                                    disabled={validation ? false : true}
                                  >
                                    Proceed to Checkout
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <WrongBrowserDisclaimer />
                <CookieConsentGI2 />
                <Footer />
              </>
            ) : (
              history.push(`/my-account`)
            )}
          </>
        ) : (
          <>
            <ScrollToTop />
            <Navbar />
            <Breadcrumbs />
            <div className="main-container">
              <div className="Invite_Users">
                <div className="">
                  <div className="holder">
                    <h2> Invite Users </h2>
                  </div>
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                </div>
              </div>
            </div>
            <WrongBrowserDisclaimer />
            <CookieConsentGI2 />
            <Footer />
          </>
        )}
      </Suspense>
    </>
  );
};

export default withRouter(InviteUsers);
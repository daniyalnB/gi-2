import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { Modal } from "react-bootstrap";
import queryString from "query-string";
import moment from "moment";
import NumberFormat from "react-number-format";
import AdminTable from "../../components/TableExtra";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { 
  getCustomerInfoById,
  updateCustomerPassword,
  resendVerificationEmail,
  updateXactProfileAdmin,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import userpicture from "assets/user-eyes.svg";
import emailicon from "assets/@.svg";
import date from "assets/date.svg";
import user from "assets/user.svg";
import phone from "assets/phone.svg";
import ip from "assets/insighter-points.svg";
import company from "assets/company_admin.svg";
import location from "assets/location_admin.svg";
import vision from "assets/visibility.svg";
import modalclose from "assets/modal-close.svg";
import emailverified from "assets/email-verified.svg";
import emailnotverified from "assets/email-not-verified.svg";
import edit from "assets/Edit_Role.svg";
import save from "assets/Save_Role.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import hubspot from "assets/hubspot.svg";
import showpassword from "assets/show_password.svg";
import hidepassword from "assets/hide_password.svg";
import download from "assets/Download.svg";

const FormElement = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [newpassword, setNewPassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  let str1 = newpassword;
  let str2 = confirmpassword;

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      customerId: props.id,
      newpassword: newpassword,
    };

    const stringified = queryString.stringify(payload);

    updateCustomerPassword(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setError(false);
        props.handlecardclose();
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };

  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePassword1 = () => setPasswordShown1(!passwordShown1);

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePassword2 = () => setPasswordShown2(!passwordShown2);
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type={passwordShown1 ? "text" : "password"}
                name="password"
                required 
                id="inputField1" 
                className="input-area"
                value={newpassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
              />
              <label htmlFor="inputField1" className="floating_label"> New Password </label>
              <img 
                className="input_icon"
                style={{
                  right: "15px",
                  cursor: "pointer",
                }}
                src={passwordShown1 ? showpassword : hidepassword}
                onClick={togglePassword1}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type={passwordShown2 ? "text" : "password"}
                name="confirmpassword" 
                required 
                id="inputField2" 
                className="input-area"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
              <label htmlFor="inputField2" className="floating_label"> Confirm New Password </label>
              <img 
                className="input_icon"
                style={{
                  right: "15px",
                  cursor: "pointer",
                }}
                src={passwordShown2 ? showpassword : hidepassword}
                onClick={togglePassword2}
              />
            </div>
          </div>
        </div>
        {newpassword !== "" && confirmpassword !== "" && (str1 === str2) == true ? (
          // <div className="password-height">
          //   <span className="password-strength strong">
          //     {" "}
          //     Password Matched{" "}
          //   </span>
          // </div>
          ""
        ) : newpassword !== "" && confirmpassword !== "" && (str1 === str2) == false ? (
          <div className="password-height">
            <span className="password-strength">
              {" "}
              Password Mismatch{" "}
            </span>
          </div>
        ) : newpassword == "" && confirmpassword == "" && (str1 === str2) == true ? (
          ""
        ) : (
          ""
        )}
        <div className="modal-save">
          {!loading &&
            <button 
              type="submit" 
              className="btn"
              disabled={
                newpassword == "" ||
                confirmpassword == "" ||
                str1 !== str2
                  ? true
                  : false
              }
            >
              <span> Update </span>
            </button>
          }
          {loading &&
            <button className="btn" disabled> 
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          }
        </div>
        {error ? (
          <div style={{ margin: "20px auto 0px", textAlign: "center" }}>
            <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
              {error}
            </span>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

const UserDetails = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  
  const [orders, setOrders] = useState([]);

  const [certificationsInfo, setCertificationsInfo] = useState([]);
  
  const sortedOrders = orders.sort((a, b) => b.ordernumber - a.ordernumber);

  const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    customerId: "",
    xactProfileCompanyEmailAddress: "",
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

  const [xactProfileStatus, setXactProfileStatus] = useState(false);

  const [xactProfileStatusValue, setXactProfileStatusValue] = useState(false);

  useEffect(() => {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        if (x == undefined) {
          history.push("/gi-team/users");
        }
        setEmailAddress(x.ownerinfo.emailaddress);
        setCertificationsInfo(x.customercertficationinfo.cerstatus);
        setOrders(x.orders);
        if (x.ischilduser) {
          setActionableXactimateProfile({
            customerId: x.id,
            xactProfileCompanyEmailAddress: x.ownerinfo.emailaddress,
            xactProfileveriskid: x.xactProfileveriskid,
            xactProfileStatus: x.xactProfileStatus,
          });
        } else {
          setActionableXactimateProfile({
            customerId: x.id,
            xactProfileCompanyEmailAddress: x.ownerinfo.emailaddress,
            xactProfileveriskid: x.xactProfileveriskid,
            xactProfileStatus: x.xactProfileStatus,
          });
        }
        setLoading(false);
      } else {
        history.push("/gi-team/users");
      }
    });
  }, []);

  const [headers, setHeaders] = useState([
    {
      Header: "Course",
      accessor: false,
    },
    {
      Header: "Status",
      accessor: false,
    },
    {
      Header: "Passed Date",
      accessor: false,
    },
    {
      Header: "AIMC",
      accessor: false,
    },
    {
      Header: "IICRC",
      accessor: false,
    },
  ]);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var currDate = someDate.toISOString().substr(0, 10);

  const [emailaddress , setEmailAddress] = useState("");

  const [loadingEmail, setLoadingEmail] = useState(false);

  const [verificationEmailMsg, setVerificationEmailMsg] = useState(false);

  const handleSubmitEmail = () => {
    setLoadingEmail(true);
    
    setTimeout(() => {
      const payload = {
        emailaddress: emailaddress,
      };

      const stringified = queryString.stringify(payload);

      resendVerificationEmail(stringified).subscribe((response) => {
        if (response) {
          setLoadingEmail(false);
          setVerificationEmailMsg(true);
        } else {
          alert("error");
        }
      });
    }, 1000);
  };

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

  const handleActionableXactimateProfile= () => {

    setTimeout(() => {
      const payload = {
        customerId: ActionableXactimateProfile.customerId,
        XactProfileveriskid: ActionableXactimateProfile.xactProfileveriskid,
        xactProfileStatus: ActionableXactimateProfile.xactProfileStatus,
      };

      const stringified = queryString.stringify(payload);

      updateXactProfileAdmin(stringified).subscribe((response) => {
        if (response.response.Requested_Action) {
          setXactProfileStatus(false);
          setXactProfileStatusValue(false);
        } else {
          setXactProfileStatus(false);
          setXactProfileStatusValue(false);
        }
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title> 
          User Details - Actionable Insights Admin
        </title>
      </Helmet>
      <Modal 
        show={cardpopupshow} 
        onHide={handlecardclose} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div className="add_delete_points modal-title h4"> 
            Change Password
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElement
            handlecardclose={handlecardclose}
            id={data.id}
          ></FormElement>
        </Modal.Body>
      </Modal>
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
                  <div className="col-2">
                    <h3 className="heading">
                      User Details
                    </h3>
                  </div>
                  <div 
                    className="col-10 text-right back"
                    style={{ padding: "0px" }}
                  >
                    <Link
                      className="bk"
                      to="/gi-team/users"
                    >
                      <img src={back} />
                      Back
                    </Link>
                    {!loading && (
                      <>
                        {data.ownerinfo.hubspotvid && (
                          <a
                            className="hubspot"
                            // href={`https://app.hubspot.com/contacts/3936526/contact/${data.ownerinfo.hubspotvid}`}
                             href={`https://app.hubspot.com/contacts/3936526/record/0-1/${data.ownerinfo.hubspotvid}`}
                            target="_blank"
                          >
                            <img src={hubspot}/>
                          </a>
                        )}
                        <div className="user-details-buttons">
                          <button
                            className="btn"
                            onClick={() => history.push(`${data.ischilduser ? `/gi-team/view-subscription/${data.parentinfo.parentid}` : `/gi-team/view-subscription/${data.id}`}`)}
                          >
                            <span> View Subscription </span>
                          </button>
                          <button
                            className="btn cp"
                            disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                            onClick={handlecardshow}
                          >
                            <span> Change Password </span>
                          </button>
                          {localStorage.getItem("role") == "Analyst" ? (
                            ""
                          ) : (
                            <Link
                              className="btn cp"
                              to={`/gi-team/edit-user/${data.id}`}
                            >
                              Edit
                            </Link>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <hr />
                {!loading && (
                  <div className="info-data">
                    <div className="view-data">
                      <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                          <img 
                            className="profilepicture"
                            src={data.ownerinfo.profilePicture ? data.ownerinfo.profilePicture : userpicture}
                            loading="lazy"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-8 col-sm-8">
                          <div className="coupon-date">
                            <img src={user} />
                            <div className="row">
                              <div className="col" style={{ padding: "0px" }}>
                                <h5> First Name </h5>
                                <h4> {data.ownerinfo.firstname} </h4>
                              </div>
                              <div className="col" style={{ padding: "0px" }}>
                                <h5> Last Name </h5>
                                <h4> {data.ownerinfo.lastname} </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-5 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <div className="row">
                              <div className="col" style={{ padding: "0px" }}> 
                                <img src={emailicon} />
                              </div>
                              {data.ownerinfo.emailverified ? (
                                <div className="col verification">
                                  <img src={emailverified} />
                                  <p className="verified"> Verified </p>
                                </div>
                              ) : (
                                <div className="col verification">
                                  <img src={emailnotverified} />
                                  <p className="not-verified"> Not Verified </p>
                                  <div className="status" onClick={handleSubmitEmail}>
                                    {loadingEmail ? (
                                      <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                      <>
                                        {verificationEmailMsg ? (
                                          <>
                                            Email Sent
                                          </>
                                        ) : (
                                          <>
                                            Resend Email
                                          </>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            <h5 style={data.ownerinfo.emailverified ? { marginTop: "9px" } : { marginTop: "0px" }}> 
                              Email 
                            </h5>
                            <h4 style={{ wordBreak: "break-all" }}> {data.ownerinfo.emailaddress}  </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={phone} />
                            <h5> Phone Number </h5>
                            <h4> {data.ownerinfo.phonenumber ? data.ownerinfo.phonenumber : "N/A"} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={ip} />
                            <h5> Insighter Points Balance </h5>
                            {data.nooninsighterpoint == null ? (
                              <h4> N/A </h4> 
                            ) : (
                              <h4 className="pts"> 
                                <NumberFormat
                                  value={data.nooninsighterpoint}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> 
                                &nbsp;<sup>PTS</sup>
                              </h4> 
                            )}
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={date} />
                            <h5> Sign Up Date </h5>
                            <h4> {moment(data.ownerinfo.joiningdate).format("MM/DD/YYYY")} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={date} />
                            <h5> Last Login </h5>
                            {data.lastlogin == null ? (
                              <h4> N/A </h4> 
                            ) : (
                              <h4> {moment(data.lastlogin).format("MM/DD/YYYY")} </h4>
                            )}
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={company} />
                            <h5> Company Name </h5>
                            <h4> {data.ownerinfo.companyname ? data.ownerinfo.companyname : "N/A"} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={emailicon} />
                            <h5> Alternate Billing Email ID </h5>
                            <h4 style={{ wordBreak: "break-all" }}>
                              {data.ownerinfo.alternatebillingemailid ? data.ownerinfo.alternatebillingemailid : "N/A"}
                            </h4>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="coupon-date">
                            <img src={location} />
                            <div className="row">
                              <div className="col" style={{ paddingLeft: "0px" }}>
                                <h5> Street Address </h5>
                                <h4> {data.ownerinfo.streetaddress ? data.ownerinfo.streetaddress : "N/A"} </h4>
                              </div>
                              <div className="col" style={{ paddingLeft: "0px" }}>
                                <h5> Apt., Unit, or Suite # </h5>
                                <h4> {data.ownerinfo.aptorunitorsuite ? data.ownerinfo.aptorunitorsuite : "N/A"} </h4>
                              </div>
                              <div className="col" style={{ paddingLeft: "0px" }}>
                                <h5> City</h5>
                                <h4> {data.ownerinfo.city ? data.ownerinfo.city : "N/A"} </h4>
                              </div>
                              <div className="col" style={{ paddingLeft: "0px" }}>
                                <h5> State </h5>
                                <h4> {data.ownerinfo.state ? data.ownerinfo.state : "N/A"} </h4>
                              </div>
                              <div className="col" style={{ padding: "0px" }}>
                                <h5> Zip Code </h5>
                                <h4> {data.ownerinfo.zipcode ? data.ownerinfo.zipcode : "N/A"} </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "50px" }}>
                        <div className="col-12">
                          <h4 className="images"> Recent Orders </h4>
                          <div className="sizes-view">
                            <div className="row sizes">
                              <div className="col-3 sizes-heading">
                                <div className="val"> Order Number </div>
                              </div>
                              <div className="col-2 sizes-heading">
                                <div className="val"> Date </div>
                              </div>
                              <div className="col-3 sizes-heading">
                                <div className="val"> Category </div>
                              </div>
                              <div className="col-2 sizes-heading">
                                <div className="val"> Price </div>
                              </div>
                              <div className="col-2 sizes-heading">
                                
                              </div>
                              <div className="col-3 size">
                                {sortedOrders && sortedOrders.length == 0 ? (
                                  <div className="val-inner"> N/A </div>
                                ) : (
                                  <>
                                    {sortedOrders && sortedOrders.slice(0, 5).map((val) => {
                                      return ( 
                                        <div className="val-inner"> #{val.ordernumber} </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                              <div className="col-2 size">
                                {sortedOrders && sortedOrders.length == 0 ? (
                                  <div className="val-inner"> N/A </div>
                                ) : (
                                  <>
                                    {sortedOrders && sortedOrders.slice(0, 5).map((val) => {
                                      return ( 
                                        <div className="val-inner"> {moment(val.orderplacedon).format("MM/DD/YYYY")} </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                              <div className="col-3 size">
                                {sortedOrders && sortedOrders.length == 0 ? (
                                  <div className="val-inner"> N/A </div>
                                ) : (
                                  <>
                                    {sortedOrders && sortedOrders.slice(0, 5).map((val) => {
                                      return ( 
                                        <div className="val-inner"> {val.catagory ? val.catagory : "N/A"} </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                              <div className="col-2 size">
                                {sortedOrders && sortedOrders.length == 0 ? (
                                  <div className="val-inner"> N/A </div>
                                ) : (
                                  <>
                                    {sortedOrders && sortedOrders.slice(0, 5).map((val) => {
                                      return ( 
                                        <div className="val-inner">
                                          <NumberFormat
                                            value={(val.pricepaidincents / 100).toFixed(2)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"$"}
                                          />
                                        </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                              <div className="col-2 size">
                                {sortedOrders && sortedOrders.length == 0 ? (
                                  <div className="val-inner">  </div>
                                ) : (
                                  <>
                                    {sortedOrders && sortedOrders.slice(0, 5).map((val) => {
                                      return ( 
                                        <div className="val-inner text-center"> 
                                          <Link
                                            to={`/gi-team/view-order/${val.ordernumber}`}
                                          >
                                            <img src={vision} />
                                          </Link>
                                        </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {certificationsInfo.length != 0 && (
                        <div className="row" style={{ marginTop: "50px" }}>
                          <div className="col-12">
                            <h4 className="images"> Certifications </h4>
                            <div className="sizes-view">
                              <AdminTable
                                tableClesses={"event-attendees-table"}
                                headers={headers}
                                showHeaders={true}
                                data={certificationsInfo}
                                Row={({ index, rowData }) => {
                                  return (
                                    <tr key={index}>
                                      <td> {rowData.original.certificationtitle ? rowData.original.certificationtitle : "N/A"} </td>
                                      <td>
                                        {
                                          rowData.original.status == 0 ? "In Progress" :
                                          rowData.original.status == 1 ? "Awaiting Exam" :
                                          rowData.original.status == 2 ? "Failed" :
                                          rowData.original.status == 3 ? "Active" :
                                          rowData.original.status == 5 ? "Withdrawn - In Progress" :
                                          rowData.original.status == 6 ? "Withdrawn - Awaiting Challenge" :
                                          rowData.original.status == 7 ? "Withdrawn - Failed" : "In Active"
                                        } 
                                      </td>
                                      <td> {rowData.original.passdate ? moment(rowData.original.passdate).format("MM/DD/YYYY") : "N/A"} </td>
                                      <td>
                                        {rowData.original.certificateUrl != null && (
                                          <a target="_blank" href={rowData.original.certificateUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </td>
                                      <td>
                                        {rowData.original.iicrcCertificateUrl != null && (
                                          <a target="_blank" href={rowData.original.iicrcCertificateUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {/* {data.subscriptioninfo.planname === "ProfessionalPlan" || data.ischilduser || data.subscriptioninfo.subscriptionstatus === "Cancelled" ? ( */}
                        <div className="row" style={{ marginTop: "50px" }}>
                          <div className="col-12">
                            <div className="Actionable_Xactimate_Profile">
                              <h4> Actionable Xactimate Profile </h4>
                              <div className="xactProfileStatus">
                                {xactProfileStatus ? (
                                  <>
                                    <div className="form-holder nogroup">
                                      <input
                                        onClick={(e) => setXactProfileStatusValue(!xactProfileStatusValue)}
                                        value={ActionableXactimateProfile.xactProfileStatus}
                                        type="text"
                                        name="Catagory"
                                        required
                                        id="inputField3"
                                        className="input-area"
                                      />
                                      <label className="file_input_label">
                                        {xactProfileStatusValue ? (
                                          <img
                                            className="select size"
                                            src={up}
                                            onClick={() => setXactProfileStatusValue(!xactProfileStatusValue)}
                                          />
                                        ) : (
                                          <img
                                            className="select size"
                                            src={down}
                                            onClick={() => setXactProfileStatusValue(!xactProfileStatusValue)}
                                          />
                                        )}
                                      </label>
                                      <div className={xactProfileStatusValue ? "active" : "dropdown-content"}>
                                        <h3
                                          onClick={(e) => {
                                            setXactProfileStatusValue(!xactProfileStatusValue)
                                            setActionableXactimateProfile({
                                              ...ActionableXactimateProfile,
                                              xactProfileStatus: e.currentTarget.innerHTML,
                                            });
                                          }}
                                        >
                                          Inactive 
                                        </h3>
                                        <h3
                                          onClick={(e) => {
                                            setXactProfileStatusValue(!xactProfileStatusValue)
                                            setActionableXactimateProfile({
                                              ...ActionableXactimateProfile,
                                              xactProfileStatus: e.currentTarget.innerHTML,
                                            });
                                          }}
                                        >
                                          Pending
                                        </h3>
                                        <h3
                                          onClick={(e) => {
                                            setXactProfileStatusValue(!xactProfileStatusValue)
                                            setActionableXactimateProfile({
                                              ...ActionableXactimateProfile,
                                              xactProfileStatus: e.currentTarget.innerHTML,
                                            });
                                          }}
                                        >
                                          Active
                                        </h3>
                                      </div>
                                    </div>
                                    <img
                                      src={save}
                                      onClick={() => handleActionableXactimateProfile()}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <span> {ActionableXactimateProfile.xactProfileStatus} </span>
                                    <img
                                      src={edit}
                                      onClick={() => setXactProfileStatus(true)}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="sizes-view">
                              <div className="row sizes">
                                <div className="col-6 sizes-heading">
                                  <div className="val"> Company Email Address </div>
                                </div>
                                <div className="col-6 sizes-heading">
                                  <div className="val"> Xactware/Verisk ID </div>
                                </div>
                                <div className="col-6 size">
                                  <div className="val-inner"> {ActionableXactimateProfile.xactProfileCompanyEmailAddress ? ActionableXactimateProfile.xactProfileCompanyEmailAddress : "N/A"} </div>
                                </div>
                                <div className="col-6 size">
                                  <div className="val-inner"> {ActionableXactimateProfile.xactProfileveriskid ? ActionableXactimateProfile.xactProfileveriskid : "N/A"} </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      {/* ) : (
                        ""
                      )} */}
                    </div>
                  </div>
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

export default withRouter(UserDetails);
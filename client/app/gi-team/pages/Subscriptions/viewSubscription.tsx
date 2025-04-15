import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import AdminTable from "../../components/TableExtra";
import AdminTableCoAdmin from "../../components/Table";
import { Helmet } from "react-helmet";
import { CSVLink } from "react-csv";
import Modal from "react-bootstrap/Modal";
import queryString from "query-string";
import moment from "moment";
import validator from "validator";
import NumberFormat from "react-number-format";
import history from "../../../../utils/history";
import {
  getCustomerInfoById,
  getCustomerSubscriptionHistory,
  getCustomerInvitationHistoryAdmin,
  changeSubscriptionPlanStatusToPendingCancellationAdmin,
  cancelCustomersSubscriptionPlan,
  removeChildAccountAdmin,
  GetCustomerAcountAlias,
  AddCustomerAcountAlias,
  RemoveCustomerAcountAlias,
  UpdateCustomerAcountAliasPassword,
  addCouponAgainstSubscription,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import download from "assets/Download.svg";
import visa from "assets/visa.png";
import mastercard from "assets/mastercard.png";
import AmericanExpress from "assets/americanexpress.png";
import JCB from "assets/jcb.svg";
import discover from "assets/discover.png";
import isDefaultIcon from "assets/is-default.svg";
import vision from "assets/visibility.svg";
import trash from "assets/Del_Role.svg";
import alert from "assets/Alert.svg";
import success from "assets/tick2.svg";
import new_role from "assets/New_Role.svg";
import showpassword from "assets/show_password.svg";
import hidepassword from "assets/hide_password.svg";
import del from "assets/Del_Role.svg";
import edit from "assets/Edit_Role.svg";
import modalclose from "assets/modal-close.svg";
import add from "assets/add.svg";
import Refund from "assets/Refund-Red.svg";

const FormElementCollaborator = (props) => {

  const [loading, setLoading] = useState(false);

  const [Err, setErr] = useState("");

  const removeCollaborator = () => {
    setLoading(true);

    const payload = {
			parentCustomerId: props.removeCollaborator.parentCustomerId,
      childEmailToRemove: props.removeCollaborator.childEmailToRemove,
		};

    const stringified = queryString.stringify(payload);

    removeChildAccountAdmin(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        updateData();
      }
      else {
        setErr(response.response.Message);
        setLoading(false);
      }
    });
  };

  const close = () => {
    props.handlecardclose1();
  };

  function updateData () {
    getCustomerInfoById(props.removeCollaborator.parentCustomerId).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        props.handleCollaborators(x.childs, x.removedChild);
        setLoading(false);
        props.handlecardclose1();
      }
    });
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p> Are you sure you want to remove this user as sub user? </p>
        </div>
      </div>
      {Err ? (
        <>
          <div className="text-center">
            <i 
              style={{
                color: "#DB422D",
                fontSize: "18px"
              }}>
              <small>
                {Err}
              </small>
            </i>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="modal-save">
        <button 
          className="btn" 
          onClick={close}
        >
          <span> Cancel </span>
        </button>
        {!loading && ( 
          <button 
            className="btn"
            style={{ marginLeft: "15px" }}
            onClick={removeCollaborator}
          >
            <span> Remove </span>
          </button>
        )}
        {loading && (
          <button 
            disabled
            className="btn"
            style={{ marginLeft: "15px" }}
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        )}
      </div>
    </>
  );
};

const FormElementCoAdmin = (props) => {
  
  const [loading, setLoading] = useState(false);

  const [Err, setErr] = useState("");

  const removeCoAdmin = () => {
    setLoading(true);

    const payload = {
			customerid: props.removeCoAdmin.customerid,
      emailaddress: props.removeCoAdmin.emailaddress,
		};

    const stringified = queryString.stringify(payload);

    RemoveCustomerAcountAlias(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        updateData();
      }
      else {
        setErr(response.response.Message);
        setLoading(false);
      }
    });
  };

  const close = () => {
    props.handlecardclose2();
  };

  function updateData () {
    GetCustomerAcountAlias(props.removeCoAdmin.customerid).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        props.handleCoAdmins(x);
        setLoading(false);
        props.handlecardclose2();
      }
    });
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p> Are you sure you want to remove this user as Co-Admin? </p>
        </div>
      </div>
      {Err ? (
        <>
          <div className="text-center">
            <i 
              style={{
                color: "#DB422D",
                fontSize: "18px"
              }}>
              <small>
                {Err}
              </small>
            </i>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="modal-save">
        <button 
          className="btn" 
          onClick={close}
        >
          <span> Cancel </span>
        </button>
        {!loading && ( 
          <button 
            className="btn"
            style={{ marginLeft: "15px" }}
            onClick={removeCoAdmin}
          >
            <span> Remove </span>
          </button>
        )}
        {loading && (
          <button 
            disabled
            className="btn"
            style={{ marginLeft: "15px" }}
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        )}
      </div>
    </>
  );
};

const FormElementUpdateCoAdminPassword = (props) => {

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
      emailaddress: props.emailaddress,
      newpassword: newpassword,
    };

    const stringified = queryString.stringify(payload);

    UpdateCustomerAcountAliasPassword(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setError(false);
        props.handlecardclose3();
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
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
              <label htmlFor="inputField2" className="floating_label"> Confirm Password </label>
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
        {newpassword !== "" &&
          confirmpassword !== "" &&
          (str1 === str2) == true ? (
            // <div className="password-height">
            //   <span className="password-strength strong">
            //     {" "}
            //     Password Matched{" "}
            //   </span>
            // </div>
            ""
          ) : newpassword !== "" &&
            confirmpassword !== "" &&
            (str1 === str2) == false ? (
            <div className="password-height">
              <span className="password-strength">
                {" "}
                Password Mismatch{" "}
              </span>
            </div>
          ) : newpassword == "" &&
            confirmpassword == "" &&
            (str1 === str2) == true ? (
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

const FormElementInviteUser = (props) => {

  const [formDetails, setFormDetails] = useState({
    toInvite: "",
    firstname: "",
    lastname: "",
    branch: "",
    role: "ProfessionalPlanChild",
    inviteMessage: `It's me, the account administrator of your new Actionable ${props.data.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan Monthly" : props.data.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan Annual" : props.data.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan Monthly" : "Enterprise Plan Annual"}! Please follow the instructions in this email to finish setting up your account and gain access to the Actionable Xactimate Profile.`,
    XactProfileveriskid: "",
    useparentspaymentmethod: true,
  });

  const validemail = validator.isEmail(formDetails.toInvite);

  const [data, setData] = useState([]);

  const [checkEmailAlreadyExist, setCheckEmailAlreadyExist] = useState(false);

  useEffect(() => {
    if (props) {
      const users = props.data.childs.map((val) => ({
        users: val.user.emailaddress,
      }));
      const finalUsers = users.map(function (obj) {
        return obj.users;
      });
      setData(finalUsers);
    }
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
			pathname: "/gi-team/invite-user-checkout",
			state: {
        id: props.data.id,
        users: formDetails,
			}
		});
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group nogroup">
              <input 
                type="text"
                name="firstname"
                required 
                id="inputField1" 
                className="input-area"
                value={formDetails.firstname}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    firstname: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="inputField1" className="floating_label"> First Name </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group nogroup">
              <input 
                type="text"
                name="lastname" 
                required 
                id="inputField2" 
                className="input-area"
                value={formDetails.lastname}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    lastname: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="inputField2" className="floating_label"> Last Name </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group nogroup">
              <input 
                type="text"
                name="branch" 
                required 
                id="inputField5" 
                className="input-area"
                value={formDetails.branch}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    branch: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="inputField5" className="floating_label"> Branch/Location </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group nogroup">
              <input 
                type="email"
                name="email" 
                required 
                id="inputField3" 
                className="input-area"
                value={formDetails.toInvite}
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    toInvite: e.currentTarget.value,
                  });
                  setCheckEmailAlreadyExist(data.includes(e.currentTarget.value));
                }}
              />
              <label htmlFor="inputField3" className="floating_label"> Email </label>
              {checkEmailAlreadyExist && (
                <p
                  style={{
                    margin: "10px 0px 0px 0px",
                    color: "#DB422D",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  This user already exists as an active sub user.
                </p>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type="text"
                name="XactProfileveriskid" 
                required 
                id="inputField4" 
                className="input-area"
                value={formDetails.XactProfileveriskid}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    XactProfileveriskid: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="inputField4" className="floating_label"> Xactware/Verisk ID </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group nogroup">
              <textarea
                name="inviteMessage" 
                required 
                id="textField1"
                className="input-area"
                value={formDetails.inviteMessage}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    inviteMessage: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="textField1" className="floating_label"> Message </label>
            </div>
          </div>
        </div>
        <div className="modal-save">
          <button 
            type="submit" 
            className="btn"
            disabled={
              formDetails.toInvite == "" ||
              formDetails.firstname == "" ||
              formDetails.lastname == "" ||
              formDetails.branch == "" ||
              formDetails.role == "" ||
              formDetails.inviteMessage == "" ||
              formDetails.XactProfileveriskid == "" ||
              !validemail ||
              checkEmailAlreadyExist
                ? true
                : false
            }
          >
            <span> Invite </span>
          </button>
        </div>
      </form>
    </>
  );
};

const FormElementAddCoupon = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      subscriptionReceiptId: props.data.subscriptioninfo.subscriptionId,
      couponCode: couponCode,
    };

    const stringified = queryString.stringify(payload);

    addCouponAgainstSubscription(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setError(false);
        props.handleAddCoupon();
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type="text"
                name="couponCode" 
                required 
                id="inputField1" 
                className="input-area"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <label htmlFor="inputField1" className="floating_label"> Discount Code </label>
            </div>
          </div>
          <div className="col-12 mb-3" style={{ marginTop: "-15px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#000000",
              }}
            >
              Note:{" "}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#000000B3",
              }}
            >
              This discount will be applied to next recursion.
            </span>
          </div>
        </div>
        <div className="modal-save">
          {!loading &&
            <button 
              type="submit" 
              className="btn subscription"
            >
              <span> Apply on Next Subscription </span>
            </button>
          }
          {loading &&
            <button className="btn subscription" disabled> 
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

const FormElementAddCouponSuccess = (props) => {

  const closeModal = () => {
    props.handlecardclose6();
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p>
            Coupon added successfully.
          </p>
        </div>
      </div>
      <div className="modal-save">
        <button 
          className="btn"
          style={{ width: "150px" }}
          onClick={closeModal}
        >
          <span> Done </span>
        </button>
      </div>
    </>
  );
};

const ViewSubscription = (props) => {

  const currDate = new Date().toLocaleString();
  const currDateMoment = `${moment(currDate).format("YYYY-MM-DD")}`;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [checkDefaultCard, setCheckDefaultCard] = useState([]);

  const [subscriptionHistoryData, setSubscriptionHistoryData] = useState([]);

  const [childReciptData, setChildReciptData] = useState([]);

  const [Active, setActive] = useState({
    parent: true,
    child: false,
  });

  const [couponInfo, setCouponInfo] = useState([]);

  const [Collaborators, setCollaborators] = useState([]);

  const [deletedCollaborators, setDeletedCollaborators] = useState([]);

  const [coAdmins, setCoAdmins] = useState([]);

  useEffect(() => {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        if (x == undefined) {
          history.push("/gi-team/users");
        }
        setCollaborators(x.childs);
        setDeletedCollaborators(x.removedChild);
        setCouponInfo(x.subscriptioninfo.subscriptioncoupon);
        setCheckDefaultCard(x.stripeCustomerCard.filter((card) => card.isDefault === true));
        getCustomerSubscriptionHistory(x.id).subscribe((response) => {
          if (response.response.Requested_Action) {
            const y = response.response.data;
            setSubscriptionHistoryData(y);
          }
        });
        setCustomerAcountAlias({
          ...CustomerAcountAlias,
          customerid: parseInt(props.match.params.id),
        });
        setRemoveCoAdmin({
          ...removeCoAdmin,
          customerid: parseInt(props.match.params.id), 
        })
        setLoading(false);
      } else {
        history.push("/gi-team/users");
      }
    });
    GetCustomerAcountAlias(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setCoAdmins(x);
      }
    });
  }, []);

  const pmicons = {
    mastercard: mastercard,
    jcb: JCB,
    visa: visa,
    discover: discover,
    amex: AmericanExpress,
  };

  const [loadingCancel, setLoadingCancel] = useState(false);

  const cancelSubscriptionPendingCancellation = (customerId) => {
    setLoadingCancel(true);
    changeSubscriptionPlanStatusToPendingCancellationAdmin({
      customerId: customerId,
    }).subscribe((res) => {
      update();
    });
  };

  function update () {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setLoadingCancel(false);
      }
    });
  };

  const [loadingCancelImmediate , setLoadingCancelImmediate] = useState(false);

  const cancelSubscription = (customerId) => {
    setLoadingCancelImmediate(true);
    cancelCustomersSubscriptionPlan({
      customerId: customerId,
    }).subscribe((res) => {
      updateImmediate();
    });
  };

  function updateImmediate () {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setLoadingCancelImmediate(false);
      }
    });
  };

  const [activeTab, setActiveTab] = useState({
    Active: true,
    Former: false,
  });

  const [headersCollaborators, setHeadersCollaborators] = useState([
    {
      Header: "Email",
      accessor: false,
    },
    {
      Header: "Xactware/Verisk ID",
      accessor: false,
    },
    {
      Header: "Branch/Location",
      accessor: false,
    },
    {
      Header: "First Name",
      accessor: false,
    },
    {
      Header: "Last Name",
      accessor: false,
    },
    {
      Header: " ",
      accessor: false,
    },
  ]);

  const [headersDeletedCollaborators, setHeadersDeletedCollaborators] = useState([
    {
      Header: "Email",
      accessor: false,
    },
    {
      Header: "Xactware/Verisk ID",
      accessor: false,
    },
    {
      Header: "First Name",
      accessor: false,
    },
    {
      Header: "Last Name",
      accessor: false,
    },
    {
      Header: "Added On",
      accessor: false,
    },
    {
      Header: "Removed On",
      accessor: false,
    },
  ]);

  const [headersCoAdmin, setHeadersCoAdmin] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root") {
      setHeadersCoAdmin([
        {
          Header: "Email",
          accessor: "",
        },
        {
          Header: "Role",
          accessor: "",
        },
        {
          Header: " ",
          accessor: false,
        },
      ]);
    } else {
      setHeadersCoAdmin([
        {
          Header: "Email",
          accessor: "",
        },
        {
          Header: "Role",
          accessor: "",
        },
      ]);
    }
  }, []);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => setPasswordShown(!passwordShown);

  const [CustomerAcountAlias, setCustomerAcountAlias] = useState({
    customerid: 0,
    newemailaddress: "",
  });

  const [loadingAddCoAdmin, setLoadingAddCoAdmin] = useState(false);

  const [Err, setErr] = useState("");

  const handleSubmit = (e) => {
    setLoadingAddCoAdmin(true);
    e.preventDefault();
    const payload = {
      customerid: CustomerAcountAlias.customerid,
      newemailaddress: CustomerAcountAlias.newemailaddress,
    };

    const stringified = queryString.stringify(payload);

    AddCustomerAcountAlias(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setCustomerAcountAlias({
          customerid: parseInt(props.match.params.id),
          newemailaddress: "",
        });
        setLoadingAddCoAdmin(false);
        setErr("");
        updateCoAdmins();
        document.getElementById("form").reset();
      } else {
        setErr(response.response.Message);
        setLoadingAddCoAdmin(false);
      }
    });
  };

  function updateCoAdmins () {
    GetCustomerAcountAlias(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setCoAdmins(x);
      }
    });
  };

  const [removeCollaborator, setRemoveCollaborator] = useState({
    parentCustomerId: "",
    childEmailToRemove: "",
  });

  const [cardpopupshow1, setcardpopupshow1] = useState(false);
  const handlecardclose1 = () => setcardpopupshow1(false);
  const handlecardshow1 = () => setcardpopupshow1(true);

  function handleCollaborators(val1, val2) {
    setCollaborators(val1);
    setDeletedCollaborators(val2);
  };

  const [removeCoAdmin, setRemoveCoAdmin] = useState({
    customerid: 0,
    emailaddress: "",
  });

  const [cardpopupshow2, setcardpopupshow2] = useState(false);
  const handlecardclose2 = () => setcardpopupshow2(false);
  const handlecardshow2 = () => setcardpopupshow2(true);

  function handleCoAdmins(newValue) {
    setCoAdmins(newValue);
  };

  const [emailaddress, setEmailAddress] = useState("");

  const [cardpopupshow3, setcardpopupshow3] = useState(false);
  const handlecardclose3 = () => setcardpopupshow3(false);
  const handlecardshow3 = () => setcardpopupshow3(true);

  const [cardpopupshow4, setcardpopupshow4] = useState(false);
  const handlecardclose4 = () => setcardpopupshow4(false);
  const handlecardshow4 = () => setcardpopupshow4(true);

  const [tooltipId, setTooltipId] = useState("");

  const CSVheaders = [
		{
			label: "Email",
			key: "user.emailaddress",
		},
    {
			label: "Xactware/Verisk ID",
			key: "xactProfileveriskid",
		},
		{
			label: "Branch/Location",
			key: "user.branch",
		},
		{
			label: "First Name",
			key: "user.firstname",
		},
    {
			label: "Last Name",
			key: "user.lastname",
		},
  ];

	const SubUsersCSV = {
    headers: CSVheaders,
    data: Collaborators,
    filename: "Sub-Users"
  };
  
  const [cardpopupshow5, setcardpopupshow5] = useState(false);
  const handlecardclose5 = () => setcardpopupshow5(false);
  const handlecardshow5 = () => setcardpopupshow5(true);

  const [cardpopupshow6, setcardpopupshow6] = useState(false);
  const handlecardclose6 = () => setcardpopupshow6(false);
  const handlecardshow6 = () => setcardpopupshow6(true);

  function handleAddCoupon () {
    handlecardclose5();
    handlecardshow6();
    updateCouponInfo();
  };

  function updateCouponInfo () {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setCouponInfo(x.subscriptioninfo.subscriptioncoupon);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          Subscription Details - Actionable Insights Admin
        </title>
      </Helmet>
      <Modal 
        show={cardpopupshow1} 
        onHide={handlecardclose1} 
        className="Invite_Sub-User_Modal"
      >
        <Modal.Header>
          <img src={alert} />
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementCollaborator
            handlecardclose1={handlecardclose1}
            removeCollaborator={removeCollaborator}
            handleCollaborators={handleCollaborators}
          ></FormElementCollaborator>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow2} 
        onHide={handlecardclose2} 
        className="Invite_Sub-User_Modal"
      >
        <Modal.Header>
          <img src={alert} />
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementCoAdmin
            handlecardclose2={handlecardclose2}
            removeCoAdmin={removeCoAdmin}
            handleCoAdmins={handleCoAdmins}
          ></FormElementCoAdmin>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow3} 
        onHide={handlecardclose3} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div 
            className="add_delete_points modal-title h4"
          > 
            Change Password
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose3}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementUpdateCoAdminPassword
            handlecardclose3={handlecardclose3}
            emailaddress={emailaddress}
          ></FormElementUpdateCoAdminPassword>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow4} 
        onHide={handlecardclose4} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div 
            className="add_delete_points modal-title h4"
          > 
            Add Sub User
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose4}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementInviteUser
            handlecardclose4={handlecardclose4}
            data={data}
          ></FormElementInviteUser>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow5} 
        onHide={handlecardclose5} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div 
            className="add_delete_points modal-title h4"
          > 
            Apply Coupon Code
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose5}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementAddCoupon
            handlecardclose5={handlecardclose5}
            data={data}
            handleAddCoupon={handleAddCoupon}
          ></FormElementAddCoupon>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow6} 
        onHide={handlecardclose6}
        backdrop="static"
        keyboard={false}
        className="Invite_Sub-User_Modal"
      >
        <Modal.Header>
          <div className="modal-title h4"> 
            <img src={success} />
          </div>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementAddCouponSuccess
            handlecardclose6={handlecardclose6}
          ></FormElementAddCouponSuccess>
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
                  <div className="col-9">
                    <h3 className="heading">
                      Subscription Details
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={
                        props.location.state ?
                          props.location.state.path === "subscription" ? "/gi-team/subscriptions" : `/gi-team/user-details/${props.match.params.id}`
                        : `/gi-team/user-details/${props.match.params.id}`
                      }
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loading && (
                  <div className="info-data">
                    <div className="subscription-and-billing">
                      <div className="plan-description">
                        <div className="row">
                          <div className="col-lg-7 col-xs-12 plan">
                            <span className="h3">
                              {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled" || data.subscriptioninfo.subscriptionstatus === "NoActivePlan") ? (
                                "No Active Plan"
                              ) : (
                                <>
                                  {data.subscriptioninfo.planname ? (
                                    data.subscriptioninfo.planname === "StandardPlan" ? "Standard Plan (Monthly)" :
                                    data.subscriptioninfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                    data.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                    data.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                    data.subscriptioninfo.planname === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                                    data.subscriptioninfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                    data.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                    data.subscriptioninfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" : ""
                                  ) : (
                                    "N/A"
                                  )}
                                </>
                              )}
                            </span>
                            {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled" || data.subscriptioninfo.subscriptionstatus === "NoActivePlan") ? (
                              ""
                            ) : (
                              <>
                                <span className={`status_${data.subscriptioninfo.subscriptionstatus} status`}>
                                  <p>
                                    {data.subscriptioninfo.subscriptionstatus === "PausedDueToPaymentFailure" ? "Paused" :
                                    data.subscriptioninfo.subscriptionstatus === "PendingCancellation" ? "Pending Cancellation" : data.subscriptioninfo.subscriptionstatus}
                                  </p>
                                </span>
                              </>
                            )}
                          </div>
                          {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled" || data.subscriptioninfo.subscriptionstatus === "NoActivePlan") ? (
                            ""
                          ) : (
                            <div className="col-lg-5 col-xs-12 price">
                              <h1> 
                                <NumberFormat 
                                  value={(data.subscriptioninfo.nextchargeamount / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              </h1>
                              {couponInfo && couponInfo.length != 0 ? (
                                <span className="discount-code">
                                  {couponInfo.couponcode} | {couponInfo.discountpercentage}% off the subscription fee for {couponInfo.duration} {data.subscriptioninfo.planname.includes("Annual") ? "Year(s)" : "Month(s)"} </span>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3 subscription-btns">
                            {data.subscriptioninfo.subscriptionstatus === "Active" || data.subscriptioninfo.subscriptionstatus === "PendingCancellation" ? (
                              ""
                            ) : (
                              <div>
                                <button 
                                  className="btn change"
                                  onClick={() => history.push(`/gi-team/start-subscription/${props.match.params.id}`)}
                                >
                                  Start Subscription
                                </button>
                              </div>
                            )}
                            {data.subscriptioninfo.subscriptionstatus === "Active" && (
                              <div>
                                <button 
                                  className="btn add-coupon"
                                  disabled={data.subscriptioninfo.planname === "EnterprisePlan" || data.subscriptioninfo.planname === "EnterprisePlanAnnual" ? true : false}
                                  onClick={handlecardshow5}
                                >
                                  Add Coupon
                                </button>
                              </div>
                            )}
                            {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled" || data.subscriptioninfo.subscriptionstatus === "NoActivePlan") ? (
                              ""
                            ) : data.subscriptioninfo.subscriptionstatus === "PendingCancellation" ? (
                              <div>
                                {!loadingCancelImmediate && 
                                  <button 
                                    className="btn"
                                    disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                                    onClick={() => cancelSubscription(data.id)}
                                  >
                                    Cancel Subscription
                                </button>
                                }
                                {loadingCancelImmediate && (
                                  <button className="btn" disabled> 
                                    <i className="fas fa-spinner fa-spin"></i>
                                  </button>
                                )}
                              </div>
                            ) : (
                              <>
                                <div>
                                  {!loadingCancel && 
                                    <button 
                                      className="btn"
                                      disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                                      onClick={() => cancelSubscriptionPendingCancellation(data.id)}
                                    >
                                      Cancel Subscription
                                    </button>
                                  }
                                  {loadingCancel && (
                                    <button className="btn" disabled> 
                                      <i className="fas fa-spinner fa-spin"></i>
                                    </button>
                                  )}
                                </div>
                                <div className="Immediate">
                                  {!loadingCancelImmediate && 
                                    <button 
                                      className="btn"
                                      disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                                      onClick={() => cancelSubscription(data.id)}
                                    >
                                      Immediate Cancel
                                  </button>
                                  }
                                  {loadingCancelImmediate && (
                                    <button className="btn" disabled> 
                                      <i className="fas fa-spinner fa-spin"></i>
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled" || data.subscriptioninfo.subscriptionstatus === "NoActivePlan") ? (
                            ""
                          ) : (
                            <div className="col-xl-9 col-lg-9 col-md-7 col-sm-6 col-xs-12 mt-3 date">
                              <div className="row">
                                <div className="col-lg-4 col-md-6 mt-3">
                                  <h4> First Name </h4>
                                  {data.ownerinfo.firstname ? (
                                    <h3> {data.ownerinfo.firstname} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                <div className="col-lg-4 col-md-6 mt-3 extraPadding">
                                  <h4> Last Name </h4>
                                  {data.ownerinfo.lastname ? (
                                    <h3> {data.ownerinfo.lastname} </h3> 
                                  ) : (
                                    "N/A"
                                  )}    
                                </div>
                                <div className="col-lg-4 col-md-12 mt-3 extraPadding">
                                  <h4> Email </h4>
                                  {data.ownerinfo.emailaddress ? (
                                    <h3 style={{ wordBreak: "break-all" }}>
                                      {data.ownerinfo.emailaddress}
                                    </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled" || data.subscriptioninfo.subscriptionstatus === "NoActivePlan") ? (
                          ""
                        ) : (
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 date">
                              <div className="row">
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> SUBSCRIPTION DATE </h4>
                                  {data.subscriptioninfo.startsubdate ? (
                                    <h3> {moment(data.subscriptioninfo.startsubdate).format("LL")} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> NEXT BILLING DATE </h4>
                                  {data.subscriptioninfo.nextsubdate ? (
                                    <h3> {data.subscriptioninfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(data.subscriptioninfo.nextsubdate).format("LL")} </h3> 
                                  ) : (
                                    "N/A"
                                  )}  
                                </div>
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> COMPANY NAME </h4>
                                  {data.subscriptioninfo.contactinformationfororder ? (
                                    <h3> {data.subscriptioninfo.contactinformationfororder.companyname} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> STREET ADDRESS </h4>
                                  {data.subscriptioninfo.contactinformationfororder ? (
                                    <h3> {data.subscriptioninfo.contactinformationfororder.streetaddress} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> APT., UNIT, OR SUITE # </h4>
                                  {data.subscriptioninfo.contactinformationfororder ? (
                                    <h3> {data.subscriptioninfo.contactinformationfororder.aptorunitorsuite} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> CITY </h4>
                                  {data.subscriptioninfo.contactinformationfororder ? (
                                    <h3> {data.subscriptioninfo.contactinformationfororder.city} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> STATE </h4>
                                  {data.subscriptioninfo.contactinformationfororder ? (
                                    <h3> {data.subscriptioninfo.contactinformationfororder.state} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                <div className="col-lg-3 col-md-6 mt-3">
                                  <h4> ZIP CODE </h4>
                                  {data.subscriptioninfo.contactinformationfororder ? (
                                    <h3> {data.subscriptioninfo.contactinformationfororder.zipcode} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-xl-6 col-lg-5 col-md-12">
                          <div className="payment-section">
                            <div className="payment_section_header">
                              <div className="row">
                                <div className="col-8 text-left">
                                  <div className="payment_header_title">
                                    Subscription Transaction History
                                  </div>
                                </div>
                                <div className="col-4 text-right" style={{ padding: "6px 15px 0px 0px" }}>
                                  <div className="view_more">
                                    <Link to={`/gi-team/transaction-history/${data.id}`}>
                                      View More
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="payment_section_body transaction_history" style={{ paddingTop: "25px" }}>
                              {subscriptionHistoryData.length != 0 ? (
                                <>
                                  {subscriptionHistoryData.map((history) => {
                                    // console.log(history, "h")
                                    return (
                                      <div className="row">
                                        <div className="col-6 date">
                                          <h4> {moment(history.createdAt).format("MMM DD - YYYY")} </h4>
                                        </div>
                                        <div className="col-4 price">
                                          <h5> ${(history.chargedamountincents / 100).toFixed(2)} </h5>
                                        </div>
                                        <div className="col-2 download d-flex">
                                          {history.refundCompleted ? (
                                            <>
                                              <div style={{ position: "relative" }}>
                                                <div className={`refund-tooltip ${history.id === tooltipId ? "open" : ""}`}>
                                                  Refund successfully completed. No further action required.
                                                  <div className="arrow" />
                                                </div>
                                                <img
                                                  src={Refund}
                                                  style={{
                                                    opacity: "0.5",
                                                    cursor: "initial",
                                                    marginRight: "10px",
                                                  }}
                                                  onMouseOver={() => setTooltipId(history.id)}
                                                  onMouseOut={() => setTooltipId("")}
                                                />
                                              </div>
                                            </>
                                          ) : history.paymentintentid ? (
                                            <Link
                                              to={{
                                                pathname: `/gi-team/refund-subscription/${data.id}`,
                                                state: {
                                                  history: history,
                                                },
                                              }}
                                              style={{ marginRight: "10px" }}
                                            >
                                              <img src={Refund} />
                                            </Link>
                                          ) : (
                                            <>
                                              <div style={{ position: "relative" }}>
                                                <div className={`refund-tooltip ${history.id === tooltipId ? "open" : ""}`}>
                                                  Refund unavailable: Payment intent not found.
                                                  <div className="arrow" />
                                                </div>
                                                <img
                                                  src={Refund}
                                                  style={{
                                                    opacity: "0.5",
                                                    cursor: "initial",
                                                    marginRight: "10px",
                                                  }}
                                                  onMouseOver={() => setTooltipId(history.id)}
                                                  onMouseOut={() => setTooltipId("")}
                                                />
                                              </div>
                                            </>
                                          )}
                                          {history.recipturl != null && (
                                            <a target="_blank" href={history.recipturl}>
                                              <img src={download} />
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}      
                                </>
                              ) : (
                                <div 
                                  className="text-center col"
                                  style={{ margin: "35px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                                >
                                  <span> No transaction history found! </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-7 col-md-12">
                          <div className="payment-section">
                            <div className="payment_section_header">
                              <div className="row">
                                <div className="col text-left">
                                  <div className="payment_header_title">
                                    Payment Method
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cards">
                              {checkDefaultCard.length === 0 ? (
                                <div 
                                  className="text-center col"
                                  style={{ margin: "104px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                                >
                                  <span> No Default Payment method found! </span>
                                </div>
                              ) : (
                                checkDefaultCard.map((card) => {
                                  return (
                                    <div className="card_item card_is_default_true">
                                      <div className="row">
                                        <div className="col text-left">
                                          <img src={pmicons[card.brand]} className="brand_icon" alt="" />
                                        </div>
                                        <div className="col text-right card_status">
                                          <img src={isDefaultIcon} alt="" />
                                          <span className="default"> Default </span>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col text-left">
                                          <div className="card_number">
                                            **** **** **** {card.last4}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col text-left">
                                          <label> Name </label>
                                          <div className="info_text text-left">
                                            {card.billingDetailName}
                                          </div>
                                        </div>
                                        <div className="col text-right">
                                          <label >Valid Until </label>
                                          <div className="info_text">
                                            {card.exp_month}/{card.exp_year}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              )}
                            </div>
                            <hr />
                            <div className="manage-payment">
                              <Link 
                                className="btn mb-2" 
                                to={`/gi-team/manage-payment/${data.id}`}
                              >
                                Manage Payments
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sub-Users">
                        <div
                          className="row"
                          style={{ margin: "0px 0px" }}
                        >
                          <div
                            className="col-6"
                            style={{ paddingLeft: "0px" }}
                          >
                            <h4> Sub Users ({Collaborators.length}) </h4>
                          </div>
                          {(data.subscriptioninfo.planname === "ProfessionalPlan" || data.subscriptioninfo.planname === "ProfessionalPlanAnnual" || data.subscriptioninfo.planname === "EnterprisePlan" || data.subscriptioninfo.planname === "EnterprisePlanAnnual") && data.subscriptioninfo.subscriptionstatus === "Active" ? (
                            <div
                              className="col-6"
                              style={{ paddingRight: "0px", textAlign: "right" }}
                            >
                              <CSVLink {...SubUsersCSV}>
                                <button className="btn">
                                  <span> Export CSV </span>
                                </button>
                              </CSVLink>
                              <span className="add-sub-user" onClick={handlecardshow4}>
                                <img src={add} alt="add" />
                                Add Sub User
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <hr />
                        <div className="inner_sub_area">
                          <div className="row">
                            <div className="col-12" style={{ borderBottom: "1px solid #0000001a" }}>
                              <ul className="subs_filters">
                                <li
                                  className={activeTab.Active == true ? "active" : ""}
                                  onClick={() => {
                                    setActiveTab({
                                      Active: true,
                                      Former: false,
                                    });
                                  }}
                                >
                                  Active ({Collaborators.length})
                                </li>
                                <li
                                  className={activeTab.Former == true ? "active" : ""}
                                  onClick={() => {
                                    setActiveTab({
                                      Active: false,
                                      Former: true,
                                    });
                                  }}
                                >
                                  Former ({deletedCollaborators.length})
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {activeTab.Active && (
                          <>
                            {Collaborators.length == 0 ? (
                              <div className="no-sub-users">
                                <h5> No Sub Users </h5>
                              </div>
                            ) : (
                              <div className="sub-users-view">
                                <AdminTable
                                  tableClesses={"sub-users-table"}
                                  headers={headersCollaborators}
                                  showHeaders={true}
                                  data={Collaborators}
                                  Row={({ index, rowData }) => {
                                    return (
                                      <tr key={index}>
                                        <td style={{ wordBreak: "break-all"}}> {rowData.original.user.emailaddress ? rowData.original.user.emailaddress : "N/A"} </td>
                                        <td style={{ wordBreak: "break-all"}}> {rowData.original.xactProfileveriskid ? rowData.original.xactProfileveriskid : "N/A"} </td>
                                        <td> {rowData.original.user.branch ? rowData.original.user.branch : "N/A"} </td>
                                        <td> {rowData.original.user.firstname ? rowData.original.user.firstname : "N/A"} </td>
                                        <td> {rowData.original.user.lastname ? rowData.original.user.lastname : "N/A"} </td>
                                        {localStorage.getItem("role") == "Analyst" ? (
                                          ""
                                        ) : (
                                          <td>
                                            <div className="view_icon_users">
                                              <img
                                                style={{ cursor: "pointer" }}
                                                src={trash}
                                                onClick={() => {
                                                  handlecardshow1();
                                                  setRemoveCollaborator({
                                                    parentCustomerId: data.id,
                                                    childEmailToRemove: rowData.original.user.emailaddress,
                                                  });
                                                }}
                                              />
                                            </div>
                                          </td>
                                        )}
                                        <td>
                                          <div className="view_icon_users">
                                            <Link
                                              to={`/gi-team/user-details/${rowData.original.childuserid}`}
                                            >
                                              <img src={vision} />
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </>
                        )}
                        {activeTab.Former && (
                          <>
                            {deletedCollaborators.length == 0 ? (
                              <div className="no-sub-users">
                                <h5> No Record </h5>
                              </div>
                            ) : (
                              <div className="sub-users-view">
                                <AdminTable
                                  tableClesses={"sub-users-table"}
                                  headers={headersDeletedCollaborators}
                                  showHeaders={true}
                                  data={deletedCollaborators}
                                  Row={({ index, rowData }) => {
                                    return (
                                      <tr key={index}>
                                        <td style={{ wordBreak: "break-all"}}> {rowData.original.user.emailaddress ? rowData.original.user.emailaddress : "N/A"} </td>
                                        <td style={{ wordBreak: "break-all"}}> {rowData.original.xactProfileveriskid ? rowData.original.xactProfileveriskid : "N/A"} </td>
                                        <td> {rowData.original.user.firstname ? rowData.original.user.firstname : "N/A"} </td>
                                        <td> {rowData.original.user.lastname ? rowData.original.user.lastname : "N/A"} </td>
                                        <td> {rowData.original.addedOn ? moment(rowData.original.addedOn).format("MM/DD/YYYY") : "N/A"} </td>
                                        <td> {rowData.original.remvoedOn ? moment(rowData.original.remvoedOn).format("MM/DD/YYYY") : "N/A"} </td>
                                      </tr>
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
              </div>
              {!loading && (
                <>
                  {data.subscriptioninfo.planname === "ProfessionalPlan" || data.subscriptioninfo.planname === "ProfessionalPlanAnnual" || data.subscriptioninfo.planname === "EnterprisePlan" || data.subscriptioninfo.planname === "EnterprisePlanAnnual" ? (
                    <div className="Co-Admin-Users">
                      <div className="row">
                        <div className="col-8" style={{ padding: "0px 15px 0px 0px" }}>
                          <div className="admin-users">
                            <div className="row header">
                              <div className="col-12">
                                <h3 className="heading"> Admin Users </h3>
                              </div>
                            </div>
                            <hr />
                            <div className="table-section">
                              <div className="row">
                                <AdminTableCoAdmin
                                  tableClesses={"table-stripes bktables"}
                                  headers={headersCoAdmin}
                                  showHeaders={true}
                                  data={coAdmins}
                                  Row={({ index, rowData }) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          {rowData.original}
                                        </td>
                                        <td>
                                          Co-Admin
                                        </td>
                                        {localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root" ? (
                                          <td>
                                            <div className="view_icon_users">
                                              <img
                                                style={{ marginRight: "10px" }}
                                                src={edit}
                                                onClick={() => {
                                                  handlecardshow3();
                                                  setEmailAddress(rowData.original);
                                                }}
                                              />
                                              <img
                                                src={del}
                                                onClick={() => {
                                                  handlecardshow2();
                                                  setRemoveCoAdmin({
                                                    ...removeCoAdmin,
                                                    emailaddress: rowData.original,
                                                  });
                                                }}
                                              />
                                            </div>
                                          </td>
                                        ) : (
                                          ""
                                        )}
                                      </tr>
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4" style={{ padding: "0px " }}>
                          <div className="add-new-co-admin">
                            <div className="row header">
                              <div className="col-12">
                                <div className="page_icon">
                                  <img src={new_role} />
                                </div>
                                <h3 className="heading">Add New Co-Admin</h3>
                              </div>
                            </div>
                            <hr />
                            <form onSubmit={handleSubmit} id="form">
                              <div className="inner_sub_area">
                                <div className="row">
                                  <div
                                    className="col-12"
                                    style={{ padding: "20px 0px 0px 0px" }}
                                  >
                                    <div className="form-holder nogroup">
                                      <input
                                        type="text"
                                        name="Co-Admin-Email"
                                        required
                                        id="inputField1"
                                        className="input-area"
                                        onChange={(e) => {
                                          setCustomerAcountAlias({
                                            ...CustomerAcountAlias,
                                            newemailaddress: e.currentTarget.value,
                                          });
                                        }}
                                      />
                                      <label
                                        htmlFor="inputField1"
                                        className="floating_label"
                                      >
                                        Co-Admin Email
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="Save">
                                  {!loadingAddCoAdmin && (
                                    <button 
                                      className="btn"
                                      type="submit"
                                      disabled={localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root" ? false : true}
                                    >
                                      <span> Invite </span>
                                    </button>
                                  )}
                                  {loadingAddCoAdmin && (
                                    <button className="btn" disabled>
                                      <i className="fas fa-spinner fa-spin"></i>
                                      <span> Inviting... </span>
                                    </button>
                                  )}
                                </div>
                                {Err ? (
                                  <>
                                    <div className="text-center">
                                      <i 
                                        style={{
                                          color: "#DB422D",
                                          fontSize: "18px"
                                        }}>
                                        <small>
                                          {Err}
                                        </small>
                                      </i>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                                {localStorage.getItem("role") == "Editor" || localStorage.getItem("role") == "Analyst" ? (
                                  <div style={{ textAlign: "center" }}>
                                    <div
                                      className="form-group alert alert-danger"
                                      style={{ 
                                        margin: "0px",
                                        width: "auto",
                                      }}
                                    >
                                      You need to be an Admin to Invite
                                    </div>
                                  </div> 
                                ) : (
                                  ""
                                )}
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ViewSubscription);
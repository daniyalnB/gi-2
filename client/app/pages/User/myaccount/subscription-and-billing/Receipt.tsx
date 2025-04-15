import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import history from "../../../../../utils/history";
import moment from "moment";
import { AppContext } from "../../../../../contexts/appContext";

const Receipt = (props) => {

  const { getCustomerInfo, getMyInvitedUser, invitedUsers } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
    getMyInvitedUser();
  }, []);

  const [billingDetails, setBillingDetails] = useState(props.billingDetails);
  const [extraData, setExtraData] = useState(props.extraData);
  const [freeSwagProduct, setFreeSwagProduct] = useState(props.extraData.freeswagproductwhenbuyingsubscriptionforthefirsttime);

  function handleCheckout () {
    if (extraData.planname === "ProfessionalPlan" || extraData.planname === "ProfessionalPlanAnnual") {
      // props.handleCheckout(true, false, true);
      history.push({
        pathname: "/users",
        state: {
          finalize: true,
        }
      });
    } else {
      props.handleCheckout(true, false, false);
    }
    if (extraData) {
      if (extraData.couponcode === "Vjg5vpE3Av") {
        props.handleActionableXactimatePopup(true);
      } else {
        props.handleActionableXactimatePopup(false);
      }
    } else {
      props.handleActionableXactimatePopup(false);
    }
	}
  
  return (
    <div className="receipt">
      <div className="row">
        <div className="col-12">
          <h1> Receipt </h1>
        </div>
        <div className="col-12">
          <h3> Your Payment is Successful </h3>
        </div>
        <div className="col-12">
          <h5> Thank you for your payment. An automated payment receipt will be sent to your registered email. </h5>
        </div>
        <hr />
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
          <label> Certification Date </label>
          <br />
          <span> {moment(extraData.createdAt).format("LL")} </span>
        </div> 
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
          <label> NEXT BILLING DATE </label>
          <br />
          <span> {moment(extraData.nextbillingdate).format("LL")} </span>
        </div> 
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
          <label> Plan Details </label>
          <br />
          <span>
            {
              extraData.planname === "StandardPlan" ? "Legacy Standard Plan" :
              extraData.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
              extraData.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
              extraData.planname === "StandardPlanAnnual" ? "Legacy Standard Plan" :
              extraData.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
              extraData.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : ""
            }
          </span>
        </div> 
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
          <label> First Name </label>
          <br />
          <span> {billingDetails.firstname} </span>
        </div> 
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
          <label> Last Name </label>
          <br />
          <span> {billingDetails.lastname} </span>
        </div> 
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
          <label> COMPANY NAME </label>
          <br />
          <span> {billingDetails.companyname} </span>
        </div>
        {billingDetails.streetaddress && (
          <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
            <label> STREET ADDRESS </label>
            <br />
            <span> {billingDetails.streetaddress ? billingDetails.streetaddress : "N/A"} </span>
          </div>
        )}
        {billingDetails.aptorunitorsuite && (
          <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
            <label> APT., UNIT, OR SUITE # </label>
            <br />
            <span> {billingDetails.aptorunitorsuite ? billingDetails.aptorunitorsuite : "N/A"} </span>
          </div> 
        )}
        {billingDetails.city && (
          <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
            <label> CITY </label>
            <br />
            <span> {billingDetails.city ? billingDetails.city : "N/A"} </span>
          </div> 
        )}
        {billingDetails.state && (
          <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
            <label> STATE </label>
            <br />
            <span> {billingDetails.state ? billingDetails.state : "N/A"} </span>
          </div>
        )}
        {billingDetails.zipcode && (
          <div className="col-lg-4 col-md-4 col-sm-6 col-12 md-4 mt-4">
            <label> ZIP CODE </label>
            <br />
            <span> {billingDetails.zipcode ? billingDetails.zipcode : "N/A"} </span>
          </div>
        )} 
      </div>
      <div className="product-info">
        <div className="product">
          <div className="row">
            <div className="col">
              <h3 className="text-left"> Product </h3>
            </div>
            <div className="col">
              <h3 className="text-right"> Total </h3>
            </div>
          </div>
        </div>
        <div className="total">
          <div className="row">
            <div className="col">
              <h3 className="text-left" style={{ fontWeight: "500" }}>
                {
                  extraData.planname === "StandardPlan" ? "Legacy Standard Plan" :
                  extraData.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                  extraData.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                  extraData.planname === "StandardPlanAnnual" ? "Legacy Standard Plan" :
                  extraData.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                  extraData.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : ""
                }
              </h3>
            </div>
            <div className="col">
              <h3 className="text-right" style={{ fontWeight: "500", color: "#000" }}>
                ${(extraData.orignalpriceincents / 100).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        {/* {freeSwagProduct && (
          <>
            <hr className="hr-two" />
            <div className="details">
              <div className="row">
                <div className="col">
                  <h3 className="text-left"> {freeSwagProduct.producttitle} x 1 </h3>
                </div>
                <div className="col">
                  <h3 className="text-right"> ${(freeSwagProduct.pricepaidincents).toFixed(2)} </h3>
                </div>
              </div>
            </div>
          </>
        )} */}
        <hr className="hr-two" />
        <div className="details">
          <div className="row">
            <div className="col-6">
              {extraData.couponcode ? (
                <h3 className="text-left">
                  Coupon Code ({extraData.couponcode})
                </h3>
              ) : (
                <h3 className="text-left">
                  Coupon Code
                </h3>
              )}
            </div>
            <div className="col-6">
              <h3 className="text-right"> 
                {extraData.amountreduced == null ? (
                  <>
                    ${(0).toFixed(2)}
                  </>
                ) : (
                  <>
                    -${(extraData.amountreduced / 100).toFixed(2)}
                  </>
                )}
              </h3>
            </div>
          </div>
        </div>
        <hr className="hr-two" />
        <div className="details">
          <div className="row">
            <div className="col">
              <h3 className="text-left">
                {extraData.planname === "ProfessionalPlan" || extraData.planname === "ProfessionalPlanAnnual" ? invitedUsers.length === 0 ? "Subtotal" : `Subtotal - Sub User (${invitedUsers.length})` : "Subtotal"}
              </h3>
            </div>
            <div className="col">
              <h3 className="text-right"> ${(extraData.chargedamountincents / 100).toFixed(2)} </h3>
            </div>
          </div>
        </div>
        <hr className="hr-two" />
        <div className="total">
          <div className="row">
            <div className="col">
              <h3 className="text-left"> TOTAL </h3>
            </div>
            <div className="col">
              <h3 className="text-right"> ${(extraData.chargedamountincents / 100).toFixed(2)} </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="view-subscription">
        <button 
          className="btn"
          onClick={() => {
            props.updateTransactionHistory();
            handleCheckout();
            // history.replace(props.location.state, undefined);
            window.scrollTo(0, 0);
          }}
        >
          Finalize Account Details
        </button>
        <br />
        <a
          href={extraData.recipturl}
          target="_blank"
        >
          Download Receipt
        </a>
      </div>
    </div>
  );
};

export default withRouter(Receipt);
import React, { useEffect, useContext, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import queryString from "query-string";
import {
  setDefaultPaymentMenthod,
  setBackupPaymentMenthod,
  getDefaultPaymentMethods,
  deletePaymentMenthod,
} from "utils/api-routes/api-routes.util";
import { AppContext } from "../../../../contexts/appContext";
import visa from "assets/visa.png";
import mastercard from "assets/mastercard.png";
import AmericanExpress from "assets/americanexpress.png";
import JCB from "assets/jcb.svg";
import discover from "assets/discover.png";
import isDefaultIcon from "assets/is-default.svg";
import isBackupIcon from "assets/is-backup.svg";
import isNotDefaultIcon from "assets/is-not-default.svg";
import removecard from "assets/remove-card.svg";
import info from "assets/Info.svg";

const PaymentCard = (props) => {

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  const [parentInfo, setParentInfo] = useState(false);
  
  useEffect(() => {
    if (myInfo) {
      setParentInfo(myInfo.parentinfo);
    }
  }, [myInfo]);

  const [loading, setLoading] = useState(false);

  const pmicons = {
    mastercard: mastercard,
    jcb: JCB,
    visa: visa,
    discover: discover,
    amex: AmericanExpress,
  };

  const [card, setCard] = useState(props.card);
  
  useEffect(() => {
    setCard(props.card);
    setLoading(false);
  }, [props.card]);

  const setDefault = () => {
    setLoading(true);

    setTimeout(() => {
      const payload = {
        pmId: card.paymentMethodId,
        customerId: myInfo.id,
      };

      const stringified = queryString.stringify(payload);

      setDefaultPaymentMenthod(stringified).subscribe((response) => {
        getCustomerInfo();
      });
    }, 1000);
  };

  const setBackup = () => {
    setLoading(true);

    setTimeout(() => {
      const payload = {
        pmId: card.paymentMethodId,
        customerId: myInfo.id,
      };

      const stringified = queryString.stringify(payload);

      setBackupPaymentMenthod(stringified).subscribe((response) => {
        getCustomerInfo();
      });
    }, 1000);
  };

  const deletePM = () => {
    setLoading(true);

    setTimeout(() => {
      const payload = {
        pmId: card.paymentMethodId,
        customerId: myInfo.id,
      };

      const stringified = queryString.stringify(payload);

      deletePaymentMenthod(stringified).subscribe((response) => {
        getCustomerInfo();
      });
    }, 1000);
  };

  return (
    <>
      <div className={`card_item ${`card_is_default_${card.isDefault ? "true" : card.backup ? "true" : "false"}`}`}>
        <div className="row">
          <div className="col-3 text-left">
            <img src={pmicons[card.brand]} className="brand_icon" alt="" />
          </div>
          {loading ? (
            <div className="col-9 text-right">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          ) : (
            <div className="col-9 text-right card_status">
              {parentInfo && parentInfo.useparentspaymentmethod ? (
                <span className="remove_card">
                  <img 
                    src={removecard}
                    onClick={deletePM}
                  />
                </span>
              ) : (
                <>
                  {card.isDefault ? (
                    <>
                      <img
                        className="defaultIcon"
                        src={isDefaultIcon}
                        alt=""
                      />
                      <span className="default"> Default </span>
                    </>
                  ) : (
                    <>
                      <img
                        src={isNotDefaultIcon}
                        alt=""
                        onClick={setDefault}
                      />
                      <span
                        className="not-default"
                        style={{ marginRight: "5px" }}
                        onClick={setDefault}
                      > 
                        Default 
                      </span>
                      {card.backup ? (
                        <>
                          <img
                            className="defaultIcon"
                            src={isBackupIcon}
                            alt=""
                          />
                          <span className="backup"> Backup </span>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 900 }}
                            overlay={
                              <Tooltip id="backup-tooltip">
                                Your backup payment method will be charged if your Default payment method fails for any reason.
                              </Tooltip>
                            }
                          >
                            <img className="info" src={info} />
                          </OverlayTrigger>
                        </>
                      ) : (
                        <>
                          <img
                            src={isNotDefaultIcon}
                            alt=""
                            onClick={setBackup}
                          />
                          <span
                            className="not-backup"
                            onClick={setBackup}
                          >
                            Backup
                          </span>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 900 }}
                            overlay={
                              <Tooltip id="backup-tooltip">
                                Your backup payment method will be charged if your Default payment method fails for any reason.
                              </Tooltip>
                            }
                          >
                            <img className="info" src={info} />
                          </OverlayTrigger>
                        </>
                      )}
                    </>
                  )}
                  {card.isDefault ? (
                    ""
                  ) : (
                    <span className="remove_card">
                      <img 
                        src={removecard}
                        onClick={deletePM}
                      />
                    </span>
                  )}
                </>
              )}
            </div>
          )}
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
    </>
  );
};

export default PaymentCard;
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/appContext";
import info from "assets/i_cookie.svg";

const CookieConsentGI2 = () => {

  const { getCustomerInfo, myInfo } = useContext(AppContext);
  
  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
    }
  }, []);

  const [hide, setHide] = useState(false);

  const [username, setUsername] = useState("getinsights");

  useEffect(() => {
    if (myInfo) {
      setUsername(myInfo.ownerinfo.emailaddress ? myInfo.ownerinfo.emailaddress : "getinsights");
    }
  }, [myInfo]);

  function setCookieForDay(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  }

  function setCookieforHour(cName, cValue) {
    var date = new Date();
    date.setTime(date.getTime() + 1 * 3600 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  }

  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    setHide(res ? true : false);
    return res;
  }

  useEffect(() => {
    getCookie("getInsights");
  }, []);

  return (
    <>
      {!hide && (
        <div className="CookieConsent">
          <div className="left-side">
            <img src={info} alt="info" />
            <p> By using this site, you agree to our 	&nbsp;
              <Link
                to= "/terms-and-conditions"
              >
                Terms and Conditions
              </Link>
            </p>
          </div>
          <div>
          <button
            onClick={() => {
              setCookieForDay("getInsights", username, 30);
              setHide(true);
            }}
          >
            Got It
          </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentGI2;
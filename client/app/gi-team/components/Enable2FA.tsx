import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("./SideMenu"));
const UserTab = React.lazy(() => import("./UserTab"));
import * as base32 from "hi-base32";
import crypto from "crypto";
import QRCode from "react-qr-code";
import { Modal } from "react-bootstrap";
import { Buffer } from "buffer";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import history from "../../../utils/history";
import { UpdateMFASetting } from "utils/api-routes/api-routes.util";
import managerolesred from "assets/ManageRolesRed.svg";
import back from "assets/arrowleft.svg";
import modalclose from "assets/modal-close.svg";

const Enable2FA = (props) => {

  const [generateCode, setGenerateCode] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [mfaenable, setmfaenable] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    setKey(base32.encode(localStorage.getItem("email")).replace(/=/g, ""));
  }, []);

  const checkCode = () => {
    if (key) {
      function generateHOTP(
        key,
        counter,
        otpLength = 6,
        hmacAlgorithm = "sha1"
      ) {
        if (!key) {
          throw new Error("Secret is required");
        }

        if (!counter) {
          throw new Error("Counter is required");
        }

        const decodedSecret = base32.decode.asBytes(key);
        const buffer = Buffer.alloc(8);
        for (let i = 0; i < 8; i++) {
          buffer[7 - i] = counter & 0xff;
          counter = counter >> 8;
        }

        // Step 1: Generate an HMAC-SHA-1 value
        const hmac = crypto.createHmac(
          hmacAlgorithm,
          Buffer.from(decodedSecret)
        );
        hmac.update(buffer);
        const hmacResult = hmac.digest();

        // Step 2: Generate a 4-byte string (Dynamic Truncation)
        const code = dynamicTruncationFn(hmacResult);

        // Step 3: Compute an HOTP value
        return code % 10 ** otpLength;
      }

      function dynamicTruncationFn(hmacValue) {
        const offset = hmacValue[hmacValue.length - 1] & 0xf;

        return (
          ((hmacValue[offset] & 0x7f) << 24) |
          ((hmacValue[offset + 1] & 0xff) << 16) |
          ((hmacValue[offset + 2] & 0xff) << 8) |
          (hmacValue[offset + 3] & 0xff)
        );
      }

      function generateTOTP(
        key,
        window = 0,
        timeStepInSeconds = 30,
        initialTime = 0,
        otpLength = 6
      ) {
        if (!key) {
          throw new Error("Secret is required");
        }

        const currentTime = Date.now();
        const timeStep = timeStepInSeconds * 1000;
        const counter = Math.floor((currentTime - initialTime) / timeStep);
        return generateHOTP(key, counter + window, otpLength);
      }

      /*
       * This function verifies the validity of OTP (token) entered by the user
       * from the Google Authenticator app.
       * The secret passed here as argument must match with the secret in the
       * authenticator app.
       */
      function verifyTOTP(token, secret, window = 1) {
        try {
          token = parseInt(token, 10);
          if (isNaN(token)) {
            throw new Error();
          }
        } catch (e) {
          console.error("Invalid token");
          return false;
        }

        if (Math.abs(+window) > 10) {
          console.error("Window size is too large");
          return false;
        }

        for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
          const totp = generateTOTP(key, errorWindow);
          if (token === totp) {
            return true;
          }
        }

        return false;
      }

      if (verifyTOTP(code, key)) {
        setmfaenable(true);
        enable2fa(true);
      } else {
        setError("You have entered wrong code.");
      }
    } else {
      setError("Something went wrong");
    }
  };

  const enable2fa = (value) => {

    const payload = {
      mfaenabled: value,
    };

    const stringified = queryString.stringify(payload);

    UpdateMFASetting(stringified).subscribe((response) => {
      console.log(response)
      if (response.response.Requested_Action) {
        localStorage.setItem("2fa", value);
        history.push("/gi-team/manage-roles");
      } else {
        alert("2f error");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          Enable2FA - Actionable Insights Admin
        </title>
      </Helmet>
      <Modal
        show={modal}
        onHide={toggle}
        className="MFA_Modal"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title className="add_card_title">Reset 2FA</Modal.Title>
        </Modal.Header> */}
        <Modal.Header>
          <div 
            className="mfa modal-title h4"
          > 
            Reset 2FA
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={toggle}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <p className="text-center">
            Please click Confirm to remove the 2FA for your account. Please
            note, removing 2FA is not recommended.
          </p>
          <div className="row align-items-center justify-content-center mt-4">
            <div className="mr-2">
              <button
                className="btn"
                type="submit"
                onClick={() => {
                  enable2fa(false);
                }}
              >
                Confirm
              </button>
            </div>
            <div className="">
              <button
                className="btn"
                onClick={toggle}
              >
                Cancel
              </button>
            </div>
          </div>
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
                  <div className="col-6">
                    <div className="page_icon">
                      <img src={managerolesred} />
                    </div>
                    <h3 className="heading"> Role Management </h3>
                  </div>
                  <div className="col-6 text-right">
                    <div className="back">
                      <Link className="bk" to="/gi-team/manage-roles">
                        <img src={back} className="" />
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="Two_Factor_Authentication">
                  <div className="inner_section_header">
                    Two-Factor Authentication
                  </div>
                  <div className="inner_section_body">
                    {localStorage.getItem("2fa") == "false" ? (
                      <>
                        <p> Time Based One-Time Password (Google Authenticator) </p>
                          {generateCode && (
                            <>
                              <QRCode
                                value={`otpauth://totp/ActionableInsightsAdmin:${localStorage.getItem("email")}?secret=${key}&issuer=ActionableInsightsAdmin`}
                                title="ActionableInsightsAdmin"
                                className="mb-3"
                              />
                              <div className="form-holder">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group nogroup">
                                      <input 
                                        type="number"
                                        name="Code"
                                        required
                                        id="inputField0" 
                                        className="input-area"
                                        value={code}
                                        onChange={(e) => {
                                          setCode(e.target.value);
                                        }}
                                      />
                                      <label htmlFor="inputField0" className="floating_label"> Enter Code </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {error ? 
                                <div style={{ textAlign: "center" }}>
                                  <div 
                                    className="form-group alert alert-danger"
                                    style={{ margin: "0px" }}
                                  >
                                    {error}
                                  </div>
                                </div> 
                              : 
                                ""
                              }
                              <button
                                className="btn mt-3"
                                onClick={checkCode}
                                disabled={!code}
                              >
                                Submit
                              </button>
                            </>
                          )}
                          {!generateCode && (
                            <button
                              className="btn"
                              onClick={() => {
                                setGenerateCode(true);
                              }}
                            >
                              Generate QR Code
                            </button>
                          )}
                      </>
                    ) : (
                      <>
                        <button
                          className="btn"
                          onClick={() => toggle()}
                        >
                          Reset 2FA
                        </button>
                        <div
                          className="mt-3"
                          style={{ 
                            fontSize: "15px",
                            fontWeight: 500,
                          }}
                        >
                          You will have to re-scan the QR code on all devices as the
                          previous codes will stop working.
                        </div>
                      </>
                    )}
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

export default withRouter(Enable2FA);
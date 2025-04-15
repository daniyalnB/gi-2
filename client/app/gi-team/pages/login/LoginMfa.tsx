import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
import history from "utils/history";
import { Helmet } from "react-helmet";
import { Buffer } from "buffer";
import * as base32 from "hi-base32";
import crypto from "crypto";
import logo from "assets/Logo.svg";
import { AuthContext } from "../../../../contexts/authContext";

const LoginMFA = (props) => {

  const { profile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [key, setKey] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (profile) {
      setKey(base32.encode(localStorage.getItem("email")).replace(/=/g, ""));
    }
  }, [profile]);

  const checkCode = () => {
    if (key && profile) {
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
        localStorage.setItem("token", profile.sessiontoken);
        localStorage.setItem("role", profile.role);
        localStorage.setItem("2fa", profile.mfaenabled);
        history.push("/gi-team/dashboard");
      } else {
        setError("You have entered wrong code.");
      }
    } else {
      setError("Something went wrong");
      setTimeout(() => {
        history.push("/gi-team/login");
      }, 1500);
    }
  };

  return (
    <>
      <Helmet>
        <title> 
          Sign In Authentication - Actionable Insights Admin
        </title>
      </Helmet>
      <ScrollToTop />
      <div className="admin-login">
        <div className="container-fluid">
          <div className="image-section">
            <div className="logo">
              <img src={logo} />
            </div>
          </div>
          <div className="text-section">
            <h3> Authentication Code </h3>
          </div>
          <div className="login_inner_Container">
            <div className="form-holder">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col">
                    <div className="form-group nogroup">
                      <input
                        type="number"
                        name="Code"
                        required
                        id="inputField1"
                        className="input-area"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                      />
                      <label htmlFor="inputField1" className="floating_label">
                        Enter Code
                      </label>
                    </div>
                    {error ? (
                      <div className="form-group alert alert-danger">
                        {error}
                      </div>
                    ) : (
                      ""
                    )}
                    <button 
                      className="btn"
                      onClick={checkCode}
                      disabled={!code}
                    >
                      Authenticate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(LoginMFA);
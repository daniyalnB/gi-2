import ReactDOM from "react-dom";
import "./index.scss";
import React, { Suspense, useState, useEffect } from "react";
import PasswordModal from ".././client/app/components/PasswordModal";
import LottieLoader from ".././client/app/components/LottieLoader";
import MetaPixel from ".././client/app/components/MetaPixel";
import history from "./utils/history";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { Router } from "react-router-dom";
import CryptoJS from "crypto-js";
import App from "./app/App";
import AuthContext from "./contexts/authContext";
import AppContext from "./contexts/appContext";
import * as Sentry from "@sentry/react";

if (!window.location.hostname.includes("localhost")) {
  Sentry.init({
    dsn: "https://951343143b8a0f00a428590666de453d@o4507894165602304.ingest.us.sentry.io/4507894355001344",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

const GI2 = () => {

  const [showGlobalModal, setShowGlobalModal] = useState(false);

  const DevPassword = "nullbrainerGI2Dev";

  const secretPass = "XkhZG4fW2t2W";

  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem("vault"), secretPass);
    const vault = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (vault === DevPassword) {
      setShowGlobalModal(false);
    } else {
      setShowGlobalModal(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("vault") == null) {
      setShowGlobalModal(true);
    } else {
      decryptData();
    }
  }, []);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="loader">
              <LottieLoader />
            </div>
          }
        >
          {showGlobalModal && <PasswordModal />}
          <AuthContext>
            <AppContext>
              <Router history={history}>
                {/* <MetaPixel /> */}
                <App />
              </Router>
            </AppContext>
          </AuthContext>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

ReactDOM.render(<GI2 />, document.getElementById("root"));
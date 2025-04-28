import { createRoot } from "react-dom/client";
import "./index.scss";
import React, { Suspense, useState, useEffect } from "react";
import PasswordModal from ".././client/app/components/PasswordModal";
import LottieLoader from ".././client/app/components/LottieLoader";
import MetaPixel from ".././client/app/components/MetaPixel";
import history from "./utils/history";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
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
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div className="loader"><LottieLoader /></div>}>
        {showGlobalModal && <PasswordModal />}
        <AuthContext>
          <AppContext>
            <HistoryRouter history={history}>
              {/* <MetaPixel /> */}
              <App />
            </HistoryRouter>
          </AppContext>
        </AuthContext>
      </Suspense>
    </ErrorBoundary>
  );
};

// React 18 root
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<GI2 />);
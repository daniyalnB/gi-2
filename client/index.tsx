import ReactDOM from "react-dom";
import "./index.scss";
const App = React.lazy(() => import("./app/App"));
import * as serviceWorker from "./serviceWorker";
import React, { Suspense } from "react";
import history from "./utils/history";

import { Router } from "react-router-dom";
const AuthContext = React.lazy(() => import("./contexts/authContext"));

const GI2: React.FC = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ margin: "0 auto", height: "100vh" }}
          >
            {" "}
            <div className="loader"></div>
          </div>
        }
      >
        <AuthContext>
          <Router history={history}>
            <App />
          </Router>
        </AuthContext>
      </Suspense>
    </>
  );
};

ReactDOM.render(<GI2 />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

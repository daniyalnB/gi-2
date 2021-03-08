import Navbar from "app/components/Navbar";
import React, { Suspense } from "react";
const Main = React.lazy(() => import("../../components/Main"));
const Footer = React.lazy(() => import("../../components/Footer"));

function home() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ margin: "0 auto", height: "100vh" }}
          >
            <div className="loader"></div>
          </div>
        }
      >
        <Main />
        <Footer />
      </Suspense>
    </>
  );
}

export default home;

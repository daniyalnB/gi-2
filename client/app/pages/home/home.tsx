import React, { Suspense } from "react";
const Main = React.lazy(() => import("../../components/Main"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));

function home() {
  return (
    <>
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
        <Navbar />
        <Main />
        <Footer />
      </Suspense>
    </>
  );
}

export default home;

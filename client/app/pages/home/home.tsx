import React, { Suspense } from "react";
const Main = React.lazy(() => import("../../components/Main"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));

function home() {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <i className="fas fa-circle-notch fa-spin"></i>
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

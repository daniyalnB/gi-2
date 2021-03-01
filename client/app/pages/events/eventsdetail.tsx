import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const Event = React.lazy(() => import("../events/eventsdetail/event"));
const EventDescription = React.lazy(
  () => import("../events/eventsdetail/eventdescription")
);
const EventAttendance = React.lazy(
  () => import("../events/eventsdetail/eventattendance")
);
const EventCheckout = React.lazy(
  () => import("../events/eventsdetail/eventcheckout")
);

const eventsdetail = () => {
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
        <Navbar />
        <div className="main-container">
          <div className="ED_page">
            <div className="container">
              <Event />
              <EventDescription />
              <EventAttendance />
              <EventCheckout />
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default eventsdetail;

import React, { useState, useEffect, Suspense } from "react";
import LottieLoader from "../components/LottieLoader";
const SliderSectionNew = React.lazy(() => import("../pages/home/main/slidersectionnew"));
const DiscoverSection = React.lazy(() => import("../pages/home/main/discoversection"));
const DAESSection = React.lazy(() => import("../pages/home/main/daessection"));
const TemplatesSection = React.lazy(() => import("../pages/home/main/templatessection"));
const UpcomingEvents = React.lazy(() => import("../pages/home/main/upcomingevents"));
const ManualSection = React.lazy(() => import("../pages/home/main/manualsection"));
const SwagSection = React.lazy(() => import("../pages/home/main/swagsection"));
const DataSection = React.lazy(() => import("../pages/home/main/datasection"));
const Testimonials = React.lazy(() => import("../pages/home/main/testimonialsection"));
const Footer = React.lazy(() => import("../components/Footer"));

const Main = () => {

  const [showOtherSections, setShowOtherSections] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOtherSections(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="loader">
          <LottieLoader />
        </div>
      }
    >
      <SliderSectionNew />
      {showOtherSections && (
        <>
          <DAESSection />
          <TemplatesSection />
          <UpcomingEvents />
          <ManualSection />
          <Testimonials />
          <Footer />
        </>
      )}
    </Suspense>
  );
};

export default Main;
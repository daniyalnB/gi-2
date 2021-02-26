import React, { Suspense } from "react";
const SliderSection = React.lazy(() => import("../pages/home/main/slidersection"));
const DiscoverSection = React.lazy(() => import("../pages/home/main/discoversection"));
import DAESSection from "../pages/home/main/daessection";
import TemplatesSection from "../pages/home/main/templatessection";
import UpcomingEvents from "../pages/home/main/upcomingevents";
import ManualSection from "../pages/home/main/manualsection";
import SwagSection from "../pages/home/main/swagsection";
import DataSection from "../pages/home/main/datasection";

const Main = () => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            {" "}
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
        }
      >
        <SliderSection />
        <DiscoverSection />
      </Suspense>
      <DAESSection />
      <TemplatesSection />
      <UpcomingEvents />
      <ManualSection />
      <SwagSection />
      <DataSection />
    </>
  );
};

export default Main;

import React from "react";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const Main = React.lazy(() => import("../../components/Main"));

const Home = () => {
  return (
    <>
      <SEO
        title="Actionable Insights | Resources for Xactimate & Matterport"
        description="Actionable Insights is an educational non-profit that creates tools and resources for claims professionals to master Xactimate and Matterport."
        link="/"
      />
      <ScrollToTop />
      <Navbar />
      <Main />
      <WrongBrowserDisclaimer />
      <CookieConsentGI2 />
    </>
  );
};

export default Home;
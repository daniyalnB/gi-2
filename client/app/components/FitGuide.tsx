import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const FitGuide = () => {
	return (
		<>
			<SEO
        title="Fit Guide - Actionable Insights"
        description="Find out what size you need when buying Swag merch. Here's a size guide for the Swag merch as well as a Fit Guide to measure yourself according to the size guide. - (Fit Guide How to measure yourself NECK : Measure the neck circumference where a standard button type collar might be fastened. CHEST : Measure the chest cir)"
        link="fit-guide"
      />
			<Suspense
				fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
			>
				<ScrollToTop />
				<Navbar />
        <Breadcrumbs />
				<div className="main-container">
					<div className="missing_pages">
						<div className="">
              <div className="holder">
              <h2> Fit Guide </h2>
              <h1> How to measure yourself </h1>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/06/19041854/Zip_Fit_Shirt_Measurment_1024x1024.jpg"
                  loading="lazy"
                  alt="Zip_Fit_Shirt_Measurment"
                />
							</div>
              <div className="IRMS">
                <p>
                  <strong>NECK</strong>: Measure the neck circumference where a standard button type collar might be fastened.
                </p>
                <p style={{ marginTop: "10px" }}>
                  <strong>CHEST</strong>: Measure the chest circumference at the fullest point under the arms keeping the tape horizontal around the body.
                </p>
                <p style={{ marginTop: "10px" }}>
                  <strong>WAIST</strong>: Measure the waist circumference at the smallest part of the waist, often at or above the belly button.
                </p>
                <p style={{ marginTop: "10px" }}>
                  <strong>HIP</strong>: Measure the hip circumference at the fullest part of the seat.
                </p>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <strong>SLEEVE</strong>: Measure the distance from the prominent bone at center back neck, across the shoulder, over the bent elbow to the center of the wrist bone.
                </p>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/06/19041931/SizeChart.png"
                  loading="lazy"
                  alt="SizeChart"
                />
                <h1> Sizing Tips </h1>
                <p style={{ marginTop: "15px" }}>
                  If you are a slim or athletic guy with no extra weight in the belly: Use the chest measurements as a guide for picking your size.
                </p>
                <p style={{ marginTop: "15px" }}>
                  If you have a little extra around the middle: Keep in mind that the shirt tapers towards the midsection/waist.
                  The last thing you want is a shirt that is too tight in the belly.
                  So first make sure that it fits you across the midsection.
                </p>
                <p style={{ marginTop: "15px" }}>
                  <em>NOTE:</em>{" "}the “waist" is not your belt / pant size.
                  It refers to your midsection around the belly button.
                </p>
                <p style={{ marginTop: "15px" }}>
                  If you don’t want your shirt to fit closely, feel free to “size up" one size for a looser fit.
                </p>
                <p style={{ marginTop: "15px" }}>
                  If the shirt fits you in the waist and is slightly big in the chest it is not the end of the world.
                  It will still look good.
                </p>
                <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                  Keep in mind that these shirts are not dress shirts so the neck and sleeves are not meant to fit you exactly.
                  If you have much longer arms and prefer to have a shirt that fits in the arms then size up.
                </p>
                <h1> Note: Our shirts fit close to the body. If you’d prefer a bit more room, Size up! </h1>
              </div>
            </div>
					</div>
				</div>
				<WrongBrowserDisclaimer />
				<CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(FitGuide);
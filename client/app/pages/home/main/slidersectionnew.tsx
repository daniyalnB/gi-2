import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import logo from "assets/APLogoBlack.svg";
import one from "assets/slider1.webp";
import two from "assets/slider2.webp";
import three from "assets/slider3.webp";
import four from "assets/slider4.webp";
import five from "assets/slider5.webp";
import six from "assets/slider6.webp";
import AILPBackground from "assets/AILPBackground.webp";

const SliderSectionNew = () => {

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="slider-section-new">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="left-section">
                <div className="content">
                  <h1>
                    Discover what your
                    <br />
                    peers already have.
                  </h1>
                  <p>
                    Leverage estimating tools, resources, and training designed
                    <br />
                    specifically for swift and noble claims settlement.
                  </p>
                  <div className="demo-newsletter">
                    <Link to="/demo">
                      <button className="btn">
                        Book a Demo
                      </button>
                    </Link>
                    <div
                      className="newsletter"
                      onClick={scrollToBottom}
                    >
                      <span> Get the newsletter </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="left-section">
                <Carousel
                  controls={false}
                  interval={5000}
                  pause={false}
                  className="vert"
                >
                  <Carousel.Item>
                    <img
                      src={logo}
                      alt="logo"
                      loading="lazy"
                      className="ap-logo"
                    />
                    <Link to="/actionable-xactimate-profile">
                      <img src={one} alt="First slide" loading="lazy" />
                    </Link>
                    <h2> Live Estimating Guidance </h2>
                    <h3>
                      No more mistakes,
                      <br />
                      no more missed line items.
                    </h3>
                  </Carousel.Item>
                  <Carousel.Item>
                    <h4> Insight Sheets </h4>
                    <Link to="/insight-sheets">
                      <img src={two} alt="Second slide" loading="lazy" />
                    </Link>
                    <h2> Xactimate invoicing templates </h2>
                    <h3> with line items and example F9 notes. </h3>
                  </Carousel.Item>
                  <Carousel.Item>
                    <h4>
                      AI Matterport
                      <br />
                      Certified
                    </h4>
                    <Link to="/aimc">
                      <img src={three} alt="Third slide" loading="lazy" />
                    </Link>
                      <h2> Online, Self-Paced Video Course </h2>
                      <h3>
                        Everything you need to know about
                        <br />
                        making the most of Matterport in the
                        <br />
                        property insurance industry.
                      </h3>
                  </Carousel.Item>
                  <Carousel.Item>
                    <h4>
                      About
                      <br />
                      Actionable Insights
                    </h4>
                    <Link to="/actionable-xactimate-profile">
                      <img src={four} alt="Fourth slide" loading="lazy" />
                    </Link>
                    <h3 className="res-mode" style={{ marginTop: "50px" }}>
                      501(c)6 educational non-profit that exists
                      <br />
                      to preserve the health of the property
                      <br />
                      insurance ecosystem.
                    </h3>
                  </Carousel.Item>
                  <Carousel.Item>
                    <h4>
                      Actionable Profile
                      <br />
                      and Xact Best
                      <br />
                      Practices Bootcamp
                    </h4>
                    <Link to="/actionable-xactimate-profile">
                      <img src={five} alt="Fifth slide" loading="lazy" />
                    </Link>
                    <h3 className="res-mode" style={{ marginTop: "50px" }}>
                      This course aims to transform attendees
                      <br />
                      into experts in Xactimate best practices
                      <br />
                      and the Actionable Profile.
                    </h3>
                  </Carousel.Item>
                  <Carousel.Item>
                    <h4>
                      Price List Update
                      <br />
                      Summary
                    </h4>
                    <Link to="/resources/price-list-update-summary">
                      <img src={six} alt="Sixth slide" loading="lazy" />
                    </Link>
                    <h3 className="res-mode" style={{ marginTop: "50px" }}>
                      Do you know what line items were
                      <br />
                      added to the Xactimate Price List last
                      <br />
                      month?
                    </h3>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <div className="AILPBackground">
          <img
            src={AILPBackground}
            alt="AILPBackground"
            width={100}
            height={100}
            className="ap-logo"
          />
        </div>
      </div>
    </>
  );
};

export default SliderSectionNew;
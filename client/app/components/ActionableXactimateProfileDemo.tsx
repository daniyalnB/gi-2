import React from "react";
import { Link } from "react-router-dom";
import ColeAPDemo from "assets/ColeAPDemo.svg";

const ActionableXactimateProfileDemo = () => {
  return (
    <div className="ActionableInsightsDemo">
      <h5> Book a demo WITH AN EXPERT </h5>
      <p> Learn how the Actionable Profile helps restoration contractors and claims professionals succeed by leveraging live estimating guidance. </p>
      <Link
        to="/demo"
        className="btn"
      >
        Book Now
      </Link>
      <br />
      <Link to="/demo">
        <img
          src={ColeAPDemo}
          alt="ColeAPDemo"
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default ActionableXactimateProfileDemo;
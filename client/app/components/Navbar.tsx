import React from "react";
import logo from "../../assets/brand-logo.png"

const Navbar: React.FC = () => {

  return(
    <div className="Navbar">
      <img src={logo} />
    </div>
  );
};

export default Navbar;

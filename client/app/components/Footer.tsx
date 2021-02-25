import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo_Footer.svg";
import facebook from "../../assets/facebook.svg";
import linkedin from "../../assets/linkedin.svg";
import instagram from "../../assets/instagram.svg";

function Footer () {
    return (
        <>
            <footer id="colophon" className="site-footer">
                <div className="site-info">
                    <div className="container-fluid">
                       <div className="row">
                           <div className="col-5 text-left">
                               <div className="logo">
                                    <img src={logo} />
                                </div>
                                <div className="Copyright">
                                    <p> Copyright © 2019-2020 — Actionable Insights. </p>
                                </div>
                           </div>
                           <div className="col-5 text-left">
                                <div className="footer-menu">
                                    <div className="menu-footer-menu-container">
                                        <ul id="menu-footer-menu" className="menu">
                                            <li>
                                                <a href="https://www.getinsights.org/about-us/">About Us</a>
                                            </li>
                                            <li>
                                                <a href="https://www.getinsights.org/contact-us/">Contact Us</a>
                                            </li>
                                            <li>
                                                <a href="https://www.getinsights.org/sitemap/">Sitemap</a>
                                            </li>
                                            <li>
                                                <a href="https://www.getinsights.org/terms-and-conditions/">Terms and Conditions</a>
                                            </li>
                                        </ul>
                                    </div>                        
                                </div>
                           </div>
                           <div className="col-2">
                                <div className="social-links text-right">
                                    <a href="https://www.facebook.com/actionableinsightsforum/" target="_blank">
                                        <img src={facebook} />
                                    </a>
                                    <a href="https://www.instagram.com/actionable_insights/" target="_blank">
                                        <img src={instagram} />
                                    </a>
                                    <a href="https://www.linkedin.com/company/actionableinsightsforum/" target="_blank">
                                        <img src={linkedin} />
                                    </a>                       
                                </div>
                           </div>
                       </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
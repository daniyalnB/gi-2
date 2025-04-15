import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import logo from "assets/Logo_Footer.svg";
import x from "assets/x.svg";
import facebook from "assets/facebook.svg";
import linkedin from "assets/linkedin.svg";
import instagram from "assets/instagram.svg";
import youtube from "assets/youtube.svg";
import xactimate from "assets/xactimate.svg";
import matterport from "assets/matterport.svg";
import ColeThinking from "assets/Cole-Thinking.webp";

const Footer = (props) => {

	const pathname = window.location.pathname;

	var year = new Date().getFullYear();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
          portalId: "3936526",
          formId: "28cf6aab-c770-41bf-80ce-80238cf7ad40",
          target: "#hubspotFormFooter",
        });
      }
			setLoading(false);
    });
  }, []);

	return (
		<>
			<footer id="colophon" className="site-footer">
				{pathname === "/advance-the-cause/actionable-profile-alert-request" && (
					<div className="Cole-Thinking">
						<img
							src={ColeThinking}
							loading="lazy"
						/>
					</div>
				)}
				<div className="site-info">
					<div className="container-fluid">
						<div className="row">
							<div className="col-3">
								<div className="logo">
									<img
										src={logo}
										alt="logo"
										loading="lazy"
									/>
								</div>
								<div className="address">
									<span>
										5962 La Place Ct #130
										<br />
										Carlsbad, CA 92008
									</span>
								</div>
								<div className="social-links">
									<a href="https://www.youtube.com/channel/UCvfE9lncGc-MjA8oYcdjyNg" target="_blank">
										<img
											src={youtube}
											alt="youtube"
											loading="lazy"
										/>
									</a>
									<a href="https://www.linkedin.com/company/actionableinsightsforum/" target="_blank">
										<img
											src={linkedin} 
											alt="linkedin"
											loading="lazy"
										/>
									</a>									
									<a href="https://www.facebook.com/actionableinsightsforum/" target="_blank">
										<img
											src={facebook}
											alt="facebook"
											loading="lazy"
										/>
									</a>
									<a href="https://www.instagram.com/actionable_insights/" target="_blank">
										<img
											src={instagram}
											alt="instagram"
											loading="lazy"
										/>
									</a>
									<br />
									<a href="https://twitter.com/insightsheets?lang=en" target="_blank">
										<img
											src={x}
											alt="twitter"
											loading="lazy"
										/>
									</a>
									<a href="https://www.facebook.com/groups/XactimateNinjas/" target="_blank">
										<img
											src={xactimate}
											alt="xactimate"
											loading="lazy"
										/>
									</a>
									<a href="https://www.facebook.com/groups/MatterportNinjas" target="_blank">
										<img
											src={matterport}
											alt="matterport"
											loading="lazy"
										/>
									</a>						                     
								</div>
							</div>
							<div className="col-3">
								<div className="page-links">
									<h5> RESOURCE CENTER </h5>
									<br />
									<Link to="/plan-matrix">
										Membership Plans
									</Link>
									<br /><br />
									<Link to="/actionable-xactimate-profile">
										Actionable Profile
									</Link>
									<br /><br />
									<Link to="/media-release">
										Media Release
									</Link>
									<br /><br />
									<Link to="/blog">
										Blog
									</Link>
									<br /><br />
									<Link to="/media-kit">
										Media Kit
									</Link>
								</div>
							</div>
							<div className="col-3">
								<div className="page-links second">
									<h5> ABOUT ACTIONABLE </h5>
									<br />
									<Link to="/about-us">
										About Us
									</Link>
									<br /><br />
									<Link to="/contact-us">
										Contact Us
									</Link>
									<br /><br />
									<Link to="/demo">
										Book a Demo
									</Link>
									<br /><br />
									<Link to="/terms-and-conditions">
										Terms and Conditions
									</Link>
								</div>
							</div>
							<div className="col-3">
								<div className="news-letter">
									<h4> AI <span>NEWSLETTER</span></h4>
									<br /><br />
									<p> Get the 5-minute newsletter keeping 15k+ property insurance professionals in the loop </p>
									{!loading && (
										<div id="hubspotFormFooter"></div>
									)}
									{loading && (
										<div className="loader-inner">
											<LottieLoader />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="Copyright">
					<p> Copyright © 2019-{year} — Actionable Insights. </p>
				</div>
			</footer>
		</>
	);
};

export default Footer;
import React from "react";
import { Link } from "react-router-dom";

const DiscoverSection = () => {
	return (
		<>
			{localStorage.getItem("tokenCustomer") == null && (
				<div className="section-1">
					<div className="container">
						<div className="discover_section">
							<div className="row">
								<div className="col text-left">
									<span className="one"> Discover What Your Peers Already Have </span>
									<br />
									<span className="two"> Stop searching. Start writing. </span>
								</div>
								<div className="col text-right">
									<Link
										to="/get-started"
										className="btn btn_1"
									>
										Get Started
									</Link>
									<Link 
										to="/demo"
										className="btn btn_2"
									> 
										Demo 
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DiscoverSection;
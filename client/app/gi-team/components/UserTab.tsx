import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import power from "assets/Power.svg";

export default function UserTab () {

	const { logout } = useContext(AuthContext);

	return (
		<>
			<div className="admin-home">
				<div className="container-fluid" style={{ padding: "0px" }}>
					<div className="row">
						<div className="col">
							<div className="row user-info">
								<div className="col-11 text-right">
									<h4> Hey, Admin </h4>
									<br />
									<h5> {localStorage.getItem("role") == "Administrator" ? "Admin" : localStorage.getItem("role")} </h5>
								</div>
								<div className="col-1">
									<img 
										src={power}
										onClick={logout}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
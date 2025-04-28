import React, { useState } from "react";

const ScanTerminology = () => {

	const [one, setOne] = useState(false);
	const [two, setTwo] = useState(false);
	const [three, setThree] = useState(false);
	const [four, setFour] = useState(false);
	const [five, setFive] = useState(false);

	return (
		<>
			<div className="Scan_Terminology">
				<h2> Scan Terminology </h2>
				<div className="Tabs">
					<div className="row" onClick={() => setOne(!one)}>
						<div className="col-10">
							<h1> 1. Risk Engineering Scan </h1>
						</div>
						<div className="col-2">
							{one ? <i className="fas fa-caret-up fa-lg" /> : <i className="fas fa-caret-down fa-lg" /> }
						</div>
					</div>
					{one == true ? (
						<div className="Dropdown">
							<p>
								This scan is executed prior to a loss and typically worked into the underwriting process as an extension of the initial inspections. 
								Some small, innovative carriers will not bind coverage until they have a Matterport scan on file. 
								Look for this risk engineering scan to become commonplace by 2021 – it will serve as an incredibly valuable asset as it relates to underwriting, policy renewals, and expedited claims settlement after a catastrophic loss.
							</p>
							<iframe 
								src="https://my.matterport.com/show/?m=MJiSZJXNaYJ&brand=0" 
								frameBorder="0" 
								allowFullScreen 
							/>
						</div>
					) : "" }
				</div>
				<div className="Tabs">
					<div className="row" onClick={() => setTwo(!two)}>
						<div className="col-10">
							<h1> 2. Pre-Mitigation Scan </h1>
						</div>
						<div className="col-2">
							{two ? <i className="fas fa-caret-up fa-lg" /> : <i className="fas fa-caret-down fa-lg" /> }
						</div>
					</div>
					{two == true ? (
						<div className="Dropdown">
							<p>
								This scan is ideally executed shortly after the loss and prior to any mitigation activities being performed.
							</p>
							<iframe 
								src="https://my.matterport.com/show/?m=4jCkp2BDoCo&brand=0" 
								frameBorder="0" 
								allowFullScreen 
							/>
						</div>
					) : "" }
				</div>
				<div className="Tabs">
					<div className="row" onClick={() => setThree(!three)}>
						<div className="col-10">
							<h1> 3. Post-Mitigation Scan </h1>
						</div>
						<div className="col-2">
							{three ? <i className="fas fa-caret-up fa-lg" /> : <i className="fas fa-caret-down fa-lg" /> }
						</div>
					</div>
					{three == true ? (
						<div className="Dropdown">
							<p>
								This scan is executed after demolition has been completed but before the mitigation equipment has been broken down. 
								This scan is typically performed on the last day of dry out before the equipment break down.
							</p>
							<iframe 
								src="https://my.matterport.com/show/?m=xGH1xpfGFXU&brand=0" 
								frameBorder="0" 
								allowFullScreen 
							/>
						</div>
					) : "" }
				</div>
				<div className="Tabs">
					<div className="row" onClick={() => setFour(!four)}>
						<div className="col-10">
							<h1> 4. Progress Scan </h1>
						</div>
						<div className="col-2">
							{four ? <i className="fas fa-caret-up fa-lg" /> : <i className="fas fa-caret-down fa-lg" /> }
						</div>
					</div>
					{four == true ? (
						<div className="Dropdown">
							<p>
								These scans are typically executed to keep property owners, owners agents and mortgage companies apprised of progress. 
								They are generally done with an eye towards expediting the release of performance payments from mortgage companies etc. 
								These scans are also being executed in large loss environments where the materially interested parties are keen to add as-built scans to their close-out documents.
							</p>
							<iframe 
								src="https://my.matterport.com/show/?m=H3KHXTgjUPM&brand=0" 
								frameBorder="0" 
								allowFullScreen 
							/>
						</div>
					) : "" }
				</div>
				<div className="Tabs">
					<div className="row" onClick={() => setFive(!five)}>
						<div className="col-10">
							<h1> 5. Post-Repair Scans </h1>
						</div>
						<div className="col-2">
							{five ? <i className="fas fa-caret-up fa-lg" /> : <i className="fas fa-caret-down fa-lg" /> }
						</div>
					</div>
					{five == true ? (
						<div className="Dropdown">
							<p>
								These scans are occasionally executed in a restoration environment. 
								They have a proven ability to aid in the release of payments from the mortgage companies (and this will become more commonplace in the years to come). 
								These are also executed to champion the sales process via the Capture application. 
								Showing policyholders a mix of pre/post-mitigation scans and post-repair scans can provide solace that they are working with a seasoned and capable restoration contractor.
							</p>
							<iframe 
								src="https://my.matterport.com/show/?m=hajYgwwpXoN&brand=0" 
								frameBorder="0" 
								allowFullScreen 
							/>
						</div>
					) : "" }
				</div>
			</div>
		</>
	);
};

export default ScanTerminology;
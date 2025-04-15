import React, { Suspense, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { getPublicCertificationRecord } from "../../../utils/api-routes/api-routes.util";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import search2 from "assets/search2.png";

const MySearch = (props) => {

  let input;
  
	const handleClick = () => {
    props.onSearch(input.value.replace(/ /g,""));
  };
  
	return (
		<div className="form-group nogroup">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Search"
					autoFocus
					ref={ n => input = n }
					onChange={handleClick}
				/>
				<img
					className="input_icon"
					src={search2}
					alt="search2"
					loading="lazy"
				/>
			</div>
		</div>
  );
};

const AimcGraduatesPublicRegistry = () => {

	const [loading, setLoading] = useState(true);

	const [CertificationRecord, setCertificationRecord] = useState([]);

	var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  useEffect(() => {
    getPublicCertificationRecord().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.map((val) => ({
          first_name: val.customerfirstname,
          last_name: val.customerlastname,
					passed_date: moment(val.passdate).format("MM-DD-YYYY"),
        }));
				const sortedData = x.sort((a, b) => a.last_name.localeCompare(b.last_name));
        setCertificationRecord(sortedData);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

	const columns = [
		{
			dataField: "first_name",
			text: "First Name"
		},
		{
			dataField: "last_name",
			text: "Last Name"
		},
		{
			dataField: "passed_date",
			text: "Passed Date"
		},
	];

	const customTotal = (from, to, size) => (
		<span className="react-bootstrap-table-pagination-total">
			Showing { from } to { to } of { size } entries
		</span>
	);

	const options = {
		page: 1,
    sizePerPage: 10,
		paginationSize: 6,
		pageStartIndex: 1,
		alwaysShowAllBtns: true,
		withFirstAndLast: false,
		hidePageListOnlyOnePage: true,
		prePageText: "Previous",
		nextPageText: "Next",
		showTotal: true,
		paginationTotalRenderer: customTotal,
		disablePageTitle: true,
		hideSizePerPage: true,
	};

	return (
		<>
			<SEO
        title="Actionable Insights Matterport Certified Graduates Registry"
        description="Actionable Insights' publicly available database of every Matterport Certified Graduate to date. Verify the certification of any graduate here."
				link="aimc-graduates-public-registry"
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
					<div className="AIMC_GPR">
						<div className="">
							<div className="holder">
								<h2> AIMC Graduates Public Registry </h2>
                <img
									src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/05/20232632/aimc_Graduate_PR-.png"
									alt="aimc_Graduate_PR"
									loading="lazy"
								/>
							</div>
							{!loading && (
								<div className="AIMC_GPR_Table">
									<ToolkitProvider
										keyField="id"
										columns={ columns }
										data={ CertificationRecord }
										search
									>
										{
											toolkitprops => (
												<div>
													<MySearch { ...toolkitprops.searchProps } />
													<BootstrapTable
														{ ...toolkitprops.baseProps }
														noDataIndication={() => (<div>No matching records found</div>)}
														pagination={ paginationFactory(options) }
													/>
												</div>
											)
										}
									</ToolkitProvider>
								</div>
							)}
							{loading && (
								<div className="loader-inner">
									<LottieLoader />
								</div>
							)}   
							<div className="Button">
								<Link
									to="/aimc"
									className="btn"
								>
									Become Matterport Certified
								</Link>
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

export default withRouter(AimcGraduatesPublicRegistry);
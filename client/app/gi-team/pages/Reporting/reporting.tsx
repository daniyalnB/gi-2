import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import reportingRedred from "assets/ReportingRed.svg";
import download from "assets/Download_CSV.svg";
import stats from "assets/ProfessionalPlanActiveStats.svg";
import right from "assets/productright.png";
import moment from "moment";
import { Helmet } from "react-helmet";
import { CSVLink } from "react-csv";
import { 
  getAllSubscriptions,
  getCustomerChildUserDetails,
} from "../../../../utils/api-routes/api-routes.util";

const Reporting = (props) => {

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [loading, setLoading] = useState(true);

  const [ProPlanMonthlyActiveStats, setProPlanMonthlyActiveStats] = useState([]);

  const [TotalActiveProPlanMonthlyUsers, setTotalActiveProPlanMonthlyUsers] = useState([]);

  const [ProPlanAnnualActiveStats, setProPlanAnnualActiveStats] = useState([]);

  const [TotalActiveProPlanAnnualUsers, setTotalActiveProPlanAnnualUsers] = useState([]);

  const [ALLEPCClients, setALLEPCClients] = useState([]);

  useEffect(() => {
    getAllSubscriptions().subscribe((response) => {
      if (response.response.Requested_Action) {
        const w = response.response.data;
        const s = w.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active");
        const cc = s.filter((code) => code.subscriptioninfo.subscriptioncoupon !== null);
        const epc = cc.filter((plan) => plan.subscriptioninfo.subscriptioncoupon.couponcode.toLowerCase().startsWith("epc") || plan.subscriptioninfo.subscriptioncoupon.couponcode.toLowerCase().endsWith("epc") || plan.subscriptioninfo.subscriptioncoupon.couponcode === "Lennon99PRO" || plan.subscriptioninfo.subscriptioncoupon.couponcode === "lyon6pro" || plan.subscriptioninfo.subscriptioncoupon.couponcode === "vegapro");
        const epcdata = epc.map((val) => ({
          user_email: val.ownerinfo.emailaddress,
          plan_name: val.subscriptioninfo.planname === "StandardPlan" ? "Standard Plan (Monthly)" : val.subscriptioninfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" : val.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : val.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : val.subscriptioninfo.planname === "StandardPlanAnnual" ? "Standard Plan (Annual)" : val.subscriptioninfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" : val.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : val.subscriptioninfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" : val.subscriptioninfo.planname === "DevTestPlan" ? "Dev Test Plan" : "N/A",
					discount: `${val.subscriptioninfo.subscriptioncoupon.couponcode} | ${val.subscriptioninfo.subscriptioncoupon.discountpercentage}% off the subscription fee for ${val.subscriptioninfo.subscriptioncoupon.duration} ${val.subscriptioninfo.subscriptioncoupon.usedfor.includes("Annual") ? "Year(s)" : "Month(s)"}`,
          code_expiry: `Remaining ${val.subscriptioninfo.subscriptioncoupon.timeLeft} ${val.subscriptioninfo.subscriptioncoupon.usedfor.includes("Annual") ? "Year(s)" : "Month(s)"} until coupon expires`,
        }));
        setALLEPCClients(epcdata);
        const x = w.filter((plan) => plan.subscriptioninfo.planname == "ProfessionalPlan" || plan.subscriptioninfo.planname == "EnterprisePlan");
        const y = x.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active");
        const z = y.map((val) => ({
          parent_email: val.ownerinfo.emailaddress,
          total_users: val.subscriptioninfo.childcount,
					discount: val.subscriptioninfo.subscriptioncoupon ? `${val.subscriptioninfo.subscriptioncoupon.couponcode} | ${val.subscriptioninfo.subscriptioncoupon.discountpercentage}% off the subscription fee for ${val.subscriptioninfo.subscriptioncoupon.duration} ${val.subscriptioninfo.subscriptioncoupon.usedfor.includes("Annual") ? "Year(s)" : "Month(s)"}` : "N/A",
					next_billing_price: `$${(val.subscriptioninfo.nextchargeamount/100).toFixed(2)}`,
					next_billing_date: `${moment(val.subscriptioninfo.nextsubdate).format("LL")}`,
        }));
        setProPlanMonthlyActiveStats(z);
        const a = w.filter((plan) => plan.subscriptioninfo.planname == "ProfessionalPlanAnnual" || plan.subscriptioninfo.planname == "EnterprisePlanAnnual");
        const b = a.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active");
        const c = b.map((val) => ({
          parent_email: val.ownerinfo.emailaddress,
          total_users: val.subscriptioninfo.childcount,
					discount: val.subscriptioninfo.subscriptioncoupon ? `${val.subscriptioninfo.subscriptioncoupon.couponcode} | ${val.subscriptioninfo.subscriptioncoupon.discountpercentage}% off the subscription fee for ${val.subscriptioninfo.subscriptioncoupon.duration} ${val.subscriptioninfo.subscriptioncoupon.usedfor.includes("Annual") ? "Year(s)" : "Month(s)"}` : "N/A",
					next_billing_price: `$${(val.subscriptioninfo.nextchargeamount/100).toFixed(2)}`,
					next_billing_date: `${moment(val.subscriptioninfo.nextsubdate).format("LL")}`,
        }));
        setProPlanAnnualActiveStats(c);
        getCustomerChildUserDetails().subscribe((response) => {
          if (response.response.Requested_Action) {
            const data = response.response.data;
            const e = data.filter((plan) => plan.planname == "ProfessionalPlan" || plan.planname == "EnterprisePlan");
            const f = e.map((val) => ({
              parent_email: val[`Parent Email`],
              user_count: val[`User Count`],
            }));
            const totalPPM = ([
              {
                parent_email: "Total",
                user_count: f.reduce((n, {user_count}) => n + user_count, 0),
              }
            ]);
            const g = [...f, ...totalPPM];
            setTotalActiveProPlanMonthlyUsers(g);
            const h = data.filter((plan) => plan.planname == "ProfessionalPlanAnnual" || plan.planname == "EnterprisePlanAnnual");
            const i = h.map((val) => ({
              parent_email: val[`Parent Email`],
              user_count: val[`User Count`],
            }));
            const totalPPA = ([
              {
                parent_email: "Total",
                user_count: i.reduce((n, {user_count}) => n + user_count, 0),
              }
            ]);
            const j = [...i, ...totalPPA];
            setTotalActiveProPlanAnnualUsers(j);
          }
          setLoading(false);
        });
      }
    });
  }, []);
   
  const headers = [
    {
      label:"Parent Email",
      key:"parent_email"
    },
    {
      label:"Total Users(Including Parent)",
      key:"total_users"
    },
    {
      label:"Discount",
      key:"discount"
    },
    {
      label:"Last Billing Price",
      key:"next_billing_price"
    },
    {
      label:"Next Billing Date",
      key:"next_billing_date"
    },
  ];
   
  const PPMAS = {
    headers: headers,
    data: ProPlanMonthlyActiveStats,
    filename: `${moment(date).format("LL")}`
  };

  const PPAAS = {
    headers: headers,
    data: ProPlanAnnualActiveStats,
    filename: `${moment(date).format("LL")}`
  };

  const headers1 = [
    {
      label:"Email of Parent User",
      key:"parent_email"
    },
    {
      label:"Active Sub Users Count(Including Parent)",
      key:"user_count"
    },
  ];

  const TAPPMU = {
    headers: headers1,
    data: TotalActiveProPlanMonthlyUsers,
    filename: "Total Active Pro Plan Monthly Users"
  };

  const TAPPAU = {
    headers: headers1,
    data: TotalActiveProPlanAnnualUsers,
    filename: "Total Active Pro Plan Annual Users"
  };

  const EPCheaders = [
    {
      label:"User Email",
      key:"user_email"
    },
    {
      label:"Plan Name",
      key:"plan_name"
    },
    {
      label:"Discount",
      key:"discount"
    },
    {
      label:"Code Expiry",
      key:"code_expiry"
    },
  ];

  const EPCClients = {
    headers: EPCheaders,
    data: ALLEPCClients,
    filename: "EPC Clients"
  };

	return (
		<>
			<Helmet>
        <title> 
          Reporting - Actionable Insights Admin
        </title>
      </Helmet>
			<div className="products">
				<div className="container-fluid">
					<div className="row">
						<div className="col-3">
							<ScrollToTop />
							<SideMenu />
						</div>
						<div className="col-9">
							<div className="row">
								<UserTab />
							</div>
							<div className="row products-section">
								<div className="row header">
									<div className="col-12">
										<div className="page_icon">
											<img src={reportingRedred} />
										</div>
										<h3 className="heading">
                      Reporting
										</h3>
									</div>
								</div>
								<hr />
								<div className="inner_sub_area">
                  {!loading && (
                    <div className="row products-data">
                      <div className="col">
                        <div className="data">
                          <div className="row">
                            <div className="data-image-one col-xl-1 col-lg-1 col-md-2 col-sm-2">
                              <img src={stats} />
                            </div>
                            <div className="reporting col-xl-9 col-lg-9 col-md-8 col-sm-8">
                              <h3> Verisk Reporting </h3>
                            </div>
                            <div className="download col-xl-2 col-lg-2 col-md-2 col-sm-2">
                              <Link to="/gi-team/verisk-reporting">
                                <img src={right} />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="data">
                          <div className="row">
                            <div className="data-image-one col-xl-1 col-lg-1 col-md-2 col-sm-2">
                              <img src={stats} />
                            </div>
                            <div className="reporting col-xl-9 col-lg-9 col-md-8 col-sm-8">
                              <h3> Pro Plan Monthy Active Stats </h3>
                            </div>
                            <div className="download col-xl-2 col-lg-2 col-md-2 col-sm-2">
                              <CSVLink {...PPMAS}>
                                <img src={download} />
                              </CSVLink>
                            </div>
                          </div>
                        </div>
                        <div className="data">
                          <div className="row">
                            <div className="data-image-one col-xl-1 col-lg-1 col-md-2 col-sm-2">
                              <img src={stats} />
                            </div>
                            <div className="reporting col-xl-9 col-lg-9 col-md-8 col-sm-8">
                              <h3> Total Active Pro Plan Monthly Users </h3>
                            </div>
                            <div className="download col-xl-2 col-lg-2 col-md-2 col-sm-2">
                              <CSVLink {...TAPPMU}>
                                <img src={download} />
                              </CSVLink>
                            </div>
                          </div>
                        </div>
                        <div className="data">
                          <div className="row">
                            <div className="data-image-one col-xl-1 col-lg-1 col-md-2 col-sm-2">
                              <img src={stats} />
                            </div>
                            <div className="reporting col-xl-9 col-lg-9 col-md-8 col-sm-8">
                              <h3> Pro Plan Annual Active Stats </h3>
                            </div>
                            <div className="download col-xl-2 col-lg-2 col-md-2 col-sm-2">
                              <CSVLink {...PPAAS}>
                                <img src={download} />
                              </CSVLink>
                            </div>
                          </div>
                        </div>
                        <div className="data">
                          <div className="row">
                            <div className="data-image-one col-xl-1 col-lg-1 col-md-2 col-sm-2">
                              <img src={stats} />
                            </div>
                            <div className="reporting col-xl-9 col-lg-9 col-md-8 col-sm-8">
                              <h3> Total Active Pro Plan Annual Users </h3>
                            </div>
                            <div className="download col-xl-2 col-lg-2 col-md-2 col-sm-2">
                              <CSVLink {...TAPPAU}>
                                <img src={download} />
                              </CSVLink>
                            </div>
                          </div>
                        </div>
                        <div className="data">
                          <div className="row">
                            <div className="data-image-one col-xl-1 col-lg-1 col-md-2 col-sm-2">
                              <img src={stats} />
                            </div>
                            <div className="reporting col-xl-9 col-lg-9 col-md-8 col-sm-8">
                              <h3> EPC Clients </h3>
                            </div>
                            <div className="download col-xl-2 col-lg-2 col-md-2 col-sm-2">
                              <CSVLink {...EPCClients}>
                                <img src={download} />
                              </CSVLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
			</div>
		</>
	);
};

export default withRouter(Reporting);
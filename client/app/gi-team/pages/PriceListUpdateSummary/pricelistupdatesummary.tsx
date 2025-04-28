import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import create from "assets/create.png";
import plusred from "assets/PriceListSummaryRed.svg";
import right from "assets/productright.png";
import Calander from "assets/Calander.svg";
import moment from "moment";
import { Helmet } from "react-helmet";
import { GetAllPriceListUpdateSummary } from "../../../../utils/api-routes/api-routes.util";

const PriceList = (props) => {

    const [loading, setLoading] = useState(true);

    const [path, setPath] = useState(location.pathname);

    const [data, setData] = useState([]);

    useEffect(() => {
        GetAllPriceListUpdateSummary().subscribe((response) => {
            if (response.response.Requested_Action) {
                setLoading(false);
                setData(response.response.data);
            } else {
                alert("error");
            }
        });
    }, []);

    const years = data.map(x => moment(x.selecteddate).format("YYYY"));
    const uniqueYears = [...new Set(years)];

    const sortedYears = uniqueYears.sort((a, b) => b - a);

    return (
        <>
            <Helmet>
                <title> 
                    Price List Update Summary - Actionable Insights Admin
                </title>
            </Helmet>
            <div className="pricelist">
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
                            <div className="plus-section">
                                <div className="row header">
                                    <div className="col-9">
                                        <div className="page_icon">
                                            <img src={plusred} />
                                        </div>
                                        <h3 className="heading">
                                            Price List Update Summary
                                        </h3>
                                    </div>
                                    {localStorage.getItem("role") == "Analyst" ? (
                                        ""
                                    ) : (
                                        <div className="col-3 text-right">
                                            <Link
                                                className="btn"
                                                to="/gi-team/create-price-list-update-summary"
                                                state={{ path: path }}
                                            >
                                                <img src={create} />
                                                Create New
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <hr />
                                {!loading && (
                                    <>
                                        <div className="inner_sub_area">
                                            <div className="row price-list-data">
                                                {sortedYears.map((val, key) => {
                                                    return (
                                                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="data">
                                                                <div className="row">
                                                                    <div className="data-image-one col-3">
                                                                        <img src={Calander} />
                                                                    </div>
                                                                    <div className="data-text col-5">
                                                                        <h3> {val} </h3>
                                                                    </div>
                                                                    <div className="data-image-two col-4">
                                                                        <Link
                                                                            to={`/gi-team/price-list-update-summary-of-${val}`}
                                                                        >
                                                                            <img src={right} />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
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
        </>
    );
};

export default withRouter(PriceList);
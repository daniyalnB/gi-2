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

const PriceListOfYear = (props) => {

    const [loading, setLoading] = useState(true);

    const [path, setPath] = useState(location.pathname);

    const [data, setData] = useState([]);

    useEffect(() => {
        GetAllPriceListUpdateSummary().subscribe((response) => {
            if (response.response.Requested_Action) {
                const x = response.response.data.filter(
                    (pricelist) => `${moment(pricelist.selecteddate).format("YYYY")}` == props.match.params.year
                );
                setLoading(false);
                setData(x);
            } else {
                alert("error");
            }
        });
    }, []);

    const sortedMonths = data.sort((a, b) => moment(a.selecteddate).format("M") - moment(b.selecteddate).format("M"));

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
                                                to={{
                                                    pathname: "/gi-team/create-price-list-update-summary",
                                                    state: {
                                                        path: path,
                                                    },
                                                }}
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
                                                {sortedMonths.map((val, key) => {
                                                    return (
                                                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                                            <div className="data">
                                                                <div className="row">
                                                                    <div className="data-image-one col-3">
                                                                        <img src={Calander} />
                                                                    </div>
                                                                    <div className="data-text col-5">
                                                                        <h4> {val.title} </h4>
                                                                    </div>
                                                                    <div className="data-image-two col-4">
                                                                        <Link
                                                                            to={{
                                                                                pathname:`/gi-team/update-price-list-update-summary/${val.id}`,
                                                                                state: {
                                                                                    path: path,
                                                                                },
                                                                            }}
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

export default withRouter(PriceListOfYear);
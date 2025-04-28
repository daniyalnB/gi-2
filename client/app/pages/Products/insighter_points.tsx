import React, { Suspense, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { getAllInsighterPointsProducts } from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import { NumericFormat } from "react-number-format";
import down from "assets/down-arrow-user.svg";

const ProductInsighterPoints = (props) => {

  const navigate = useNavigate();
  const { permalink } = useParams();

	const [loading, setLoading] = useState(true);

	const [path, setPath] = useState(location.pathname);

  // const { getCustomerInfo, myInfo } = useContext(AppContext);

	// useEffect(() => {
	// 	getCustomerInfo();
  // }, []);

  const [option, selectOption] = useState(false);

  const [data, setData] = useState([]);
  const [datafor2500, setDataFor2500] = useState([]);
  const [datafor5000, setDataFor5000] = useState([]);
  const [datafor75000, setDataFor75000] = useState([]);
  const [datafor100000, setDataFor100000] = useState([]);

	useEffect(() => {
		// getAllInsighterPointsProducts().subscribe((response) => {
		// 	if (response.response.Requested_Action) {
    //     const a = response.response.data.filter((points) => points.id === "19909")[0];
    //     setDataFor2500(a);
    //     setData(a);
    //     const b = response.response.data.filter((points) => points.id === "b")[0];
    //     setDataFor5000(b);
    //     const c = response.response.data.filter((points) => points.id === "c")[0];
    //     setDataFor75000(c);
    //     const d = response.response.data.filter((points) => points.id === "d")[0];
    //     setDataFor100000(d);
		// 		setLoading(false);
		// 	} else {
		// 		alert("error");
		// 	}
		// });
    navigate("/my-account/points");
	}, []);

  const [points, setPoints] = useState([
    "25,000 Points",
    "50,000 Points",
    "75,000 Points",
    "100,000 Points",
  ]);

  const [point, setPoint] = useState("25,000 Points");

  const [insighterPointPrice, setInsighterPointPrice] = useState(2500);

  const selectPoints = (val) => {
		if (val == "25,000 Points") {
      setInsighterPointPrice(2500);
			setData(datafor2500);
		} else if (val == "50,000 Points") {
      setInsighterPointPrice(5000);
      setData(datafor5000);
		} else if (val == "75,000 Points") {
			setInsighterPointPrice(7500);
      setData(datafor75000);
		} else {
      setInsighterPointPrice(10000);
      setData(datafor100000);
    }
	};

  const [objContactInformationForOrderDTO, setObjContactInformationForOrderDTO] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    companyname: "",
    branch: "",
    streetaddress: "",
    aptorunitorsuite: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    profilepicture: "",
  });

  // useEffect(() => {
  //   if (myInfo) {
  //     setObjContactInformationForOrderDTO({
  //       ...objContactInformationForOrderDTO,
  //       firstname: myInfo.ownerinfo.firstname,
  //       lastname: myInfo.ownerinfo.lastname,
  //       phonenumber: myInfo.ownerinfo.phonenumber,
  //       companyname: myInfo.ownerinfo.companyname ? myInfo.ownerinfo.companyname : "",
  //       branch: myInfo.ownerinfo.branch ? myInfo.ownerinfo.branch : "",
  //       streetaddress: myInfo.ownerinfo.streetaddress ? myInfo.ownerinfo.streetaddress : "",
  //       aptorunitorsuite: myInfo.ownerinfo.aptorunitorsuite ? myInfo.ownerinfo.aptorunitorsuite : "",
  //       city: myInfo.ownerinfo.city ? myInfo.ownerinfo.city : "",
  //       state: myInfo.ownerinfo.state ? myInfo.ownerinfo.state : "",
  //       zipcode: myInfo.ownerinfo.zipcode ? myInfo.ownerinfo.zipcode : "",
  //       profilepicture: myInfo.ownerinfo.profilepicture,
  //     });
  //   }
  // }, [myInfo]);

  const handleSubmit = () => {
    localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
    navigate("/checkout", {
			state: {
				points: data,
        quantity: 1,
				type: "points",
				path: path,
			}
		});
	}

	return (
		<>
			<SEO
        title="Insighter Points - Actionable Insights"
        description="Use Insighter Points against Solidifai. Redeem for all Events, Macros and Swag of Actionable Insights. 10 points are equal to $1. For example: 50,000 Insighter Points equate to $5000 USD."
        link="shop/buy-points/insighter-points"
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
					<div className="product_page">
						<div className="">
              {!loading && (
                <div className="row product">
                  <div className="col-xl-5 col-lg-5 col-md-12">    
                    <div className="image-section">
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/01/18001105/buy_insighter_image.jpeg"
                        alt="buy_insighter_image"
                        loading="lazy"
                      />
                    </div>      
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <div className="data-section">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12">
                          <h2 className="name"> Insighter Points </h2>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                          <div style={{ textAlign: "right" }}>
                            <NumericFormat 
															className="price"
															value={(insighterPointPrice).toFixed(2)}
															displayType={"text"}
															thousandSeparator={true}
															prefix={"$"}
														/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="description" style={{ marginTop: "50px" }}>
                            <p> 
                              Redeem for all Events and Macros of Actionable Insights.
                              <br />
                              <br />
                              10 points are equal to $1.
                              <br />
                              For example: 50,000 Insighter Points equate to $5000 USD.
                            </p>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="size">
                              <h3 className="text-left"> Options: </h3>
                              <div className="form-group">
                                <div className="input-group" onClick={() => selectOption(!option)}>
                                  <input 
                                    type="text"
                                    name="size"
                                    className="form-control" 
                                    placeholder="Choose"
                                    required
                                    value={point}
                                  />
                                  <img 
                                    className="input_icon" 
                                    src={down}
                                    onClick={() => selectOption(!option)}
                                  />
                                </div>
                                <div className={option ? "active" : "dropdown-content"}>
                                  {points.map((val,key) => {
                                    return (
                                      <div key={key}>
                                        <h2
                                          onClick={(e) => {
                                            selectOption(!option);
                                            setPoint(e.currentTarget.innerHTML);
                                            selectPoints(e.currentTarget.innerHTML);
                                          }}
                                        > 
                                          {val}
                                        </h2>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="BUY">
                              <button	
                                type="submit"
                                className="btn"
                              >
                                Purchase
                              </button>
                            </div>
                          </form>
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
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
}

export default ProductInsighterPoints;
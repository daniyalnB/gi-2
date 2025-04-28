import React, { Suspense, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
import NotFound from "../../components/NotFound";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllGiftcards } from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import Lightbox from "react-image-lightbox";
import { Carousel } from "react-responsive-carousel";
import { NumericFormat } from "react-number-format";
import down from "assets/down-arrow-user.svg";
import info from "assets/Info.svg";
import Plus_4 from "assets/Plus_4.png";
import Plus_12 from "assets/Plus_12.png";
import Standard_3 from "assets/Standard_3.png";
import Standard_6 from "assets/Standard_6.png";
import Standard_12 from "assets/Standard_12.png";
import Pro_3 from "assets/Pro_3.png";

const ProductGiftCards = (props) => {

  const navigate = useNavigate();
  const { permalink } = useParams();

  const [show, setShow] = useState(true);

  const [loading, setLoading] = useState(true);

  const [path, setPath] = useState(location.pathname);

  const { getCustomerInfo, myInfo } = useContext(AppContext);

	useEffect(() => {
		getCustomerInfo();
  }, []);

  const [cardName, setCardName] = useState("");

  const [cardData, setCardData] = useState(false);
  
  const [planNames, setPlanNames] = useState([]);

  const [durationinmonths, setdurationinmonths] = useState([]);

  useEffect(() => {
		GetAllGiftcards().subscribe((response) => {
			if (response.response.Requested_Action) {
        const x = response.response.data.filter(
					(gc) => gc.title.toLowerCase().replace(/ /g, "-") === permalink
				);
        if (x.length == 0) {
          setShow(false);
        }
        setCardData(x);
        setCardName(x[0].title);
        if (x[0].title == "Membership Plans Gift Card") {
          const x = response.response.data.filter(
            (gc) => gc.title === "Membership Plans Gift Card"
          );
          setCardData(x);
          const y = x.map((val) => ({
            planname: val.planname,
          }));
          const plannames = y.map(val => val.planname === "ProfessionalPlan" ? "Pro Plan" : val.planname.replace("Plan", " Plan"));
          const uniquePlanNames = [...new Set(plannames)];
          setPlanNames(uniquePlanNames);
          const z = x.map((val) => ({
            durationinmonths: val.durationinmonths,
          }));
          const duration = z.map(val => val.durationinmonths + " months");
          const uniqueDuration = [...new Set(duration)];
          setdurationinmonths(uniqueDuration);
        }
				setLoading(false);
			} else {
        setShow(false);
			}
		});
	}, []);

  const changeMonth = (val) => {
    if (val == "Standard Plan") {
      setdurationinmonths([
        "3 months",
        "6 months",
        "12 months",
      ]);
    } else if (val == "Plus Plan") {
      setdurationinmonths([
        "4 months",
        "12 months",
      ]);
    } else if (val == "Pro Plan") {
      setdurationinmonths([
        "3 months",
      ]);
    }
  }

  const changeFeaturedImage = (val) => {
    if (data.subscriptionplan == "Plus Plan") {
      if (val == "4 months") {
        setFeaturedImagesOne([
          Plus_4,
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      } else if (val == "12 months") {
        setFeaturedImagesOne([
          Plus_12,
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      } else {
        setFeaturedImagesOne([
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233637/gift_cards_membership_large1.jpg",
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      }
    } else if (data.subscriptionplan == "Standard Plan") {
      if (val == "3 months") {
        setFeaturedImagesOne([
          Standard_3,
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      } else if (val == "6 months") {
        setFeaturedImagesOne([
          Standard_6,
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      } else if (val == "12 months") {
        setFeaturedImagesOne([
          Standard_12,
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      } else {
        setFeaturedImagesOne([
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233637/gift_cards_membership_large1.jpg",
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      }
    } else if (data.subscriptionplan == "Pro Plan") {
      if (val == "3 months") {
        setFeaturedImagesOne([
          Pro_3,
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      } else {
        setFeaturedImagesOne([
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233637/gift_cards_membership_large1.jpg",
          "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
        ]);
      }
    }
  }

  const [subscription, setSubscription] = useState(false);

  const [duration, setDuration] = useState(false);

  const [data, setData] = useState({
    id: "",
    title: "",
    priceincents: 0,
    subscriptionplan: "",
    duration: "",
    memo: "",
    logo: "",
    quantity: 1,
    points: 2000,
  });

  useEffect(() => {
    if (data.subscriptionplan == "Standard Plan" && data.duration == "3 months") {
      const x = cardData.filter(
        (giftcard) => giftcard.id === "28234-3-StandardPlan"
      )[0];
      setData({
        ...data,
        id: x.id,
        priceincents: x.priceincents,
      })
    } else if (data.subscriptionplan == "Standard Plan" && data.duration == "6 months") {
      const x = cardData.filter(
        (giftcard) => giftcard.id === "28234-6-StandardPlan"
      )[0];
      setData({
        ...data,
        id: x.id,
        priceincents: x.priceincents,
      })
    } else if (data.subscriptionplan == "Standard Plan" && data.duration == "12 months") {
      const x = cardData.filter(
        (giftcard) => giftcard.id === "28234-12-StandardPlan"
      )[0];
      setData({
        ...data,
        id: x.id,
        priceincents: x.priceincents,
      })
    } else if (data.subscriptionplan == "Plus Plan" && data.duration == "4 months") {
      const x = cardData.filter(
        (giftcard) => giftcard.id === "28234-4-PlusPlan"
      )[0];
      setData({
        ...data,
        id: x.id,
        priceincents: x.priceincents,
      })
    } else if (data.subscriptionplan == "Plus Plan" && data.duration == "12 months") {
      const x = cardData.filter(
        (giftcard) => giftcard.id === "28234-12-PlusPlan"
      )[0];
      setData({
        ...data,
        id: x.id,
        priceincents: x.priceincents,
      })
    } else if (data.subscriptionplan == "Pro Plan" && data.duration == "3 months") {
      const x = cardData.filter(
        (giftcard) => giftcard.id === "28234-3-ProfessionalPlan"
      )[0];
      setData({
        ...data,
        id: x.id,
        priceincents: x.priceincents,
      })
    }
  }, [data.subscriptionplan, data.duration]);

  const onSelect = (e) =>
  setData({ ...data, [e.target.name]: e.target.files[0] });

  var maxTextAreaCount = 33;
  const [textAreaCount, ChangeTextAreaCount] = useState(33);

  const recalculate = (val) => {
    ChangeTextAreaCount(maxTextAreaCount - val.length);
  };

  const [featuredImagesOne, setFeaturedImagesOne] = useState(
    [
      "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233637/gift_cards_membership_large1.jpg",
      "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
    ]
  );

  const featuredImagesTwo = [
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/11004317/gift_card_AIMC_front.png",
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/11004304/gift_card_AIMC_back.png",
  ]

  const featuredImagesThree = [
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/14195706/gift_card_Xact_Digital_Assets_Class_front.png",
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233844/gift_card_matterport_geomni_xactimate_back.png",
  ]

  const featuredImagesFour = [
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233523/gift_card_insighter_points1.png",
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233601/gift_card_insighter_point_back.png",
  ]

	const [photoIndex, setPhotoIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {setIsOpen(true)}

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

  useEffect(() => {
    if (myInfo) {
      setObjContactInformationForOrderDTO({
        ...objContactInformationForOrderDTO,
        firstname: myInfo.ownerinfo.firstname,
        lastname: myInfo.ownerinfo.lastname,
        phonenumber: myInfo.ownerinfo.phonenumber,
        companyname: myInfo.ownerinfo.companyname ? myInfo.ownerinfo.companyname : "",
        branch: myInfo.ownerinfo.branch ? myInfo.ownerinfo.branch : "",
        streetaddress: myInfo.ownerinfo.streetaddress ? myInfo.ownerinfo.streetaddress : "",
        aptorunitorsuite: myInfo.ownerinfo.aptorunitorsuite ? myInfo.ownerinfo.aptorunitorsuite : "",
        city: myInfo.ownerinfo.city ? myInfo.ownerinfo.city : "",
        state: myInfo.ownerinfo.state ? myInfo.ownerinfo.state : "",
        zipcode: myInfo.ownerinfo.zipcode ? myInfo.ownerinfo.zipcode : "",
        profilepicture: myInfo.ownerinfo.profilepicture,
      });
    }
  }, [myInfo]);

	const handleSubmit = () => {
    localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
    navigate("/checkout", {
			state: {
				giftcard: data,
				quantity: data.quantity,
				type: "giftcard",
				path: path,
			}
		});
	}

	return (
		<>
      {show ? (
        <>
          <SEO
            title={
              cardData && cardData[0].title == "Membership Plans Gift Card" ? "Membership Plans" :
              cardData && cardData[0].title == "Matterport Certification Gift Card" ? "AI Matterport Certification" :
              cardData && cardData[0].title == "Xactimate Training Gift Card" ? "Xactimate Training" :
              cardData && cardData[0].title == "Insighter Points Gift Card" ? "Insighter Points Gift Card" : "Gift Cards - Actionable Insights"
            }
            description={
              cardData && cardData[0].title == "Membership Plans Gift Card" ? "Give the Insight Sheet Database, As Seen In Xact reports, Access to Macros, Commonly Overlooked Line Items, Scissor Lift Socks, and much more. Pick the plan and duration that works best for your gift." :
              cardData && cardData[0].title == "Matterport Certification Gift Card" ? "Give the gift of education and train for the future. Choose the online, self-paced Actionable Insights Matterport Certified course." :
              cardData && cardData[0].title == "Xactimate Training Gift Card" ? "Give the gift of education and train for the future. Choose Xactimate training." :
              cardData && cardData[0].title == "Insighter Points Gift Card" ? `Give flexibility – Insighter Points can be used for training, Solidifai submission, and Actionable Insights Swag. Select a custom Insighter Point value that works best for your gift.` : "Here's how you can say thank you in a credible way to those in your network. You asked and we delivered! Check out how to use your Actionable Insights gift card."
            }
            link={`shop/gift-card/${
              cardData && cardData[0].title == "Membership Plans Gift Card" ? "membership-plans-gift-card" :
              cardData && cardData[0].title == "Matterport Certification Gift Card" ? "matterport-certification-gift-card" :
              cardData && cardData[0].title == "Xactimate Training Gift Card" ? "xactimate-training-gift-card" :
              cardData && cardData[0].title == "Insighter Points Gift Card" ? "insighter-points-gift-card" : ""
            }`}
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
                    <>
                      {cardData[0].title == "Membership Plans Gift Card" && (
                        <div className="row product">
                          <div className="col-xl-5 col-lg-5 col-md-12">    
                            <div className="giftcards-coursel-featured-images">
                              <Carousel 
                                showArrows={false} 
                                showIndicators={false} 
                                showStatus={false} 
                                useKeyboardArrows={true}
                              >
                                {featuredImagesOne.map((val) => {
                                  return (
                                    <div 
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleOpen()}
                                    >
                                      <img
                                        src={val}
                                        loading="lazy"
                                      />
                                    </div>
                                  );
                                })}
                              </Carousel>
                            </div>  
                            {isOpen && featuredImagesOne.length > 1 && ( 
                              <Lightbox
                                mainSrc={featuredImagesOne[photoIndex]}
                                nextSrc={featuredImagesOne[(photoIndex + 1) % featuredImagesOne.length]}
                                prevSrc={featuredImagesOne[(photoIndex + featuredImagesOne.length - 1) % featuredImagesOne.length]}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() =>
                                  setPhotoIndex((photoIndex + featuredImagesOne.length - 1) % featuredImagesOne.length)
                                }
                                onMoveNextRequest={() =>
                                  setPhotoIndex((photoIndex + 1) % featuredImagesOne.length)
                                }
                              />
                            )}
                            {isOpen && featuredImagesOne.length == 1 && (
                              <Lightbox
                                mainSrc={featuredImagesOne[photoIndex]}
                                onCloseRequest={() => setIsOpen(false)}
                              />
                            )}
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="data-section">
                              <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12">
                                  <h2 className="name"> {cardData[0].title} </h2>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12">
                                  <div style={{ textAlign: "right" }}>
                                    {/* <h2 className="prevprice"> <del> ${data.priceincents * 100} </del> </h2> */}
                                    <NumericFormat 
                                      className="price"
                                      value={(data.priceincents / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </div>
                                  {/* <h3 className="points"> or {Math.floor(data.priceincents / 10)} Insighter Points </h3> */}
                                  {/* <div style={{ textAlign: "right" }}>
                                    <div className="discount">
                                      <span> Membership Discount </span>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="description"> 
                                    <p>
                                      Give the gift of the Insight Sheet Database, As Seen In Xact, Macro access and much more.
                                      Choose between the{" "}
                                      <Link to="/plan-matrix">
                                        Standard Plan
                                      </Link>
                                      ,{" "}
                                      <Link to="/plan-matrix">
                                        Plus Plan
                                      </Link>
                                      {" "}and{" "}
                                      <Link to="/plan-matrix">
                                        Pro Plan
                                      </Link>
                                      .
                                      <br />
                                      <br />
                                      For orders of 10+ cards reach out to our support team here to begin a convo about customized campaign solutions.
                                    </p>
                                  </div>
                                  <form onSubmit={handleSubmit}>
                                    <div className="gift-data">
                                      <div className="multiple-options">
                                        <div className="row">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Choose Subscription Plan </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <input 
                                                type="text" 
                                                name="Subscription" 
                                                required 
                                                id="inputField1" 
                                                className="input-area"
                                                style={{ 
                                                  color: "transparent",
                                                  textShadow: "0 0 0 #38ADA2",
                                                  cursor: "pointer",
                                                }}
                                                value={data.subscriptionplan}
                                                onClick={() => {
                                                  setSubscription(!subscription);
                                                  setDuration(false);
                                                }}
                                              />
                                              <label htmlFor="inputField1" className="floating_label"> Subscription Plan </label>
                                              <label className="file_input_label">
                                                <img 
                                                  className="select size"
                                                  src={down} 
                                                  onClick={() => {
                                                    setSubscription(!subscription);
                                                    setDuration(false);
                                                  }}
                                                />
                                              </label>
                                              <div className={subscription ? "active" : "dropdown-content"}>
                                                {planNames.map((val,key) => {
                                                  return (
                                                    <div key={key}>
                                                      <h2
                                                        onClick={(e) => {
                                                          setSubscription(!subscription);
                                                          setData({
                                                            ...data,
                                                            subscriptionplan: e.currentTarget.innerHTML,
                                                            duration: "",
                                                          });
                                                          changeMonth(e.currentTarget.innerHTML);
                                                          changeFeaturedImage("");
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
                                        </div>
                                        <div className="row mt-3">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Choose Duration </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <input 
                                                type="text" 
                                                name="Duration" 
                                                required 
                                                id="inputField2" 
                                                className="input-area"
                                                style={{ 
                                                  color: "transparent",
                                                  textShadow: "0 0 0 #38ADA2",
                                                  cursor: "pointer",
                                                }}
                                                value={data.duration}
                                                onClick={() => {
                                                  setDuration(!duration);
                                                  setSubscription(false);
                                                }}
                                              />
                                              <label htmlFor="inputField2" className="floating_label"> Duration </label>
                                              <label className="file_input_label">
                                                <img 
                                                  className="select size"
                                                  src={down} 
                                                  onClick={() => {
                                                    setDuration(!duration);
                                                    setSubscription(false);
                                                  }}
                                                />
                                              </label>
                                              <div className={duration ? "active" : "dropdown-content"}>
                                                {durationinmonths.map((val,key) => {
                                                  return (
                                                    <div key={key}>
                                                      <h2
                                                        onClick={(e) => {
                                                          setDuration(!duration);
                                                          setData({
                                                            ...data,
                                                            duration: e.currentTarget.innerHTML,
                                                          });
                                                          changeFeaturedImage(e.currentTarget.innerHTML);
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
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Memo </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="tabtitle"
                                                maxLength={33}
                                                required
                                                id="textField1"
                                                className="input-area"
                                                value={data.memo}
                                                onChange={(e) => {
                                                  setData({
                                                    ...data,
                                                    memo: e.currentTarget.value,
                                                  });
                                                  recalculate(e.currentTarget.value);
                                                }}
                                              />  
                                              <label htmlFor="textField1" className="floating_label"> Memo </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> {textAreaCount} characters remaining </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Logo Upload </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <label className="file">
                                                <input
                                                  type="file"
                                                  name="logo"
                                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                                  onChange={onSelect}
                                                  onClick={(e) => (e.target.value = null)}
                                                />
                                                <span className="file-custom">
                                                  {data.logo == "" ? (
                                                    <>
                                                      Choose File
                                                    </>
                                                  ) : (
                                                    <>
                                                      {data.logo.name}
                                                    </>
                                                  )}
                                                </span>
                                              </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> Max file size: 12MB </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Quantity </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <input
                                                type="number" 
                                                name="quantity"
                                                min={1}
                                                required 
                                                className="input-area"
                                                value={data.quantity}
                                                onChange={(e) =>
                                                  setData({
                                                    ...data,
                                                    quantity: parseInt(e.currentTarget.value),
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="BUY">
                                      <button	
                                        type="submit"
                                        className="btn"
                                        disabled={
                                          data.subscriptionplan == "" ||
                                          data.duration == "" ||
                                          data.memo == "" ||
                                          data.logo == "" ||
                                          data.quantity == 0
                                          ? true
                                          : false
                                        }
                                        onClick={() => setData({ 
                                          ...data,
                                          points: 0,
                                          title: cardData[0].title,
                                        })}
                                      >
                                        Buy
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {cardData[0].title == "Matterport Certification Gift Card" && (
                        <div className="row product">
                          <div className="col-xl-5 col-lg-5 col-md-12">    
                            <div className="giftcards-coursel-featured-images">
                              <Carousel 
                                showArrows={false} 
                                showIndicators={false} 
                                showStatus={false} 
                                useKeyboardArrows={true}
                              >
                                {featuredImagesTwo.map((val) => {
                                  return (
                                    <div 
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleOpen()}
                                    >
                                      <img
                                        src={val}
                                        loading="lazy"
                                      />
                                    </div>
                                  );
                                })}
                              </Carousel>
                            </div>  
                            {isOpen && featuredImagesTwo.length > 1 && ( 
                              <Lightbox
                                mainSrc={featuredImagesTwo[photoIndex]}
                                nextSrc={featuredImagesTwo[(photoIndex + 1) % featuredImagesTwo.length]}
                                prevSrc={featuredImagesTwo[(photoIndex + featuredImagesTwo.length - 1) % featuredImagesTwo.length]}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() =>
                                  setPhotoIndex((photoIndex + featuredImagesTwo.length - 1) % featuredImagesTwo.length)
                                }
                                onMoveNextRequest={() =>
                                  setPhotoIndex((photoIndex + 1) % featuredImagesTwo.length)
                                }
                              />
                            )}
                            {isOpen && featuredImagesTwo.length == 1 && (
                              <Lightbox
                                mainSrc={featuredImagesTwo[photoIndex]}
                                onCloseRequest={() => setIsOpen(false)}
                              />
                            )}
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="data-section">
                              <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12">
                                  <h2 className="name"> {cardData[0].title} </h2>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12">
                                  <div style={{ textAlign: "right" }}>
                                    {/* <h2 className="prevprice"> <del> ${data.priceincents * 100} </del> </h2> */}
                                    <NumericFormat 
                                      className="price"
                                      value={(cardData[0].priceincents / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </div>
                                  {/* <h3 className="points"> or {Math.floor(data.priceincents / 10)} Insighter Points </h3> */}
                                  {/* <div style={{ textAlign: "right" }}>
                                    <div className="discount">
                                      <span> Membership Discount </span>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="description"> 
                                    <p>
                                      Give the gift of education and train for the future. Choose the online, self-paced Actionable Insights Matterport Certified course.
                                    </p>
                                  </div>
                                  <form onSubmit={handleSubmit}>
                                    <div className="gift-data">
                                      <div className="multiple-options">
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Memo </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="memo"
                                                maxLength={33}
                                                required
                                                id="textField1"
                                                className="input-area"
                                                value={data.memo}
                                                onChange={(e) => {
                                                  setData({
                                                    ...data,
                                                    memo: e.currentTarget.value,
                                                  });
                                                  recalculate(e.currentTarget.value);
                                                }}
                                              />  
                                              <label htmlFor="textField1" className="floating_label"> Memo </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> {textAreaCount} characters remaining </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Logo Upload </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <label className="file">
                                                <input
                                                  type="file"
                                                  name="logo"
                                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                                  onChange={onSelect}
                                                  onClick={(e) => (e.target.value = null)}
                                                />
                                                <span className="file-custom">
                                                  {data.logo == "" ? (
                                                    <>
                                                      Choose File
                                                    </>
                                                  ) : (
                                                    <>
                                                      {data.logo.name}
                                                    </>
                                                  )}
                                                </span>
                                              </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> Max file size: 12MB </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Quantity </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <input
                                                type="number" 
                                                name="quantity"
                                                min={1}
                                                required 
                                                className="input-area"
                                                value={data.quantity}
                                                onChange={(e) =>
                                                  setData({
                                                    ...data,
                                                    quantity: parseInt(e.currentTarget.value),
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="BUY">
                                      <button	
                                        type="submit"
                                        className="btn"
                                        disabled={
                                          data.memo == "" ||
                                          data.logo == "" ||
                                          data.quantity == 0
                                          ? true
                                          : false
                                        }
                                        onClick={() => setData({ 
                                          ...data,
                                          points: 0,
                                          title: cardData[0].title,
                                          priceincents: cardData[0].priceincents,
                                          id: cardData[0].id,
                                        })}
                                      >
                                        Buy
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}  
                      {cardData[0].title == "Xactimate Training Gift Card" && (
                        <div className="row product">
                          <div className="col-xl-5 col-lg-5 col-md-12">    
                            <div className="giftcards-coursel-featured-images">
                              <Carousel 
                                showArrows={false} 
                                showIndicators={false} 
                                showStatus={false} 
                                useKeyboardArrows={true}
                              >
                                {featuredImagesThree.map((val) => {
                                  return (
                                    <div 
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleOpen()}
                                    >
                                      <img
                                        src={val}
                                        loading="lazy"
                                      />
                                    </div>
                                  );
                                })}
                              </Carousel>
                            </div>  
                            {isOpen && featuredImagesThree.length > 1 && ( 
                              <Lightbox
                                mainSrc={featuredImagesThree[photoIndex]}
                                nextSrc={featuredImagesThree[(photoIndex + 1) % featuredImagesThree.length]}
                                prevSrc={featuredImagesThree[(photoIndex + featuredImagesThree.length - 1) % featuredImagesThree.length]}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() =>
                                  setPhotoIndex((photoIndex + featuredImagesThree.length - 1) % featuredImagesThree.length)
                                }
                                onMoveNextRequest={() =>
                                  setPhotoIndex((photoIndex + 1) % featuredImagesThree.length)
                                }
                              />
                            )}
                            {isOpen && featuredImagesThree.length == 1 && (
                              <Lightbox
                                mainSrc={featuredImagesThree[photoIndex]}
                                onCloseRequest={() => setIsOpen(false)}
                              />
                            )}
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="data-section">
                              <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12">
                                  <h2 className="name"> {cardData[0].title} </h2>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12">
                                  <div style={{ textAlign: "right" }}>
                                    {/* <h2 className="prevprice"> <del> ${data.priceincents * 100} </del> </h2> */}
                                    <NumericFormat 
                                      className="price"
                                      value={(cardData[0].priceincents / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </div>
                                  {/* <h3 className="points"> or {Math.floor(data.priceincents / 10)} Insighter Points </h3> */}
                                  {/* <div style={{ textAlign: "right" }}>
                                    <div className="discount">
                                      <span> Membership Discount </span>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="description"> 
                                    <p>
                                      Give the gift of Xactimate Training. We are training the future today!
                                      <br/>
                                      <br />
                                      For orders of 10+ cards reach out to our support team{" "}
                                      <Link to="/contact-us">
                                        here
                                      </Link>
                                      {" "}to begin a convo about customized campaign solutions.
                                    </p>
                                  </div>
                                  <form onSubmit={handleSubmit}>
                                    <div className="gift-data">
                                      <div className="multiple-options">
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Memo </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="memo"
                                                maxLength={33}
                                                required
                                                id="textField1"
                                                className="input-area"
                                                value={data.memo}
                                                onChange={(e) => {
                                                  setData({
                                                    ...data,
                                                    memo: e.currentTarget.value,
                                                  });
                                                  recalculate(e.currentTarget.value);
                                                }}
                                              />  
                                              <label htmlFor="textField1" className="floating_label"> Memo </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> {textAreaCount} characters remaining </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Logo Upload </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <label className="file">
                                                <input
                                                  type="file"
                                                  name="logo"
                                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                                  onChange={onSelect}
                                                  onClick={(e) => (e.target.value = null)}
                                                />
                                                <span className="file-custom">
                                                  {data.logo == "" ? (
                                                    <>
                                                      Choose File
                                                    </>
                                                  ) : (
                                                    <>
                                                      {data.logo.name}
                                                    </>
                                                  )}
                                                </span>
                                              </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> Max file size: 12MB </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Quantity </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <input
                                                type="number" 
                                                name="quantity"
                                                min={1}
                                                required 
                                                className="input-area"
                                                value={data.quantity}
                                                onChange={(e) =>
                                                  setData({
                                                    ...data,
                                                    quantity: parseInt(e.currentTarget.value),
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="BUY">
                                      <button	
                                        type="submit"
                                        className="btn"
                                        disabled={
                                          data.memo == "" ||
                                          data.logo == "" ||
                                          data.quantity == 0
                                          ? true
                                          : false
                                        }
                                        onClick={() => setData({ 
                                          ...data,
                                          points: 0,
                                          title: cardData[0].title,
                                          priceincents: cardData[0].priceincents,
                                          id: cardData[0].id,
                                        })}
                                      >
                                        Buy
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {cardData[0].title == "Insighter Points Gift Card" && (
                        <div className="row product">
                          <div className="col-xl-5 col-lg-5 col-md-12">    
                            <div className="giftcards-coursel-featured-images">
                              <Carousel 
                                showArrows={false} 
                                showIndicators={false} 
                                showStatus={false} 
                                useKeyboardArrows={true}
                              >
                                {featuredImagesFour.map((val) => {
                                  return (
                                    <div 
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleOpen()}
                                    >
                                      <img
                                        src={val}
                                        loading="lazy"
                                      />
                                    </div>
                                  );
                                })}
                              </Carousel>
                            </div>  
                            {isOpen && featuredImagesFour.length > 1 && ( 
                              <Lightbox
                                mainSrc={featuredImagesFour[photoIndex]}
                                nextSrc={featuredImagesFour[(photoIndex + 1) % featuredImagesFour.length]}
                                prevSrc={featuredImagesFour[(photoIndex + featuredImagesFour.length - 1) % featuredImagesFour.length]}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() =>
                                  setPhotoIndex((photoIndex + featuredImagesFour.length - 1) % featuredImagesFour.length)
                                }
                                onMoveNextRequest={() =>
                                  setPhotoIndex((photoIndex + 1) % featuredImagesFour.length)
                                }
                              />
                            )}
                            {isOpen && featuredImagesFour.length == 1 && (
                              <Lightbox
                                mainSrc={featuredImagesFour[photoIndex]}
                                onCloseRequest={() => setIsOpen(false)}
                              />
                            )}
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="data-section">
                              <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12">
                                  <h2 className="name"> {cardData[0].title} </h2>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12">
                                  <div style={{ textAlign: "right" }}>
                                    {/* <h2 className="prevprice"> <del> ${data.priceincents * 100} </del> </h2> */}
                                    <NumericFormat 
                                      className="price"
                                      value={((cardData[0].priceincents / 100) * data.points).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </div>
                                  {/* <h3 className="points"> or {Math.floor(data.priceincents / 10)} Insighter Points </h3> */}
                                  {/* <div style={{ textAlign: "right" }}>
                                    <div className="discount">
                                      <span> Membership Discount </span>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="description"> 
                                    <p>
                                      Give the gift of Insighter Points.
                                      Our synthetic currency is extremely flexible and can be used to purchase everything from a Certifications, to{" "}
                                      <a 
                                        href="/events"
                                        target="_blank"
                                      >
                                        Event Tickets
                                      </a>
                                      {" "}and{" "}
                                      <a
                                        href="/shop/swag/ai-airpods"
                                        target="_blank"
                                      >
                                        Airpods
                                      </a>
                                      .
                                      <br/>
                                      <br />
                                      For orders of 10+ cards reach out to our support team{" "}
                                      <a
                                        href="/contact-us"
                                        target="_blank"
                                      >
                                        here
                                      </a>
                                      {" "}to begin a convo about customized campaign solutions.
                                    </p>
                                  </div>
                                  <form onSubmit={handleSubmit}>
                                    <div className="gift-data">
                                      <div className="multiple-options">
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Memo </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="memo"
                                                maxLength={33}
                                                required
                                                id="textField1"
                                                className="input-area"
                                                value={data.memo}
                                                onChange={(e) => {
                                                  setData({
                                                    ...data,
                                                    memo: e.currentTarget.value,
                                                  });
                                                  recalculate(e.currentTarget.value);
                                                }}
                                              />  
                                              <label htmlFor="textField1" className="floating_label"> Memo </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> {textAreaCount} characters remaining </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Logo Upload </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <label className="file">
                                                <input
                                                  type="file"
                                                  name="logo"
                                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                                  onChange={onSelect}
                                                  onClick={(e) => (e.target.value = null)}
                                                />
                                                <span className="file-custom">
                                                  {data.logo == "" ? (
                                                    <>
                                                      Choose File
                                                    </>
                                                  ) : (
                                                    <>
                                                      {data.logo.name}
                                                    </>
                                                  )}
                                                </span>
                                              </label>
                                              <div className="info">
                                                <img src={info} />
                                                <span> Max file size: 12MB </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-1">
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <h3 className="text-left"> Insighter Points Amount </h3>
                                          </div>
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <div className="form-group nogroup">
                                              <input
                                                type="number" 
                                                name="insighterpoints"
                                                min={2000}
                                                required 
                                                className="input-area"
                                                value={data.points}
                                                onChange={(e) =>
                                                  setData({
                                                    ...data,
                                                    points: parseInt(e.currentTarget.value),
                                                  })
                                                }
                                              />
                                              <div className="info" style={{ marginTop: "5px" }}>
                                                <img src={info} />
                                                <span> Min Order: 2000 </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="BUY">
                                      <button	
                                        type="submit"
                                        className="btn"
                                        disabled={
                                          data.memo == "" ||
                                          data.logo == "" ||
                                          data.points == 0
                                          ? true
                                          : false
                                        }
                                        onClick={() => setData({ 
                                          ...data,
                                          title: cardData[0].title,
                                          priceincents: cardData[0].priceincents,
                                          id: cardData[0].id,
                                          quantity: data.points,
                                        })}
                                      >
                                        Buy
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
            <WrongBrowserDisclaimer />
            <CookieConsentGI2 />
            <Footer />
          </Suspense>
        </>
      ) : (
        <NotFound />
      )}
		</>
	);
}

export default ProductGiftCards;
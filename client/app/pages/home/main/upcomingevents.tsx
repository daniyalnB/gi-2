import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import { GetAllEventsCustomer } from "../../../../utils/api-routes/api-routes.util";
import Slider from "react-slick";
import moment from "moment";

const UpcomingEvents = () => {

	const [loading, setLoading] = useState(true);

	const [data, setData] = useState([]);

  useEffect(() => {
    GetAllEventsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setData(response.response.data);
      } else {
        alert("error");
      }
    });
  }, []);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

	const publisheddata = data.filter((val) => val.draft === false);
	
	const sortedActivities = publisheddata.sort((a, b) => moment(a.startdatetime).diff(b.startdatetime));

  const updatedData = sortedActivities.filter((x) => moment(x.startdatetime).format("yyyy-MM-DD") >= date);

	const [imageIndex, setImageIndex] = useState(0);

  const settings = {
		dots: true,
		arrows: false,
    infinite: true,
    lazyLoad: true,
    speed: 1000,
		autoplay: true,
		autoplaySpeed: 5000,
    slidesToShow: updatedData.length >= 4 ? 3 : updatedData.length,
    slidesToScroll: updatedData.length >= 4 ? 3 : updatedData.length,
    centerMode: true,
    centerPadding: 0,
    beforeChange: (current, next) => setImageIndex(next),
  };
	
	return (
		<>
			<div className="Upcoming_Events">
				<div className="container">
					<h2> Upcoming Events </h2>
          {!loading && (
            <>
              <div className="Slider-Events">
                {updatedData.length > 1 ? (
                  <Slider {...settings}>
                    {updatedData.slice(0, 4).map((val, idx) => (
                      <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                        <Link to={`/event/${val.permalink}`}>
                          <img 
                            src={val.featuredimage}
                            alt={val.title}
                            width={100}
                            height={100}
                            loading="lazy"
                          />
                        </Link>
                        <h4> 
                          <Link to={`/event/${val.permalink}`}>
                            {val.title} 
                          </Link>
                        </h4>
                        <h5> {moment(val.startdatetime).format("MMMM DD, YYYY")} - {moment(val.enddatetime).format("MMMM DD, YYYY")} </h5>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="row">
                    {updatedData.map((val) => {
                      return (
                        <div className="col-xl-12 col-md-12">
                          <div className="Events">
                            <Link to={`/event/${val.permalink}`}>
                              <img 
                                src={val.featuredimage}
                                alt={val.title}
                                width={100}
                                height={100}
                                loading="lazy"
                              />
                            </Link>
                            <h4> 
                              <Link to={`/event/${val.permalink}`}>
                                {val.title} 
                              </Link>
                            </h4>
                            <h5> {moment(val.startdatetime).format("MMMM DD, YYYY")} - {moment(val.enddatetime).format("MMMM DD, YYYY")} </h5>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="Upcoming_Events_Responsive">
                <div className="row">
                  {updatedData.slice(0, 4).map((val, key) => {
                    return (
                      <div className="col-xl-3 col-lg-6 col-md-6">
                        <div className="Events">
                          <Link to={`/event/${val.permalink}`}>
                            <img 
                              src={val.featuredimage}
                              alt={val.title}
                              width={100}
                              height={100}
                              loading="lazy"
                            />
                          </Link>
                          <h4> 
                            <Link to={`/event/${val.permalink}`}>
                              {val.title} 
                            </Link>
                          </h4>
                          <h5> {moment(val.startdatetime).format("MMMM DD, YYYY")} - {moment(val.enddatetime).format("MMMM DD, YYYY")} </h5>
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
		</>
	);
};

export default UpcomingEvents;
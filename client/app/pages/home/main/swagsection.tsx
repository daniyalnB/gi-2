import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import { GetAllSwagProductsCustomer } from "../../../../utils/api-routes/api-routes.util";

const SwagSection = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllSwagProductsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (swag) => swag.permalink !== "insighter-chest"
        );
        setData(x);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const publisheddata = data.filter((val) => val.draft === false);
  
  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const randomData = shuffleArray(publisheddata);

  return (
    <>
      <div className="Membership_Swag">
        <div className="container">
          <h2> Membership Swag </h2>
          <div className="row" style={{ textAlign: "center" }}>
            {!loading && (
              <>
                {randomData.slice(0, 4).map((val, ke) => {
                  return (
                    <div className="col-xl-3 col-lg-6 col-md-6">
                      <div className="Products">
                        <div className="product-img">
                          <img
                            src={
                              val.featuredimages[val.defaultfeatureimageindex]
                            }
                            alt={val.title}
                            loading="lazy"
                          />
                        </div>
                        <div className="product-text">
                          <h3> {val.title} </h3>
                        </div>
                        <div className="product-btn">
                          <Link
                            to={`/shop/swag/${val.permalink}`}
                            className="btn"
                          >
                            Purchase
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {loading && (
              <div className="col">
                <div className="loader-inner">
                  <LottieLoader />
                </div>
              </div>
            )}
          </div>
          <div className="View_More">
            <Link to="/swag" className="btn">
              View More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwagSection;

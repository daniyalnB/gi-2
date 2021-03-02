import { Link } from "react-router-dom";
import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));

const IR = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ margin: "0 auto", height: "100vh" }}
          >
            {" "}
            <div className="loader"></div>
          </div>
        }
      >
        <Navbar />
        <div className="main-container">
          <div className="IR_page">
            <div className="container">
              <div className="holder">
                <h2> The Insighter Report </h2>
                <h3>
                  {" "}
                  A resource library for restoration and claims professionals.{" "}
                </h3>
              </div>
              <div className="reports">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="insighter_report">
                      <Link to="/insighterreportdetail">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/07/31224007/Xactware_White_Paper_Labor_Efficiencies_Design_Thumbnail_01_1024x3471.jpg" />
                        <h3 className="name"> Labor Efficiencies Design </h3>
                      </Link>
                      <h3 className="date"> AUGUST 11, 2020 </h3>
                      <p className="description">
                        Labor is generally the largest variable in
                        construction-related tasks. Factors such as job size and
                        complexity, accessibility, and whether the structure is
                        occupied all have a significant effect on the time
                        needed to complete the work.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="insighter_report">
                      <Link to="/insighterreportdetail">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/07/24225246/Xactimate_White_Paper_re_OP_01_1024x347.jpg" />
                        <h3 className="name"> OVERHEAD AND PROFIT </h3>
                      </Link>
                      <h3 className="date"> FEBRUARY 05, 2020 </h3>
                      <p className="description">
                        One of the most commonly asked questions in property
                        insurance is about Xactimate’s pricing methodology.
                        There is consistent confusion as to what is and is not
                        included within the line items of Xactimate’s price
                        lists. As a result, we wanted to host the most recent
                        version of Xactware’s Overhead and Profit White Paper so
                        the Insighters can quickly access and reference it.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="insighter_report">
                      <Link to="/insighterreportdetail">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/07/31224007/Xactware_White_Paper_Labor_Efficiencies_Design_Thumbnail_01_1024x3471.jpg" />
                        <h3 className="name"> Labor Efficiencies Design </h3>
                      </Link>
                      <h3 className="date"> AUGUST 11, 2020 </h3>
                      <p className="description">
                        Labor is generally the largest variable in
                        construction-related tasks. Factors such as job size and
                        complexity, accessibility, and whether the structure is
                        occupied all have a significant effect on the time
                        needed to complete the work.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="insighter_report">
                      <Link to="/insighterreportdetail">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/07/24225246/Xactimate_White_Paper_re_OP_01_1024x347.jpg" />
                        <h3 className="name"> OVERHEAD AND PROFIT </h3>
                      </Link>
                      <h3 className="date"> FEBRUARY 05, 2020 </h3>
                      <p className="description">
                        One of the most commonly asked questions in property
                        insurance is about Xactimate’s pricing methodology.
                        There is consistent confusion as to what is and is not
                        included within the line items of Xactimate’s price
                        lists. As a result, we wanted to host the most recent
                        version of Xactware’s Overhead and Profit White Paper so
                        the Insighters can quickly access and reference it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </Suspense>
    </>
  );
};

export default IR;

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import Switch from "react-switch";
import { Helmet } from "react-helmet";
import moment from "moment";
import {
  AddOrUpdateLiveSessionDetails,
  GetLiveSessionDetails,
} from "../../../../utils/api-routes/api-routes.util";
import livestreamzonered from "assets/LiveStreamZoneRed.svg";

const LiveStreamZone = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  var someDate = new Date();
  var date = someDate.toISOString();

  const currDate = new Date().toLocaleString();
  const currDateMoment = `${moment(currDate).format("YYYY-MM-DDTHH:mm:ss.SSS")}`;

  const currYear = new Date().toLocaleString();
  const currYearMoment = `${moment(currYear).format("YYYY")}`;

  const [liveSessionDetails, setLiveSessionDetails] = useState({
    startdatetime: "",
    enddatetime: "",
    iframeurl: "",
    title: "",
  });

  useEffect(() => {
    GetLiveSessionDetails().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setLiveSessionDetails({
          ...liveSessionDetails,
          startdatetime: moment
            .utc(new Date(`${x.startdatetime} UTC`))
            .local()
            .format("YYYY-MM-DDTHH:mm:ss.SSS"),
          enddatetime: moment
            .utc(new Date(`${x.enddatetime} UTC`))
            .local()
            .format("YYYY-MM-DDTHH:mm:ss.SSS"),
          iframeurl: x.iframeurl,
          title: x.title,
        });
        if (x.enddatetime) {
          if (moment.utc(new Date(`${x.startdatetime} UTC`)).local().format("YYYY") == currYearMoment && moment.utc(new Date(`${x.enddatetime} UTC`)).local().format("YYYY") == currYearMoment) {
            if (moment.utc(new Date(`${x.enddatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") >= currDateMoment) {
              setCheck(true);
            } else {
              setCheck(false);
            }
          } else {
            setCheck(false);
          }
        }
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const [check, setCheck] = useState(false);
  const handleChange = () => setCheck(!check);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      const payloadActivate = {
        startdatetime: `${liveSessionDetails.startdatetime && moment.utc(new Date(liveSessionDetails.startdatetime).toISOString()).format("DD.MM.yyyy.HH:mm")}`,
        enddatetime: `${liveSessionDetails.enddatetime && moment.utc(new Date(liveSessionDetails.enddatetime).toISOString()).format("DD.MM.yyyy.HH:mm")}`,
        iframeurl: liveSessionDetails.iframeurl,
        title: liveSessionDetails.title,
        currentstate: true,
      };

      const payloadDeactivate = {
        startdatetime: "",
        enddatetime: "",
        iframeurl: "",
        title: "",
        currentstate: false,
      };

      const stringified1 = queryString.stringify(payloadActivate);
      const stringified2 = queryString.stringify(payloadDeactivate);

      AddOrUpdateLiveSessionDetails(check ? stringified1 : stringified2).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          update();
          document.getElementById("form").reset();
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    }, 1000);
  };

  function update () {
    GetLiveSessionDetails().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setLiveSessionDetails({
          ...liveSessionDetails,
          startdatetime: moment
            .utc(new Date(`${x.startdatetime} UTC`))
            .local()
            .format("YYYY-MM-DDTHH:mm:ss.SSS"),
          enddatetime: moment
            .utc(new Date(`${x.enddatetime} UTC`))
            .local()
            .format("YYYY-MM-DDTHH:mm:ss.SSS"),
          iframeurl: x.iframeurl,
          title: x.title,
        });
        if (x.enddatetime) {
          if (moment.utc(new Date(`${x.startdatetime} UTC`)).local().format("YYYY") == currYearMoment && moment.utc(new Date(`${x.enddatetime} UTC`)).local().format("YYYY") == currYearMoment) {
            if (moment.utc(new Date(`${x.enddatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") >= currDateMoment) {
              setCheck(true);
            } else {
              setCheck(false);
            }
          } else {
            setCheck(false);
          }
        }
			}
		});
	};

  return (
    <>
      <Helmet>
        <title>Live Stream Zone - Actionable Insights Admin</title>
      </Helmet>
      <div className="insightsheet">
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
              <div className="insightsheet-section">
                <div className="row header">
                  <div className="col-9">
                    <div className="page_icon">
                      <img src={livestreamzonered} />
                    </div>
                    <h3 className="heading">Live Stream Zone</h3>
                  </div>
                </div>
                <hr />
                {!loadingData && (
                  <form onSubmit={handleSubmit} id="form">
                    <div
                      className="live-stream-zone"
                      style={{ minHeight: "50vh" }}
                    >
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-3 text-left">
                            <div className="Activate-Deactivate">
                              <h3> Activate\Deactivate </h3>
                              <div id="status">
                                <Switch
                                  onChange={handleChange}
                                  checked={check}
                                  checkedIcon={false}
                                  uncheckedIcon={false}
                                  onColor="#26A59A"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {check && (
                          <>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input
                                    type="datetime-local"
                                    name="SDAT"
                                    required
                                    id="inputField1"
                                    className="input-area"
                                    value={liveSessionDetails.startdatetime}
                                    onChange={(e) =>
                                      setLiveSessionDetails({
                                        ...liveSessionDetails,
                                        startdatetime: e.currentTarget.value,
                                      })
                                    }
                                  />
                                  <label
                                    htmlFor="inputField1"
                                    className="floating_label"
                                  >
                                    Start date and time
                                  </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input
                                    defaultValue={date}
                                    type="datetime-local"
                                    name="EDAT"
                                    required
                                    id="inputField2"
                                    className="input-area"
                                    value={liveSessionDetails.enddatetime}
                                    onChange={(e) =>
                                      setLiveSessionDetails({
                                        ...liveSessionDetails,
                                        enddatetime: e.currentTarget.value,
                                      })
                                    }
                                  />
                                  <label
                                    htmlFor="inputField2"
                                    className="floating_label"
                                  >
                                    End date and time
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="form-group nogroup">
                                  <input
                                    type="text"
                                    name="iframeURL"
                                    required
                                    id="inputField0"
                                    className="input-area"
                                    value={liveSessionDetails.iframeurl}
                                    onChange={(e) =>
                                      setLiveSessionDetails({
                                        ...liveSessionDetails,
                                        iframeurl: e.currentTarget.value,
                                      })
                                    }
                                  />
                                  <label
                                    htmlFor="inputField0"
                                    className="floating_label"
                                  >
                                    iframe URL
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="form-group nogroup">
                                  <input
                                    type="text"
                                    name="title"
                                    required
                                    id="inputField1"
                                    className="input-area"
                                    value={liveSessionDetails.title}
                                    onChange={(e) =>
                                      setLiveSessionDetails({
                                        ...liveSessionDetails,
                                        title: e.currentTarget.value,
                                      })
                                    }
                                  />
                                  <label
                                    htmlFor="inputField1"
                                    className="floating_label"
                                  >
                                    Title
                                  </label>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <hr className="second-hr" />
                    <div className="Buttons">
                      <div className="row">
                        {!loading && (
                          <button
                            className="btn"
                            type="submit"
                            disabled={
                              localStorage.getItem("role") == "Analyst"
                                ? true
                                : false
                            }
                          >
                            <span> Update </span>
                          </button>
                        )}
                        {loading && (
                          <button className="btn" disabled>
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    {localStorage.getItem("role") == "Analyst" && (
                      <div
                        style={{
                          padding: "0px 20px 20px 20px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          className="form-group alert alert-danger"
                          style={{
                            margin: "0px",
                            width: "270px",
                          }}
                        >
                          You need to be an Admin or Editor to Update
                        </div>
                      </div>
                    )}
                    {error ? (
                      <div
                        style={{
                          padding: "0px 20px 20px 20px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          className="form-group alert alert-danger"
                          style={{ margin: "0px" }}
                        >
                          {error}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                )}
                {loadingData && (
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

export default withRouter(LiveStreamZone);
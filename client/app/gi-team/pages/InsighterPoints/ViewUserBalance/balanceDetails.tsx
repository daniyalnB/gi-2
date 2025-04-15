import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import AdminTable from "../../../components/TableExtra";
import { Modal } from "react-bootstrap";
import queryString from "query-string";
import moment from "moment";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import history from "../../../../../utils/history";
import { 
  addOrDeductCustomerInsighterPoint,
  getCustomerInfoById,
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import money from "assets/money.svg";
import user from "assets/user.svg";
import emailicon from "assets/@.svg";
import edit from "assets/Edit_Role.svg";
import up from "assets/up-arrow-admin.svg";
import down from "assets/down-arrow-admin.svg";
import radio1 from "assets/Radio1.svg";
import radio2 from "assets/Radio2.svg";
import modalclose from "assets/modal-close.svg";

const FormElement = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [points, setPoints]= useState(Number);

  const [AddOrDeduct, setAddOrDeduct] = useState({
    add: true,
    deduct: false,
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      customerId: props.id,
      addOrDeduct: AddOrDeduct.add ? true : false,
      points: points,
    };

    const stringified = queryString.stringify(payload);

    addOrDeductCustomerInsighterPoint(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setPoints(0);
        setError(false);
        UpdatePoints();
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };

  function UpdatePoints () {
    getCustomerInfoById(props.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        props.handleData(x);
        setLoading(false);
        props.handlecardclose();
      }
    });
  };
 
  return (
    <>
      <div className="row">
        <div className="col-8">
          <div className="product-type">
            <h3> Product Type </h3>
            <div className="row mt-2">
              <div className="col-4">
                <img src={AddOrDeduct.add ? radio1 : radio2} />
                <p
                  onClick={() =>
                    setAddOrDeduct({
                      add: true,
                      deduct: false,
                    }
                  )}
                >
                  Add
                </p>
              </div>
              <div className="col-4">
                <img src={AddOrDeduct.deduct ? radio1 : radio2} />
                <p 
                  onClick={() =>
                    setAddOrDeduct({
                      add: false,
                      deduct: true,
                    }
                  )}
                > 
                  Deduct
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="current-balance">
            <div className="balance"> Current Balance: </div>
            <div>
              {props.points == null ? (
                <h4 className="pts"> N/A </h4>
              ) : (
                <h4 className="pts"> 
                  <NumberFormat
                    value={props.points}
                    displayType={"text"}
                    thousandSeparator={true}
                  /> 
                  &nbsp;<sup>PTS</sup>
                </h4> 
              )}
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type="number"
                min="1" 
                name="points" 
                required 
                id="inputField1" 
                className="input-area"
                value={points}
                onChange={(e) => setPoints(e.currentTarget.value)}
              />
              <label htmlFor="inputField1" className="floating_label"> Enter Points </label>
            </div>
          </div>
        </div>
        <div className="modal-save">
          {!loading &&
            <button 
              type="submit" 
              className="btn"
            >
              <span> Update </span>
            </button>
          }
          {loading &&
            <button className="btn" disabled> 
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          }
        </div>
        {error ? (
          <div style={{ margin: "20px auto 0px", textAlign: "center" }}>
            <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
              {error}
            </span>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

const BalanceDetails = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  function handleData(newValue) {
    setData(newValue);
  };

  useEffect(() => {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        if (x == undefined) {
          history.push("/gi-team/insighter-points");
        }
        setLoading(false);
      } else {
        history.push("/gi-team/insighter-points");
      }
    });
  }, []);

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

  const [headers, setHeaders] = useState([
    {
      Header: "Date",
      accessor: false,
    },
    {
      Header: "Points",
      accessor: false,
    },
    {
      Header: "Details",
      accessor: false,
    },
  ]);

  const [notAvailable, setNotAvailable] = useState([
    {
      date: "N/A",
      points: "N/A",
      details: "N/A",
    },
  ]);
  
  return (
    <>
      <Helmet>
        <title> 
					Balance Details - Actionable Insights Admin
        </title>
      </Helmet>
      <Modal 
        show={cardpopupshow} 
        onHide={handlecardclose} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div 
            className="add_delete_points modal-title h4"
          > 
            Add or Deduct Points
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElement
            handlecardclose={handlecardclose}
            handleData={handleData}
            id={data.id}
            points={data.nooninsighterpoint}
          ></FormElement>
        </Modal.Body>
      </Modal>
      <div className="createInsightSheet">
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
              <div className="createInsightSheet-section">
                <div className="row header">
                  <div className="col-9">
                    <h3 className="heading">
                      Details
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/insighter-points/view-user-balance"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loading && (
                  <div className="info-data">
                    <div className="view-data">
                      <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={user} />
                            <h5> User Name </h5>
                            <h4> {data.ownerinfo.firstname} {data.ownerinfo.lastname} </h4>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={emailicon} />
                            <h5> Email </h5>
                            <h4 style={{ wordBreak: "break-all" }}> {data.ownerinfo.emailaddress} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={money} />
                            <h5> Current Balance: </h5>
                            {data.nooninsighterpoint == null ? (
                              <h4 style={{ display: "inline-block" }}> N/A </h4> 
                            ) : (
                              <h4 className="pts"> 
                                <NumberFormat
                                  value={data.nooninsighterpoint}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> 
                                &nbsp;<sup>PTS</sup>
                              </h4> 
                            )}
                            {localStorage.getItem("role") == "Analyst" ? (
                              ""
                            ) : (
                              <img 
                                className="edit"
                                src={edit}
                                onClick={handlecardshow}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="points-tabs">
                        <div 
                          className={one == true ? "Tabs active_new" : "Tabs"}
                          onClick={() => setOne(!one)}
                        >
                          <h3> Referral Points </h3>
                          <img src={one ? up : down} />
                        </div>
                        {one && (
                          <div className="Dropdown">
                            <AdminTable
                              tableClesses={`${data.reviewactivity.referalpoints.length == 0 ? "review-activity-table-none" : "review-activity-table"}`}
                              headers={headers}
                              showHeaders={true}
                              data={data.reviewactivity.referalpoints.length == 0 ? notAvailable : data.reviewactivity.referalpoints}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    {rowData.original.date == "N/A" ? (
                                      <td> {rowData.original.date} </td>
                                    ) : (
                                      <td> {moment(rowData.original.date).format("MMMM Do, YYYY H:mm a")} </td>
                                    )}
                                    {rowData.original.points == "N/A" ? (
                                      <td> {rowData.original.points} </td>
                                    ) : (
                                      <>
                                        {rowData.original.points > 0 ? (
                                          <td>
                                            +
                                            <NumberFormat
                                              value={rowData.original.points}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                            />
                                          </td>
                                        ) : (
                                          <td style={{ color: "#DB422D" }}>
                                            <NumberFormat
                                              value={rowData.original.points}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                            />
                                          </td>
                                        )}
                                      </>
                                    )}
                                    <td> {rowData.original.details} </td>
                                  </tr>
                                );
                              }}
                            />
                          </div>
                        )}
                        <div 
                          className={two == true ? "Tabs active_new" : "Tabs"}
                          onClick={() => setTwo(!two)}
                        >
                          <h3> Earned Points </h3>
                          <img src={two ? up : down} />
                        </div>
                        {two && (
                          <div className="Dropdown">
                            <AdminTable
                              tableClesses={`${data.reviewactivity.earnedpoints.length == 0 ? "review-activity-table-none" : "review-activity-table"}`}
                              headers={headers}
                              showHeaders={true}
                              data={data.reviewactivity.earnedpoints.length == 0 ? notAvailable : data.reviewactivity.earnedpoints}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    {rowData.original.date == "N/A" ? (
                                      <td> {rowData.original.date} </td>
                                    ) : (
                                      <td> {moment(rowData.original.date).format("MMMM Do, YYYY H:mm a")} </td>
                                    )}
                                    {rowData.original.points == "N/A" ? (
                                      <td> {rowData.original.points} </td>
                                    ) : (
                                      <>
                                        {rowData.original.points > 0 ? (
                                          <td>
                                            +
                                            <NumberFormat
                                              value={rowData.original.points}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                            />
                                          </td>
                                        ) : (
                                          <td style={{ color: "#DB422D" }}>
                                            <NumberFormat
                                              value={rowData.original.points}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                            />
                                          </td>
                                        )}
                                      </>
                                    )}
                                    <td> {rowData.original.details} </td>
                                  </tr>
                                );
                              }}
                            />  
                          </div>
                        )}
                        <div 
                          className={three == true ? "Tabs active_new" : "Tabs"}
                          onClick={() => setThree(!three)}
                        >
                          <h3> Redeemed Points </h3>
                          <img src={three ? up : down} />
                        </div>
                        {three && (
                          <div className="Dropdown">
                            <AdminTable
                              tableClesses={`${data.reviewactivity.redeemedpoints.length == 0 ? "review-activity-table-none" : "review-activity-table"}`}
                              headers={headers}
                              showHeaders={true}
                              data={data.reviewactivity.redeemedpoints.length == 0 ? notAvailable : data.reviewactivity.redeemedpoints}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    {rowData.original.date == "N/A" ? (
                                      <td> {rowData.original.date} </td>
                                    ) : (
                                      <td> {moment(rowData.original.date).format("MMMM Do, YYYY H:mm a")} </td>
                                    )}
                                    {rowData.original.points == "N/A" ? (
                                      <td> {rowData.original.points} </td>
                                    ) : (
                                      <>
                                        {rowData.original.points > 0 ? (
                                          <td>
                                            +
                                            <NumberFormat
                                              value={rowData.original.points}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                            />
                                          </td>
                                        ) : (
                                          <td style={{ color: "#DB422D" }}>
                                            <NumberFormat
                                              value={rowData.original.points}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                            />
                                          </td>
                                        )}
                                      </>
                                    )}
                                    <td> {rowData.original.details} </td>
                                  </tr>
                                );
                              }}
                            />
                          </div>
                        )}
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
    </>
  );
};

export default withRouter(BalanceDetails);
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import moment from "moment";

const Breadcrumbs = (props) => {

  const [data, setData] = useState(false);

  // console.log(data, "data");

  const location = useLocation(); 
  const { pathname } = location; 
  // console.log(pathname, "pathname")

  const pathnames = pathname.split("/").filter((item) => item);

  for (let i = 0; i < pathnames.length; i++) {
    if (pathnames[i] == "form" || pathnames[i] == "gift-card" || pathnames[i] == "certification" || pathnames[i] == "uncategorized" || pathnames[i] == "s") {
      pathnames.splice(i, 1);
      i--;
    }
    if (pathnames[1] == "swag") {
      pathnames.splice(i, 1);
      i--;
    }
    if (pathnames[i] == "shop") {
      pathnames.splice(i, 2);
      i--;
    }
    if (pathnames[i] == "lost-password") {
      pathnames.splice(i, 2);
      i--;
    }
    if (pathnames[i] == "resources" || pathnames[i] == "advance-the-cause") {
      pathnames.splice(i, 1);
      i--;
    }
    if (pathnames[i] == "actionable-xactimate-profile") {
      pathnames.splice(2);
    }
  }

  // console.log(pathnames);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .replace(/-/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <div className="Breadcrumb">
        <div className="container">
          <Breadcrumb separator=" > ">
            {pathnames.length > 0 ? (
              <Breadcrumb.Item>
                <Link to={pathname === "/users" ? "/my-account" : pathname === "/request-a-quote" ? "/plan-matrix" : "/"}>
                  {pathname === "/users" ? "My Account" : pathname === "/request-a-quote" ? "Membership Plans" : "Home"}
                </Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item> Home </Breadcrumb.Item>
            )}
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              return isLast ? (
                <React.Fragment key={index}>
                  {data ? (
                    <>
                      {pathname.includes("event") ? (
                        <span className="ant-breadcrumb-link"> {toTitleCase(name)} </span>
                      ) : pathname.includes("price-list-update-summary") ? (
                        <span className="ant-breadcrumb-link"> Price List Update Summary - {data.title} {moment(data.selecteddate).format("YYYY")} </span>
                      ) : pathname.includes("insighter-report") ? (
                        <span className="ant-breadcrumb-link"> {data.pagetitle} </span>
                      ) : pathname.includes("media-release") ? (
                        <span className="ant-breadcrumb-link"> {data.pagetitle} </span>
                      ) : pathname.includes("certification") ? (
                        <span className="ant-breadcrumb-link"> 
                          {
                            props.match.params.permalink == "aitc" ? "AITC" :
                            props.match.params.permalink == "aimc" ? "AIMC" :
                            props.match.params.permalink == "aimc-2021" ? "AIMC 2021" :
                            props.match.params.permalink == "aimc-ce21" ? "AIMC CE" :
                            props.match.params.permalink == "aimc-2022" ? "AIMC" :
                            props.match.params.permalink == "aimc-ce22" ? "AIMC CE 2022" : `${data.pagetitle}`
                          }
                        </span>
                      ) : (
                        <span className="ant-breadcrumb-link"> {data.title} </span>
                      )}
                    </>
                  ) : (
                    <>
                      {pathname.startsWith("/s/") ? (
                        <span className="ant-breadcrumb-link"> Search Results For '{toTitleCase(name.replace("s/","").replace(/%2F/gi, "/"))}' </span>
                      ) : pathname == "/search" ? (
                        <span className="ant-breadcrumb-link"> Global Search </span>
                      ) : pathname == "/gi-ownership" ? (
                        <span className="ant-breadcrumb-link"> Actionable Insights Ownership </span>
                      ) : pathname == "/my-account/points" ? (
                        <span className="ant-breadcrumb-link"> Insighter Points Dashboard </span>
                      ) : pathname == "/my-account/view-log" ? (
                        <span className="ant-breadcrumb-link"> Review Activity </span>
                      ) : pathname == "/my-account" ? (
                        <span className="ant-breadcrumb-link"> {localStorage.getItem("tokenCustomer") ? "My Account" : "Sign In"} </span>
                      ) : pathname == "/ConfirmEmail" ? (
                        <span className="ant-breadcrumb-link"> Confirm Email </span>
                      ) : pathname == "/resources/3d-training-modules" ? (
                        <span className="ant-breadcrumb-link"> Explore Our 3d Training Modules </span>
                      ) : pathname == "/aitc" ? (
                        <span className="ant-breadcrumb-link"> ACTIONABLE INSIGHTS TOOLS CERTIFIED </span>
                      ) : pathname == "/aimc" ? (
                        <span className="ant-breadcrumb-link"> AI MATTERPORT CERTIFIED </span>
                      ) : pathname == "/aimc-ce" ? (
                        <span className="ant-breadcrumb-link"> AIMC CONTINUING EDUCATION 2022 </span>
                      ) : pathname == "/aimc-graduates-public-registry" ? (
                        <span className="ant-breadcrumb-link"> AIMC Graduates Public Registry </span>
                      ) : pathname == "/aimc-refund-policy" ? (
                        <span className="ant-breadcrumb-link"> AIMC REFUND POLICY </span>
                      ) : pathname == "/mx_lvl2_ai_v10" ? (
                        <span className="ant-breadcrumb-link"> MX_LVL2_AI_v10 </span>
                      ) : pathname == "/race-machines-recap" ? (
                        <span className="ant-breadcrumb-link"> Race With The Machines Recap </span>
                      ) : pathname == "/2019-year-review" ? (
                        <span className="ant-breadcrumb-link"> 2019: A Year In Review </span>
                      ) : pathname == "/actionable-xactimate-profile/FAQ" ? (
                        <span className="ant-breadcrumb-link"> Actionable Xactimate Profile Faqs </span>
                      ) : pathname == "/ria-convention-leads" ? (
                        <span className="ant-breadcrumb-link"> RIA Convention Leads </span>
                      ) : pathname == "/users" ? (
                        <span className="ant-breadcrumb-link"> User Management </span>
                      ) : pathname == "/request-a-quote" ? (
                        <span className="ant-breadcrumb-link"> Get a Quote </span>
                      ) : (
                        <span className="ant-breadcrumb-link"> {toTitleCase(name)} </span>
                      )}
                    </>
                  )}
                </React.Fragment>
              ) : (
                <Breadcrumb.Item>
                  <Link
                    to={`${routeTo == "/event" ? "/events" : routeTo == "/matterport-feature-request" || routeTo == "/line-item-request" || routeTo == "/insight-sheet-collaboration" ? `/advance-the-cause${routeTo}` : 
                    routeTo == "/insighter-report" || routeTo == "/price-list-update-summary" || routeTo == "/gift-cards" ? `/resources${routeTo}` : routeTo}`}
                  > 
                    {toTitleCase(name == "event" ? "events" : name)}
                  </Link>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
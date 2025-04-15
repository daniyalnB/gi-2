import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import AdminTable from "../../components/Table";
import queryString from "query-string";
import { confirmAlert } from "react-confirm-alert";
import { Helmet } from "react-helmet";
import managerolesred from "assets/ManageRolesRed.svg";
import new_role from "assets/New_Role.svg";
import edit from "assets/Edit_Role.svg";
import save from "assets/Save_Role.svg";
import del from "assets/Del_Role.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import vision from "assets/visibility.svg";
import searchicon from "assets/magnifying-glass.svg";
import {
  GetAllUsers,
  GetAllAssignableRoles,
  ChangeRoleOfUser,
  revokeAdminRole,
} from "../../../../utils/api-routes/api-routes.util";

const ManageRoles = (props) => {

  const [loader, setLoader] = useState(true);

  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState(false);
  const [roletype, setRoleType] = useState("");

  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root") {
      setHeaders([
        {
          Header: "User Name",
          accessor: "firstname",
        },
        {
          Header: "Assigned Role",
          accessor: "adminrole",
        },
        {
          Header: "Edit",
          accessor: false,
        },
        {
          Header: "Delete",
          accessor: false,
        },
        {
          Header: "Action",
          accessor: false,
        },
      ]);
    } else {
      setHeaders([
        {
          Header: "User Name",
          accessor: "firstname",
        },
        {
          Header: "Assigned Role",
          accessor: "adminrole",
        },
        {
          Header: "Action",
          accessor: false,
        },
      ]);
    }
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllUsers().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
        setLoader(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const newData = data.filter((user) => user.adminrole !== null);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    GetAllAssignableRoles().subscribe((response) => {
      if (response.response.Requested_Action) {
        setRoles(response.response.data);
      } else {
        alert("error");
      }
    });
  }, []);

  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(false);

  const filterUser = data.filter((val) =>
    val.emailaddress.toLowerCase().includes(searchUser.toLowerCase())
  );

  const [RoleOfUser, setRoleOfUser] = useState({
    userId: "",
    newRole: "",
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      userId: RoleOfUser.userId,
      newRole: RoleOfUser.newRole,
    };

    const stringified = queryString.stringify(payload);

    ChangeRoleOfUser(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setRoleOfUser({
          userId: "",
          newRole: "",
        });
        setLoading(false);
        setSearchUser("");
        setRoleType("");
        update();
        document.getElementById("form").reset();
      } else {
        alert("error");
      }
    });
  };

  function update () {
    GetAllUsers().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
      }
    });
  };

  const [editRole, setEditRole] = useState(false);
  const [roleTable, setRoleTable] = useState(false);

  const [id, setId] = useState("");
  const [newroletype, setNewRoleType] = useState("");

  const [EditRoleOfUser, setEditRoleOfUser] = useState({
    userId: "",
    newRole: "",
  });

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const payload = {
      userId: EditRoleOfUser.userId,
      newRole: EditRoleOfUser.newRole,
    };

    const stringified = queryString.stringify(payload);

    ChangeRoleOfUser(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setEditRoleOfUser({
          userId: "",
          newRole: "",
        });
        setEditRole(false);
        update();
      } else {
        alert("error");
      }
    });
  };

  const RemoveUserRole = (id) => {
    revokeAdminRole({
      id: id,
    }).subscribe((res) => {
      update();
    });
  };

  const onRemoveUserRole = (x) => {
    confirmAlert({
      title: "Alert!",
      message: "Are you sure you want to delete the user?",
      buttons: [
        {
          label: "Confirm",
          onClick: () => RemoveUserRole(x),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          Manage Roles - Actionable Insights Admin
        </title>
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
              <div className="row">
                <div className="col-8" style={{ padding: "0px" }}>
                  <div className="insightsheet-section">
                    <div className="row header">
                      <div className="col-12">
                        <div className="page_icon">
                          <img src={managerolesred} />
                        </div>
                        <h3 className="heading"> Manage Roles </h3>
                      </div>
                    </div>
                    <hr />
                    {!loader && (
                      <>
                        <div className="table-section">
                          <div className="row">
                            <AdminTable
                              tableClesses={"table-stripes bktables"}
                              headers={headers}
                              showHeaders={true}
                              data={newData}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td style={{ width: "auto" }}>
                                      {rowData.original.firstname == null ? "N/A" : `${rowData.original.firstname} ${rowData.original.lastname}`}
                                    </td>
                                    {editRole && rowData.original.id == id ? (
                                      <td
                                        style={{
                                          padding: "10px 0px",
                                          width: "170px",
                                        }}
                                      >
                                        <div className="col-12 edit-role">
                                          <div className="form-holder nogroup">
                                            <input
                                              onClick={(e) => setRoleTable(!roleTable)}
                                              value={newroletype}
                                              type="text"
                                              name="Catagory"
                                              required
                                              id="inputField3"
                                              className="input-area"
                                            />
                                            <label className="file_input_label">
                                              {roleTable ? (
                                                <img
                                                  className="select size"
                                                  src={up}
                                                  onClick={() => setRoleTable(!roleTable)}
                                                />
                                              ) : (
                                                <img
                                                  className="select size"
                                                  src={down}
                                                  onClick={() => setRoleTable(!roleTable)}
                                                />
                                              )}
                                            </label>
                                            <div className={roleTable ? "active" : "dropdown-content"}>
                                              {roles.map((val, key) => {
                                                return (
                                                  <div key={key}>
                                                    <h3
                                                      onClick={(e) => {
                                                        setNewRoleType(e.currentTarget.innerHTML);
                                                        setRoleTable(!roleTable);
                                                        setEditRoleOfUser({
                                                          ...EditRoleOfUser,
                                                          newRole: e.currentTarget.innerHTML,
                                                          userId: rowData.original.id,
                                                        });
                                                      }}
                                                    >
                                                      {val}
                                                    </h3>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    ) : (
                                      <td>
                                        {rowData.original.adminrole}
                                      </td>
                                    )}
                                    {localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root" ? (
                                      <>
                                        {editRole && rowData.original.id == id ? (
                                          <td>
                                            <div className="view_icon_users">
                                              <img
                                                src={save}
                                                onClick={(e) => handleSubmitEdit(e)}
                                              />
                                            </div>
                                          </td>
                                        ) : (
                                          <td>
                                            <div className="view_icon_users">
                                              <img
                                                src={edit}
                                                onClick={() => {
                                                  setEditRole(true);
                                                  setId(rowData.original.id);
                                                  setNewRoleType(rowData.original.adminrole);
                                                  setEditRoleOfUser({
                                                    ...EditRoleOfUser,
                                                    newRole: rowData.original.adminrole,
                                                    userId: rowData.original.id,
                                                  });
                                                }}
                                              />
                                            </div>
                                          </td>
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root" ? (
                                      <td>
                                        <div className="view_icon_users">
                                          <img
                                            src={del}
                                            onClick={() => onRemoveUserRole(rowData.original.id)}
                                          />
                                        </div>
                                      </td>
                                    ) : (
                                      ""
                                    )}
                                    {rowData.original.emailaddress === localStorage.getItem("email") ? (
                                      <td>
                                        <div className="view_icon_users">
                                          <Link
                                            to="/gi-team/enable-2FA"
                                          >
                                            <img src={vision} />
                                          </Link>
                                        </div>
                                      </td>
                                    ) : (
                                      <td></td>
                                    )}
                                  </tr>
                                );
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {loader && (
                      <div className="loader-inner">
                        <LottieLoader />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-4" style={{ padding: "0px " }}>
                  <div className="insightsheet-section new-role">
                    <div className="row header">
                      <div className="col-12">
                        <div className="page_icon">
                          <img src={new_role} />
                        </div>
                        <h3 className="heading">New Role</h3>
                      </div>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit} id="form">
                      <div className="inner_sub_area">
                        <div className="row">
                          <div className="col-12" style={{ padding: "0px" }}>
                            <div className="form-group nogroup">
                              <div className="input-group">
                                <img
                                  className="input_icon"
                                  src={searchicon}
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search user by email"
                                  required
                                  value={searchUser}
                                  onChange={(e) => {
                                    setSearchUser(e.target.value);
                                    setUser(true);
                                  }}
                                />
                              </div>
                              <div className={searchUser !== "" && user ? "active": "dropdown-content"}>
                                {filterUser.length <= 0 ? (
                                  <div className="no-result">
                                    <h3 style={{ cursor: "auto" }}>
                                      No results!
                                    </h3>
                                  </div>
                                ) : (
                                  <>
                                    {filterUser.map((val, key) => {
                                      return (
                                        <div key={key}>
                                          <h3
                                            onClick={(e) => {
                                              setSearchUser(e.currentTarget.innerHTML);
                                              setUser(false);
                                              setRoleOfUser({
                                                ...RoleOfUser,
                                                userId: val.id,
                                              });
                                            }}
                                          >
                                            {val.emailaddress}
                                          </h3>
                                        </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-12"
                            style={{ padding: "0px", paddingTop: "20px" }}
                          >
                            <div className="form-holder nogroup">
                              <input
                                onClick={(e) => setRole(!role)}
                                value={roletype}
                                type="text"
                                name="Catagory"
                                required
                                id="inputField2"
                                className="input-area"
                              />
                              <label
                                htmlFor="inputField2"
                                className="floating_label"
                              >
                                Select Role
                              </label>
                              <label className="file_input_label">
                                {role ? (
                                  <img
                                    className="select size"
                                    src={up}
                                    onClick={() => setRole(!role)}
                                  />
                                ) : (
                                  <img
                                    className="select size"
                                    src={down}
                                    onClick={() => setRole(!role)}
                                  />
                                )}
                              </label>
                              <div className={role ? "active" : "dropdown-content"}>
                                {roles.map((val, key) => {
                                  return (
                                    <div key={key}>
                                      <h3
                                        onClick={(e) => {
                                          setRoleType(e.currentTarget.innerHTML);
                                          setRole(!role);
                                          setRoleOfUser({
                                            ...RoleOfUser,
                                            newRole: e.currentTarget.innerHTML,
                                          });
                                        }}
                                      >
                                        {val}
                                      </h3>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="Save">
                          {!loading && (
                            <button 
                              className="btn"
                              type="submit"
                              disabled={localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root" ? false : true}
                            >
                              <span> Save </span>
                            </button>
                          )}
                          {loading && (
                            <button className="btn" disabled>
                              <i className="fas fa-spinner fa-spin"></i>
                              <span> Saving... </span>
                            </button>
                          )}
                        </div>
                        {localStorage.getItem("role") == "Editor" || localStorage.getItem("role") == "Analyst" ? (
                          <div style={{ textAlign: "center" }}>
                            <div
                              className="form-group alert alert-danger"
                              style={{ 
                                margin: "0px",
                                width: "auto",
                              }}
                            >
                              You need to be an Admin to Save
                            </div>
                          </div> 
                        ) : (
                          ""
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ManageRoles);
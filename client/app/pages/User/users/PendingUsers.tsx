import React, { useEffect, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import queryString from "query-string";
import { AppContext } from "../../../../contexts/appContext";
import { 
  removeChildAccount,
  inviteUsers,
} from "utils/api-routes/api-routes.util";
import image from "assets/user-eyes.svg";
import trash from "assets/del.svg";
import edit from "assets/edit-role-customer.svg";
import save from "assets/save-role-customer.svg";
import modalclose from "assets/modal-close.svg";

const PendingUsers = (props) => {

  const { getMyInvitedUser, invitedUsers } = useContext(AppContext);
  
  const [toRemove, setEmail] = useState("");
  const [modal, setModal] = useState(false);

  const deleteUser = () => {
    removeChildAccount(toRemove).subscribe((response) => {
      if (response.response.Requested_Action) {
      }
      getMyInvitedUser();
    });
  };

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  useEffect(() => {
    getMyInvitedUser();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (invitedUsers) {
      setData(invitedUsers.filter((user) => user.inviteaccepted === false));
    }
  }, [invitedUsers]);

  const [id, setId] = useState("");
  const [editRole, setEditRole] = useState(false);

  const [formDetails, setFormDetails] = useState({
    toInvite: "",
		firstname: "",
		lastname: "",
		role: "",
    inviteMessage: "",
    useparentspaymentmethod: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

		const payload = {
			toInvite: formDetails.toInvite,
			firstname: formDetails.firstname,
			lastname: formDetails.lastname,
			role: formDetails.role,
    	inviteMessage: formDetails.inviteMessage,
      useparentspaymentmethod: formDetails.useparentspaymentmethod,
		};

		const stringified = queryString.stringify(payload);

    inviteUsers(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setFormDetails({
          toInvite: "",
					firstname: "",
					lastname: "",
					role: "",
					inviteMessage: "",
          useparentspaymentmethod: false,
        });
        getMyInvitedUser();
      } else {
        // alert("error");
      }
    });
  };

  return (
    <>
      <Modal
        show={modal}
        onHide={handleClose}
        className="Cancel_Subscription_Modal"
      >
        <Modal.Header>
          <div 
            className="cancel_subscription_title modal-title h4"
          > 
            Alert
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handleClose}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete the user?
        </Modal.Body>
        <Modal.Footer>
          <button 
            className="btn" 
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn"
            onClick={() => {
              deleteUser();
              handleClose();
            }}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      <div className="users">
        {data.length > 0 ? (
          data.map((user) => (
            <div className="user">
              <div className="row d-flex align-items-center pb-2 pt-2">
                <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-9 d-flex align-items-center" style={{ paddingRight: "0px" }}>
                  <div className="user-image">
                    <img src={image} alt="image" />
                  </div>
                  <div className="user-data">
                    <h4 className="name"> 
                      {user.user.firstname + " " + user.user.lastname} 
                    </h4>
                    <h4 className="email"> 
                      {user.user.emailaddress} 
                    </h4>
                    {editRole && user.user.emailaddress == id ? (
                      <>
                        <div className="d-flex">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              setFormDetails({
                                ...formDetails,
                                role: e.currentTarget.value,
                              })
                            }
                          >                            
                            {/* <option
                              value="CoAdmin"
                              selected={user.role === "ProfessionalPlanCoAdmin"}
                            >
                              Co-Admin
                            </option> */}
                            <option
                              value="ReadOnly"
                              selected={user.role === "ProfessionalPlanChild"}
                            >
                              Collaborator
                            </option>                     
                          </select>
                        </div>
                        <div className="useparentspaymentmethod">
                          <input
                            id="s1"
                            type="checkbox"
                            checked={formDetails.useparentspaymentmethod}
                          />
                          <label
                            htmlFor="s1"
                            onClick={() => 
                              setFormDetails({
                                ...formDetails,
                                useparentspaymentmethod: !formDetails.useparentspaymentmethod,
                              })
                            }
                          >
                            Use Card on file
                          </label>
                          <img
                            className="ml-2"
                            src={save}
                            onClick={(e) => {
                              handleSubmit(e);
                              setEditRole(false);
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="role"> 
                          Role: {user.role == "ProfessionalPlanCoAdmin" ? "Co-Admin" : user.role === "ProfessionalPlanChild" ? "Collaborator" : "Owner"}
                        </h4>
                        <h4 className="card_on_file"> 
                          Use Admin card on file for their purchases: {user.useparentspaymentmethod ? "Enabled" : "Disabled"}
                        </h4>
                        {user.role === "Owner" || user.user.emailaddress === localStorage.getItem("loggedInCustomerEmail") ? (
                          ""
                        ) : (
                          <img 
                            className="ml-2"
                            src={edit}
                            onClick={() => {
                              setEditRole(true);
                              setId(user.user.emailaddress);
                              setFormDetails({
                                ...formDetails,
                                toInvite: user.user.emailaddress,
                                firstname: user.user.firstname,
                                lastname: user.user.lastname,
                                role: user.role,
                                useparentspaymentmethod: user.useparentspaymentmethod,
                              });
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
                {user.role === "Owner" || user.user.emailaddress === localStorage.getItem("loggedInCustomerEmail") ? (
                  ""
                ) : (
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-3">
                    <div
                      className="del-image"
                    >
                      <img 
                        src={trash}
                        onClick={() => {
                          handleShow();
                          setEmail(user.user.emailaddress);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <h3 style={{ padding: "15px" }}>
            No pending users found 
          </h3>
        )}
      </div> 
    </>
  );
};

export default PendingUsers;
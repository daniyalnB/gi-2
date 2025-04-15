import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CryptoJS from "crypto-js";
import showpassword from "assets/show_password.svg";
import hidepassword from "assets/hide_password.svg";

const PasswordModal = () => {

  const [error, setError] = useState(false);

  const [password, setPassword] = useState("");

  const DevPassword = "nullbrainerGI2Dev";

  const secretPass = "XkhZG4fW2t2W";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === DevPassword) {
      setcardpopupshow(false);
      handlecardclose();
      encryptData();
    } else {
      setError(true);
    }
  };

  const encryptData = () => {
    const vault = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      secretPass
    ).toString();
    localStorage.setItem("vault", vault);
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => setPasswordShown(!passwordShown);

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

  useEffect(() => {
    setTimeout(() => {
      handlecardshow();
    }, 2500)
  }, []);
 
  return (
    <>
      <Modal 
        show={cardpopupshow} 
        onHide={handlecardclose} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div className="add_delete_points modal-title h4"> 
            Enter Demo password to get access
          </div>
        </Modal.Header>
        <Modal.Body className="support_body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="form-group nogroup">
                  <input 
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    required 
                    id="inputField1" 
                    className="input-area"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                  <label htmlFor="inputField1" className="floating_label"> Enter Password </label>
                  <img 
                    className="input_icon"
                    style={{
                      right: "15px",
                      cursor: "pointer",
                    }}
                    src={passwordShown ? showpassword : hidepassword}
                    onClick={togglePassword}
                  />
                </div>
              </div>
            </div>
            <div className="modal-save">
              <button 
                type="submit" 
                className="btn"
              >
                <span> Proceed </span>
              </button>
            </div>
            {error ? (
              <div style={{ margin: "20px auto 0px", textAlign: "center" }}>
                <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
                  Please enter correct password
                </span>
              </div>
            ) : (
              ""
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PasswordModal;
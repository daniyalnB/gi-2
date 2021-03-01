import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import email from '../../../assets/envelope.svg';
import password from '../../../assets/passwordnew.png';

export default function login() {
  return (
    <>
      <Navbar />
      <div className="login_page"> 
        <div className="container-fluid">
          <span className="title"> 
            Sign In with your insighter account
          </span>

          <div className="login_inner_Container">
            <div className="form-holder">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="form-group nogroup">
                      <img 
                        className="input_icon" 
                        src={email}
                      />
                      <input
                        type="text"
                        name="Email"
                        required
                        id="inputField1"
                        className="input-area"
                      />
                      <label htmlFor="inputField1" className="floating_label">
                        {" "}
                        Email{" "}
                      </label>
                    </div>

                    <div className="form-group nogroup">
                      <img 
                        className="input_icon" 
                        src={password}
                      />
                      <input
                        type="password"
                        name="Email"
                        required
                        id="inputField2"
                        className="input-area"
                      />
                      <label htmlFor="inputField2" className="floating_label">
                        {" "}
                        Password{" "}
                      </label>
                    </div>

                    <div className="forgotP_container">
                      <a href="#"> Forgot Password? </a>
                    </div>

                    <button className="btn"> 
                      <span> Sign In </span>
                    </button>

                  </div>
                </div>
              </form>
            </div>

            <div className="login_devider">
              <span>New to getinsights.org?</span>
            </div>
            
            <div>
              <Link
                to="/signup" 
                className='btn create_account' 
              > 
                Create Account
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};
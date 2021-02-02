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
            <form>
              <div className="row">
                <div className="col">

                  <div className="form-group nogroup">
                    <div className="input-group">
                      <img className="input_icon" src={email}></img>
                      <input type="email" className="form-control" required />
                      <div className="label"> Email </div>
                    </div>
                  </div>

                  <div className="form-group nogroup">
                    <div className="input-group">
                      <img className="input_icon" src={password}></img>
                      <input type="password" className="form-control" required/>
                      <div className="label"> Password </div>
                    </div>                
                  </div>

                  <div className="forgotP_container">
                    <a href="#"> Forgot Password? </a>
                  </div>

                  <button className="btn"> 
                    <span> Sign In </span>
                    <div className="loader"></div> 
                  </button>

                </div>
              </div>
            </form>

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
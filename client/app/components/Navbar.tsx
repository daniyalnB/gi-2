import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo.png";
import search from "../../assets/search.png";

function Navbar() {
  
  const [click, setClick] = useState(false);
  // const [drop, setDrop] = useState(false);
  const [item, setBorder] = useState({
    drop: false,
    border: false
  });

  const handleClick = () => setClick(!click);

  return (
    <>
      <header className="main_header">
        <nav className="navbar">
          <div className='navbar-container' id="container">
            <a href='/' className='navbar-logo'>
              <img src={logo} alt="" style={{ width: "142px", height: "66px"}}/>
            </a>
            <span style={{ paddingLeft: "39px"}}>
              <img src={search}></img>
            </span>
            <div className='menu-icon' onClick={handleClick}>
              <i className='fa fa-bars' />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li 
                className={item.drop ? "drop nav-item" : "nav-item"}
                onClick={() => setBorder({ drop: !item.drop, border: !item.border})}>
                <a
                  className={item.border ? "nav-links bor" : "nav-links"}
                  >

                  Insight Sheets <i className="fa fa-angle-down" aria-hidden="true" style={{ paddingLeft: "8px"}}></i>
                </a>
                  <ul>
                    <li>Inside Sheet Database</li>
                    <li>Inside Sheet Tutorial</li>
                  </ul>
              </li>
              <li className='nav-item'>
                <Link
                  to="/events"
                  className="nav-links"
                  >

                  Events
                </Link>
              </li>
              <li className='nav-item'>
                <a
                  className="nav-links"
                  >

                  Free Resources <i className="fa fa-angle-down" aria-hidden="true" style={{ paddingLeft: "8px"}}></i>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className="nav-links"
                  >

                  Membership Resources <i className="fa fa-angle-down" aria-hidden="true" style={{ paddingLeft: "8px"}}></i>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className="nav-links"
                  >

                  Actionable Academy <i className="fa fa-angle-down" aria-hidden="true" style={{ paddingLeft: "8px"}}></i>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className="nav-links"
                  >

                  Advance the Cause <i className="fa fa-angle-down" aria-hidden="true" style={{ paddingLeft: "8px"}}></i>
                </a>
              </li>

              <li className='nav-item'>
                <Link
                  to="/login" 
                  className='nav-links' 
                  >

                  <button className="login_btn"> Sign In </button>
                </Link>
              </li>
            </ul>

          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;

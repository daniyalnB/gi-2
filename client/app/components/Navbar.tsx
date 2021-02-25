import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo.svg";
import search from "../../assets/search.png";

function Navbar () {
  
  const [click, setClick] = useState(false);
  const [navone, setNavOne] = useState(false);
  const [navtwo, setNavTwo] = useState(false);
  const [navthree, setNavThree] = useState(false);
  const [navfour, setNavFour] = useState(false);
  const [navfive, setNavFive] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <header className="main_header">
        <nav className="navbar">
          <div className='navbar-container' id="container">
            <a href='/' className='navbar-logo'>
              <img src={logo} alt="" className="logo_image"/>
            </a>
            <span className="search">
              <img src={search}></img>
            </span>
            <div className='menu-icon' onClick={handleClick}>
              <i className='fa fa-bars' />
            </div>
            <ul className={click ? 'nav-menu active-nav' : 'nav-menu'}>
              <li 
                className="nav-item"
                onClick={() => 
                  [ 
                    setNavOne(!navone), 
                    setNavTwo(false),
                    setNavThree(false),
                    setNavFour(false),
                    setNavFive(false)
                  ]
                }
              >
                <a
                  className={navone ? "nav-links bor" : "nav-links"}
                >
                  Insight Sheets <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className={navone ? "active" : "dropdown-content" }>
                  <Link
                    to="/insightsheet"
                  >
                    <h3> Insight Sheet Database </h3>
                  </Link>
                  <hr />
                  <Link
                    to="/insightsheet"
                  >
                    <h3> Insight Sheet Tutorial </h3> 
                  </Link>  
                </div>
              </li>
              <li className='nav-item'>
                <Link
                  to="/events"
                  className="nav-links"
                >
                  Events
                </Link>
              </li>
              <li 
                className="nav-item"
                onClick={() => 
                  [ 
                    setNavOne(false), 
                    setNavTwo(!navtwo),
                    setNavThree(false),
                    setNavFour(false),
                    setNavFive(false)
                  ]
                }
              >
                <a
                  className={navtwo? "nav-links bor" : "nav-links"}
                >
                  Free Resources <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className={navtwo ? "active active-two" : "dropdown-content" }>
                  <h3> Price List Update Summary </h3>
                  <hr />
                  <h3> Insighter Report </h3> 
                  <hr />
                  <h3> Video Gallery </h3>
                  <hr />
                  <h3> 3D Training Modules </h3>
                  <hr />
                  <h3> Matterport Standards </h3> 
                </div>
              </li>
              <li 
                  className='nav-item'
                  onClick={() => 
                    [ 
                      setNavOne(false), 
                      setNavTwo(false),
                      setNavThree(!navthree),
                      setNavFour(false),
                      setNavFive(false)
                    ]
                  }
                >
                <a
                  className={navthree? "nav-links bor" : "nav-links"}
                >
                  Membership Resources <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className={navthree ? "active active-three" : "dropdown-content" }>
                  <h3> Insight Sheet Database </h3>
                  <hr />
                  <h3> Solidifai (Estimate Edit Engine) </h3> 
                  <hr />
                  <h3> ZORA (Estimate Audit Engine) </h3> 
                </div>
              </li>
              <li 
                  className='nav-item'
                  onClick={() => 
                    [ 
                      setNavOne(false), 
                      setNavTwo(false),
                      setNavThree(false),
                      setNavFour(!navfour),
                      setNavFive(false)
                    ]
                  }
                >
                <a
                  className={navfour? "nav-links bor" : "nav-links"}
                >
                  Actionable Academy <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className={navfour ? "active active-four" : "dropdown-content" }>
                  <h3> Go to Academy </h3>
                  <hr />
                  <h3> AI Matterport Certification </h3> 
                  <hr />
                  <h3> AI Tools Certification </h3>
                  <hr />
                  <h3> AIMC Graduates Public Registry </h3>
                  <hr />
                  <h3> Private Training </h3> 
                </div>
              </li>
              <li 
                  className='nav-item'
                  onClick={() => 
                    [ 
                      setNavOne(false), 
                      setNavTwo(false),
                      setNavThree(false),
                      setNavFour(false),
                      setNavFive(!navfive)
                    ]
                  }
                >
                <a
                  className={navfive? "nav-links bor" : "nav-links"}
                >
                  Advance the Cause <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className={navfive ? "active active-five" : "dropdown-content" }>
                  <h3> Line Item Request </h3>
                  <hr />
                  <h3> Matterport Feature Request </h3> 
                  <hr />
                  <h3> Insight Sheet Collaboration </h3>
                  <hr />
                  <h3> Gift Cards </h3>
                  <hr />
                  <h3> Swag </h3> 
                  <hr />
                  <h3> Plan Matrix </h3> 
                </div>
              </li>

              <li className='nav-item'>
                <Link
                  to="/login" 
                  className='nav-links' 
                  >

                  <button className="btn"> Sign In </button>
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

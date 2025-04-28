import React, { useState, useEffect, useRef } from "react";

const WrongBrowserDisclaimer = () => {
  const [active, setActive] = useState(true);
  const [hide, setHide] = useState(false);
  const disclaimerRef = useRef(null);

  // Check localStorage first
  useEffect(() => {
    if (localStorage.getItem("WrongBrowserDisclaimer") === "Yes") {
      setHide(true);
    }
  }, []);

  // Set visibility after timeout only if not hidden
  useEffect(() => {
    if (!hide) {
      const timer = setTimeout(() => {
        if (disclaimerRef.current) {
          disclaimerRef.current.style.visibility = "visible";
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [hide]);

  const handleGotIt = () => {
    setActive(false);
    localStorage.setItem("WrongBrowserDisclaimer", "Yes");
  };

  if (hide) {
    return null;
  }

  return (
    <div 
      className="site_best_view" 
      role="dialog" 
      id="WrongBrowserDisclaimer"
      ref={disclaimerRef}
      style={{
        bottom: active ? "10px" : "-100%",
        visibility: "hidden" // Start hidden, will be made visible after timeout
      }}
    >
      <div className="modal-frame modal-bottom" role="document">
        <div className="modal-content">
          <div>
            <div>
              <p><strong>This site is best viewed in chrome or safari</strong></p>
              <button 
                type="button" 
                className="btn btn-secondary site_best_view_btn"
                onClick={handleGotIt}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrongBrowserDisclaimer;
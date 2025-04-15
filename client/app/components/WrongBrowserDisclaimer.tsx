import React, { useState, useEffect } from "react";

const WrongBrowserDisclaimer = () => {

  const [active, setActive] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      document.getElementById("WrongBrowserDisclaimer").style.visibility = "visible";
    }, 5000);
  }, []);

  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("WrongBrowserDisclaimer") == null) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, []);

  return (
    <>
      {!hide && (
        <div className="site_best_view" role="dialog" id="WrongBrowserDisclaimer"
          style={active ? {bottom: "10px" } : {bottom: "-100%" }}
        >
          <div className="modal-frame modal-bottom" role="document">
            <div className="modal-content">
              <div>
                <div>
                  <p><strong>This site is best viewed in chrome or safari</strong></p>
                  <button 
                    type="button" 
                    className="btn btn-secondary site_best_view_btn"
                    onClick={() => {
                      setActive(false);
                      localStorage.setItem("WrongBrowserDisclaimer", "Yes");
                    }}
                  >
                    Got It
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WrongBrowserDisclaimer;
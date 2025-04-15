// import React from "react";

// const ProgressBar = ({ currentSlide, totalSlides, loading }) => {
//   const progress = (currentSlide / totalSlides) * 100;
//   console.log(progress, "progress")

//   const progressBarStyles = {
//     width: `${progress}%`,
//     transition: loading ? "width 0.5s ease-out" : "none",
//   };

//   return (
//     <div className="progress-bar">
//       <div className="progress" style={progressBarStyles}></div>
//     </div>
//   );
// };

// export default ProgressBar;

import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        setProgress(0);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  const progressBarStyles = {
    width: `${progress}%`,
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div className="progress-bar">
      <div className="progress" style={progressBarStyles}></div>
    </div>
  );
};

export default ProgressBar;
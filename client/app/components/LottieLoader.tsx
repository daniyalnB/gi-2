import React from "react";
import Lottie from "react-lottie";
import Loader from "../components/Loader";

const LottieLoader = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={100} />
    </div>
  );
}

export default LottieLoader;
import React, { useEffect, useState, useRef  } from "react";
import Slider from "react-slick";
import ProgressBar from "./ProgressBar";

const IconsSlider = ({ logos }) => {

	const sliderRef = useRef(null);

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index, true);
    }
  };
	
	const [result, setResult] = useState([]);

	// const changeIndex = (arr, from, to) => {
	// 	arr.splice(to, 0, arr.splice(from, 1)[0])
	// 	return arr;
	// }

	useEffect(() => {
		const x = logos.filter(
			(logo) => logo.logourl !== "https://getinsights2-data.s3.amazonaws.com/ATI234_1.png" && logo.logourl !== "https://getinsights2-data.s3.amazonaws.com/ATI-logo-press-release_11.png"
		);
		setResult(x);
	}, [logos]);

	const settings = {
		dots: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		// initialSlide: 0,
		speed: 3000,
		autoplaySpeed: 3000,
		cssEase: "linear",
		pauseOnHover: false,

		// dots: true,
		arrows: false,
		infinite: true,
		lazyLoad: true,
		// speed: 1000,
		autoplay: true,
		// autoplaySpeed: 5000,
		// slidesToShow: logos.length > 4 ? 4 : logos.length,
		// slidesToScroll: logos.length > 4 ? 4 : logos.length,
		centerMode: true,
		centerPadding: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: true,
					arrows: false,
					infinite: true,
					lazyLoad: true,
					speed: 1000,
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToShow: logos.length > 3 ? 3 : logos.length,
					slidesToScroll: logos.length > 3 ? 3 : logos.length,
					centerMode: true,
					centerPadding: 0,
				},
			},
			{
				breakpoint: 600,
				settings: {
					dots: true,
					arrows: false,
					infinite: true,
					lazyLoad: true,
					speed: 1000,
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToShow: logos.length > 2 ? 2 : logos.length,
					slidesToScroll: logos.length > 2 ? 2 : logos.length,
					centerMode: true,
					centerPadding: 0,
				},
			},
			{
				breakpoint: 480,
				settings: {
					dots: true,
					arrows: false,
					infinite: true,
					lazyLoad: true,
					speed: 1000,
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToShow: logos.length > 1 ? 1 : logos.length,
					slidesToScroll: logos.length > 1 ? 1 : logos.length,
					centerMode: true,
					centerPadding: 0,
				},
			},
		],
	};

	return (
		<>
			{result?.length > 0 ? (
				<>
				<Slider ref={sliderRef} {...settings}>
					{result.map((logo,index) => {
						return (
							<div className="slide" key={logo.id}>
								<a href={index === 0 ? "https://atirestoration.com/" : logo.companyurl} target="_blank">
									<img src={index === 0 ? "https://getinsights2-data.s3.amazonaws.com/ATI234_1.png" : logo.logourl} alt={"no slide found"} loading="lazy" />
								</a>
							</div>
						);
					})}
				</Slider>
				<button onClick={() => goToSlide(1)}>Go to Slide 1</button>
				<ProgressBar />
				</>
			) : (
				""
			)}
		</>
	);
};

export default IconsSlider;
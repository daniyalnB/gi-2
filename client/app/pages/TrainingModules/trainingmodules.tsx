import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));

const TrainingModules = () => {
	return (
		<>
			<SEO
        title="3D Training Modules - Actionable Insights"
        description="Actionable Insights has taken Xactimate estimating training to the next level. The trainings comprise real-life losses captured by Matterport's technology. - (Actionable Insights has taken Xactimate estimating training to the next level. We train off of real-life losses captured by Matterport's technology. Our stu)"
				link="resources/3d-training-modules"
			/>
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
				<ScrollToTop />
				<Navbar />
        <Breadcrumbs />
				<div className="main-container">
					<div className="Training_Modules">
						<div className="">
							<div className="holder">
								<h2> Explore Our 3D Training Modules </h2>
								<h3> Actionable Insights has taken Xactimate estimating training to the next level. We train off of real-life losses captured by Matterport’s technology. Our students leverage these 3D tours as they compete against one another to write the most accurate mitigation and repair scopes. </h3>
								<h3 className="below"> Below you can explore the 3D tours in anticipation of our next Xactimate Estimating Training class! </h3>
							</div>
							<hr />
							<div className="Xactimate_Estimating_Training">
								<h2> Xactimate Estimating Training </h2>
							</div>
							<div className="Mitigation">
								<div className="row">
									<div className="col-xl-6 col-lg-6 col-md-12">
										<h3> Pre-Mitigation </h3>
										<div className="mitigation_border">
											<iframe 
												src="https://my.matterport.com/show/?m=eCsvANPp7Dn&brand=0" 
												frameBorder="0" 
												allowFullScreen 
											/>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-12">
										<h3> Post-Mitigation </h3>
										<div className="mitigation_border">
											<iframe 
												src="https://my.matterport.com/show/?m=S9X5VbMx8CU&brand=0" 
												frameBorder="0" 
												allowFullScreen 
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="uc">
								<Link
									to="/events"
									className="btn"
								>
									See Upcoming Classes
								</Link>
							</div>
						</div>
					</div>
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(TrainingModules);
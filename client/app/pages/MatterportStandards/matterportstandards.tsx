import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScanTerminology from '../MatterportStandards/ScanTerminology';
import Insighter from '../../../assets/INSIGHTER20.png';
import Ninjas from '../../../assets/MatterportNinjas.png';

const matterportstandards = () => {
    return (
        <>
        <Navbar />
        <div className="main-container">
            <div className="Matterport_Standards">
                <div className="container">
                    <div className="holder">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/27154624/Matterport_newlogo2.png" />
                    </div>
                    <div className="certified">
                        <h2> Looking to become AI Matterport Certified? </h2>
                        <h5> Learn how to make the most of Matterport's game-changing technology with our online, self-paced training and certification course. </h5>
                        <div className="lm">
                            <Link
                                to=""
                                className="btn"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="Content">
                        <h4 className="detail"> 
                            This page is a collection of what Actionable Insights deems the best practice of implementing the digital assets provided by Matterport into a claims environment. 
                            We will discuss the use of Mattertags, Schematic Floor Plans, and Remote Estimating.
                        </h4>
                        <h3 className="heading">
                            Incorporating Matterport in a Claims Environment
                        </h3>
                        <h4 className="detail">
                            Matterport 3D imagery is extremely useful in a claims environment with the new practice of Remote Estimating. 
                            Remote estimating is provided by immersive walkthroughs that would allow for an Estimator to walk properties from the safety of a desk, while still being able to accurately calculate the amount of work or material necessary for the completion of a job.
                        </h4>
                        <h3 className="heading">
                            Matterport Mattertag Standards
                        </h3>
                        <h4 className="detail">
                            Actionable Insights has worked with Matterport to develop a standard for the use of Mattertags when working with restoration scans. 
                            Mattertags are very useful tools that can allow a user to point out, with a colorful icon, things of importance to a 3rd party viewer.
                        </h4>
                    </div>
                    <div className="Matterport_Color_Standards">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/16095906/Matterport-Color-Standards_Mar2020.png" />
                    </div>
                    <ScanTerminology />
                    <div className="Content">
                        <h3 className="heading">
                            FloorPlan by Matterport
                        </h3>
                        <h4 className="detail">
                            Matterport allows it’s users to purchase a black-and-white floor plan that can be used in Xactimate as a layout to develop your sketch, with accurate measurements of a property. 
                            This reduces your work and risk tremendously; you may now have an Estimator/Technician safely at the office measuring each corner of a property instead of walking through yourself with a tape measure. 
                        </h4>
                        <h5 className="sub-heading">
                            Place your Order
                        </h5>
                        <h4 className="detail">
                            The Dollhouse Button must be turned on in Workshop and the Space must be set as Public to complete the Schematic Floor Plan. 
                            Matterport will not share your link beyond what is necessary to create your Schematic Floor Plan. Open your Space in Matterport Cloud and click on FloorPlan under the Media tab. 
                            You must have Editor access to this Space to place your order.
                        </h4>
                    </div>
                    <div className="Floor_Plan_One">
                        <div className="Shadow">
                            <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/18003441/ordersfp.png" />
                        </div>
                    </div>
                    <div className="Content">
                        <h4 className="detail">
                            Click <strong>Buy</strong>. Choose metric or imperial measurements and confirm the order by clicking the <strong>Place Order</strong> button. 
                            Currently, you can only place an order in <strong>one measurement system</strong>. 
                            If you want the same Schematic Floor Plan in both measurement systems, please contact Matterport Support.
                        </h4>
                    </div>
                    <div className="Floor_Plan_Two">
                        <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/18003537/confirmpurchasesfp.png" />
                    </div>
                    <div className="Content">
                        <h4 className="detail">
                            Matterport can only deliver floor plans for Matterport Spaces that are 25,000 square feet or less. 
                            Please contact Matterport if you have concerns about a specific space.
                        </h4>
                    </div>
                    <div className="Content" style={{ padding: "0px 0px" }}>
                        <h3 className="heading">
                            Matterport TrueSketch™ and TrueSketch™ PLUS for Xactimate
                        </h3>
                        <h4 className="detail">
                            The Matterport TrueSketch™ and TrueSketch™ PLUS are additional deliverables you can request after you’ve scanned a property and uploaded it to my.matterport.com.
                        </h4>
                        <h4 className="detail" style={{ paddingTop: "15px" }}>
                            TrueSketches are SKX files that you can easily import into Xactimate™. 
                            With these files, you no longer have to measure and manually sketch losses. 
                            This saves you valuable time so you can process insurance claims faster and more accurately.
                        </h4>
                        <h4 className="detail" style={{ paddingTop: "15px" }}>
                            TrueSketch and TrueSketch PLUS created from the exact same Matterport space. 
                            Depending on how you plan to use the SKX file, these differences may or may not be important to you. 
                            Keep in mind that with TrueSketch™ PLUS you’ll receive a much more detailed sketch with measurements and features as built.
                        </h4>
                        <h4 className="detail" style={{ paddingTop: "15px" }}>
                            Find out more about Matterport TrueSketch™ and TrueSketch™ PLUS for Xactimate:&nbsp;
                            <a 
                                href="https://support.matterport.com/hc/en-us/articles/360001452428-Matterport-TruePlan-for-Xactimate-#import-trueplan%E2%84%A2-into-xactimate%E2%84%A2-0-0"
                                target="_blank"
                            >
                                Click Here!
                            </a>
                        </h4>
                    </div>
                    <div className="Matterport_TrueSketch">
                        <div className="row">
                            <div className="col-xl-6 col-md-12">
                                <div className="TrueSketch">
                                    <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/06160502/TS-Plus-Back.png" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-12">
                                <div className="TrueSketch">
                                    <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/06160502/TS-Plus-Back.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Content">
                        <h3 className="heading">
                            Matterport Supported Cameras (Pro2 vs 360)
                        </h3>
                        <h4 className="detail">
                            Ready to test the waters? 360 cameras are the most affordable way to start capturing the world around you or you can leverage the full power of The Matterport Cloud 3.0 with the patented Matterport Pro2 Camera.
                        </h4>
                    </div>
                    <div className="Matterport_Cameras">
                        <div className="Shadow">
                            <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/20123111/415064_Matterport-Infographic_1_050719.jpg" />
                        </div>
                    </div>
                    <div className="Content">
                        <h3 className="heading">
                            Matterport Pro2 Camera Promo
                        </h3>
                        <h4 className="detail">
                            Use code INSIGHTS20 and get $200 off&nbsp; 
                            <a 
                                href="#"
                                target="_blank"
                            >
                                Matterport Pro2 3D Camera.
                            </a>
                        </h4>
                    </div>
                    <div className="Matterport_Color_Standards" style={{ padding: "0px" }}>
                        <img src={Insighter} />
                    </div>
                    <div className="Content">
                        <h3 className="heading">
                            Matterport iOS Supported Devices
                        </h3>
                        <h4 className="detail">
                            The iPhone or iPad is how you connect to the camera and control the scanning process. 
                            Generally we recommend you use the <strong>best iPhone or iPad you have available</strong> (i.e most powerful and most free space). 
                            <br/>
                            Not sure which one you have?&nbsp; 
                            <a 
                                href="https://support.apple.com/en-us/HT208200"
                                target="_blank"
                            >
                                Find the model number 
                            </a>
                            &nbsp;of your device, then identify your&nbsp;
                            <a 
                                href="https://support.apple.com/en-us/HT201296"
                                target="_blank"
                            >
                                identify your iPhone 
                            </a>
                            &nbsp;model or&nbsp; 
                            <a 
                                href="https://support.apple.com/en-us/HT201471"
                                target="_blank"
                            >
                                identify your iPad
                            </a>
                            &nbsp;model.
                        </h4>
                    </div>
                    <div className="Matterport_iOS_Supported_Devices">
                        <table>
                            <tbody>
                                <tr style={{ background: "#e8e8e8" }}>
                                    <td className="heading"> Recommended </td>
                                    <td className="heading"> Minimum </td>
                                    <td className="heading"> Not Supported </td>
                                </tr>
                                <tr>
                                    <td className="new" width="30%">
                                        <ul>
                                            <li> iPhone (6S or newer) </li>
                                            <li> iPad Pro* (1st, 2nd, or 3rd generation) </li>
                                            <li> iPad (6th generation) </li>
                                            <li> iPad Air (2nd generation) </li>
                                        </ul>
                                    </td>
                                    <td className="new" width="35%">
                                        <ul>
                                            <li> iPad (5th generation) </li>
                                            <li> iPad Air** (1st generation) </li>
                                            <li> iPad mini Retina 2, 3, 4** <br /> (NOT the original iPad Mini) </li>
                                        </ul>
                                    </td>
                                    <td className="new" width="45%">
                                        <ul>
                                            <li> iPad mini 1 </li>
                                            <li> iPad 4 or earlier models </li>
                                            <li> Using an unsupported iPad can <br /> cause the Capture app to crash. </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Content">
                        <h3 className="heading" style={{ paddingTop: "0px" }}>
                            Matterport Capture on Android (BETA)
                        </h3>
                        <h4 className="detail">
                            Matterport has a pre-release (Beta) build of the Matterport Capture app for Android – if you’ve got a supported device, you can use it to scan and create 3D spaces. 
                            Read the full article here to learn more about the requirements needed to try the new beta build on Android.
                        </h4>
                        <h3 className="heading">
                            Actionable Insights and Matterport
                        </h3>
                        <h4 className="detail">
                            If you would like to learn more about leveraging Matterport in your jobs, sign up for the next Leveraging Geomni and Matterport Digital Assets in a Claims Environment course! You can find the next available course on our Events page.
                        </h4>
                        <h3 className="heading">
                            Actionable Insights Powered KIT
                        </h3>
                        <h4 className="detail">
                            Actionable Insights has worked with Matterport cameras for a long while, and we’ve through troves of gear. 
                            After such a long time, we’ve developed an arsenal of equipment that we stand by to operate our collection of Matterport cameras. 
                            We decided to share our recommended equipment loadout with the rest of the restoration community to help keep everyone well prepared for any size property.
                        </h4>
                        <h5 className="sub-heading" style={{ paddingBottom: "0px" }}>
                            ACTIONABLE KIT
                        </h5>
                        <h4 className="detail">
                            Our basic kit is comprised of the bare necessities to operate your Matteport camera. 
                            <br />
                            This is recommended for beginner Matterport users.
                            <br />
                            <a 
                                href="https://kit.co/ActionableInsights/actionable-kit-matterport-basics"
                                target="_blank"
                            >
                                CLICK HERE!
                            </a>
                        </h4>
                        <h3 className="heading">
                            Matterport Ninjas Facebook Page
                        </h3>
                        <h4 className="detail">
                            Actionable Insights prides itself with providing knowledge to anyone willing to inquire. 
                            Therefore, with Matterports support, we created a Facebook page to provide support, inspiration, and general tips for our fellow Matterport users. 
                            Members are strongly encouraged to give more than they take, but we don’t mind helping new users getting started!
                        </h4>
                        <h4 className="fun">
                            Click below and join in the fun!
                        </h4>
                    </div>
                    <div className="Matterport_Ninjas">
                        <a 
                            href="https://www.facebook.com/groups/MatterportNinjas/"
                            target="_blank"
                        >
                            <img src={Ninjas} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default matterportstandards;
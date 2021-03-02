import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VG_Responsive = () => {

    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [five, setFive] = useState(false);
    const [six, setSix] = useState(false);
    const [seven, setSeven] = useState(false);

    return (
        <>
            <div className="youtube-videos-tabs-new">
                <div 
                    className={one == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => [
                        setOne(!one),
                        setTwo(false),
                        setThree(false),
                        setFour(false),
                        setFive(false),
                        setSix(false),
                        setSeven(false),
                    ]}
                >
                    <h1> Academy Insights </h1>
                </div>
                {one == true ? (
                    <div className="Dropdown">
                        <div className="video">
                            <Link
                                to="/videogallerydetail"
                            >
                                <img 
                                    src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/08/27030901/AIMC_How-to-purchase.png"
                                />
                                <h3 className="name"> How to Purchase AIMC </h3>
                            </Link>
                            <p className="description">
                                So, you’re ready to start investing in AIMC? The only question left is HOW? Watch this video and we’ll walk you through the process. Are you AI Matterport Certified? 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/08/27030901/AIMC_How-to-purchase.png"
                            />
                            <h3 className="name"> How to Purchase AIMC </h3>
                            <p className="description">
                                So, you’re ready to start investing in AIMC? The only question left is HOW? Watch this video and we’ll walk you through the process. Are you AI Matterport Certified? 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                    </div>
                ) : "" }
                <div 
                    className={two == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => [
                        setOne(false),
                        setTwo(!two),
                        setThree(false),
                        setFour(false),
                        setFive(false),
                        setSix(false),
                        setSeven(false),
                    ]}
                >
                    <h1> Price List Update Summary </h1>
                </div>
                {two == true ? (
                    <div className="Dropdown">
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/08/27030901/AIMC_How-to-purchase.png"
                            />
                            <h3 className="name"> How to Purchase AIMC </h3>
                            <p className="description">
                                So, you’re ready to start investing in AIMC? The only question left is HOW? Watch this video and we’ll walk you through the process. Are you AI Matterport Certified? 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/08/27030901/AIMC_How-to-purchase.png"
                            />
                            <h3 className="name"> How to Purchase AIMC </h3>
                            <p className="description">
                                So, you’re ready to start investing in AIMC? The only question left is HOW? Watch this video and we’ll walk you through the process. Are you AI Matterport Certified? 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                    </div>
                ) : "" }
                <div 
                    className={three == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => [
                        setOne(false),
                        setTwo(false),
                        setThree(!three),
                        setFour(false),
                        setFive(false),
                        setSix(false),
                        setSeven(false),
                    ]}
                >
                    <h1> Membership Resources </h1>
                </div>
                {three == true ? (
                    <div className="Dropdown">
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220519/tools_certified_thumbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Tools Certification </h3>
                            <p className="description">
                                The Actionable Insights Tools Certification course is an online, self-paced learning management system designed to certify you in Actionable Insights tools and resources. Becoming AI Tools… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220519/tools_certified_thumbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Tools Certification </h3>
                            <p className="description">
                                The Actionable Insights Tools Certification course is an online, self-paced learning management system designed to certify you in Actionable Insights tools and resources. Becoming AI Tools… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                    </div>
                ) : "" }
                <div 
                    className={four == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => [
                        setOne(false),
                        setTwo(false),
                        setThree(false),
                        setFour(!four),
                        setFive(false),
                        setSix(false),
                        setSeven(false),
                    ]}
                >
                    <h1> Matter Hacks </h1>
                </div>
                {four == true ? (
                    <div className="Dropdown">
                         <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220734/matterport_certofied_thmbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Matterport Certification </h3>
                            <p className="description">
                                The Actionable Insights Matterport Certification course is an online, self-paced learning management system designed to certify attendees in all things Matterport… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220734/matterport_certofied_thmbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Matterport Certification </h3>
                            <p className="description">
                                The Actionable Insights Matterport Certification course is an online, self-paced learning management system designed to certify attendees in all things Matterport… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                    </div>
                ) : "" }
                <div 
                    className={five == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => [
                        setOne(false),
                        setTwo(false),
                        setThree(false),
                        setFour(false),
                        setFive(!five),
                        setSix(false),
                        setSeven(false),
                    ]}
                >
                    <h1> Xact Hacks </h1>
                </div>
                {five == true ? (
                    <div className="Dropdown">
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220519/tools_certified_thumbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Tools Certification </h3>
                            <p className="description">
                                The Actionable Insights Tools Certification course is an online, self-paced learning management system designed to certify you in Actionable Insights tools and resources. Becoming AI Tools… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220519/tools_certified_thumbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Tools Certification </h3>
                            <p className="description">
                                The Actionable Insights Tools Certification course is an online, self-paced learning management system designed to certify you in Actionable Insights tools and resources. Becoming AI Tools… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                    </div>
                ) : "" }
                <div 
                    className={six == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => [
                        setOne(false),
                        setTwo(false),
                        setThree(false),
                        setFour(false),
                        setFive(false),
                        setSix(!six),
                        setSeven(false),
                    ]}
                >
                    <h1> Hotkey Highlights  </h1>
                </div>
                {six == true ? (
                    <div className="Dropdown">
                         <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220734/matterport_certofied_thmbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Matterport Certification </h3>
                            <p className="description">
                                The Actionable Insights Matterport Certification course is an online, self-paced learning management system designed to certify attendees in all things Matterport… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220734/matterport_certofied_thmbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Matterport Certification </h3>
                            <p className="description">
                                The Actionable Insights Matterport Certification course is an online, self-paced learning management system designed to certify attendees in all things Matterport… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                    </div>
                ) : "" }
                <div 
                    className={seven == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => [
                        setOne(false),
                        setTwo(false),
                        setThree(false),
                        setFour(false),
                        setFive(false),
                        setSix(false),
                        setSeven(!seven),
                    ]}
                >
                    <h1> Equipment Corral  </h1>
                </div>
                {seven == true ? (
                    <div className="Dropdown">
                         <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220734/matterport_certofied_thmbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Matterport Certification </h3>
                            <p className="description">
                                The Actionable Insights Matterport Certification course is an online, self-paced learning management system designed to certify attendees in all things Matterport… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                        <div className="video">
                            <img 
                                src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220734/matterport_certofied_thmbnail.png"
                            />
                            <h3 className="name"> Actionable Insights Matterport Certification </h3>
                            <p className="description">
                                The Actionable Insights Matterport Certification course is an online, self-paced learning management system designed to certify attendees in all things Matterport… 
                                <span style={{ color: "#38ADA2", fontWeight: "bold" }}> Read More </span>
                            </p>
                        </div>
                    </div>
                ) : "" }
            </div>
        </>
    );
};

export default VG_Responsive;
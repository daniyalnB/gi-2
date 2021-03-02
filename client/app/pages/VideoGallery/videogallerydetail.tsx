import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const VGDetail = () => {
    return (
        <>
        <Navbar />
        <div className="main-container">
            <div className="Video_Gallery">
                <div className="container">
                    <div className="holder">
                        <h2> Video Gallery </h2>
                    </div>
                    <div className="videos">
                        <div className="row">
                            <div className="col">
                                <div className="video_gallery_detail">
                                    <img 
                                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/09/10220507/tools_certified_thumbnail_1180x400.png"
                                    />
                                    <h3 className="name"> Actionable Insights Matterport Certification </h3>    
                                    <p className="description">
                                        The Actionable Insights Matterport Certification course is an online, self-paced learning management system designed to certify attendees in all things Matterport – camera operation, claims documentation tools, and leveraging the sketch-generation options among other critical aspects of Matterport’s technology. 
                                        Are you AI Matterport Certified? Learn how to make the most of Matterport’s game-changing technology with our online, self-paced training and certification course here: 
                                        <span style={{ color: "#38ADA2", fontWeight: "bold" }}> getinsights.org/aimc/ </span>
                                    </p>
                                </div>
                                <div className="youtube_video">
                                    <div className="video_border">
                                        <div className="fluid-width-video-wrapper">
                                            <iframe 
                                                src='https://www.youtube.com/embed/Yqf1jlAz4GU'
                                                frameBorder='0'
                                                allow='autoplay; encrypted-media'
                                                allowFullScreen
                                                name="example"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default VGDetail;
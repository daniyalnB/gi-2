import React from 'react';
import img1 from 'assets/DriHeatRadial2.png';
import img2 from 'assets/TextileRestoration2.png';
import img3 from 'assets/Granite2.png';
import img4 from 'assets/BuiltInOven2.png';
import img5 from 'assets/Siding2.png';

const TemplatesSection = () => {
    return (
        <>
            <div className="Templates_section">
                <div className="container">
                    <h2> 3700+ Pages of Xactimate invoicing Templates </h2>
                    <br />
                    <h5> We created this database to clarify what line items should be used in a restoration claims environment. Write your </h5>
                    <h5> Xactimate estimates faster and in a more informed manner – all materially interested parties will thank you. </h5>
                
                    <div className="row sub_section">
                        <div className="row section1">
                            <div className="col-12">
                                <h4> Mitigation Insight Sheets </h4>
                                <hr />
                                <div className="section1_1">
                                    <img src={img1}></img>
                                    <div className="mg"> DriHeat Radial 8 </div>
                                </div>
                            </div>
                            
                            <div className="col-12">
                                <div className="section1_1">
                                    <img src={img2}></img>
                                    <div className="mg"> Textile Restoration </div>
                                </div>
                            </div>
                        </div>
                        <div className="row section2">
                            <div className="col">
                                <h4> Insight Sheet Tutorial </h4>
                                <hr />
                                <div className="section2_2">
                                    <img src={img3}></img>
                                </div>
                            </div>
                        </div>
                        <div className="row section3">
                            <div className="col-12">
                                <h4> Repair Insight Sheets </h4>
                                <hr />
                                <div className="section3_3">
                                    <img src={img4}></img>
                                    <div className="mg"> Oven Detach & Reset </div>
                                </div>
                            </div>
                            
                            <div className="col-12">
                                <div className="section3_3">
                                    <img src={img5}></img>
                                    <div className="mg"> Siding </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </>
    );
};

export default TemplatesSection;
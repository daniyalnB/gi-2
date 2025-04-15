import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Slider from "react-slick";
import user from "assets/user-eyes.svg";
import AndrewMcCabe from "assets/AndrewMcCabe.webp";
import BradyBurwell from "assets/BradyBurwell.webp";
import IanDrougal from "assets/IanDrougal.webp";
import MatthewSharpe from "assets/MatthewSharpe.webp";
import JeffMoore from "assets/JeffMoore.webp";
import JosephSpears from "assets/JosephSpears.webp";
import LyndsieNichol from "assets/LyndsieNichole.webp";
import DavidSlack from "assets/DavidSlack.webp";
import AaronBrunko from "assets/AaronBrunko.webp";
import ToddVanSant from "assets/ToddVanSant.webp";
import MikeFulton from "assets/MikeFulton.webp";
import JasonRiggs from "assets/JasonRiggs.webp";

const Testimonials = () => {
	return (
		<>
			<div className="Testimonials">
				<div className="container">
					<h2> Testimonial </h2>
          <div className="Slider-Testimonials">
            <Carousel controls={false} interval={5000} pause={false} fade={true}>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={AaronBrunko} alt="Aaron Brunko" loading="lazy" />
                    <h3> Aaron Brunko </h3>
                    <span> President, Property Estimating Solutions </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "I continue to be impressed with the great work from Seth Harrison and team. They do a good job as an industry advocate with interests in improving outcomes for all stakeholders in the industry. Keep up the impressive work!"
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={JeffMoore} alt="Jeff Moore" loading="lazy" />
                    <h3> Jeff Moore </h3>
                    <span> President & Chief Acquisition Officer at ATI Restoration </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "The Actionable Profile is literally the best invention for restorers in the last 20 years. Finally, a tool to make us better and capture more margin and revenue. It helps you estimate better, and it helps train people"
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={MikeFulton} alt="Mike Fulton" loading="lazy" />
                    <h3> Mike Fulton </h3>
                    <span> Independent Advocate for the Property Claims & Restoration Industry </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      ”There is no better partner for restorers - and frankly insurers and all other stakeholders - as industry education is the key to a greater outcome for all, than Actionable Insights!”
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={AndrewMcCabe} alt="Andrew McCabe" loading="lazy" />
                    <h3> Andrew McCabe </h3>
                    <span> Xactimate Team Leader </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "The Actionable Profile is a game-changing product for our industry. We almost immediately saw the immense value in training. Just the workflow of having that copilot on the side, it’s been amazing."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={ToddVanSant} alt="Todd Van Sant" loading="lazy" />
                    <h3> Todd Van Sant </h3>
                    <span> Director of Estimation at ATI Restoration </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "So proud of you guys - you've both put so much work into this! You are the tip of the game changing spear here. The amount of assistance this profile gives even the most experienced estimator is unmeasurable. I can personally attest to how this has upped my estimating game!"
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={JosephSpears} alt="Joseph Spears" loading="lazy" />
                    <h3> Joseph Spears </h3>
                    <span> Business Owner, Restoration Resolutions </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "<b>I just completed the Matterport Certification course</b>, and I want to say I highly recommend it for anyone looking to get into the new digital assets game. If you wanna learn about Matterport, how to maximize its usage, and thus, better defend billing for it, <b>TAKE THIS COURSE</b>."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={DavidSlack} alt="David Slac" loading="lazy" />
                    <h3> David Slack </h3>
                    <span> Project Manager at Paul David </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "<b>I wanted to take a minute and thank all of you Actionable Insights for the education that was provided to me through the Matterport Certification</b>. It really served me well in the last year. It was so much easier to have the education from you guys rather than to have just gone out into the field winging it! Much appreciated!"
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={BradyBurwell} alt="Brady Burwell" loading="lazy" />
                    <h3> Brady Burwell </h3>
                    <span> Project Director at BluSky Restoration Contractors </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "I absolutely love your software. I just got into the industry about 2 years ago and didn’t have any guidance on when to use certain line items. I had to learn on the go through trial and error on which line items were “allowed”. Your software has forced me to remember the fine print items that commonly get overlooked."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={LyndsieNichol} alt="Lyndsie Nichol" loading="lazy" />
                    <h3> Lyndsie Nichol </h3>
                    {/* <span> VP Operations at ATI </span> */}
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "I attended Actionable Insights' Xactimate class this week virtually. Seriously — the best class I’ve ever taken. Especially being virtual; sometimes things get boring or you can get distracted easily… not in this class. Seth and Cole did a great job of keeping the class entertaining while being super informative. We had people with all kinds of experience with Xactimate and I can assure you everyone walked away with new tips to be better. Cannot recommend this company or class enough!"
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={IanDrougal} alt="Ian Drougal" loading="lazy" />
                    <h3> Ian Drougal </h3>
                    <span> Superintendent with Kustom Disaster Restoration </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "<b>GREAT</b> course and a <b>GREAT</b> tool. Seriously, this is a game-changer. Thanks for doing the great work guys; I’d give the course a solid 8/10."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={MatthewSharpe} alt="Matthew Sharpe" loading="lazy" />
                    <h3> Matthew Sharpe </h3>
                    <span> General Contractor. Emergency services: Water, Fire, Smoke, Mold Damage Restoration </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "Finally earned my Actionable Insights nerd(ninja) socks. In Dry Kings we send all of our estimators to AI's classes. Because they have the easiest system to go from 0 to being badass in Xactimate and Matterport. Thanks, guys."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={user} alt="Todd D." loading="lazy" />
                    <h3> Todd D. </h3>
                    {/* <span> VP Operations at ATI </span> */}
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "I retire in one month using Actionable Xactimate Profile. This is retiring as an astronaut in 1968."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={JasonRiggs} alt="Jason Riggs" loading="lazy" />
                    <h3> Jason Riggs </h3>
                    <span> Operations Manager in Noble Industries LLC, Restoration & Remodeling </span>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      "My association with Actionable Insights has increased my understanding of the estimation process and has expanded my thinking on how to engage clients and adjusters. I am grateful for the tireless dedication of your team and specially for you getting me started on my Matterport journey. It all began when I won that Pro1 at a live training in your facility. Your enthusiasm for our industry is inspiring and your constant drive to improve the landscape for all who work in this vertical is commendable. I am ever grateful."
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
				</div>			
			</div>
		</>
	);
};

export default Testimonials;
import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const TermsAndConditions = () => {
  return (
    <>
			<SEO
        title="Terms and Conditions - Actionable Insights"
        description="Here are the Terms & Conditions that apply when you use the Actionable Insights Forum. We are strongly committed to respecting and protecting your privacy."
				link="terms-and-conditions"
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
					<div className="LIR">
						<div className="">
							<div className="holder">
								<h2> Terms and Conditions </h2>
							</div>
							<p className="word" style={{ marginTop: "0px" }}>
								<strong> Introduction </strong>
							</p>
							<p className="word">
								Actionable Insights Forum, 501(c)(6) foundation (collectively, “AIF", “we”, “us”, “the foundation", or “our”) is strongly committed to respecting and protecting your privacy. 
								Please carefully read the following Privacy Policy. 
								Any person accessing, browsing or otherwise using any AIF Website or online service (the “Site") either manually or via an automated device or program, shall be considered a “User". 
								This Privacy Policy (“Policy") explains the type of information that AIF collects from the Users of the Site, what AIF does with that information, and with whom AIF shares this information.
							</p>
							<p className="word">
								<strong> General Terms of Use </strong>
							</p>
							<p className="word">
								By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site. The Service is provided on an “as is” and “as available” basis. You agree and understand that you assume all risks when using the Site, including without limitation any and all of the risks associated with any online or offline interactions with other Users.
							</p>
							<p className="word">
								You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service/Curriculum, use of the Service/Curriculum, or access to the Service/Curriculum without the express written permission by AIF.
							</p>
							<p className="word">
								You must not upload, post, host, or transmit unsolicited “spam" messages.
							</p>
							<p className="word">
								If you do not comply with the Terms of Use at any time, we reserve the right to terminate, limit, or otherwise alter your access to the Site or the Service. We may discontinue or alter any aspect of the Site or the Service, including, but not limited to, (i) restricting the time the Site or the Service is available, (ii) restricting the amount of use permitted, and (iii) restricting or terminating your right to use the Site or the Service, at our sole discretion and without prior notice or liability.
							</p>
							<p className="word">
								<strong> User Consent to Privacy Policy </strong>
							</p>
							<p className="word">
								By accessing, browsing or using the Site, Users acknowledge that they have read, understand, agree and consent to the terms and conditions of the Policy. Users consent to the collection, use, and disclosure of User information, including information collected from or about you or the device you use to access the Site (together “Information”) pursuant to the terms of this Policy.
								<strong> If you do not consent to these terms and conditions, please do not access, browse, or use this Site or otherwise provide Information to AIF.</strong>
							</p>
							<p className="word">
								<strong> The Information AIF Collects </strong>
							</p>
							<p className="word">
								<strong> Information You Provide </strong>
							</p>
							<p className="word">
								AIF may collect Information when you use the Site or when you otherwise provide Information to AIF. AIF may collect the name, phone, and fax number, mailing address, email address, credit card number, and any other personal information provided by a User who contacts AIF or any of AIF’s representatives through the Site, via email or otherwise, such as when a User: (a) submits an application for membership; (b) submits Information to become a volunteer; (c) submits Information at a seminar or other event; (d) purchases a product through the Site; (e) submits Information through our forums; (f) provides Information to AIF outside of the Site; or (g) engages in any other activity through the Site in which Information is provided to AIF.
							</p>
							<p className="word">
								AIF may also collect demographic information related to your professional expertise and experience, including your title, company name, industry, technical specialty, trade and/or organization(s)/associations(s) to which you belong.
							</p>
							<p className="word">
								By submitting Information to AIF on or through the Site, Users acknowledge that they have read this Policy, understand it, agree to its terms, and authorize AIF to collect, use and disclose Information pursuant to the terms of this Policy.
							</p>
							<p className="word">
								Please be thoughtful and responsible whenever you are online. Should you choose to voluntarily disclose Information through the Site, such as on message boards or in advertising or notices you post, that Information may be publicly viewable and can be collected and used by third parties without AIF’s knowledge and may result in unsolicited messages from other individuals or third parties.
							</p>
							<p className="word">
								<strong> Automatically-Collected Information </strong>
							</p>
							<p className="word">
								AIF and certain third parties that advertise or provide other services on the Site may automatically collect certain information about the computer or devices (including mobile devices) you use to access the Site, such as when you use the Site or certain Site services or click on advertisements on the Site or within AIF Insight Sheets©. For example, AIF and its partners and service providers may collect and analyze information such as:
							</p>
							<p className="word">
								1. Your Internet Protocol address;
							</p>
							<p className="word">
								2. Your mobile device ID;
							</p>
							<p className="word">
								3. Your computer’s or mobile device’s operating system and version;
							</p>
							<p className="word">
								4. The name of the domain you used to access the Internet;
							</p>
							<p className="word">
								5. Information related to the ways in which you interact with the Site, such as: referring and exit pages and URLs, platform type, the number of clicks, domain names, landing pages and content viewed and the order of those pages, the amount of time spent on particular pages, the date and time you used the Site, the frequency of your use of the Site, error logs, and other similar information. This information is collected passively through the use of certain electronic technologies, such as cookies, web beacons, pixels, clear GIFs, and similar technologies, and is further explained below. As described further below, AIF may use third-party analytics providers and technologies, including cookies and similar tools, to assist in collecting this information. As we adopt additional technologies, we may also gather additional information through other methods.
							</p>
							<p className="word">
								<strong>Browser Cookies:</strong> We and certain third party advertising partners may use “cookies.” When you use the Site, the pages you see, along with something called a “cookie,” may be downloaded to your computer, mobile device, or tablet (collectively, “Equipment”). Cookies are small pieces of information that are stored by your browser on your Equipment. These cookies may be used:  (a) to improve or enhance your experience using the Site; (b) to deliver content, including advertising, specific to your interests; and (c) for other purposes, such as security and administrative functions. For example, cookies are used to store your preferences for certain types of information so that you do not have to input those preferences every time you use the Site. Most web browsers automatically accept cookies, though different browsers may address cookies differently. Your browser may enable you to set your Equipment to accept all cookies, to notify you when a cookie is issued, or to not receive cookies at any time. If you set your browser to not accept cookies, it may result in certain personalized services or other features not being provided to you when you use that Equipment.
							</p>
							<p className="word">
								<strong>Flash Cookies:</strong> We and certain AIF advertisers may choose to use Flash cookies in advertisements available on or through the Site or in AIF periodicals. Flash cookies, also called Flash Local Shared Objects, are used by the Adobe Flash Player to store user preferences. Flash cookies operate differently than browser cookies, and cookie management tools available in a web browser may not remove flash cookies. More information concerning flash cookies, including how to remove them from your computer or device is available at&nbsp; 
								<a
									href="https://www.adobe.com/products/flashplayer/end-of-life.html"
									target="_blank"
								>
									here
								</a>
								.
							</p>
							<p className="word">
								<strong>Web Beacons, Pixels and Clear GIFs:</strong>  We and our advertising partners may use web beacons, pixels and clear GIFs. These electronic technologies are transparent image files that, if used, allow us and our advertising partners to track Website usage information, such as the number of times a given web page has been viewed and whether and when you have opened an HTML email, how many times the email was forwarded and which links in the email were clicked. Unlike cookies, these technologies are not placed on your Equipment. We and our advertising partners use information collected through Web beacons, pixels, and clear GIFs to improve and enhance our Site and measure the effectiveness of these communications with you. These technologies may be used in association with cookies to understand how visitors interact with the Site or advertisements made by our advertising partners.
							</p>
							<p className="word">
								<strong>Information from Third Parties:</strong> AIF may obtain additional information about you from third parties such as marketers, partners, sponsors, researchers, and others. We may combine Information that we collect from you with Information that we obtain from such third parties and Information derived from any other product or service we provide.
							</p>
							<p className="word">
								<strong> Automated Voice and SMS Messaging </strong>
							</p>
							<p className="word">
								Actionable Insights Forum does not request or require your consent to receive automated voice messages or SMS text messages as a condition of participation in Actionable Insight Forum’s activities and/or access to the Site’s content. Consent to these terms is not a condition of purchase. As a natural outcome of signing up and/or participating in any of Actionable Insight Forum’s activities users voluntarily agree to provide their cell phone number for purposes of receiving automated calls/messages that deliver auto-dialed and/or pre-recorded telemarketing messages from Actionable Insights Forum and/or its designated vendors/sponsors/partners regarding upcoming events and/or products/services. You will not be billed by Actionable Insights Forum for this subscription service. Message and data rates may apply. You may stop receiving these messages at any time by texting “STOP” to opt out.
							</p>
							<p className="word">
								<strong> Aggregate or De-Identified Data </strong>
							</p>
							<p className="word">
								AIF may aggregate and/or de-identify information collected by the Site or via other means so that the data is not intended to identify you. Our use and disclosure of aggregated and/or de-identified data is not subject to any restrictions under this Policy, and we may disclose it to others without limitation for any purpose.
							</p>
							<p className="word">
								<strong> How AIF Uses the Information </strong>
							</p>
							<p className="word">
								AIF uses the Information collected from its Users for the following purposes:
							</p>
							<p className="word">
								For the purposes for which you provided it;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To respond to Users’ questions and/or comments;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>    
								To provide products, services or information to Users;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To process a User’s purchase;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To provide a User with details of his or her account status;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To notify a User about new features of the Site, or products, services, special offers, or other information that we believe will be of interest to a User;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To perform analytics and research used in marketing, promotion, or similar activities;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To monitor Site performance and perform analytics and research aimed at improving the accuracy, effectiveness, usability, or popularity of the Site;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To enforce the legal terms that govern a User’s use of the Site;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To prevent fraud and other prohibited or illegal activities;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								Inform the creation of industry reports;
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								To administer sweepstakes and contests;
							</p>    
							<p className="word" style={{ marginTop: "15px" }}>
								To ensure that AIF complies with applicable laws.
							</p>
							<p className="word">
								<strong> AIF Sharing of Your Information </strong>
							</p>
							<p className="word">
								AIF may, without limitation, share your Information with any agent or company that is part of AIF. AIF only will share Information that it collects or receives regarding its Users with non-affiliated third parties under the following circumstances.
							</p>
							<p className="word">
								<strong>Consent:</strong> If AIF has a User’s consent to share any Information, it may do so. For example, if a User agrees to have their Information posted in the Members Only area of the Site, that User consents to AIF sharing their Information with other AIF Members. We may also share a User’s Information to provide that User with services or products that the User has requested.
							</p>
							<p className="word">
								<strong>Agents:</strong> AIF may utilize other companies and individuals to perform functions on its behalf, such as marketing new or additional AIF products and services, sending postal and email to Users, transmitting text messages requested by Users, processing credit card payments, fulfilling orders, delivering products and services, and providing customer service. These third parties have access to Information needed to perform their functions but may not use it for other purposes.
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								<strong>Sweepstakes and Contests:</strong> When you sign up to participate in a contest or sweepstakes, your Information may also be provided to our sweepstakes or contest advertisers, operators, or sponsors and the use of that Information may also be governed by those advertisers’, operators’, or sponsors’ privacy policies or practices.
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								<strong>Aggregate Data:</strong> AIF may aggregate and/or de-identify information collected by the Site or via other means so that the data is not intended to identify you. Our use and disclosure of aggregated and/or de-identified data is not subject to any restrictions under this Policy, and we may disclose it to others without limitation for any purpose.
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								<strong>Advertising and Analytics:</strong> As described in the section on Online Analytics and Tailored Advertising, AIF also may provide automatically-collected information to third parties for purposes of delivering targeted advertisements and performing analytics.
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								<strong>Protection of AIF or Others:</strong> AIF may disclose your Information to others if we have a good faith belief that we are required or permitted to do so by law or legal process, to respond to claims, to protect the rights, property or safety of AIF or others, or take action regarding illegal activities or suspected fraud.
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								<strong>Business Transfers:</strong> We may share your Information in connection with any actual or proposed merger, reorganization, or sale of some or all AIF assets, or a financing or acquisition of all or a portion of our assets or business by another company.
							</p>
							<p className="word" style={{ marginTop: "15px" }}>
								<strong>Third Parties Providing Relevant and Valuable Products and Services:</strong> From time to time, AIF may share your Information with other organizations that provide products or services that we believe Users will find relevant, valuable and interesting.
							</p>
							<p className="word">
								<strong> Online Analytics and Tailored Advertising </strong>
							</p>
							<p className="word">
								<strong> Online Analytics </strong>
							</p>
							<p className="word">
								We may use third-party web analytics services on our Site, such as those of Google Analytics. These service providers use the sort of technology described in Section 1.2 to help us analyze how users use the Site, including by noting the third-party Website from which you arrive. The information (including your IP address) collected by the technology will be disclosed to or collected directly by these service providers, who use the information to evaluate your use of the Site. We also use Google Analytics for certain purposes related to advertising, as described in the following section. To prevent Google Analytics from using your information for analytics, you may install the Google Analytics Opt-out Browser Add-on by clicking&nbsp; 
								<a
									href="https://tools.google.com/dlpage/gaoptout"
									target="_blank"
								>
									here
								</a>
								.
							</p>
							<p className="word">
								<strong> Tailored Advertising </strong>
							</p>
							<p className="word">
								Also, third parties whose products or services are accessible or advertised via the Site may also place cookies or other tracking technologies on your computer, mobile phone, or other device to collect information about your use of the Site in order to (i) inform, optimize, and serve ads based on past visits to our Websites and other sites and (ii) report how our ad impressions, other uses of ad services, and interactions with these ad impressions and ad services are related to visits to our Websites and use of our Site. We also allow other third parties (e.g., ad networks and ad servers such as Google Analytics, DoubleClick, and others) to serve tailored ads to you on the Site, and to access their own cookies or other tracking technologies on your computer, mobile phone, or other devices you use to access the Site. [We also may share with third-party advertisers a hashed version of your email address, solely in non-human readable form and content that you share publicly when using the Site (e.g., user-generated content) for purposes of delivering tailored advertising.] We neither have access to, nor does this Policy govern, the use of cookies or other tracking technologies that may be placed on your computer, mobile phone, or other devices you use to access the Services by non-affiliated, third-party ad technology, ad servers, ad networks or any other non-affiliated third parties. Those parties that use these technologies may offer you a way to opt out of ad targeting as described below. You may receive tailored advertising on your computer through a web browser. If you are interested in more information about tailored browser advertising and how you can generally control cookies from being put on your computer to deliver tailored advertising, you may visit the&nbsp; 
								<a
									href="https://optout.networkadvertising.org/?c=1"
									target="_blank"
								>
									Network Advertising Initiative’s Consumer Opt-Out link
								</a>
								, the&nbsp; 
								<a
									href="https://optout.aboutads.info/?c=2&lang=EN"
									target="_blank"
								>
									Digital Advertising Alliance’s Consumer Opt-Out link&nbsp;
								</a> 
								or&nbsp; 
								<a
									href="http://preferences-mgr.truste.com/"
									target="_blank"
								>
									TRUSTe’s Advertising Choices Page&nbsp;
								</a> 
								to opt-out of receiving tailored advertising from companies that participate in those programs. You may also use the links available in advertisements that appear within the Site to learn more about advertising practices on our Site.
							</p>
							<p className="word">
								To opt out of Google Analytics for display advertising or customize Google display network ads, you can visit the Google&nbsp;
								<a
									href="https://adssettings.google.com/authenticated"
									target="_blank"
								>
									Ads Settings 
								</a>
								&nbsp;page. Please note that to the extent advertising technology is integrated into the Site, you may still receive advertisements even if you opt-out of tailored advertising. In that case, the ads will just not be tailored.  Also, we do not control any of the above opt-out links and are not responsible for any choices you make using these mechanisms or the continued availability or accuracy of these mechanisms.
							</p>
							<p className="word">
								When using a mobile application you may also receive tailored in-application advertisements. Each operating system, iOS for Apple phones, Android for Android devices and Windows for Microsoft devices provides its own instructions on how to prevent the delivery of tailored in-application advertisements. You may review the support materials and/or the privacy settings for the respective operating systems in order to opt-out of tailored in-application advertisements. For any other devices and/or operating systems, please visit the privacy settings for the applicable device or contact the applicable platform operator.
							</p>
							<p className="word">
								<strong> California Do-Not-Track Disclosure Requirements </strong>
							</p>
							<p className="word">
								AIF is committed to providing you with meaningful choices about the information collected on our Site for third-party purposes, and that is why we provide the Network Advertising Initiative’s “Consumer Opt-out” link, Digital Advertising Alliance’s Consumer Opt-Out Link, TRUSTe’s Advertising Choices page, and the Google opt-out link in this Policy. However, we do not recognize or respond to browser-initiated Do Not Track signals, as the Internet industry is currently still working on Do Not Track standards, implementations and solutions.
							</p>
							<p className="word">
								<strong> International Users </strong>
							</p>
							<p className="word">
								Information that is submitted to this Site will be collected, processed, stored, disclosed and disposed of in accordance with applicable U.S. law. If you are a non-U.S. User, you acknowledge and agree that we may collect and use your Information and disclose it to other entities outside your resident jurisdiction, as discussed in “Sharing of Your Information” above. In addition, such Information may be stored on servers located outside your resident jurisdiction. U.S. law may not provide the degree of protection for Information that is available in other countries. By providing us with your Information, you acknowledge that you have read this Policy, understand it, agree to its terms, and consent to the transfer of such Information outside your resident jurisdiction.
							</p>
							<p className="word">
								<strong> Choices for Use or Sharing of Certain Information </strong>
							</p>
							<p className="word">
								IF values your concerns about the privacy of your Information. Therefore, we offer you the opportunity to opt out of use or sharing of certain Information. For information that is shared with third parties, you should be able to opt-out of receiving further promotions from these third parties by unsubscribing to their email correspondence to you or contacting them directly. AIF is not responsible for the privacy practices of third parties who may send you correspondence.
							</p>
							<p className="word">
								Any emails sent by AIF subject to the CAN SPAM Act will include an option to unsubscribe from further correspondence. In addition, you can always opt-out of receiving commercial emails from AIF by contacting us via the&nbsp;
								<Link
									to="/contact-us"
									target="_blank"
								>
									Contact Us
								</Link> 
								&nbsp;page. Please note that even if you opt-out from receiving a certain email from AIF, you will continue to receive transactional messages, such as messages confirming a purchase, an event you registered for and certain essential AIF membership information.
							</p>
							<p className="word">
								You may also access your AIF profile information by updating the profile information via&nbsp;
								<a
									href="https://en.gravatar.com/"
									target="_blank"
								>
									Gravatar
								</a>
								. Please note, that some profile information, such as your profile image, name, and location, cannot be changed through the AIF website.
							</p>
							<p className="word">
								<strong> Right To Refuse Service </strong>
							</p>
							<p className="word">
								We may close, suspend or limit your access to your Account or features without reason.
							</p>
							<p className="word">
								If we close your Account due to your breach of this Terms of Service, you may also become liable for specific fees as described in this Terms of Service.
							</p>
							<p className="word">
								Without limiting our other remedies, to the extent you have breached this Terms of Service, you must pay us all fees owed to us and reimburse us for all losses and costs (including any and all of our employee time) and reasonable expenses (including legal fees) related to investigating such breach and collecting such fees.
							</p>
							<p className="word">
								In the event that we close your Account or limit your access to certain features, you will have no claim whatsoever against us in respect of any such suspension or termination of your Account or features.
							</p>
							<p className="word">
								<strong> Macro </strong>
							</p>
							<p className="word">
								Actionable Insights Xactimate Macros are to be used by the user or organization that purchased the Macros.
							</p>
							<p className="word">
								They are not to be mass distributed and doing so would be a violation of these Terms and Conditions.
							</p>
							<p className="word">
								Violating this policy could result in the termination of your account in accordance with our Right To Refuse Service.
							</p>
							<p className="word">
								<strong> Physical Items </strong>
							</p>
							<p className="word">
								Swag and other physical add-on items are only available for subscriptions that are purchased at full price. Discounted subscription plans do not qualify for swag or physical add-on items. Due to outsized demand, some swag and physical add-on items may require up to 6 weeks for delivery. Shipping is free and these physical items are only available within the continental United States.
							</p>
							<p className="word">
								<strong> Media Release Disclaimer </strong>
							</p>
							<p className="word">
								I grant permission to Actionable Insights to take, and make public, visual images and audio/video recordings of me for marketing purposes. I agree that Actionable Insights owns the images and all the rights to them. Without notifying me, the images may be used in any manner or media for marketing purposes including, but not limited to, Actionable Insights sponsored websites, Facebook groups and pages, publications, promotions, advertisements, and posters. I waive any right to inspect, approve, or be compensated for the use of such images.
							</p>
							<p className="word">
								<strong> Linked Internet Websites </strong>
							</p>
							<p className="word">
								The Site provides hyperlinks, which are highlighted words or pictures within a hypertext document, including advertisements that, when clicked, take you to another place within the document, to another document altogether, or to other Websites not controlled by AIF. These hyperlinked Websites may contain privacy provisions that are different from those provided herein. AIF is not responsible for the collection, use, or disclosure of information collected through these Websites, and AIF expressly disclaims any and all liabilities related to such collection, use, or disclosure.
							</p>
							<p className="word">
								<strong> Children’s Privacy Protection </strong>
							</p>
							<p className="word">
								The Site is not directed towards children under 13 years of age, and AIF does not knowingly collect any information from children under 13 years of age through the Site. If you are under 13 years of age, you are not permitted to submit information to AIF through the Site.
							</p>
							<p className="word">
								<strong> Disclaimer of Warranty </strong>
							</p>
							<p className="word">
								We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable
							</p>
							<p className="word">
								You agree that we may remove our content/curriculum for indefinite periods of time or cancel the service at any time, without notice to you.
							</p>
							<p className="word">
								You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided ‘as is’ and ‘as available’ for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
							</p>
							<p className="word">
								In no case shall AIF, our directors, officers, ambassadors, employees, affiliates, agents, contractors, interns, suppliers, sponsors, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility.
							</p>
							<p className="word">
								Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
							</p>
							<p className="word">
								<strong> Indemnification </strong>
							</p>
							<p className="word">
								You agree to indemnify, defend and hold harmless AIF and our affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms and Conditions or the documents they incorporate by reference or your violation of any law or the rights of a third-party.
							</p>
							<p className="word">
								<strong> Severability </strong>
							</p>
							<p className="word">
								In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
							</p>
							<p className="word">
								<strong> Cancellation and Termination </strong>
							</p>
							<p className="word">
								You are solely responsible for properly canceling your account. An email or phone request to cancel your account is not considered cancellation. To fully terminate your account, you can either click the “Cancel Subscription" option under “My Account" in the top right or submit a written request to:
							</p>
							<p className="word">
								<strong> Actionable Insights </strong>
							</p>
							<p className="word" style={{ marginTop: "0px" }}>
								5962 La Place Ct #130
								<br />
								Carlsbad, CA 92008
							</p>
							<p className="word">
								You may terminate this Agreement at any time by immediately discontinuing all access to the Site and by providing notice to AIF of such discontinuance. Termination or cancellation of this Agreement shall not affect any right or relief to which AIF may be entitled at law or in equity. Upon termination of this Agreement, you shall terminate all use of the Site and any Content provided thereby. In the event of termination, you will not be entitled to any refund of any fees or other charges, if any, paid in connection with this Agreement.
							</p>
							<p className="word">
								All of your Content will be immediately deleted from the Service upon termination, comments notwithstanding. This information cannot be recovered once your account is canceled.
							</p>
							<p className="word">
								We, at our sole discretion, have the right to suspend or terminate your account and refuse any and all current or future use of the Service, for any reason at any time. Such termination of the Service will result in the deactivation or deletion of your Account or your access to your Account, and the forfeiture and relinquishment of all Content in your Account. AIF reserves the right to refuse service to anyone for any reason at any time. Illegal and/or unauthorized uses of our Services may be referred for criminal prosecution.
							</p>
							<p className="word">
								Verbal, physical, written or other abuse (including threats of abuse or retribution) of any AIF customer, employee, member, ambassador or officer will result in immediate account termination.
							</p>
							<p className="word">
								<strong> Subscription renewal: </strong>
							</p>
							<p className="word">
								We process subscription renewals one day before the next billing period starts to ensure uninterrupted service. This approach ensures no gaps in your service.
							</p>
							<p className="word">
								<strong> Subscription Refunds </strong>
							</p>
							<p className="word">
								We do not offer refunds for subscriptions. To avoid future charges, you must cancel your subscription before the renewal date. The account owner is solely responsible for properly canceling the account. An email or phone request to cancel your account is not considered cancellation.
							</p>
							<p className="word">
								<strong> Arbitration </strong>
							</p>
							<p className="word">
								You agree that any dispute, claim or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation or validity thereof or the use of the Services (collectively, “Disputes") will be settled by binding arbitration between you and AIF, except that each party retains the right to bring an individual action in small claims court and the right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation or violation of a party’s copyrights, trademarks, trade secrets, patents or other intellectual property rights. You acknowledge and agree that you and AIF are each waiving the right to a trial by jury or to participate as a plaintiff or class in any purported class action or representative proceeding. Further, unless both you and AIF otherwise agree in writing, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of any class or representative proceeding. If this specific paragraph is held unenforceable, then the entirety of this “Arbitration" section will be deemed void. Except as provided in the preceding sentence, this “Arbitration" section will survive any termination of these Terms.
							</p>
							<p className="word">
								<strong> Dispute Resolution </strong>
							</p>
							<p className="word">
								You are solely responsible for your interactions with other Users/Members/Ambassadors. We reserve the right, but not the obligation, to monitor and otherwise resolve disputes between you and other Users/Members/Ambassadors.
							</p>
							<p className="word">
								<strong> Security </strong>
							</p>
							<p className="word">
								AIF implements measures to protect information that is submitted to AIF and is under its control. These measures vary in regard to the sensitivity of the information that AIF collects and stores. You should be aware, however, that AIF has no control over the security of other Websites that you might visit or use even when a link to those Websites is available on or through the Site. If you share your Equipment or use Equipment that is accessed by the general public, remember to sign off and close your browser when you finish using the Site.
							</p>
							<p className="word">
								No system can be completely secure. Therefore, AIF makes no representations or warranties with regard to the sufficiency of its security measures. AIF shall not be responsible for any actual or consequential damages that result from a lapse in compliance with this Policy as a result of a security breach or technical malfunction. Certain information may be transmitted to you by email. Although it may be illegal to intercept or disclose these messages under U.S. Federal law, these transmissions are not secure. In addition, Users’ communications through the Site are, in most cases, viewed only by you and anyone to whom you address your message. As the operator of the Site, AIF may need to review or monitor your electronic mail and other communications from time to time as may be required by law, but it has no obligation to do so. Therefore, you should not expect to have a right to privacy in any of your electronic communications
							</p>
							<p className="word">
								In accordance with applicable law, AIF will notify you if reasonably possible and as reasonably necessary so that you can take appropriate protective steps in the event of a breach of confidentiality or security of your personal information. We may notify you under such circumstances using the e-mail address(es) we have on record for you. You should also take care with how you handle and disclose your personal information. Please refer to the&nbsp;
								<a
									href="https://www.consumer.ftc.gov/"
									target="_blank"
								>
									Federal Trade Commission’s Website  
								</a>
								&nbsp;for information about how to protect yourself against identity theft.
							</p>
							<p className="word">
								<strong> Amendments to Privacy Policy </strong>
							</p>
							<p className="word">
								We may occasionally update this Policy, as noted by the “effective date” at the end of the Policy. We encourage you to periodically review this Policy to stay informed about our collection, use, and disclosure of Information. Your continued use of the Site constitutes your agreement to this Policy and any updates.
							</p>
							<p className="word">
								<strong> Your California Privacy Rights </strong>
							</p>
							<p className="word">
								California law permits customers of AIF who are California residents to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make such a request, please write us:
							</p>
							<p className="word">
								<strong> Actionable Insights Headquarters </strong>
							</p>
							<p className="word" style={{ marginTop: "0px" }}>
								5962 La Place Ct #130
								<br />
								Carlsbad, CA 92008
							</p>
							<p className="word">
								We will provide a list of the categories of personal information disclosed to third parties for third-party direct marketing purposes, along with the names and addresses of these third parties. This request may be made no more than once per calendar year. We reserve our right not to respond to requests submitted other than to the postal address specified above. You should put “California Privacy Rights” in the subject line and in your request. You must provide AIF with specific information regarding yourself so that AIF can accurately respond to the request.
							</p>
							<p className="word">
								<strong> Governing Law </strong>
							</p>
							<p className="word">
								These Terms are governed by and construed in accordance with the laws of the State of California, U.S.A., without giving effect to any conflict of law principles, except as may be otherwise provided in supplemental terms applicable to your region.
							</p>
							<p className="word">
								<strong> Copyright and Content Ownership </strong>
							</p>
							<p className="word">
								You may not post, modify, distribute, or reproduce in any way any Content that is copyrighted material belonging to others, without obtaining their prior written consent. AIF reserves the right, in its discretion, to remove any Content if we believe it may infringe the copyright rights of others, and/or to terminate the accounts of Users who we believe to be infringers. We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libellous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or the Terms And Conditions outlined herein.
							</p>
							<p className="word">
								You agree that your comments will not violate our Code-of-Ethics and any right(s) of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right(s). You further agree that your comments will not contain libellous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
							</p>
							<p className="word">
								To the extent that your actions result in a claim, you agree to defend AIF against any claim, demand, suit or proceeding made or brought against AIF by a third-party alleging that Your Content, or Your use of the Service in violation of this Agreement, infringes or misappropriates the intellectual property rights of a third-party or violates applicable law, and shall indemnify AIF for any damages finally awarded against, and for reasonable attorney’s fees incurred by, AIF in connection with any such claim, demand, suit or proceeding; provided, that AIF (a) promptly gives You written notice of the claim, demand, suit or proceeding; (b) gives You sole control of the defense and settlement of the claim, demand, suit or proceeding (provided that You may not settle any claim, demand, suit or proceeding unless the settlement unconditionally releases AIF of all liability); and (c) provides to You all reasonable assistance, at Your expense.
							</p>
							<p className="word">
								The look and feel of the Website and Insight Sheet Database, and Curriculum are copyrights© of AIF 2020, all rights reserved. You may not duplicate, copy, or reuse any portion of the HTML/CSS, Javascript, screenshots or visual design elements or concepts without express written permission from AIF. AIF shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
							</p>
							<p className="word">
								<strong> Accuracy and Completeness </strong>
							</p>
							<p className="word">
								We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
							</p>
							<p className="word">
								This site may contain antiquated information. This antiquated information is often incorporated to provide perspective as it relates to current realities. The antiquated insights are not intended to be current actionable information and are provided for your reference only. We reserve the right to modify the content of this site and Insight Sheet© Database at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site
							</p>
							<p className="word">
								<strong> Third Party Links </strong>
							</p>
							<p className="word">
								Certain content, products, and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.
							</p>
							<p className="word">
								We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party’s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
							</p>
							<p className="word">
								<strong> Third Party Reports </strong>
							</p>
							<p className="word">
								Membership/Sponsorship/Ambassadorship applications may utilize third-party consumer reporting agencies that perform, among other things, criminal background checks, sex offender registry checks, motor vehicle records checks, credit checks, and identification verifications (“consumer reports”). AIF does not endorse or make any representations or warranties regarding the reliability of such consumer reports or the accuracy, timeliness or completeness of any information in the consumer reports. AIF does not independently verify information in the consumer reports.
							</p>
							<p className="word">
								You hereby consent to AIF collecting, using and disclosing the information in the consumer reports. You understand and agree that AIF may, in its sole discretion, review and rely on the information in the consumer reports in deciding whether to suspend or terminate a Membership/Sponsorship/Ambassadorship who are the subject of consumer reports may contact the service provider to dispute the accuracy, timeliness or completeness of such information. AIF reserves the right to suspend and/or terminate status based on information in the consumer reports or for any other reason in AIF’s sole discretion.
							</p>
							<p className="word">
								You agree that AIF shall not be held responsible or liable in any way if any information provided by a third party verification service is inaccurate. When a third party verification service is used, you warrant that you will comply with the Fair Credit Reporting Act, 15 USC 1681.
							</p>
							<p className="word">
								<strong> Anti-Trust Statement </strong>
							</p>
							<p className="word">
								As participants in this organization, we need to be mindful of the overarching constraints of the antitrust regulations. The foundation does not condone facilitating any discussions, agreements or concerted actions that may restrain competition. Each participant is obligated to speak up immediately for the purpose of preventing any discussions that reside outside the confines of this outlined herein.
							</p>
							<p className="word">
								<strong> Anti-Trust Statement </strong>
							</p>
							<p className="word">
								If you have any questions about this Policy, please contact us via the "
								<Link
									to="/contact-us"
									target="_blank"
								>
									Contact Us
								</Link> 
								" page or email us at support@getinsights.org.
							</p>
							<p className="word">
								<strong> Anti-Trust Statement </strong>
							</p>
							<p className="word">
								This Policy took effect on August 04, 2017 and was last updated on December 31, 2019.
							</p>
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

export default withRouter(TermsAndConditions);
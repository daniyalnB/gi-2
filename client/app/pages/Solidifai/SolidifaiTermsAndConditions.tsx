import React, { Suspense } from "react";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));

const SolidifaiTermsAndConditions = () => {
  return (
    <>
			<SEO
        title="Solidifai - Terms and Conditions - Actionable Insights"
        description={`As Actionable Insights estimate edit engine Solidifai® is trademarked by us and terms and conditions apply for the utility of this service. - (DEFINITIONS As used in this Agreement, the terms below shall have the following meanings: "Licensed Product" shall mean access to Solidifai. “Solidifai” sha)`}
        link="terms-and-conditions-solidifai"
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
								<strong> DEFINITIONS </strong>
							</p>
							<p className="word">
                As used in this Agreement, the terms below shall have the following meanings: “Licensed Product” shall mean access to Solidifai.
                “Solidifai” shall mean Actionable Insights estimate edit engine.
                “Solidifai Marks” shall mean the trademark Solidifai® and any marks owned and used by Actionable Insights in connection with any other products or services offered by Actionable Insights.
                “Actionable Insights Materials” shall mean all Actionable Insights training materials (e.g., manuals, tutorials, etc.) and/or promotional materials (e.g., advertising, catalogues, web site content and design, etc.), fixed in any tangible means of expression, that have been used, created, or obtained to date anywhere in the world by or on behalf of Actionable Insights.
							</p>
							<p className="word">
								<strong> INTENDED USES </strong>
							</p>
							<p className="word">
							  Solidifai is designed to be a training tool. You agree to submit data for claims that have already been settled, and/or work has been completed.
                <br />
                Failure to comply may result in Access to Licensed Product being revoked.
                <br />
                You agree to review and refine any returned products from Solidifai to ensure accuracy prior to internal use.
							</p>
							<p className="word">
								<strong> PROHIBITED USES </strong>
							</p>
							<p className="word">
                You hereby warrant that you will never, directly or indirectly:
                <br />
                make any attempt to reverse engineer, disassemble or create derivative works from Solidifai, any other Actionable Insights product, and/or any other data or information owned by Actionable Insights;
                <br />
                commercially market all or part of Actionable Insights products (including but not limited to the Licensed Product) or any product similar to Actionable Insights products, and/or compete with Actionable Insights in any way;
                <br />
                sell, loan, rent, lease, or transfer the Licensed Product to another user or third party;
                <br />
                use and/or register the Solidifai Marks, any designation, trademark or trade name that incorporates the term SOLID, or any designation, trademark or trade name that is confusingly similar to the Solidifai Marks; or
                <br />
                use and/or register the Actionable Insights Materials, or any materials that are substantially similar to the Actionable Insights Materials.
                Portions of the Licensed Product constitute a passive service of allowing the posting of information.
                Actionable Insights assumes and undertakes no responsibility to police or review the accuracy of the information posted, or the right of the individual posting the information to do so.
                Nevertheless, postings which come to the attention of Actionable Insights and which are deemed by it to violate the terms of this Agreement may be removed without notice and/or may result in revocation of this License.
                The following are strictly prohibited:
                <br />
                matter that is libelous, invasive of privacy rights, inflammatory, hateful, pornographic, indecent, illegal, or misleading;
                <b />
                any materials that violate or infringe upon the trademark, copyright, or proprietary rights of others.
                This includes illegally distributed/hijacked software, copyrighted photographs, text, video, artwork, and music; and
                <br />
                any electronic component designed to interfere with the function of hardware, software, or data, e.g., virus worm, Trojan Horse, or intentionally corrupted data.
							</p>
							<p className="word">
								<strong> DATA USE AND OWNERSHIP </strong>
							</p>
							<p className="word">
                Data Provided by Actionable Insights for Use with the Licensed Product.
                <br />
                All data provided by Actionable Insights (including but not limited to the returned submissions of Solidifai) to you for use are owned by Actionable Insights and shall not be transferred, copied, or published (other than as part of the Work Product as defined below) by you or any of your employees, representatives, or agents in any form or format without Actionable Insights’ express prior written permission.
                <br />
                All data provided by Actionable Insights is provided ‘as is’ and is subject to change or removal at any time.
                <br />
                Anonymous Data
                <br />
                Actionable Insights shall own all assignment and estimate data from which assignee, assignor, and non-public client-specific information has been removed, which were created and/or extracted using the Licensed Product.
                Such data shall be referred to as “Anonymous Data”.
                <br />
                Work Product
                <br />
                Ownership of estimate data generated using one or more Actionable Insights Product (“Work Product”) is shared between the owner of the object of an Assignment (e.g., potential insured), the company with potential financial obligation related to the object of an Assignment (e.g., carrier), the entity which produced the Work Product relating to the object (e.g., contractor), the management or marketing entity responsible for managing the Assignment, if any (e.g., independent adjuster firm), and you.
                You agree to grant to Actionable Insights a perpetual unlimited license to use and have access to the Work Product.
							</p>
							<p className="word">
								<strong> TERM </strong>
							</p>
							<p className="word">
							  The term of this Agreement shall be for twelve (12) months.
                This term will automatically renew at each anniversary date unless you provide written verified notification of intent to terminate this Agreement at least ninety (90) days prior to the anniversary date, or upon execution of a replacement Licensed Product License Agreement.
                This Agreement may be terminated by Actionable Insights without cause by giving you at least thirty (30) days written notice of its intent to terminate, except in the event of a breach by you of this Agreement, in which case this Agreement may be terminated by Actionable Insights immediately upon written notice, with no rights of cure. In the event of termination, you shall promptly, but in no event more than ten (10) days following such written request, deliver, return or destroy all or any portion of the Licensed Product or any other procedures, proprietary information, documentation, files, and or any other property or data provided by Actionable Insights under this Agreement.
							</p>
							<p className="word">
								<strong> PAYMENT SCHEDULE </strong>
							</p>
							<p className="word">
                Licensed Product license fees are due at the beginning of each twelve (12) month term.
                <br />
                Unless otherwise specified on the invoice, you shall pay all billed charges by the fifteenth day of the month in which they are invoiced.
                All billings shall be payable in U.S. dollars only.
                <br />
                You agree to cooperate with Actionable Insights in the establishment of a program that shall allow you to utilize a method of electronic funds transfer as the means for payment to Actionable Insights of the charges you have incurred.
                <br />
                The twelve (12) month license period commences when the Licensed Product is ordered.
							</p>
							<p className="word">
								<strong> INDEMNIFICATION </strong>
							</p>
							<p className="word">
                You shall defend, indemnify, and hold harmless Actionable Insights and their directors, officers and employees from and against any and all claims (including claims for bodily injury (including death) and property damage), loss, liability, judgments, awards, and costs, including legal fees and court costs, incurred by Actionable Insights, that arise out of, are caused by or result from (i) your tortious conduct (including negligence), (ii) any violation by you of any applicable statute, ordinance, code or regulation, (iii) your willful misconduct or illegal act or omission, (iv) your breach of any material obligation of this Agreement, or (v) any actual or threatened claim by a third party in any way relating to the output of any Licensed Product that you provide to such third party.
							</p>
							<p className="word">
								<strong> YOUR REPRESENTATIONS AND WARRANTIES </strong>
							</p>
							<p className="word">
							  You represent that you either own or have legal authority to control the property that is the subject of the information posted on the Licensed Product.
                You acknowledge that those parties to whom you grant access may rely upon the information posted by you.
                You represent and warrant that to the best of your information and belief, the information posted by you is accurate.
                Unsupported opinions and estimates should be so identified.
                You further represent and warrant that the information obtained by you through your use of the Licensed Product will be treated as opinion and shall not be relied upon by you without independent verification, except at your own risk.
                Actionable Insights cannot and does not represent or assume the accuracy of, or in any way endorse the content provided by its members or any other entity.
                You warrant and represent, therefore, that your use of Licensed Product information is only as a source of opinion.
                You agree not to rely thereon without independent verification, except at your own risk. You agree that as between you and Actionable Insights, you are in the best position to assess your loss potential for any damage or injury incurred by you which arises out of your use of the Licensed Product, and you therefore contract and agree to accept the burden of insuring against such loss, including, but not limited to, losses caused by breach of express or implied warranty, product or service defect, negligence, and the acts or omissions of Actionable Insights.
                You waive any right of subrogation as to Actionable Insights against any such insurable loss.
                You agree to indemnify and hold Actionable Insights harmless from liability arising out of your use of the Licensed Product website, www.getinsights.org, or data obtained therefrom which arise out of any such insurable loss.
                You accept responsibility for all statements made, acts, or omissions that occur as part of the use of this website when such use is made possible through the use of your ID and password.
                You agree to indemnify Actionable Insights from claims arising out of your use or from disclosure of your ID or password.
							</p>
							<p className="word">
								<strong> ACTIONABLE INSIGHTS’ LIMITED WARRANTIES </strong>
							</p>
							<p className="word">
                The Licensed Product represents an integration point for content obtained from a vast array of sources.
                You assume the risk of human, mechanical or other error by Actionable Insights, its members, licensees or other contributors that may cause delays, errors, or omissions.
                Actionable Insights does not warrant that the operation of the Licensed Product or any of its parts will meet your particular application requirements, or that operation of the Licensed Product or any of its parts will be uninterrupted or error free.
                You assume full responsibility for determining suitability of the Licensed Product and its parts for your use.
                Additional statements, such as those made in advertising or presentations, whether oral or written, do not constitute warranties by Actionable Insights and should not be relied upon as such. In the event any product licensed hereunder fails to comply with the warranty as described herein, Actionable Insights shall exert commercially reasonable efforts to correct such product so that the product licensed hereunder performs as warranted.
                In no event shall Actionable Insights’ liability exceed the fees paid for use of the Licensed Product.
							</p>
							<p className="word">
								<strong> GENERAL </strong>
							</p>
							<p className="word">
								Access to Solidifai will only be granted upon completion of a private training engagement.
                <br />
                If any provision of this Agreement is held invalid or otherwise unenforceable, the enforceability of the remaining provisions shall not be impaired thereby.
                <br />
                The failure or delay of Actionable Insights to exercise any right under this Agreement shall not be deemed a waiver of that or any other right.
                A waiver or consent given by Actionable Insights on any one occasion is effective only in that instance and will not be construed as a waiver of any right on any other occasion.
                <br />
                Any other provisions contained herein to the contrary notwithstanding, neither party hereto shall be liable to the other party for loss, injury, delay, or damages, or other casualty suffered or incurred by such other party due to governmental regulations or directions, outbreak of a state emergency, Act of God, war, warlike hostilities, civil commotion, riots, epidemics, storms, fires, strikes, lockouts, and any other similar cause or causes beyond the reasonable control of the party whose performance is affected by such cause or causes.
                <br />
                You shall not assign, rent, sell, sub-license, sub-contract or otherwise transfer this Agreement or any portion thereof to any other person, firm, or entity without the express prior written consent from Actionable Insights.
                <br />
                In the event of a breach of this Agreement by you, you shall be liable to Actionable Insights for any and all attorneys’ fees and costs incurred by Actionable Insights in connection with its efforts to enforce this Agreement, whether such attorney’s fees and costs are incurred in connection with a court proceeding or any other action taken by Actionable Insights to enforce the terms of this Agreement.
                <br />
                This Agreement will be binding upon and inure to the benefit of the parties hereto, and their respective successors and assigns.
                <br />
                YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS, AND FURTHER AGREE THAT THIS IS THE COMPLETE AND EXCLUSIVE STATEMENT BETWEEN ACTIONABLE INSIGHTS AND YOU RELATING TO THIS AGREEMENT.
                Furthermore, you represent that you are 18 years of age or older and you accept responsibility for all statements made, acts or omissions that occur as part of the use of this website when such use is made possible through the use of your ID and password.
                You agree to indemnify Actionable Insights from claims arising out of your use or from disclosure of your ID or password.
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

export default SolidifaiTermsAndConditions;
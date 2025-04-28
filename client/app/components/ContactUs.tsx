import React, { Suspense, useState } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { ContactUsForm } from "../../utils/api-routes/api-routes.util";
import queryString from "query-string";
import InputMask from "react-input-mask";
import ReCAPTCHA from "react-google-recaptcha";
import bbe from "assets/bbe.svg";
import search2 from "assets/search2.png";
import down from "assets/add.svg";
import up from "assets/minus.svg";
import download from "assets/Download.svg";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const [Msg, setMsg] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    youremail: "",
    yourphone: "",
    subject: "",
    message: "",
  });

  const [file, setFile] = useState("");

  const [isError, setIsError] = useState(false);

  const fileChange = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0]);

    if (file === undefined) {
      console.log("undefined");
    } else if (file.type === "image/png" || file.type === "image/jpeg") {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const [verified, setVerified] = useState(false);

  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerified(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("youremail", userData.youremail);
    formData.append("yourphone", userData.yourphone);
    formData.append("subject", userData.subject);
    formData.append("message", userData.message);
    formData.append("fileToUpload", file);

    ContactUsForm(formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setUserData({
          firstName: "",
          lastName: "",
          youremail: "",
          yourphone: "",
          subject: "",
          message: "",
        });
        setFile("");
        setMsg(response.response.Message);
        setLoading(false);
      } else {
        setMsg(false);
        setLoading(false);
      }
    });
  };

  const questions = [
    {
      id: 1,
      question:
        "How can I make changes to my Xact ID after signing up for the Pro Plan?",
    },
    {
      id: 2,
      question: "How do I see the status of my current subscription?",
    },
    {
      id: 3,
      question:
        "My Actionable Profile has been enabled/activated, but I don’t have the option to start a new estimate in the Actionable Profile. What do I do?",
    },
    {
      id: 4,
      question: "What is the pricing structure of the Actionable Profile?",
    },
    {
      id: 5,
      question:
        "I enrolled in an upcoming Xact Class, but haven’t received any course materials yet. When will those be provided?",
    },
    {
      id: 6,
      question: "How can I cancel my subscription?",
    },
    {
      id: 7,
      question:
        "How can I get a copy of my Actionable Insights Matterport Certified designation or diploma?",
    },
    {
      id: 8,
      question:
        "Is the Actionable Insights Matterport Certified Continuing Education course still available?",
    },
    {
      id: 9,
      question:
        "I want to talk to someone about my situation. Who can I talk to?",
    },
    {
      id: 10,
      question: "How can I update our email on our company account?",
    },
    {
      id: 11,
      question:
        "Another team member started the Actionable Insights Matterport Certified course, can I finish it for them?",
    },
    {
      id: 12,
      question:
        "What are the system requirements for participating in the Xact Classes?",
    },
    {
      id: 13,
      question:
        "How can I add more seats to my Actionable Profile subscription?",
    },
    {
      id: 14,
      question: "Is there a trial version of the Actionable Profile?",
    },
    {
      id: 15,
      question:
        "What support resources are available if I encounter technical issues with my account?",
    },
    {
      id: 16,
      question:
        "How does the billing cycle work for the Actionable Profile subscription?",
    },
    {
      id: 17,
      question: "Are there any discounts available for bulk course purchases?",
    },
    {
      id: 18,
      question:
        "Can I transfer my AIMC designation to another person within my company?",
    },
    {
      id: 19,
      question: "How do I retrieve my login information if I forget it?",
    },
  ];

  const questionsLess = [
    {
      id: 1,
      question:
        "How can I make changes to my Xact ID after signing up for the Pro Plan?",
    },
    {
      id: 2,
      question: "How do I see the status of my current subscription?",
    },
    {
      id: 3,
      question:
        "My Actionable Profile has been enabled/activated, but I don’t have the option to start a new estimate in the Actionable Profile. What do I do?",
    },
    {
      id: 4,
      question: "What is the pricing structure of the Actionable Profile?",
    },
    {
      id: 5,
      question:
        "I enrolled in an upcoming Xact Class, but haven’t received any course materials yet. When will those be provided?",
    },
    // {
    //   id: 6,
    //   question: "How can I cancel my subscription?",
    // },
    // {
    //   id: 7,
    //   question: "How can I get a copy of my Actionable Insights Matterport Certified designation or diploma?",
    // },
    // {
    //   id: 8,
    //   question: "Is the Actionable Insights Matterport Certified Continuing Education course still available?",
    // },
    // {
    //   id: 9,
    //   question: "I want to talk to someone about my situation. Who can I talk to?",
    // },
  ];

  const [showQuestions, setShowQuestions] = useState({});

  const toggleQuestions = (id) => {
    setShowQuestions((prev) =>
      Boolean(!prev[id]) ? { [id]: true } : { [id]: false }
    );
  };

  const [searchQuestion, setSearchQuestion] = useState("");

  const filterQuestions = questions.filter((val) =>
    val.question.toLowerCase().includes(searchQuestion.toLowerCase())
  );

  const filterQuestionsLess = questionsLess.filter((val) =>
    val.question.toLowerCase().includes(searchQuestion.toLowerCase())
  );

  const [checkButtonText, setCheckButtonText] = useState(true);

  const scroll = () => {
    const section = document.querySelector("#search");
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <SEO
        title="Contact Us - Actionable Insights"
        description="Due to an influx of messages accusing us of being Jason Wood's company, we have disabled the Contact Us form. Please read this article to learn how to reach out to us - (Corporate Headquarters. Your Name (required) Your Email (required) Your Phone (required) Subject. Your Message. Corporate Headquarters. 1825 Aston Ave. Suite B.)"
        link="contact-us"
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
          <div className="contact-us">
            <div className="">
              <div className="sub-holder">
                <h1> Our team is here to help </h1>
                <p> Frequently asked questions or contact us </p>
                <div className="bg-image">
                  <img src={bbe} alt="bbe" loading="lazy" />
                </div>
              </div>
              <div className="questions_search" id="search">
                <div className="form-group nogroup">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Questions"
                      required
                      onChange={(e) => setSearchQuestion(e.target.value)}
                    />
                    <img
                      className="input_icon"
                      src={search2}
                      alt="search2"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              {checkButtonText ? (
                <div className="Questions">
                  {searchQuestion === "" ? (
                    <>
                      {questionsLess.map((val) => {
                        return (
                          <div className="Tabs">
                            <div
                              className="row"
                              onClick={() => toggleQuestions(val.id)}
                            >
                              <div className="col-9">
                                <h1> {val.question} </h1>
                              </div>
                              <div className="col-3 text-right">
                                <img src={showQuestions[val.id] ? up : down} />
                              </div>
                            </div>
                            {showQuestions[val.id] && (
                              <div className="Dropdown">
                                <hr />
                                {val.question ===
                                "How can I make changes to my Xact ID after signing up for the Pro Plan?" ? (
                                  <p>
                                    You can request changes to your Xact ID by
                                    emailing our staff at{" "}
                                    <a href="mailto:support@getinsights.org">
                                      support@getinsights.org
                                    </a>
                                    .
                                  </p>
                                ) : val.question ===
                                  "How do I see the status of my current subscription?" ? (
                                  <p>
                                    You can view your current subscription
                                    anytime by visiting
                                    https://getinsights.org/my-account and
                                    clicking the ‘Subscription & Billing’ tab.
                                  </p>
                                ) : val.question ===
                                  "My Actionable Profile has been enabled/activated, but I don’t have the option to start a new estimate in the Actionable Profile. What do I do?" ? (
                                  <p>
                                    “You may need to sync your new profile. Here
                                    is a video explaining the process
                                    (https://youtu.be/UsO8HS6_DLU). If you have
                                    already completed that step, try:
                                    <br />
                                    <br />
                                    Log out of X1 and log back in. Then check if
                                    you have access to the Profile again.
                                    <br />
                                    Prompt a Xactimate update by visiting the
                                    main X1 screen and clicking sync in the top
                                    right corner.
                                    <br />
                                    Elevate this issue to the Verisk eService
                                    Center by visiting
                                    https://xactware.custhelp.com/app/chat/chat_launch
                                    and selecting Xactware ID and License
                                    Management from the two drop-down boxes.”
                                  </p>
                                ) : val.question ===
                                  "What is the pricing structure of the Actionable Profile?" ? (
                                  <p>
                                    The pricing structure for the Actionable
                                    Profile is $162 per month per seat. Since
                                    the Actionable Profile is enabled at a
                                    company level, your company will require a
                                    seat for every license it has.
                                  </p>
                                ) : val.question ===
                                  "I enrolled in an upcoming Xact Class, but haven’t received any course materials yet. When will those be provided?" ? (
                                  <p>
                                    Course material and virtual classroom links
                                    are typically sent via email approximately
                                    one week prior to the beginning of class.
                                  </p>
                                ) : val.question ===
                                  "How can I cancel my subscription?" ? (
                                  <p>
                                    You can manage your subscription, including
                                    cancelations, anytime by visiting
                                    https://getinsights.org/my-account and
                                    clicking the ‘Subscription & Billing’ tab.
                                  </p>
                                ) : val.question ===
                                  "How can I get a copy of my Actionable Insights Matterport Certified designation or diploma?" ? (
                                  <p>
                                    Diplomas are typically emailed to you 1 to 2
                                    weeks after completing the course.
                                    Designation cards are sent to your billing
                                    address via USPS approximately 8 weeks after
                                    you’ve completed the course.
                                  </p>
                                ) : val.question ===
                                  "Is the Actionable Insights Matterport Certified Continuing Education course still available?" ? (
                                  <p>
                                    The Actionable Insights Matterport Certified
                                    Continuing Education course has been
                                    sunsetted, and your AIMC designation is now
                                    indefinite. If you want an updated copy of
                                    your diploma, please submit a request by
                                    email to{" "}
                                    <a href="mailto:support@getinsights.org">
                                      support@getinsights.org
                                    </a>
                                    .
                                  </p>
                                ) : val.question ===
                                  "I want to talk to someone about my situation. Who can I talk to?" ? (
                                  <p>
                                    Our team is ready to assist you. You can
                                    book a time to chat with us by visiting
                                    https://getinsights.org/demo. Our team is
                                    ready to assist you. You can book a time to
                                    chat with us by visiting{" "}
                                    <a
                                      href="https://getinsights.org/demo"
                                      target="_blank"
                                    >
                                      https://getinsights.org/demo
                                    </a>
                                    .
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {filterQuestionsLess.length <= 0 ? (
                        <div className="no-result">
                          <h3>No results!</h3>
                        </div>
                      ) : (
                        <>
                          {filterQuestionsLess.map((val) => {
                            return (
                              <div className="Tabs">
                                <div
                                  className="row"
                                  onClick={() => toggleQuestions(val.id)}
                                >
                                  <div className="col-9">
                                    <h1> {val.question} </h1>
                                  </div>
                                  <div className="col-3 text-right">
                                    <img
                                      src={showQuestions[val.id] ? up : down}
                                    />
                                  </div>
                                </div>
                                {showQuestions[val.id] && (
                                  <div className="Dropdown">
                                    <hr />
                                    {val.question ===
                                    "How can I make changes to my Xact ID after signing up for the Pro Plan?" ? (
                                      <p>
                                        You can request changes to your Xact ID
                                        by emailing our staff at{" "}
                                        <a href="mailto:support@getinsights.org">
                                          support@getinsights.org
                                        </a>
                                        .
                                      </p>
                                    ) : val.question ===
                                      "How do I see the status of my current subscription?" ? (
                                      <p>
                                        You can view your current subscription
                                        anytime by visiting
                                        https://getinsights.org/my-account and
                                        clicking the ‘Subscription & Billing’
                                        tab.
                                      </p>
                                    ) : val.question ===
                                      "My Actionable Profile has been enabled/activated, but I don’t have the option to start a new estimate in the Actionable Profile. What do I do?" ? (
                                      <p>
                                        “You may need to sync your new profile.
                                        Here is a video explaining the process
                                        (https://youtu.be/UsO8HS6_DLU). If you
                                        have already completed that step, try:
                                        <br />
                                        <br />
                                        Log out of X1 and log back in. Then
                                        check if you have access to the Profile
                                        again.
                                        <br />
                                        Prompt a Xactimate update by visiting
                                        the main X1 screen and clicking sync in
                                        the top right corner.
                                        <br />
                                        Elevate this issue to the Verisk
                                        eService Center by visiting
                                        https://xactware.custhelp.com/app/chat/chat_launch
                                        and selecting Xactware ID and License
                                        Management from the two drop-down
                                        boxes.”
                                      </p>
                                    ) : val.question ===
                                      "What is the pricing structure of the Actionable Profile?" ? (
                                      <p>
                                        The pricing structure for the Actionable
                                        Profile is $162 per month per seat.
                                        Since the Actionable Profile is enabled
                                        at a company level, your company will
                                        require a seat for every license it has.
                                      </p>
                                    ) : val.question ===
                                      "I enrolled in an upcoming Xact Class, but haven’t received any course materials yet. When will those be provided?" ? (
                                      <p>
                                        Course material and virtual classroom
                                        links are typically sent via email
                                        approximately one week prior to the
                                        beginning of class.
                                      </p>
                                    ) : val.question ===
                                      "How can I cancel my subscription?" ? (
                                      <p>
                                        You can manage your subscription,
                                        including cancelations, anytime by
                                        visiting
                                        https://getinsights.org/my-account and
                                        clicking the ‘Subscription & Billing’
                                        tab.
                                      </p>
                                    ) : val.question ===
                                      "How can I get a copy of my Actionable Insights Matterport Certified designation or diploma?" ? (
                                      <p>
                                        Diplomas are typically emailed to you 1
                                        to 2 weeks after completing the course.
                                        Designation cards are sent to your
                                        billing address via USPS approximately 8
                                        weeks after you’ve completed the course.
                                      </p>
                                    ) : val.question ===
                                      "Is the Actionable Insights Matterport Certified Continuing Education course still available?" ? (
                                      <p>
                                        The Actionable Insights Matterport
                                        Certified Continuing Education course
                                        has been sunsetted, and your AIMC
                                        designation is now indefinite. If you
                                        want an updated copy of your diploma,
                                        please submit a request by email to{" "}
                                        <a href="mailto:support@getinsights.org">
                                          support@getinsights.org
                                        </a>
                                        .
                                      </p>
                                    ) : val.question ===
                                      "I want to talk to someone about my situation. Who can I talk to?" ? (
                                      <p>
                                        Our team is ready to assist you. You can
                                        book a time to chat with us by visiting
                                        https://getinsights.org/demo. Our team
                                        is ready to assist you. You can book a
                                        time to chat with us by visiting{" "}
                                        <a
                                          href="https://getinsights.org/demo"
                                          target="_blank"
                                        >
                                          https://getinsights.org/demo
                                        </a>
                                        .
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="Questions">
                  {searchQuestion === "" ? (
                    <>
                      {questions.map((val) => {
                        return (
                          <div className="Tabs">
                            <div
                              className="row"
                              onClick={() => toggleQuestions(val.id)}
                            >
                              <div className="col-9">
                                <h1> {val.question} </h1>
                              </div>
                              <div className="col-3 text-right">
                                <img src={showQuestions[val.id] ? up : down} />
                              </div>
                            </div>
                            {showQuestions[val.id] && (
                              <div className="Dropdown">
                                <hr />
                                {val.question ===
                                "How can I make changes to my Xact ID after signing up for the Pro Plan?" ? (
                                  <p>
                                    You can request changes to your Xact ID by
                                    emailing our staff at{" "}
                                    <a href="mailto:support@getinsights.org">
                                      support@getinsights.org
                                    </a>
                                    .
                                  </p>
                                ) : val.question ===
                                  "How do I see the status of my current subscription?" ? (
                                  <p>
                                    You can view your current subscription
                                    anytime by visiting
                                    https://getinsights.org/my-account and
                                    clicking the ‘Subscription & Billing’ tab.
                                  </p>
                                ) : val.question ===
                                  "My Actionable Profile has been enabled/activated, but I don’t have the option to start a new estimate in the Actionable Profile. What do I do?" ? (
                                  <p>
                                    “You may need to sync your new profile. Here
                                    is a video explaining the process
                                    (https://youtu.be/UsO8HS6_DLU). If you have
                                    already completed that step, try:
                                    <br />
                                    <br />
                                    Log out of X1 and log back in. Then check if
                                    you have access to the Profile again.
                                    <br />
                                    Prompt a Xactimate update by visiting the
                                    main X1 screen and clicking sync in the top
                                    right corner.
                                    <br />
                                    Elevate this issue to the Verisk eService
                                    Center by visiting
                                    https://xactware.custhelp.com/app/chat/chat_launch
                                    and selecting Xactware ID and License
                                    Management from the two drop-down boxes.”
                                  </p>
                                ) : val.question ===
                                  "What is the pricing structure of the Actionable Profile?" ? (
                                  <p>
                                    The pricing structure for the Actionable
                                    Profile is $162 per month per seat. Since
                                    the Actionable Profile is enabled at a
                                    company level, your company will require a
                                    seat for every license it has.
                                  </p>
                                ) : val.question ===
                                  "I enrolled in an upcoming Xact Class, but haven’t received any course materials yet. When will those be provided?" ? (
                                  <p>
                                    Course material and virtual classroom links
                                    are typically sent via email approximately
                                    one week prior to the beginning of class.
                                  </p>
                                ) : val.question ===
                                  "How can I cancel my subscription?" ? (
                                  <p>
                                    You can manage your subscription, including
                                    cancelations, anytime by visiting
                                    https://getinsights.org/my-account and
                                    clicking the ‘Subscription & Billing’ tab.
                                  </p>
                                ) : val.question ===
                                  "How can I get a copy of my Actionable Insights Matterport Certified designation or diploma?" ? (
                                  <p>
                                    Diplomas are typically emailed to you 1 to 2
                                    weeks after completing the course.
                                    Designation cards are sent to your billing
                                    address via USPS approximately 8 weeks after
                                    you’ve completed the course.
                                  </p>
                                ) : val.question ===
                                  "Is the Actionable Insights Matterport Certified Continuing Education course still available?" ? (
                                  <p>
                                    The Actionable Insights Matterport Certified
                                    Continuing Education course has been
                                    sunsetted, and your AIMC designation is now
                                    indefinite. If you want an updated copy of
                                    your diploma, please submit a request by
                                    email to{" "}
                                    <a href="mailto:support@getinsights.org">
                                      support@getinsights.org
                                    </a>
                                    .
                                  </p>
                                ) : val.question ===
                                  "I want to talk to someone about my situation. Who can I talk to?" ? (
                                  <p>
                                    Our team is ready to assist you. You can
                                    book a time to chat with us by visiting
                                    https://getinsights.org/demo. Our team is
                                    ready to assist you. You can book a time to
                                    chat with us by visiting{" "}
                                    <a
                                      href="https://getinsights.org/demo"
                                      target="_blank"
                                    >
                                      https://getinsights.org/demo
                                    </a>
                                    .
                                  </p>
                                ) : val.question ===
                                  "How can I update our email on our company account?" ? (
                                  <p>
                                    The account owner must submit a request for
                                    the change via email. Requests can be sent
                                    to{" "}
                                    <a href="mailto:support@getinsights.org">
                                      support@getinsights.org
                                    </a>
                                    . In your request, please provide the old
                                    and new emails.
                                  </p>
                                ) : val.question ===
                                  "Another team member started the Actionable Insights Matterport Certified course, can I finish it for them?" ? (
                                  <p>
                                    Due to strict Department of Insurance and
                                    IICRC regulations, AIMC courses are
                                    permanently tied to the name/email that
                                    began the course. Unfortunately, you will
                                    not get credit for completing a team
                                    member’s course.
                                  </p>
                                ) : val.question ===
                                  "What are the system requirements for participating in the Xact Classes?" ? (
                                  <p>Laptop running Xactimate X1</p>
                                ) : val.question ===
                                  "How can I add more seats to my Actionable Profile subscription?" ? (
                                  <p>
                                    You can add seats using the ‘Invite Users’
                                    tool at{" "}
                                    <a
                                      href="https://getinsights.org/users"
                                      target="_blank"
                                    >
                                      https://getinsights.org/users
                                    </a>
                                  </p>
                                ) : val.question ===
                                  "Is there a trial version of the Actionable Profile?" ? (
                                  <p>
                                    Yes! A 1 month 99% off trial is provided to
                                    all seats at checkout.
                                  </p>
                                ) : val.question ===
                                  "What support resources are available if I encounter technical issues with my account?" ? (
                                  <p>
                                    Our dedicated team of support specialist are
                                    ready to help you. You can submit a ticket
                                    anytime by visiting{" "}
                                    <a
                                      href="https://getinsights.org/contact-us"
                                      target="_blank"
                                    >
                                      https://getinsights.org/contact-us
                                    </a>
                                    .
                                  </p>
                                ) : val.question ===
                                  "How does the billing cycle work for the Actionable Profile subscription?" ? (
                                  <p>
                                    On the monthly billing option, you are
                                    billed every 30 days. On the annual billing
                                    option, you are billed ever 365 days.
                                  </p>
                                ) : val.question ===
                                  "Are there any discounts available for bulk course purchases?" ? (
                                  <p>
                                    We would be happy to discuss enterprise
                                    solutions for your company. Please schedule
                                    a call with a membership resources rep by
                                    visiting https://getinsights.org/demo
                                  </p>
                                ) : val.question ===
                                  "Can I transfer my AIMC designation to another person within my company?" ? (
                                  <p>
                                    Due to strict Department of Insurance and
                                    IICRC regulations, AIMC courses are
                                    permanently tied to the name/email that
                                    began the course. Unfortunately, we cannot
                                    transfer courses.
                                  </p>
                                ) : val.question ===
                                  "How do I retrieve my login information if I forget it?" ? (
                                  <p>
                                    If you’ve forgotten your password, you can
                                    easily reset it by clicking the “Forgot
                                    Password” link on the login screen. Follow
                                    the instructions provided to create a new
                                    password.
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {filterQuestions.length <= 0 ? (
                        <div className="no-result">
                          <h3>No results!</h3>
                        </div>
                      ) : (
                        <>
                          {filterQuestions.map((val) => {
                            return (
                              <div className="Tabs">
                                <div
                                  className="row"
                                  onClick={() => toggleQuestions(val.id)}
                                >
                                  <div className="col-9">
                                    <h1> {val.question} </h1>
                                  </div>
                                  <div className="col-3 text-right">
                                    <img
                                      src={showQuestions[val.id] ? up : down}
                                    />
                                  </div>
                                </div>
                                {showQuestions[val.id] && (
                                  <div className="Dropdown">
                                    <hr />
                                    {val.question ===
                                    "How can I make changes to my Xact ID after signing up for the Pro Plan?" ? (
                                      <p>
                                        You can request changes to your Xact ID
                                        by emailing our staff at{" "}
                                        <a href="mailto:support@getinsights.org">
                                          support@getinsights.org
                                        </a>
                                        .
                                      </p>
                                    ) : val.question ===
                                      "How do I see the status of my current subscription?" ? (
                                      <p>
                                        You can view your current subscription
                                        anytime by visiting
                                        https://getinsights.org/my-account and
                                        clicking the ‘Subscription & Billing’
                                        tab.
                                      </p>
                                    ) : val.question ===
                                      "My Actionable Profile has been enabled/activated, but I don’t have the option to start a new estimate in the Actionable Profile. What do I do?" ? (
                                      <p>
                                        “You may need to sync your new profile.
                                        Here is a video explaining the process
                                        (https://youtu.be/UsO8HS6_DLU). If you
                                        have already completed that step, try:
                                        <br />
                                        <br />
                                        Log out of X1 and log back in. Then
                                        check if you have access to the Profile
                                        again.
                                        <br />
                                        Prompt a Xactimate update by visiting
                                        the main X1 screen and clicking sync in
                                        the top right corner.
                                        <br />
                                        Elevate this issue to the Verisk
                                        eService Center by visiting
                                        https://xactware.custhelp.com/app/chat/chat_launch
                                        and selecting Xactware ID and License
                                        Management from the two drop-down
                                        boxes.”
                                      </p>
                                    ) : val.question ===
                                      "What is the pricing structure of the Actionable Profile?" ? (
                                      <p>
                                        The pricing structure for the Actionable
                                        Profile is $162 per month per seat.
                                        Since the Actionable Profile is enabled
                                        at a company level, your company will
                                        require a seat for every license it has.
                                      </p>
                                    ) : val.question ===
                                      "I enrolled in an upcoming Xact Class, but haven’t received any course materials yet. When will those be provided?" ? (
                                      <p>
                                        Course material and virtual classroom
                                        links are typically sent via email
                                        approximately one week prior to the
                                        beginning of class.
                                      </p>
                                    ) : val.question ===
                                      "How can I cancel my subscription?" ? (
                                      <p>
                                        You can manage your subscription,
                                        including cancelations, anytime by
                                        visiting
                                        https://getinsights.org/my-account and
                                        clicking the ‘Subscription & Billing’
                                        tab.
                                      </p>
                                    ) : val.question ===
                                      "How can I get a copy of my Actionable Insights Matterport Certified designation or diploma?" ? (
                                      <p>
                                        Diplomas are typically emailed to you 1
                                        to 2 weeks after completing the course.
                                        Designation cards are sent to your
                                        billing address via USPS approximately 8
                                        weeks after you’ve completed the course.
                                      </p>
                                    ) : val.question ===
                                      "Is the Actionable Insights Matterport Certified Continuing Education course still available?" ? (
                                      <p>
                                        The Actionable Insights Matterport
                                        Certified Continuing Education course
                                        has been sunsetted, and your AIMC
                                        designation is now indefinite. If you
                                        want an updated copy of your diploma,
                                        please submit a request by email to{" "}
                                        <a href="mailto:support@getinsights.org">
                                          support@getinsights.org
                                        </a>
                                        .
                                      </p>
                                    ) : val.question ===
                                      "I want to talk to someone about my situation. Who can I talk to?" ? (
                                      <p>
                                        Our team is ready to assist you. You can
                                        book a time to chat with us by visiting
                                        https://getinsights.org/demo. Our team
                                        is ready to assist you. You can book a
                                        time to chat with us by visiting{" "}
                                        <a
                                          href="https://getinsights.org/demo"
                                          target="_blank"
                                        >
                                          https://getinsights.org/demo
                                        </a>
                                        .
                                      </p>
                                    ) : val.question ===
                                      "How can I update our email on our company account?" ? (
                                      <p>
                                        The account owner must submit a request
                                        for the change via email. Requests can
                                        be sent to{" "}
                                        <a href="mailto:support@getinsights.org">
                                          support@getinsights.org
                                        </a>
                                        . In your request, please provide the
                                        old and new emails.
                                      </p>
                                    ) : val.question ===
                                      "Another team member started the Actionable Insights Matterport Certified course, can I finish it for them?" ? (
                                      <p>
                                        Due to strict Department of Insurance
                                        and IICRC regulations, AIMC courses are
                                        permanently tied to the name/email that
                                        began the course. Unfortunately, you
                                        will not get credit for completing a
                                        team member’s course.
                                      </p>
                                    ) : val.question ===
                                      "What are the system requirements for participating in the Xact Classes?" ? (
                                      <p>Laptop running Xactimate X1</p>
                                    ) : val.question ===
                                      "How can I add more seats to my Actionable Profile subscription?" ? (
                                      <p>
                                        You can add seats using the ‘Invite
                                        Users’ tool at{" "}
                                        <a
                                          href="https://getinsights.org/users"
                                          target="_blank"
                                        >
                                          https://getinsights.org/users
                                        </a>
                                      </p>
                                    ) : val.question ===
                                      "Is there a trial version of the Actionable Profile?" ? (
                                      <p>
                                        Yes! A 1 month 99% off trial is provided
                                        to all seats at checkout.
                                      </p>
                                    ) : val.question ===
                                      "What support resources are available if I encounter technical issues with my account?" ? (
                                      <p>
                                        Our dedicated team of support specialist
                                        are ready to help you. You can submit a
                                        ticket anytime by visiting{" "}
                                        <a
                                          href="https://getinsights.org/contact-us"
                                          target="_blank"
                                        >
                                          https://getinsights.org/contact-us
                                        </a>
                                        .
                                      </p>
                                    ) : val.question ===
                                      "How does the billing cycle work for the Actionable Profile subscription?" ? (
                                      <p>
                                        On the monthly billing option, you are
                                        billed every 30 days. On the annual
                                        billing option, you are billed ever 365
                                        days.
                                      </p>
                                    ) : val.question ===
                                      "Are there any discounts available for bulk course purchases?" ? (
                                      <p>
                                        We would be happy to discuss enterprise
                                        solutions for your company. Please
                                        schedule a call with a membership
                                        resources rep by visiting
                                        https://getinsights.org/demo
                                      </p>
                                    ) : val.question ===
                                      "Can I transfer my AIMC designation to another person within my company?" ? (
                                      <p>
                                        Due to strict Department of Insurance
                                        and IICRC regulations, AIMC courses are
                                        permanently tied to the name/email that
                                        began the course. Unfortunately, we
                                        cannot transfer courses.
                                      </p>
                                    ) : val.question ===
                                      "How do I retrieve my login information if I forget it?" ? (
                                      <p>
                                        If you’ve forgotten your password, you
                                        can easily reset it by clicking the
                                        “Forgot Password” link on the login
                                        screen. Follow the instructions provided
                                        to create a new password.
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
              <div className="view-less-more">
                <button
                  className="btn"
                  onClick={() => {
                    setCheckButtonText(!checkButtonText);
                    scroll();
                  }}
                >
                  {checkButtonText ? "View More" : "View Less"}
                </button>
              </div>
              <hr />
              <div className="holder">
                <h1> Contact Us </h1>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <form onSubmit={handleSubmit}>
                    <div className="contact-us-form">
                      <div className="row">
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> First Name </label>
                            <b
                              style={{
                                color: "red",
                                fontSize: "25px",
                                marginLeft: "-5px",
                              }}
                            >
                              *
                            </b>
                            <input
                              type="text"
                              name="firstName"
                              className="form-control"
                              placeholder="Enter"
                              required
                              value={userData.firstName}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  firstName: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> Last Name </label>
                            <b
                              style={{
                                color: "red",
                                fontSize: "25px",
                                marginLeft: "-5px",
                              }}
                            >
                              *
                            </b>
                            <input
                              type="text"
                              name="lastName"
                              className="form-control"
                              placeholder="Enter"
                              required
                              value={userData.lastName}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  lastName: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> Your Email </label>
                            <b
                              style={{
                                color: "red",
                                fontSize: "25px",
                                marginLeft: "-5px",
                              }}
                            >
                              *
                            </b>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter"
                              required
                              value={userData.youremail}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  youremail: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label> Your Phone Number </label>
                            <b
                              style={{
                                color: "red",
                                fontSize: "25px",
                                marginLeft: "-5px",
                              }}
                            >
                              *
                            </b>
                            <InputMask
                              mask="999-999-9999"
                              value={userData.yourphone}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  yourphone: e.currentTarget.value,
                                })
                              }
                            >
                              {(inputProps) => (
                                <input
                                  type="text"
                                  name="phone"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  {...inputProps}
                                />
                              )}
                            </InputMask>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-xs-12 mt-2">
                          <div className="form-group">
                            <label> Subject </label>
                            <input
                              type="text"
                              name="subject"
                              className="form-control"
                              placeholder="Enter"
                              value={userData.subject}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  subject: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-xs-12 mt-2">
                          <div className="form-group">
                            <label> Upload Image (Optional) </label>
                            <label className="file">
                              <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={fileChange}
                                onClick={(e) => (e.target.value = null)}
                              />
                              <img
                                className="input_icon"
                                src={download}
                                alt="download"
                                loading="lazy"
                              />
                              <span className="file-custom"> Select </span>
                            </label>
                            {file && (
                              <>
                                {isError ? (
                                  <div className="image-error">
                                    Oops. Please upload your image as a PNG or
                                    JPG.
                                  </div>
                                ) : (
                                  <div className="image-name">
                                    {"   " + file.name}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mt-2">
                          <div className="form-group">
                            <label> Your Message </label>
                            <textarea
                              name="your-message"
                              className="form-control"
                              style={{ height: "200px" }}
                              placeholder="Enter"
                              value={userData.message}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  message: e.currentTarget.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col">
                        <ReCAPTCHA
                          sitekey="6LcGHDwoAAAAAEEwh5SAw7fWnY_SnzYMF68EFKUx"
                          size="normal"
                          onChange={onChange}
                        />
                        </div>
                      </div> */}
                      <div className="send">
                        {!loading && (
                          <button
                            className="btn"
                            type="submit"
                            disabled={isError ? true : false}
                          >
                            Send
                          </button>
                        )}
                        {loading && (
                          <button className="btn" disabled>
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        )}
                      </div>
                      {Msg && (
                        <div
                          style={{
                            display: "block",
                            fontSize: "15px",
                            margin: "20px 0px",
                            padding: "10px",
                            border: "2px solid #398f14",
                            borderRadius: "4px",
                          }}
                        >
                          {Msg}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="Corporate-Headquarters-Address">
                    <div className="row">
                      <div className="col">
                        <h5> Corporate Headquarters </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p>
                          5962 La Place Ct #130
                          <br />
                          Carlsbad, CA 92008
                          <br />
                          <br />
                          Business Hours
                          <br />
                          M-F
                          <br />
                          9:00AM - 5:00PM PST
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5076363182884!2d-117.27331367918232!3d33.13221914906969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc73622a658551%3A0x827644832c8c2628!2s5962%20La%20Place%20Ct%20%23130%2C%20Carlsbad%2C%20CA%2092008%2C%20USA!5e0!3m2!1sen!2s!4v1706679766693!5m2!1sen!2s"
                          style={{ border: "0" }}
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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

export default ContactUs;

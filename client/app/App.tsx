import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
const EmailForm = React.lazy(() => import("./pages/ResetPassword/EmailForm"));
const PasswordForm = React.lazy(() => import("./pages/ResetPassword/PasswordForm"));
const ActivateAccount = React.lazy(() => import("./components/ActivateAccount"));
const Signup = React.lazy(() => import("./pages/signup/signup"));
const GlobalSearch = React.lazy(() => import("./components/GlobalSearch"));
const Events = React.lazy(() => import("./pages/events/events"));
const EventsDetail = React.lazy(() => import("./pages/events/eventsdetail"));
const PastEvents = React.lazy(() => import("./pages/events/pastevents"));
const XactimateSketchGallery = React.lazy(() => import("./pages/XactimateSketchGallery/xactimatesketchgallery"));
const InsightSheet = React.lazy(() => import("./pages/InsightSheet/insightsheet"));
const InsightSheetDetail = React.lazy(() => import("./pages/InsightSheet/insightsheetdetail"));
const InsightSheetDatabaseSearch = React.lazy(() => import("./pages/InsightSheet/insightsheetdatabasesearch"));
const InsightSheetTutorial = React.lazy(() => import("./pages/InsightSheetTutorial/insightsheettutorial"));
const InsightSheetMacros = React.lazy(() => import("./pages/InsightSheetMacros/insightsheetmacros"));
const ProductMacro = React.lazy(() => import("./pages/Products/macro"));
const ProductUmpiresManual = React.lazy(() => import("./pages/Products/umpires_manual"));
const ProductSwag = React.lazy(() => import("./pages/Products/swag_product"));
const ProductInsighterPoints = React.lazy(() => import("./pages/Products/insighter_points"));
const ProductGiftCards = React.lazy(() => import("./pages/Products/gift_cards"));
const ProductCertification = React.lazy(() => import("./pages/Products/certification_product"));
const BuyProduct = React.lazy(() => import("./pages/Products/buyproduct"));
// const BuyEvent = React.lazy(() => import("./pages/Checkouts/event_checkout"));
// const BuyCertification = React.lazy(() => import("./pages/Checkouts/certification_checkout"));
const PriceListUpdateSummary = React.lazy(() => import("./pages/PriceListUpdateSummary/pricelistupdatesummary"));
const PriceListUpdateSummaryOfMonth = React.lazy(() => import("./pages/PriceListUpdateSummary/pricelistupdatesummaryofmonth"));
const InsighterReport = React.lazy(() => import("./pages/InsighterReport/insighterreport"));
const InsighterReportDetail = React.lazy(() => import("./pages/InsighterReport/insighterreportdetail"));
const MediaRelease = React.lazy(() => import("./pages/MediaRelease/mediarelease"));
const VideoGallery = React.lazy(() => import("./pages/VideoGallery/videogallery"));
const VideoGalleryDetail = React.lazy(() => import("./pages/VideoGallery/videogallerydetail"));
const Blog = React.lazy(() => import("./pages/Blog/blog"));
const AnActionableGuideToTheInsightSheetDatabase = React.lazy(() => import("./pages/Blog/blogs/AnActionableGuideToTheInsightSheetDatabase"));
const DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction = React.lazy(() => import("./pages/Blog/blogs/DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction"));
const HowToImproveYourEstimates = React.lazy(() => import("./pages/Blog/blogs/HowToImproveYourEstimates"));
const ImportAndExportAScanFromTheMatterportCaptureApp = React.lazy(() => import("./pages/Blog/blogs/ImportAndExportAScanFromTheMatterportCaptureApp"));
const ScanningLargeSpacesWithAMatterportPro3 = React.lazy(() => import("./pages/Blog/blogs/ScanningLargeSpacesWithAMatterportPro3"));
const KeyboardShortcutsForXactimate = React.lazy(() => import("./pages/Blog/blogs/KeyboardShortcutsForXactimate"));
const HowToSaveRunExportAndImportMacrosForXactimate = React.lazy(() => import("./pages/Blog/blogs/HowToSaveRunExportAndImportMacrosForXactimate"));
const DeepLinksInMatterport = React.lazy(() => import("./pages/Blog/blogs/DeepLinksInMatterport"));
const ViolationCautionAndWarningAlertsInXactimate = React.lazy(() => import("./pages/Blog/blogs/ViolationCautionAndWarningAlertsInXactimate"));
const HowToUseXactimateSketchGallery = React.lazy(() => import("./pages/Blog/blogs/HowToUseXactimateSketchGallery"));
const HolidaySeasonYourBestChanceToGetMatterportCertification = React.lazy(() => import("./pages/Blog/blogs/HolidaySeasonYourBestChanceToGetMatterportCertification"));
const RequestingPriceListInX1 = React.lazy(() => import("./pages/Blog/blogs/RequestingPriceListInX1"));
const HowToCreateAFreeMatterportAccountForAPolicyHolder = React.lazy(() => import("./pages/Blog/blogs/HowToCreateAFreeMatterportAccountForAPolicyHolder"));
const TruePlanIntegrationWithXactimate = React.lazy(() => import("./pages/Blog/blogs/TruePlanIntegrationWithXactimate"));
const LoggingInToX1AndSyncingProfiles = React.lazy(() => import("./pages/Blog/blogs/LoggingInToX1AndSyncingProfiles"));
const HowToEditProjectNamesInXactimateX1 = React.lazy(() => import("./pages/Blog/blogs/HowToEditProjectNamesInXactimateX1"));
const HowDoYouRequestANewAlertInTheActionableProfileForBetterXactimateEstimates = React.lazy(() => import("./pages/Blog/blogs/HowDoYouRequestANewAlertInTheActionableProfileForBetterXactimateEstimates"));
const HowToExpandAndCollapseTheGuidanceProvidedWithinTheXactXpertDrawer = React.lazy(() => import("./pages/Blog/blogs/HowToExpandAndCollapseTheGuidanceProvidedWithinTheXactXpertDrawer"));
const TrainingModules = React.lazy(() => import("./pages/TrainingModules/trainingmodules"));
const MatterportStandards = React.lazy(() => import("./pages/MatterportStandards/matterportstandards"));
const CommonlyOverlookedLineItems = React.lazy(() => import("./pages/CommonlyOverlookedLineItems/commonlyoverlookedlineitems"));
const InsightSheetCollaboration = React.lazy(() => import("./pages/InsightSheetCollaboration/insightsheetcollaboration"));
const InsightSheetCollaborationForm = React.lazy(() => import("./pages/InsightSheetCollaboration/insightsheetscollaborationform"));
const solidifai = React.lazy(() => import("./pages/Solidifai/solidifai"));
const SolidifaiTermsAndConditions = React.lazy(() => import("./pages/Solidifai/SolidifaiTermsAndConditions"));
const zorasolidifai = React.lazy(() => import("./components/Zora-Solidifai"));
const zora = React.lazy(() => import("./pages/Zora/zora"));
const ActionableProfileAlertRequest = React.lazy(() => import("./pages/ActionableProfileAlertRequest/actionableprofilealertrequest"));
const ActionableProfileAlertRequestForm = React.lazy(() => import("./pages/ActionableProfileAlertRequest/actionableprofilealertrequestform"));
const LineItemRequest = React.lazy(() => import("./pages/LineItemRequest/lineitemrequest"));
const LineItemRequestForm = React.lazy(() => import("./pages/LineItemRequest/lineitemrequestform"));
const XactimateFeatureRequest = React.lazy(() => import("./pages/XactimateFeatureRequest/xactimatefeaturerequest"));
const MatterportFeatureRequest = React.lazy(() => import("./pages/MatterportFeatureRequest/matterportfeaturerequest"));
const MatterportFeatureRequestForm = React.lazy(() => import("./pages/MatterportFeatureRequest/matterportfeaturerequestform"));
const Swag = React.lazy(() => import("./pages/Swag/swag"));
const GiftCards = React.lazy(() => import("./pages/GiftCards/giftcards"));
const PlanMatrix = React.lazy(() => import("./pages/PlanMatrix/planmatrix"));
const EnterprisePlan = React.lazy(() => import("./pages/PlanMatrix/EnterprisePlan"));
const UmpiresManual = React.lazy(() => import("./pages/UmpiresManual/umpiresmanual"));
const MyAccount = React.lazy(() => import("./pages/User/myaccount"));
const MyDownloads = React.lazy(() => import("./pages/User/mydownloads"));
const Points = React.lazy(() => import("./pages/User/insighterpoints"));
const ReviewActivity = React.lazy(() => import("./pages/User/insighterpoints/reviewactivity"));
const CancelSubscription = React.lazy(() => import("./pages/User/cancelsubscription/CancelSubscription"));
const CancelSubscriptionForm = React.lazy(() => import("./pages/User/cancelsubscription/CancelSubscriptionForm"));
const Users = React.lazy(() => import("./pages/User/users"));
const TransactionHistory = React.lazy(() => import("./pages/User/transactionhistory"));
const DownloadCertificate = React.lazy(() => import("./pages/User/certifications"));
const ActionableXactimateProfileChild = React.lazy(() => import("./pages/User/users/actionable-xactimate-profile-child"));
const InviteUsers = React.lazy(() => import("./pages/User/users/InviteUsers"));
const Receipt = React.lazy(() => import("./components/Receipt"));
const CodeOfEthics = React.lazy(() => import("./components/CodeOfEthics"));
const TermsAndConditions = React.lazy(() => import("./components/TermsAndConditions"));
const ContactUs = React.lazy(() => import("./components/ContactUs"));
const ContactUsForQuote = React.lazy(() => import("./components/ContactUsForQuote"));
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const GiOwnership = React.lazy(() => import("./components/GiOwnership"));
const DigitalAssetsLicenseAgreement = React.lazy(() => import("./components/DigitalAssetsLicenseAgreement"));
const Demo = React.lazy(() => import("./components/Demo"));
const Schedule = React.lazy(() => import("./components/Schedule"));
const FoundationStructure = React.lazy(() => import("./components/FoundationStructure"));
const RetailLaborRates = React.lazy(() => import("./components/RetailLaborRates"));
const TranscendingTheRestorationParadox = React.lazy(() => import("./components/TranscendingTheRestorationParadox"));
const XactimateLevelCurriculum = React.lazy(() => import("./components/XactimateLevelCurriculum"));
const RaceWithTheMachinesRecap = React.lazy(() => import("./components/RaceWithTheMachinesRecap"));
const StateInsuranceLicenseReciprocity = React.lazy(() => import("./components/StateInsuranceLicenseReciprocity"));
const EnterpriseGiftCards = React.lazy(() => import("./components/EnterpriseGiftCards"));
const WhatOthersSay = React.lazy(() => import("./components/WhatOthersSay"));
const YearReview2019 = React.lazy(() => import("./components/2019YearReview"));
const FitGuide = React.lazy(() => import("./components/FitGuide"));
const MediaKit = React.lazy(() => import("./components/MediaKit"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const AimcRefundPolicy = React.lazy(() => import("./pages/ActionableAcademy/aimc_refund_policy"));
const Aimc = React.lazy(() => import("./pages/ActionableAcademy/aimc"));
const AimcCe = React.lazy(() => import("./pages/ActionableAcademy/aimc_ce"));
const Aitc = React.lazy(() => import("./pages/ActionableAcademy/aitc"));
const AimcGraduatesPublicRegistry = React.lazy(() => import("./pages/ActionableAcademy/aimc_graduates_public_registry"));
const PrivateTraining = React.lazy(() => import("./pages/ActionableAcademy/privatetraining"));
const TwoDayRemoteTraining = React.lazy(() => import("./pages/ActionableAcademy/privatetraining/2dayremotetraining"));
const ThreeDaySiteTraining = React.lazy(() => import("./pages/ActionableAcademy/privatetraining/3daysitetraining"));
const TrainTomorrowToday = React.lazy(() => import("./pages/ActionableAcademy/privatetraining/traintomorrowtoday"));
const ActionableXactimateProfile = React.lazy(() => import("./components/ActionableXactimateProfile"));
const ActionableXactimateProfileFAQs = React.lazy(() => import("./components/ActionableXactimateProfileFAQs"));
const Live = React.lazy(() => import("./components/Live"));
const VeriskElevate = React.lazy(() => import("./components/VeriskElevate"));
const Floodlight = React.lazy(() => import("./components/Floodlight"));
const CustomizedXactxpertAlerts = React.lazy(() => import("./components/CustomizedXactxpertAlerts"));
const ElevateLeads = React.lazy(() => import("./components/ElevateLeads"));
const RiaConventionLeads = React.lazy(() => import("./components/RiaConventionLeads"));
const ConventionLeads = React.lazy(() => import("./components/ConventionLeads"));
const RiaAffinityProgram = React.lazy(() => import("./components/RiaAffinityProgram"));
const MasterXactimateImproveEstimatingSkills = React.lazy(() => import("./components/MasterXactimateImproveEstimatingSkills"));
const MasterXactimateImportantTips = React.lazy(() => import("./components/MasterXactimateImportantTips"));
const BecomeExpertXactimateEstimator = React.lazy(() => import("./components/BecomeExpertXactimateEstimator"));
const MasteringXactimateForBeginners = React.lazy(() => import("./components/MasteringXactimateForBeginners"));
const RemoteXactimateEstimator = React.lazy(() => import("./components/RemoteXactimateEstimator"));
const XactimateMacro = React.lazy(() => import("./components/XactimateMacro"));
const ImproveXactimateEstimates = React.lazy(() => import("./components/ImproveXactimateEstimates"));
const XactimateTrainingOnline = React.lazy(() => import("./components/XactimateTrainingOnline"));
const ActionableProfileVsEstimateReviewers = React.lazy(() => import("./components/ActionableProfileVsEstimateReviewers"));
const RealActionableInsightsWebsite = React.lazy(() => import("./components/RealActionableInsightsWebsite"));
const ExternalRedirect = React.lazy(() => import("./components/ExternalRedirect"));
const ProtectedRouteCustomer = React.lazy(() => import("./components/ProtectedRouteCustomer"));
// const AdminLogin = React.lazy(() => import("./gi-team/pages/login/login"));
// const LoginMFA = React.lazy(() => import("./gi-team/pages/login/LoginMfa"));
// const Enable2FA = React.lazy(() => import("./gi-team/components/Enable2FA"));
// const Dashboard = React.lazy(() => import("./gi-team/pages/Dashboard/dashboard"));
// const InsightSheetAdmin = React.lazy(() => import("./gi-team/pages/InsightSheets/insightsheet"));
// const CreateInsightSheet = React.lazy(() => import("./gi-team/pages/InsightSheets/createInsightSheet"));
// const UpdateInsightSheet = React.lazy(() => import("./gi-team/pages/InsightSheets/updateInsightSheet"));
// const Products = React.lazy(() => import("./gi-team/pages/Products/products"));
// const Macro = React.lazy(() => import("./gi-team/pages/Products/Macro/macro"));
// const CreateMacro = React.lazy(() => import("./gi-team/pages/Products/Macro/createMacro"));
// const UpdateMacro = React.lazy(() => import("./gi-team/pages/Products/Macro/updateMacro"));
// const UmpiresManualAdmin = React.lazy(() => import("./gi-team/pages/Products/UmpiresManual/umpiresmanual"));
// const SwagAdmin = React.lazy(() => import("./gi-team/pages/Products/Swag/swag"));
// const CreateSwag = React.lazy(() => import("./gi-team/pages/Products/Swag/createSwag"));
// const ViewSwag = React.lazy(() => import("./gi-team/pages/Products/Swag/viewSwag"));
// const UpdateSwag = React.lazy(() => import("./gi-team/pages/Products/Swag/updateSwag"));
// const ViewUmpiresManual = React.lazy(() => import("./gi-team/pages/Products/UmpiresManual/viewUmpiresManual"));
// const UpdateUmpiresManual = React.lazy(() => import("./gi-team/pages/Products/UmpiresManual/updateUmpiresManual"));
// const Certifications = React.lazy(() => import("./gi-team/pages/Products/Certifications/certifications"));
// const CreateCertification = React.lazy(() => import("./gi-team/pages/Products/Certifications/createCertification"));
// const ViewCertification = React.lazy(() => import("./gi-team/pages/Products/Certifications/viewCertification"));
// const UpdataCertification = React.lazy(() => import("./gi-team/pages/Products/Certifications/updataCertification"));
// const GiftCardsAdmin = React.lazy(() => import("./gi-team/pages/Products/GiftCards/giftcards"));
// const EstimateEngines = React.lazy(() => import("./gi-team/pages/Products/EstimateEngines/estimateengines"));
// const InsighterPointsBuckets = React.lazy(() => import("./gi-team/pages/Products/InsighterPointsBuckets/insighterpointsbuckets"));
// const AimcGraduates = React.lazy(() => import("./gi-team/pages/Products/AimcGraduates/aimcgraduates"));
// const UpdateAimcGraduate = React.lazy(() => import("./gi-team/pages/Products/AimcGraduates/updateAimcGraduate"));
// const EventsAdmin = React.lazy(() => import("./gi-team/pages/Events/events"));
// const CreateEvent = React.lazy(() => import("./gi-team/pages/Events/createEvent"));
// const UpdateEvent = React.lazy(() => import("./gi-team/pages/Events/updateEvent"));
// const EventAttendees = React.lazy(() => import("./gi-team/pages/Events/eventAttendees"));
// const UpdateEventAttendee = React.lazy(() => import("./gi-team/pages/Events/updateEventAttendee"));
// const PriceList = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/pricelistupdatesummary"));
// const PriceListOfYear = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/pricelistupdatesummaryofyear"));
// const CreatePriceListUpdateSummary = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/createPriceListUpdateSummary"));
// const UpdatePriceListUpdateSummary = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/updatePriceListUpdateSummary"));
// const InsighterReportAdmin = React.lazy(() => import("./gi-team/pages/InsighterReport/insighterreport"));
// const CreateInsighterReport = React.lazy(() => import("./gi-team/pages/InsighterReport/createInsighterReport"));
// const UpdateInsighterReport = React.lazy(() => import("./gi-team/pages/InsighterReport/updateInsighterReport"));
// const ManageRoles = React.lazy(() => import("./gi-team/pages/ManageRoles/manageroles"));
// const CommonlyUsedLineItems = React.lazy(() => import("./gi-team/pages/CommonlyUsedLineItems/commonlyusedlineitems"));
// const CreateCommonlyUsedLineItems = React.lazy(() => import("./gi-team/pages/CommonlyUsedLineItems/createCommonlyUsedLineItems"));
// const UpdateCommonlyUsedLineItems = React.lazy(() => import("./gi-team/pages/CommonlyUsedLineItems/updateCommonlyUsedLineItems"));
// const UsersAdmin = React.lazy(() => import("./gi-team/pages/Users/users"));
// const UserDetails = React.lazy(() => import("./gi-team/pages/Users/userDetails"));
// const UserSubscription = React.lazy(() => import("./gi-team/pages/Users/userSubscription"));
// const EditUser = React.lazy(() => import("./gi-team/pages/Users/editUser"));
// const SubscriptionCoupons = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/subscriptioncoupons"));
// const CreateSubscriptionCoupon = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/createSubscriptionCoupon"));
// const ViewSubscriptionCoupon = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/viewSubscriptionCoupon"));
// const UpdateSubscriptionCoupon = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/updateSubscriptionCoupon"));
// const VideoGalleryAdmin = React.lazy(() => import("./gi-team/pages/VideoGallery/videogallery"));
// const CreateVideoGallery = React.lazy(() => import("./gi-team/pages/VideoGallery/createVideoGallery"));
// const UpdateVideoGallery = React.lazy(() => import("./gi-team/pages/VideoGallery/updateVideoGallery"));
// const Orders = React.lazy(() => import("./gi-team/pages/Orders/orders"));
// const ViewOrder = React.lazy(() => import("./gi-team/pages/Orders/viewOrder"));
// const RefundOrder = React.lazy(() => import("./gi-team/pages/Orders/refundOrder"));
// const ProductCoupons = React.lazy(() => import("./gi-team/pages/ProductCoupons/productcoupons"));
// const CreateProductCoupon = React.lazy(() => import("./gi-team/pages/ProductCoupons/createProductCoupon"));
// const ViewProductCoupon = React.lazy(() => import("./gi-team/pages/ProductCoupons/viewProductCoupon"));
// const UpdateProductCoupon = React.lazy(() => import("./gi-team/pages/ProductCoupons/updateProductCoupon"));
// const InsighterPoints = React.lazy(() => import("./gi-team/pages/InsighterPoints/insighterpoints"));
// const ViewCodes = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewCodes/viewcodes"));
// const CreateCode = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewCodes/createCode"));
// const ViewCode = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewCodes/viewCode"));
// const ViewUserBalance = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewUserBalance/viewuserbalance"));
// const BalanceDetails = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewUserBalance/balanceDetails"));
// const Audit = React.lazy(() => import("./gi-team/pages/InsighterPoints/Audit/audit"));
// const Reporting = React.lazy(() => import("./gi-team/pages/Reporting/reporting"));
// const VeriskReporting = React.lazy(() => import("./gi-team/pages/Reporting/veriskreporting"));
// const ActionableXactimateProfileLogos = React.lazy(() => import("./gi-team/pages/ActionableXactimateProfile/actionablexactimaterofile"));
// const LiveStreamZone = React.lazy(() => import("./gi-team/pages/LiveStreamZone/livestreamzone"));
// const XactimateSketchGalleryAdmin = React.lazy(() => import("./gi-team/pages/XactimateSketchGallery/xactimatesketchgallery"));
// const CreateXactimateSketchGallery = React.lazy(() => import("./gi-team/pages/XactimateSketchGallery/createXactimateSketchGallery"));
// const UpdateXactimateSketchGallery = React.lazy(() => import("./gi-team/pages/XactimateSketchGallery/updateXactimateSketchGallery"));
// const MediaReleaseAdmin = React.lazy(() => import("./gi-team/pages/MediaRelease/mediarelease"));
// const CreateMediaRelease = React.lazy(() => import("./gi-team/pages/MediaRelease/createMediaRelease"));
// const UpdateMediaRelease = React.lazy(() => import("./gi-team/pages/MediaRelease/updateMediaRelease"));
// const Subscriptions = React.lazy(() => import("./gi-team/pages/Subscriptions/subscriptions"));
// const ViewSubscription = React.lazy(() => import("./gi-team/pages/Subscriptions/viewSubscription"));
// const ViewTransactionHistory = React.lazy(() => import("./gi-team/pages/Subscriptions/viewTransactionHistory"));
// const RefundSubscription = React.lazy(() => import("./gi-team/pages/Subscriptions/refundSubscription"));
// const StartSubscription = React.lazy(() => import("./gi-team/pages/Subscriptions/startSubscription"));
// const SubscriptionCheckout = React.lazy(() => import("./gi-team/pages/Subscriptions/subscriptionCheckout"));
// const InviteUserCheckout = React.lazy(() => import("./gi-team/pages/Subscriptions/inviteUserCheckout"));
// const ManagePayments = React.lazy(() => import("./gi-team/pages/Subscriptions/managePayments"));
// const BlogAdmin = React.lazy(() => import("./gi-team/pages/Blog/blog"));
// const CreateBlog = React.lazy(() => import("./gi-team/pages/Blog/createBlog"));
// const UpdateBlog = React.lazy(() => import("./gi-team/pages/Blog/updateBlog"));
// const ViewAllComments = React.lazy(() => import("./gi-team/pages/ViewAllComments/viewallcomments"));
// const ViewAllCommentsType = React.lazy(() => import("./gi-team/pages/ViewAllComments/viewallcommentstype"));
// const ProtectedRoute = React.lazy(() => import("./gi-team/components/ProtectedRoute"));

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/my-account"
          element={<MyAccount />}
        />
        <Route
          path="/my-account/lost-password"
          element={<EmailForm />}
        />
        <Route
          path="/my-account/lost-password/show-reset-form"
          element={<PasswordForm />}
        />
        <Route
          path="/ConfirmEmail"
          element={<ActivateAccount />}
        />
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/my-account/downloads"
            element={<MyDownloads />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/my-account/points"
            element={<Points />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/my-account/view-log"
            element={<ReviewActivity />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/my-account/cancel-subscription"
            element={<CancelSubscription />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/my-account/cancel-subscription-form"
            element={<CancelSubscriptionForm />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/users"
            element={<Users />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/users/actionable-xactimate-profile/:id"
            element={<ActionableXactimateProfileChild />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/transaction-history"
            element={<TransactionHistory />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/download-certificate"
            element={<DownloadCertificate />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/checkout"
            element={<BuyProduct />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/receipt"
            element={<Receipt />}
          />
        </Route>
        <Route
          path="/get-started"
          element={<Signup />}
        />
        <Route
          path="/search"
          element={<GlobalSearch />}
        />
        <Route
          path="/events"
          element={<Events />}
        />
        <Route
          path="/event/:permalink"
          element={<EventsDetail />}
        />
        <Route
          path="/past-events"
          element={<PastEvents />}
        />
        <Route
          path="/online-sketch-gallery"
          element={<XactimateSketchGallery />}
        />
         <Route
          path="/insight-sheets"
          element={<InsightSheet />}
        />
        <Route
          path="/insight-sheets/:permalink"
          element={<InsightSheetDetail />}
        />
        <Route
          path="/s/:searchfield"
          element={<InsightSheetDatabaseSearch />}
        />
        <Route
          path="/insight-sheet-tutorial"
          element={<InsightSheetTutorial />}
        />
        <Route
          path="/macros"
          element={<InsightSheetMacros />}
        />
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/shop/macros/:permalink"
            element={<ProductMacro />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/shop/uncategorized/:permalink"
            element={<ProductUmpiresManual />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/shop/swag/:permalink"
            element={<ProductSwag />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/shop/buy-points/insighter-points"
            element={<ProductInsighterPoints />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/shop/gift-card/:permalink"
            element={<ProductGiftCards />}
          />
        </Route>
        <Route element={<ProtectedRouteCustomer />}>
          <Route
            path="/shop/certification/:permalink"
            element={<ProductCertification />}
          />
        </Route>
        <Route
          path="/resources/price-list-update-summary"
          element={<PriceListUpdateSummary />}
        />
        <Route
          path="/resources/price-list-update-summary/:permalink"
          element={<PriceListUpdateSummaryOfMonth />}
        />
        <Route
          path="/resources/insighter-report"
          element={<InsighterReport />}
        />
        <Route
          path="/resources/insighter-report/:permalink"
          element={<InsighterReportDetail />}
        />
         <Route
          path="/media-release"
          element={<MediaRelease />}
        />
        <Route
          path="/video-gallery"
          element={<VideoGallery />}
        />
        <Route
          path="/video-gallery/:permalink"
          element={<VideoGalleryDetail />}
        />
         <Route
          path="/blog"
          element={<Blog />}
        />
        <Route
          path="/blog/an-actionable-guide-to-the-insight-sheet-database"
          element={<AnActionableGuideToTheInsightSheetDatabase />}
        />
        <Route
          path="/blog/discover-pre-generated-videos-and-gifs-in-your-matterport-scans-introduction"
          element={<DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction />}
        />
        <Route
          path="/blog/how-to-improve-your-estimates"
          element={<HowToImproveYourEstimates />}
        />
        <Route
          path="/blog/import-and-export-a-scan-from-the-matterport-capture-app"
          element={<ImportAndExportAScanFromTheMatterportCaptureApp />}
        />
        <Route
          path="/blog/scanning-large-spaces-with-a-matterport-pro3"
          element={<ScanningLargeSpacesWithAMatterportPro3 />}
        />
        <Route
          path="/blog/keyboard-shortcuts-for-xactimate"
          element={<KeyboardShortcutsForXactimate />}
        />
        <Route
          path="/blog/how-to-save-run-export-and-import-macros-for-xactimate"
          element={<HowToSaveRunExportAndImportMacrosForXactimate />}
        />
        <Route
          path="/blog/deep-links-in-matterport"
          element={<DeepLinksInMatterport />}
        />
        <Route
          path="/blog/violation-caution-and-warning-alerts-in-xactimate"
          element={<ViolationCautionAndWarningAlertsInXactimate />}
        />
        <Route
          path="/blog/how-to-use-xactimate-sketch-gallery"
          element={<HowToUseXactimateSketchGallery />}
        />
        <Route
          path="/blog/holiday-season-your-best-chance-to-get-matterport-certification"
          element={<HolidaySeasonYourBestChanceToGetMatterportCertification />}
        />
        <Route
          path="/blog/requesting-price-list-in-x1"
          element={<RequestingPriceListInX1 />}
        />
        <Route
          path="/blog/how-to-create-a-free-matterport-account-for-a-policy-holder"
          element={<HowToCreateAFreeMatterportAccountForAPolicyHolder />}
        />
        <Route
          path="/blog/trueplan-integration-with-xactimate"
          element={<TruePlanIntegrationWithXactimate />}
        />
        <Route
          path="/blog/logging-in-to-x1-and-syncing-profiles"
          element={<LoggingInToX1AndSyncingProfiles />}
        />
        <Route
          path="/blog/how-to-edit-project-names-in-xactimate-x1"
          element={<HowToEditProjectNamesInXactimateX1 />}
        />
        <Route
          path="/blog/how-do-you-request-a-new-alert-in-the-actionable-profile-for-better-xactimate-estimates"
          element={<HowDoYouRequestANewAlertInTheActionableProfileForBetterXactimateEstimates />}
        />
        <Route
          path="/blog/how-to-expand-and-collapse-the-guidance-provided-within-the-xactxpert-drawer"
          element={<HowToExpandAndCollapseTheGuidanceProvidedWithinTheXactXpertDrawer />}
        />
        <Route
          path="/resources/3d-training-modules"
          element={<TrainingModules />}
        />
        <Route
          path="/matterport-standards"
          element={<MatterportStandards />}
        />
        <Route
          path="/commonly-overlooked-line-items"
          element={<CommonlyOverlookedLineItems />}
        />
        <Route
          path="/advance-the-cause/actionable-profile-alert-request"
          element={<ActionableProfileAlertRequest />}
        />
        <Route
          path="/advance-the-cause/actionable-profile-alert-request/actionable-profile-alert-request-form"
          element={<ActionableProfileAlertRequestForm />}
        />
        <Route
          path="/advance-the-cause/line-item-request"
          element={<LineItemRequest />}
        />
        <Route
          path="/advance-the-cause/line-item-request/line-item-request-form"
          element={<LineItemRequestForm />}
        />
        <Route
          path="/advance-the-cause/xactimate-feature-request"
          element={<XactimateFeatureRequest />}
        />
        <Route
          path="/advance-the-cause/matterport-feature-request"
          element={<MatterportFeatureRequest />}
        />
        <Route
          path="/advance-the-cause/matterport-feature-request/matterport-feature-request-form"
          element={<MatterportFeatureRequestForm />}
        />
        <Route
          path="/advance-the-cause/insight-sheet-collaboration"
          element={<InsightSheetCollaboration />}
        />
        <Route
          path="/advance-the-cause/insight-sheet-collaboration/insight-sheets-collaboration-form"
          element={<InsightSheetCollaborationForm />}
        />
        <Route
          path="/swag"
          element={<Swag />}
        />
        <Route
          path="/plan-matrix"
          element={<PlanMatrix />}
        />
        <Route
          path="/enterprise-membership"
          element={<EnterprisePlan />}
        />
        <Route
          path="/actionable-insights-mitigation-and-repair-manual"
          element={<UmpiresManual />}
        />
        <Route
          path="/code-of-ethics"
          element={<CodeOfEthics />}
        />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />
        <Route
          path="/contact-us"
          element={<ContactUs />}
        />
        <Route
          path="/request-a-quote"
          element={<ContactUsForQuote />}
        />
        <Route
          path="/about-us"
          element={<AboutUs />}
        />
        <Route
          path="/gi-ownership"
          element={<GiOwnership />}
        />
        <Route
          path="/digital-assets-license-agreement"
          element={<DigitalAssetsLicenseAgreement />}
        />
        <Route
          path="/demo"
          element={<Demo />}
        />
        <Route
          path="/schedule"
          element={<Schedule />}
        />
        <Route
          path="/foundation-structure"
          element={<FoundationStructure />}
        />
        <Route
          path="/retail-labor-rates"
          element={<RetailLaborRates />}
        />
        <Route
          path="/transcending-the-restoration-paradox"
          element={<TranscendingTheRestorationParadox />}
        />
        <Route
          path="/mx_lvl2_ai_v10"
          element={<XactimateLevelCurriculum />}
        />
        <Route
          path="/race-machines-recap"
          element={<RaceWithTheMachinesRecap />}
        />
        <Route
          path="/state-insurance-license-reciprocity"
          element={<StateInsuranceLicenseReciprocity />}
        />
        <Route
          path="/resources/gift-cards/enterprise-gift-cards"
          element={<EnterpriseGiftCards />}
        />
        <Route
          path="/what-others-say"
          element={<WhatOthersSay />}
        />
        <Route
          path="/2019-year-review"
          element={<YearReview2019 />}
        />
        <Route
          path="/fit-guide"
          element={<FitGuide />}
        />
        <Route
          path="/media-kit"
          element={<MediaKit />}
        />
        <Route
          path="/aimc-refund-policy"
          element={<AimcRefundPolicy />}
        />
        <Route
          path="/aimc"
          element={<Aimc />}
        />
        <Route
          path="/aimc-graduates-public-registry"
          element={<AimcGraduatesPublicRegistry />}
        />
        <Route
          path="/private-training"
          element={<PrivateTraining />}
        />
        <Route
          path="/2-day-remote-training"
          element={<TwoDayRemoteTraining />}
        />
        <Route
          path="/3-day-site-training"
          element={<ThreeDaySiteTraining />}
        />
        <Route
          path="/train-tomorrow-today"
          element={<TrainTomorrowToday />}
        />
        <Route
          path="/actionable-xactimate-profile"
          element={<ActionableXactimateProfile />}
        />
        <Route
          path="/actionable-xactimate-profile/FAQ"
          element={<ActionableXactimateProfileFAQs />}
        />
        <Route
          path="/live"
          element={<Live />}
        />
        <Route
          path="/verisk-elevate"
          element={<VeriskElevate />}
        />
        <Route 
          path="/floodlight"
          element={<Floodlight />}
        />
        <Route 
          path="/customized-xactxpert-alerts"
          element={<CustomizedXactxpertAlerts />}
        />
        <Route 
          path="/elevate-leads"
          element={<ElevateLeads />}
        />
        <Route 
          path="/ria-convention-leads"
          element={<RiaConventionLeads />}
        />
        <Route
          path="/convention-leads"
          element={<ConventionLeads />}
        />
        <Route
          path="/ria-affinity-program"
          element={<RiaAffinityProgram />}
        />
        <Route
          path="/master-xactimate-improve-estimating-skills"
          element={<MasterXactimateImproveEstimatingSkills />}
        />
        <Route
          path="/master-xactimate-important-tips"
          element={<MasterXactimateImportantTips />}
        />
        <Route
          path="/become-expert-xactimate-estimator"
          element={<BecomeExpertXactimateEstimator />}
        />
        <Route
          path="/mastering-xactimate-for-beginners"
          element={<MasteringXactimateForBeginners />}
        />
        <Route
          path="/remote-xactimate-estimator"
          element={<RemoteXactimateEstimator />}
        />
        <Route
          path="/xactimate-macro"
          element={<XactimateMacro />}
        />
        <Route
          path="/improve-xactimate-estimates"
          element={<ImproveXactimateEstimates />}
        />
        <Route
          path="/xactimate-training-online"
          element={<XactimateTrainingOnline />}
        />
        <Route
          path="/actionable-profile-vs-estimate-reviewers"
          element={<ActionableProfileVsEstimateReviewers />}
        />
        <Route 
          path="/real-actionable-insights-website"
          element={<RealActionableInsightsWebsite />}
        />
        <Route
          path="/xactimate-future"
          element={
            <ExternalRedirect url="https://docs.google.com/forms/d/e/1FAIpQLSeWO5P-UGv-2vgFg9oEnrQYavivXvZjOsGPxqDMg7D5gdhGig/viewform?embedded=true" />
          }
        />
        <Route
          path="/404"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

export default App;
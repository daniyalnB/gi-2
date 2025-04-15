import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
const BuyEvent = React.lazy(() => import("./pages/Checkouts/event_checkout"));
const BuyCertification = React.lazy(() => import("./pages/Checkouts/certification_checkout"));
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
const RealActionableInsightsWebsite = React.lazy(() => import("./components/RealActionableInsightsWebsite"));
const ProtectedRouteCustomer = React.lazy(() => import("./components/ProtectedRouteCustomer"));
const AdminLogin = React.lazy(() => import("./gi-team/pages/login/login"));
const LoginMFA = React.lazy(() => import("./gi-team/pages/login/LoginMfa"));
const Enable2FA = React.lazy(() => import("./gi-team/components/Enable2FA"));
const Dashboard = React.lazy(() => import("./gi-team/pages/Dashboard/dashboard"));
const InsightSheetAdmin = React.lazy(() => import("./gi-team/pages/InsightSheets/insightsheet"));
const CreateInsightSheet = React.lazy(() => import("./gi-team/pages/InsightSheets/createInsightSheet"));
const UpdateInsightSheet = React.lazy(() => import("./gi-team/pages/InsightSheets/updateInsightSheet"));
const Products = React.lazy(() => import("./gi-team/pages/Products/products"));
const Macro = React.lazy(() => import("./gi-team/pages/Products/Macro/macro"));
const CreateMacro = React.lazy(() => import("./gi-team/pages/Products/Macro/createMacro"));
const UpdateMacro = React.lazy(() => import("./gi-team/pages/Products/Macro/updateMacro"));
const UmpiresManualAdmin = React.lazy(() => import("./gi-team/pages/Products/UmpiresManual/umpiresmanual"));
const SwagAdmin = React.lazy(() => import("./gi-team/pages/Products/Swag/swag"));
const CreateSwag = React.lazy(() => import("./gi-team/pages/Products/Swag/createSwag"));
const ViewSwag = React.lazy(() => import("./gi-team/pages/Products/Swag/viewSwag"));
const UpdateSwag = React.lazy(() => import("./gi-team/pages/Products/Swag/updateSwag"));
const ViewUmpiresManual = React.lazy(() => import("./gi-team/pages/Products/UmpiresManual/viewUmpiresManual"));
const UpdateUmpiresManual = React.lazy(() => import("./gi-team/pages/Products/UmpiresManual/updateUmpiresManual"));
const Certifications = React.lazy(() => import("./gi-team/pages/Products/Certifications/certifications"));
const CreateCertification = React.lazy(() => import("./gi-team/pages/Products/Certifications/createCertification"));
const ViewCertification = React.lazy(() => import("./gi-team/pages/Products/Certifications/viewCertification"));
const UpdataCertification = React.lazy(() => import("./gi-team/pages/Products/Certifications/updataCertification"));
const GiftCardsAdmin = React.lazy(() => import("./gi-team/pages/Products/GiftCards/giftcards"));
const EstimateEngines = React.lazy(() => import("./gi-team/pages/Products/EstimateEngines/estimateengines"));
const InsighterPointsBuckets = React.lazy(() => import("./gi-team/pages/Products/InsighterPointsBuckets/insighterpointsbuckets"));
const AimcGraduates = React.lazy(() => import("./gi-team/pages/Products/AimcGraduates/aimcgraduates"));
const UpdateAimcGraduate = React.lazy(() => import("./gi-team/pages/Products/AimcGraduates/updateAimcGraduate"));
const EventsAdmin = React.lazy(() => import("./gi-team/pages/Events/events"));
const CreateEvent = React.lazy(() => import("./gi-team/pages/Events/createEvent"));
const UpdateEvent = React.lazy(() => import("./gi-team/pages/Events/updateEvent"));
const EventAttendees = React.lazy(() => import("./gi-team/pages/Events/eventAttendees"));
const UpdateEventAttendee = React.lazy(() => import("./gi-team/pages/Events/updateEventAttendee"));
const PriceList = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/pricelistupdatesummary"));
const PriceListOfYear = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/pricelistupdatesummaryofyear"));
const CreatePriceListUpdateSummary = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/createPriceListUpdateSummary"));
const UpdatePriceListUpdateSummary = React.lazy(() => import("./gi-team/pages/PriceListUpdateSummary/updatePriceListUpdateSummary"));
const InsighterReportAdmin = React.lazy(() => import("./gi-team/pages/InsighterReport/insighterreport"));
const CreateInsighterReport = React.lazy(() => import("./gi-team/pages/InsighterReport/createInsighterReport"));
const UpdateInsighterReport = React.lazy(() => import("./gi-team/pages/InsighterReport/updateInsighterReport"));
const ManageRoles = React.lazy(() => import("./gi-team/pages/ManageRoles/manageroles"));
const CommonlyUsedLineItems = React.lazy(() => import("./gi-team/pages/CommonlyUsedLineItems/commonlyusedlineitems"));
const CreateCommonlyUsedLineItems = React.lazy(() => import("./gi-team/pages/CommonlyUsedLineItems/createCommonlyUsedLineItems"));
const UpdateCommonlyUsedLineItems = React.lazy(() => import("./gi-team/pages/CommonlyUsedLineItems/updateCommonlyUsedLineItems"));
const UsersAdmin = React.lazy(() => import("./gi-team/pages/Users/users"));
const UserDetails = React.lazy(() => import("./gi-team/pages/Users/userDetails"));
const UserSubscription = React.lazy(() => import("./gi-team/pages/Users/userSubscription"));
const EditUser = React.lazy(() => import("./gi-team/pages/Users/editUser"));
const SubscriptionCoupons = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/subscriptioncoupons"));
const CreateSubscriptionCoupon = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/createSubscriptionCoupon"));
const ViewSubscriptionCoupon = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/viewSubscriptionCoupon"));
const UpdateSubscriptionCoupon = React.lazy(() => import("./gi-team/pages/SubscriptionCoupons/updateSubscriptionCoupon"));
const VideoGalleryAdmin = React.lazy(() => import("./gi-team/pages/VideoGallery/videogallery"));
const CreateVideoGallery = React.lazy(() => import("./gi-team/pages/VideoGallery/createVideoGallery"));
const UpdateVideoGallery = React.lazy(() => import("./gi-team/pages/VideoGallery/updateVideoGallery"));
const Orders = React.lazy(() => import("./gi-team/pages/Orders/orders"));
const ViewOrder = React.lazy(() => import("./gi-team/pages/Orders/viewOrder"));
const RefundOrder = React.lazy(() => import("./gi-team/pages/Orders/refundOrder"));
const ProductCoupons = React.lazy(() => import("./gi-team/pages/ProductCoupons/productcoupons"));
const CreateProductCoupon = React.lazy(() => import("./gi-team/pages/ProductCoupons/createProductCoupon"));
const ViewProductCoupon = React.lazy(() => import("./gi-team/pages/ProductCoupons/viewProductCoupon"));
const UpdateProductCoupon = React.lazy(() => import("./gi-team/pages/ProductCoupons/updateProductCoupon"));
const InsighterPoints = React.lazy(() => import("./gi-team/pages/InsighterPoints/insighterpoints"));
const ViewCodes = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewCodes/viewcodes"));
const CreateCode = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewCodes/createCode"));
const ViewCode = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewCodes/viewCode"));
const ViewUserBalance = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewUserBalance/viewuserbalance"));
const BalanceDetails = React.lazy(() => import("./gi-team/pages/InsighterPoints/ViewUserBalance/balanceDetails"));
const Audit = React.lazy(() => import("./gi-team/pages/InsighterPoints/Audit/audit"));
const Reporting = React.lazy(() => import("./gi-team/pages/Reporting/reporting"));
const VeriskReporting = React.lazy(() => import("./gi-team/pages/Reporting/veriskreporting"));
const ActionableXactimateProfileLogos = React.lazy(() => import("./gi-team/pages/ActionableXactimateProfile/actionablexactimaterofile"));
const LiveStreamZone = React.lazy(() => import("./gi-team/pages/LiveStreamZone/livestreamzone"));
const XactimateSketchGalleryAdmin = React.lazy(() => import("./gi-team/pages/XactimateSketchGallery/xactimatesketchgallery"));
const CreateXactimateSketchGallery = React.lazy(() => import("./gi-team/pages/XactimateSketchGallery/createXactimateSketchGallery"));
const UpdateXactimateSketchGallery = React.lazy(() => import("./gi-team/pages/XactimateSketchGallery/updateXactimateSketchGallery"));
const MediaReleaseAdmin = React.lazy(() => import("./gi-team/pages/MediaRelease/mediarelease"));
const CreateMediaRelease = React.lazy(() => import("./gi-team/pages/MediaRelease/createMediaRelease"));
const UpdateMediaRelease = React.lazy(() => import("./gi-team/pages/MediaRelease/updateMediaRelease"));
const Subscriptions = React.lazy(() => import("./gi-team/pages/Subscriptions/subscriptions"));
const ViewSubscription = React.lazy(() => import("./gi-team/pages/Subscriptions/viewSubscription"));
const ViewTransactionHistory = React.lazy(() => import("./gi-team/pages/Subscriptions/viewTransactionHistory"));
const RefundSubscription = React.lazy(() => import("./gi-team/pages/Subscriptions/refundSubscription"));
const StartSubscription = React.lazy(() => import("./gi-team/pages/Subscriptions/startSubscription"));
const SubscriptionCheckout = React.lazy(() => import("./gi-team/pages/Subscriptions/subscriptionCheckout"));
const InviteUserCheckout = React.lazy(() => import("./gi-team/pages/Subscriptions/inviteUserCheckout"));
const ManagePayments = React.lazy(() => import("./gi-team/pages/Subscriptions/managePayments"));
const BlogAdmin = React.lazy(() => import("./gi-team/pages/Blog/blog"));
const CreateBlog = React.lazy(() => import("./gi-team/pages/Blog/createBlog"));
const UpdateBlog = React.lazy(() => import("./gi-team/pages/Blog/updateBlog"));
const ViewAllComments = React.lazy(() => import("./gi-team/pages/ViewAllComments/viewallcomments"));
const ViewAllCommentsType = React.lazy(() => import("./gi-team/pages/ViewAllComments/viewallcommentstype"));
const ProtectedRoute = React.lazy(() => import("./gi-team/components/ProtectedRoute"));

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/my-account"
          component={MyAccount}
        />
        <Route
          exact
          path="/my-account/lost-password"
          component={EmailForm}
        />
        <Route
          exact
          path="/my-account/lost-password/show-reset-form"
          component={PasswordForm}
        />
        <Route
          exact
          path="/ConfirmEmail"
          component={ActivateAccount}
        />
        <Route
          exact
          path="/get-started"
          component={Signup}
        />
        <Route
          exact
          path="/search"
          component={GlobalSearch}
        />
        <Route
          exact
          path="/events"
          component={Events}
        />
        <Route
          exact
          path="/event/:permalink"
          component={EventsDetail}
        />
        <Route
          exact
          path="/past-events"
          component={PastEvents}
        />
        <Route
          exact
          path="/online-sketch-gallery"
          component={XactimateSketchGallery}
        />
        <Route
          exact
          path="/insight-sheets"
          component={InsightSheet}
        />
        <Route
          exact
          path="/insight-sheets/:permalink"
          component={InsightSheetDetail}
        />
        <Route
          exact
          path="/s=:searchfield"
          component={InsightSheetDatabaseSearch}
        />
        <Route
          exact
          path="/insight-sheet-tutorial"
          component={InsightSheetTutorial}
        />
        <Route
          exact
          path="/macros"
          component={InsightSheetMacros}
        />
        <ProtectedRouteCustomer
          exact
          path="/shop/macros/:permalink"
          component={ProductMacro}
        />
        <ProtectedRouteCustomer
          exact
          path="/shop/uncategorized/:permalink"
          component={ProductUmpiresManual}
        />
        <ProtectedRouteCustomer
          exact
          path="/shop/swag/:permalink"
          component={ProductSwag}
        />
        <ProtectedRouteCustomer
          exact
          path="/shop/buy-points/insighter-points"
          component={ProductInsighterPoints}
        />
        {/* <ProtectedRouteCustomer
          exact
          path="/shop/gift-card/:permalink"
          component={ProductGiftCards}
        /> */}
        <ProtectedRouteCustomer
          exact
          path="/shop/certification/:permalink"
          component={ProductCertification}
        />
        <Route
          exact
          path="/resources/price-list-update-summary"
          component={PriceListUpdateSummary}
        />
        <Route
          exact
          path="/resources/price-list-update-summary/:permalink"
          component={PriceListUpdateSummaryOfMonth}
        />
        <Route
          exact
          path="/resources/insighter-report"
          component={InsighterReport}
        />
        <Route
          exact
          path="/resources/insighter-report/:permalink"
          component={InsighterReportDetail}
        />
        <Route
          exact
          path="/media-release"
          component={MediaRelease}
        />
        <Route
          exact
          path="/video-gallery"
          component={VideoGallery}
        />
        <Route
          exact
          path="/video-gallery/:permalink"
          component={VideoGalleryDetail}
        />
        <Route
          exact
          path="/blog"
          component={Blog}
        />
        <Route
          exact
          path="/blog/an-actionable-guide-to-the-insight-sheet-database"
          component={AnActionableGuideToTheInsightSheetDatabase}
        />
        <Route
          exact
          path="/blog/discover-pre-generated-videos-and-gifs-in-your-matterport-scans-introduction"
          component={DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction}
        />
        <Route
          exact
          path="/blog/how-to-improve-your-estimates"
          component={HowToImproveYourEstimates}
        />
        <Route
          exact
          path="/blog/import-and-export-a-scan-from-the-matterport-capture-app"
          component={ImportAndExportAScanFromTheMatterportCaptureApp}
        />
        <Route
          exact
          path="/blog/scanning-large-spaces-with-a-matterport-pro3"
          component={ScanningLargeSpacesWithAMatterportPro3}
        />
        <Route
          exact
          path="/blog/keyboard-shortcuts-for-xactimate"
          component={KeyboardShortcutsForXactimate}
        />
        <Route
          exact
          path="/blog/how-to-save-run-export-and-import-macros-for-xactimate"
          component={HowToSaveRunExportAndImportMacrosForXactimate}
        />
        <Route
          exact
          path="/blog/deep-links-in-matterport"
          component={DeepLinksInMatterport}
        />
        <Route
          exact
          path="/blog/violation-caution-and-warning-alerts-in-xactimate"
          component={ViolationCautionAndWarningAlertsInXactimate}
        />
        <Route
          exact
          path="/blog/how-to-use-xactimate-sketch-gallery"
          component={HowToUseXactimateSketchGallery}
        />
        <Route
          exact
          path="/blog/holiday-season-your-best-chance-to-get-matterport-certification"
          component={HolidaySeasonYourBestChanceToGetMatterportCertification}
        />
        <Route
          exact
          path="/blog/requesting-price-list-in-x1"
          component={RequestingPriceListInX1}
        />
        <Route
          exact
          path="/blog/how-to-create-a-free-matterport-account-for-a-policy-holder"
          component={HowToCreateAFreeMatterportAccountForAPolicyHolder}
        />
        <Route
          exact
          path="/blog/trueplan-integration-with-xactimate"
          component={TruePlanIntegrationWithXactimate}
        />
        <Route
          exact
          path="/blog/logging-in-to-x1-and-syncing-profiles"
          component={LoggingInToX1AndSyncingProfiles}
        />
        <Route
          exact
          path="/blog/how-to-edit-project-names-in-xactimate-x1"
          component={HowToEditProjectNamesInXactimateX1}
        />
        <Route
          exact
          path="/blog/how-do-you-request-a-new-alert-in-the-actionable-profile-for-better-xactimate-estimates"
          component={HowDoYouRequestANewAlertInTheActionableProfileForBetterXactimateEstimates}
        />
        <Route
          exact
          path="/blog/how-to-expand-and-collapse-the-guidance-provided-within-the-xactxpert-drawer"
          component={HowToExpandAndCollapseTheGuidanceProvidedWithinTheXactXpertDrawer}
        />
        <Route
          exact
          path="/resources/3d-training-modules"
          component={TrainingModules}
        />
        <Route
          exact
          path="/matterport-standards"
          component={MatterportStandards}
        />
        <Route
          exact
          path="/commonly-overlooked-line-items"
          component={CommonlyOverlookedLineItems}
        />
        {/* <ProtectedRouteCustomer
          exact
          path="/shop/form/solidifai"
          component={solidifai}
        /> */}
        {/* <Route
          exact
          path="/terms-and-conditions-solidifai"
          component={SolidifaiTermsAndConditions}
        /> */}
        {/* <ProtectedRouteCustomer
          exact
          path="/shop/form/zora"
          component={zora}
        /> */}
        {/* <Route
          exact
          path="/solidifai"
          component={zorasolidifai}
        /> */}
        <Route
          exact
          path="/advance-the-cause/actionable-profile-alert-request"
          component={ActionableProfileAlertRequest}
        />
        <Route
          exact
          path="/advance-the-cause/actionable-profile-alert-request/actionable-profile-alert-request-form"
          component={ActionableProfileAlertRequestForm}
        />
        <Route
          exact
          path="/advance-the-cause/line-item-request"
          component={LineItemRequest}
        />
        <Route
          exact
          path="/advance-the-cause/line-item-request/line-item-request-form"
          component={LineItemRequestForm}
        />
        <Route
          exact
          path="/advance-the-cause/xactimate-feature-request"
          component={XactimateFeatureRequest}
        />
        <Route
          exact
          path="/advance-the-cause/matterport-feature-request"
          component={MatterportFeatureRequest}
        />
        <Route
          exact
          path="/advance-the-cause/matterport-feature-request/matterport-feature-request-form"
          component={MatterportFeatureRequestForm}
        />
        <Route
          exact
          path="/advance-the-cause/insight-sheet-collaboration"
          component={InsightSheetCollaboration}
        />
        <Route
          exact
          path="/advance-the-cause/insight-sheet-collaboration/insight-sheets-collaboration-form"
          component={InsightSheetCollaborationForm}
        />
        <Route
          exact
          path="/swag"
          component={Swag}
        />
        {/* <Route
          exact
          path="/resources/gift-cards"
          component={GiftCards}
        /> */}
        <Route
          exact
          path="/plan-matrix"
          component={PlanMatrix}
        />
        <Route
          exact
          path="/enterprise-membership"
          component={EnterprisePlan}
        />
        <Route
          exact
          path="/actionable-insights-mitigation-and-repair-manual"
          component={UmpiresManual}
        />
        <Route
          exact
          path="/code-of-ethics"
          component={CodeOfEthics}
        />
        <Route
          exact
          path="/terms-and-conditions"
          component={TermsAndConditions}
        />
        <Route
          exact
          path="/contact-us"
          component={ContactUs}
        />
        <Route
          exact
          path="/request-a-quote"
          component={ContactUsForQuote}
        />
        <Route
          exact
          path="/about-us"
          component={AboutUs}
        />
        <Route
          exact
          path="/gi-ownership"
          component={GiOwnership}
        />
        <Route
          exact
          path="/digital-assets-license-agreement"
          component={DigitalAssetsLicenseAgreement}
        />
        <Route
          exact
          path="/demo"
          component={Demo}
        />
        <Route
          exact
          path="/schedule"
          component={Schedule}
        />
        <Route
          exact
          path="/foundation-structure"
          component={FoundationStructure}
        />
        <Route
          exact
          path="/retail-labor-rates"
          component={RetailLaborRates}
        />
        <Route
          exact
          path="/transcending-the-restoration-paradox"
          component={TranscendingTheRestorationParadox}
        />
        <Route
          exact
          path="/mx_lvl2_ai_v10"
          component={XactimateLevelCurriculum}
        />
        <Route
          exact
          path="/race-machines-recap"
          component={RaceWithTheMachinesRecap}
        />
        <Route
          exact
          path="/state-insurance-license-reciprocity"
          component={StateInsuranceLicenseReciprocity}
        />
        <Route
          exact
          path="/resources/gift-cards/enterprise-gift-cards"
          component={EnterpriseGiftCards}
        />
        <Route
          exact
          path="/what-others-say"
          component={WhatOthersSay}
        />
        <Route
          exact
          path="/2019-year-review"
          component={YearReview2019}
        />
        <Route
          exact
          path="/fit-guide"
          component={FitGuide}
        />
        <Route
          exact
          path="/media-kit"
          component={MediaKit}
        />
        <Route
          exact
          path="/aimc-refund-policy"
          component={AimcRefundPolicy}
        />
        <Route
          exact
          path="/aimc"
          component={Aimc}
        />
        {/* <Route
          exact
          path="/aimc-ce"
          component={AimcCe}
        /> */}
        <Route
          exact
          path="/aimc-graduates-public-registry"
          component={AimcGraduatesPublicRegistry}
        />
        {/* <Route
          exact
          path="/aitc"
          component={Aitc}
        /> */}
        <Route
          exact
          path="/private-training"
          component={PrivateTraining}
        />
        <Route
          exact
          path="/2-day-remote-training"
          component={TwoDayRemoteTraining}
        />
        <Route
          exact
          path="/3-day-site-training"
          component={ThreeDaySiteTraining}
        />
        <Route
          exact
          path="/train-tomorrow-today"
          component={TrainTomorrowToday}
        />
        <Route
          exact
          path="/actionable-xactimate-profile"
          component={ActionableXactimateProfile}
        />
        <Route
          exact
          path="/actionable-xactimate-profile/FAQ"
          component={ActionableXactimateProfileFAQs}
        />
        <Route 
          exact
          path="/live"
          component={Live}
        />
        <Route 
          exact
          path="/verisk-elevate"
          component={VeriskElevate}
        />
        <Route 
          exact
          path="/floodlight"
          component={Floodlight}
        />
        <Route 
          exact
          path="/customized-xactxpert-alerts"
          component={CustomizedXactxpertAlerts}
        />
        <Route 
          exact
          path="/elevate-leads"
          component={ElevateLeads}
        />
        <Route 
          exact
          path="/ria-convention-leads"
          component={RiaConventionLeads}
        />
        <Route 
          exact
          path="/convention-leads"
          component={ConventionLeads}
        />
        <Route 
          exact
          path="/ria-affinity-program"
          component={RiaAffinityProgram}
        />
        <Route 
          exact
          path="/master-xactimate-improve-estimating-skills"
          component={MasterXactimateImproveEstimatingSkills}
        />
        <Route 
          exact
          path="/master-xactimate-important-tips"
          component={MasterXactimateImportantTips}
        />
        <Route 
          exact
          path="/become-expert-xactimate-estimator"
          component={BecomeExpertXactimateEstimator}
        />
        <Route 
          exact
          path="/mastering-xactimate-for-beginners"
          component={MasteringXactimateForBeginners}
        />
        <Route 
          exact
          path="/remote-xactimate-estimator"
          component={RemoteXactimateEstimator}
        />
        <Route 
          exact
          path="/xactimate-macro"
          component={XactimateMacro}
        />
        <Route 
          exact
          path="/improve-xactimate-estimates"
          component={ImproveXactimateEstimates}
        />
        <Route 
          exact
          path="/xactimate-training-online"
          component={XactimateTrainingOnline}
        />
        <Route 
          exact
          path="/real-actionable-insights-website"
          component={RealActionableInsightsWebsite}
        />
        <Route
          exact
          path="/404"
          component={NotFound}
        />
        <Route
          exact
          path="/xactimate-future"
          component={() => {
            window.location.href =
              "https://docs.google.com/forms/d/e/1FAIpQLSeWO5P-UGv-2vgFg9oEnrQYavivXvZjOsGPxqDMg7D5gdhGig/viewform?embedded=true";
            return null;
          }}
        />
        <ProtectedRouteCustomer
          exact
          path="/checkout"
          component={BuyProduct}
        />
        <ProtectedRouteCustomer
          exact
          path="/buy-event"
          component={BuyEvent}
        />
        <ProtectedRouteCustomer
          exact
          path="/buy-certification"
          component={BuyCertification}
        />
        <ProtectedRouteCustomer
          exact
          path="/receipt"
          component={Receipt}
        />
        <ProtectedRouteCustomer
          exact
          path="/my-account/downloads"
          component={MyDownloads}
        />
        <ProtectedRouteCustomer
          exact
          path="/my-account/points"
          component={Points}
        />
        <ProtectedRouteCustomer
          exact
          path="/my-account/view-log"
          component={ReviewActivity}
        />
        <ProtectedRouteCustomer
          exact
          path="/my-account/cancel-subscription"
          component={CancelSubscription}
        />
        <ProtectedRouteCustomer
          exact
          path="/my-account/cancel-subscription-form"
          component={CancelSubscriptionForm}
        />
        <ProtectedRouteCustomer
          exact
          path="/users"
          component={Users}
        />
        <ProtectedRouteCustomer
          exact
          path="/users/actionable-xactimate-profile/:id"
          component={ActionableXactimateProfileChild}
        />
        {/* <ProtectedRouteCustomer
          exact
          path="/users/invite-users"
          component={InviteUsers}
        /> */}
        <ProtectedRouteCustomer
          exact
          path="/transaction-history"
          component={TransactionHistory}
        />
        <ProtectedRouteCustomer
          exact
          path="/download-certificate"
          component={DownloadCertificate}
        />
        <Route
          exact
          path={["/gi-team/login", "/gi-team"]}
          component={AdminLogin}
        />
        <Route
          exact
          path="/gi-team/login-mfa"
          component={LoginMFA}
        />
        <ProtectedRoute
          exact
          path="/gi-team/enable-2FA"
          component={Enable2FA}
        />
        <ProtectedRoute
          exact
          path="/gi-team/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/gi-team/reporting"
          component={Reporting}
        />
        <ProtectedRoute
          exact
          path="/gi-team/verisk-reporting"
          component={VeriskReporting}
        />
        <ProtectedRoute
          exact
          path="/gi-team/actionable-xactimate-profile"
          component={ActionableXactimateProfileLogos}
        />
        <ProtectedRoute
          exact
          path="/gi-team/live-stream-zone"
          component={LiveStreamZone}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insight-sheets"
          component={InsightSheetAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-insight-sheet"
          component={CreateInsightSheet}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-insight-sheet/:id"
          component={UpdateInsightSheet}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products"
          component={Products}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/macro"
          component={Macro}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/create-macro"
          component={CreateMacro}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/update-macro/:id"
          component={UpdateMacro}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/umpires-manual"
          component={UmpiresManualAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/view-umpires-manual/:id"
          component={ViewUmpiresManual}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/update-umpires-manual/:id"
          component={UpdateUmpiresManual}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/swag"
          component={SwagAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/create-swag"
          component={CreateSwag}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/view-swag/:id"
          component={ViewSwag}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/update-swag/:id"
          component={UpdateSwag}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/certifications"
          component={Certifications}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/create-certification"
          component={CreateCertification}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/view-certification/:id"
          component={ViewCertification}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/update-certification/:id"
          component={UpdataCertification}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/gift-cards"
          component={GiftCardsAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/estimate-engines"
          component={EstimateEngines}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/insighter-points-buckets"
          component={InsighterPointsBuckets}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/graduates"
          component={AimcGraduates}
        />
        <ProtectedRoute
          exact
          path="/gi-team/products/update-aimc-graduate/:id"
          component={UpdateAimcGraduate}
        />
        <ProtectedRoute
          exact
          path="/gi-team/events"
          component={EventsAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-event"
          component={CreateEvent}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-event/:id"
          component={UpdateEvent}
        />
        <ProtectedRoute
          exact
          path="/gi-team/event-attendees/:id"
          component={EventAttendees}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-event-attendee/:id"
          component={UpdateEventAttendee}
        />
        <ProtectedRoute
          exact
          path="/gi-team/price-list-update-summary"
          component={PriceList}
        />
        <ProtectedRoute
          exact
          path="/gi-team/price-list-update-summary-of-:year"
          component={PriceListOfYear}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-price-list-update-summary"
          component={CreatePriceListUpdateSummary}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-price-list-update-summary/:id"
          component={UpdatePriceListUpdateSummary}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-report"
          component={InsighterReportAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-insighter-report"
          component={CreateInsighterReport}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-insighter-report/:id"
          component={UpdateInsighterReport}
        />
        <ProtectedRoute
          exact
          path="/gi-team/commonly-used-line-items"
          component={CommonlyUsedLineItems}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-commonly-used-line-items"
          component={CreateCommonlyUsedLineItems}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-commonly-used-line-items/:id"
          component={UpdateCommonlyUsedLineItems}
        />
        <ProtectedRoute
          exact
          path="/gi-team/manage-roles"
          component={ManageRoles}
        />
        <ProtectedRoute
          exact
          path="/gi-team/users"
          component={UsersAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/user-details/:id"
          component={UserDetails}
        />
        <ProtectedRoute
          exact
          path="/gi-team/user-subscription/:id"
          component={UserSubscription}
        />
        <ProtectedRoute
          exact
          path="/gi-team/edit-user/:id"
          component={EditUser}
        />
        <ProtectedRoute
          exact
          path="/gi-team/subscription-coupons"
          component={SubscriptionCoupons}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-subscription-coupon"
          component={CreateSubscriptionCoupon}
        />
        <ProtectedRoute
          exact
          path="/gi-team/view-subscription-coupon/:id"
          component={ViewSubscriptionCoupon}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-subscription-coupon/:id"
          component={UpdateSubscriptionCoupon}
        />
        <ProtectedRoute
          exact
          path="/gi-team/video-gallery"
          component={VideoGalleryAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-video-gallery"
          component={CreateVideoGallery}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-video-gallery/:id"
          component={UpdateVideoGallery}
        />
        <ProtectedRoute
          exact
          path="/gi-team/orders"
          component={Orders}
        />
        <ProtectedRoute
          exact
          path="/gi-team/view-order/:ordernumber"
          component={ViewOrder}
        />
        <ProtectedRoute
          exact
          path="/gi-team/refund-order/:ordernumber"
          component={RefundOrder}
        />
        <ProtectedRoute
          exact
          path="/gi-team/product-coupons"
          component={ProductCoupons}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-product-coupon"
          component={CreateProductCoupon}
        />
        <ProtectedRoute
          exact
          path="/gi-team/view-product-coupon/:id"
          component={ViewProductCoupon}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-product-coupon/:id"
          component={UpdateProductCoupon}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-points"
          component={InsighterPoints}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-points/view-codes"
          component={ViewCodes}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-points/create-code"
          component={CreateCode}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-points/view-code/:id"
          component={ViewCode}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-points/view-user-balance"
          component={ViewUserBalance}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-points/balance-details/:id"
          component={BalanceDetails}
        />
        <ProtectedRoute
          exact
          path="/gi-team/insighter-points/audit"
          component={Audit}
        />
        <ProtectedRoute
          exact
          path="/gi-team/subscriptions"
          component={Subscriptions}
        />
        <ProtectedRoute
          exact
          path="/gi-team/view-subscription/:id"
          component={ViewSubscription}
        />
        <ProtectedRoute
          exact
          path="/gi-team/transaction-history/:id"
          component={ViewTransactionHistory}
        />
         <ProtectedRoute
          exact
          path="/gi-team/refund-subscription/:id"
          component={RefundSubscription}
        />
        <ProtectedRoute
          exact
          path="/gi-team/start-subscription/:id"
          component={StartSubscription}
        />
        <ProtectedRoute
          exact
          path="/gi-team/subscription-checkout/:id"
          component={SubscriptionCheckout}
        />
        <ProtectedRoute
          exact
          path="/gi-team/invite-user-checkout"
          component={InviteUserCheckout}
        />
        <ProtectedRoute
          exact
          path="/gi-team/manage-payment/:id"
          component={ManagePayments}
        />
        <ProtectedRoute
          exact
          path="/gi-team/xactimate-sketch-gallery"
          component={XactimateSketchGalleryAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-xactimate-sketch-gallery"
          component={CreateXactimateSketchGallery}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-xactimate-sketch-gallery/:id"
          component={UpdateXactimateSketchGallery}
        />
        <ProtectedRoute
          exact
          path="/gi-team/media-release"
          component={MediaReleaseAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-media-release"
          component={CreateMediaRelease}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-media-release/:id"
          component={UpdateMediaRelease}
        />
        <ProtectedRoute
          exact
          path="/gi-team/blog"
          component={BlogAdmin}
        />
        <ProtectedRoute
          exact
          path="/gi-team/create-blog"
          component={CreateBlog}
        />
        <ProtectedRoute
          exact
          path="/gi-team/update-blog/:id"
          component={UpdateBlog}
        />
        <ProtectedRoute
          exact
          path="/gi-team/view-all-comments"
          component={ViewAllComments}
        />
        <ProtectedRoute
          exact
          path="/gi-team/view-all-comments/:type"
          component={ViewAllCommentsType}
        />
        {/* <Redirect from="*" to="/404" /> */}
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
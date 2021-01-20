import LoginPage from "./login/Index";
import RedirectPage from "./redirect/RedirectPage";
import DashboardPage from "./dashboard/DashboardPage";
import Board_Details from "./board-details/Board_Details";
import { UserManagement } from "./back-office/UserManagement";
import { UserOverview } from "./back-office/UserOverview";
import { SignUpRequests } from "../components/SignUpRequests";
import ChecklistManagement from "./back-office/ChecklistManagement";
import { Roles } from "./back-office/Roles";
import { Forms } from "./forms/Forms";
import CreateForms from "./forms/CreateForms";
import FormPublicView from "./FormPublicView";
import SignUp from "./sign-up/SignUp";
import { UserProManagement } from "./back-office/UserProManagement";
import { UserProOverview } from "./back-office/UserProOverview";
import AppManagement from "./back-office/AppManagement";
import { BranchsList } from "./back-office/BranchsList";
import Branchs from "./back-office/Branchs";
import BranchDetails from "./back-office/BranchDetails";
import { BranchPaymentDetails } from "./back-office/BranchPaymentDetails";
import Mortgages from "./back-office/Mortgages";
import { MortgageDetails } from "./back-office/MortgageDetails";
import { AllSubscriptions } from "./back-office/AllSubscriptions";
import BranchSubscriptionDetails from "./back-office/BranchSubscriptionDetails";
import checkSubmission from "./back-office/checkSubmission";

export const ROUTES = [
  {
    component: LoginPage,
    isPublic: true,
    path: "/login",
    slug: "login",
    title: "Login",
    isLogin: false,
    redirectTo: "/dashboard",
  },
  {
    component: SignUp,
    isPublic: true,
    path: "/signup",
    slug: "signup",
    title: "Sign Up",
    isLogin: false,
    redirectTo: "/dashboard",
  },
  {
    component: FormPublicView,
    isPublic: true,
    path: "/e/:boardid",
    slug: "e",
    title: "e",
    redirectTo: "/dashboard",
  },
  {
    component: RedirectPage,
    isPublic: true,
    path: "/redirect",
    slug: "redirect",
    title: "Redirect",
  },
  {
    component: DashboardPage,
    isExact: true,
    path: "/dashboard",
    slug: "dashboard",
    title: "dashboard",
    redirectTo: "/login",
  },
  {
    component: Board_Details,
    isExact: true,
    path: "/boarddetails/:boardid?/:cardid?",
    slug: "board",
    title: "board",
    redirectTo: "/login",
  },
  {
    component: Forms,
    isExact: true,
    path: "/boarddetails/:boardid?/forms",
    slug: "forms",
    title: "forms",
    redirectTo: "/login",
  },
  {
    component: CreateForms,
    isExact: true,
    path: "/boarddetails/:boardid?/createform",
    slug: "forms",
    title: "forms",
    redirectTo: "/login",
  },
  {
    component: UserManagement,
    isExact: true,
    path: "/admin/:boardid?/usermanagement/",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: UserOverview,
    isExact: true,
    path: "/admin/:boardid?/useroverview/:userid",
    slug: "useroverview",
    title: "useroverview",
    redirectTo: "/login",
  },
  {
    component: UserProManagement,
    isExact: true,
    path: "/admin/:boardid?/userpromanagement/",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: Branchs,
    isExact: true,
    path: "/admin/:boardid?/branch/",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: Mortgages,
    isExact: true,
    path: "/admin/:boardid?/mortgage/",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: BranchDetails,
    isExact: true,
    path: "/admin/:boardid?/branchdetails/:branchid",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: MortgageDetails,
    isExact: true,
    path: "/admin/:boardid?/mortgagedetails/:branchid",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: BranchPaymentDetails,
    isExact: true,
    path: "/admin/:boardid?/branchpaymentdetails/:branchid",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: BranchSubscriptionDetails,
    isExact: true,
    path: "/admin/:boardid?/branchsubscriptiondetails/:branchid",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: BranchPaymentDetails,
    isExact: true,
    path: "/admin/:boardid?/mortgagepaymentdetails/:branchid",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: BranchSubscriptionDetails,
    isExact: true,
    path: "/admin/:boardid?/mortgagesubscriptiondetails/:branchid",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: UserProOverview,
    isExact: true,
    path: "/admin/:boardid?/userprooverview/:userid",
    slug: "useroverview",
    title: "useroverview",
    redirectTo: "/login",
  },
  {
    component: BranchsList,
    isExact: true,
    path: "/admin/:boardid?/branchs",
    slug: "useroverview",
    title: "useroverview",
    redirectTo: "/login",
  },

  {
    component: AppManagement,
    isExact: true,
    path: "/admin/:boardid?/appmanagement/",
    slug: "appmanagement",
    title: "appmanagement",
    redirectTo: "/login",
  },
  {
    component: Roles,
    isExact: true,
    path: "/admin/:boardid?/roles/",
    slug: "roles",
    title: "roles",
    redirectTo: "/login",
  },
  {
    component: AllSubscriptions,
    isExact: true,
    path: "/admin/:boardid?/subscriptions",
    slug: "usermanagement",
    title: "usermanagement",
    redirectTo: "/login",
  },
  {
    component: checkSubmission,
    isExact: true,
    path: "/admin/:boardid?/checksubmission",
    slug: "checksubmission",
    title: "checksubmission",
    redirectTo: "/login",
  },
];

import { Observable } from "rxjs/Observable";
import { ajax } from "rxjs/observable/dom/ajax";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";
import history from "../history";
import appConfig from "../../appConfig.json";

const baseURL = `${appConfig[window.location.hostname]}:${ appConfig.serverPort
}`;

const requestHeader = (isJson? ) => {
  let headers = {};

  if (!isJson) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  let token: string | boolean = false;

  if (localStorage.token) {
    token = localStorage.token;
    // console.log(token, "token");
  }

  if (token) {
    headers["sessiontoken"] = localStorage.token;
  } else {
    headers["sessiontoken"] = "17d26ca06932e52bbac7f1e0be00227d";
  }
  return headers;
};

const handleError = (operation: string) => (err: any) => {
  const errMsg = `Error in ${operation}()`;
  console.log( err, `${errMsg}`);

  if (err.status === 401) {
    localStorage.removeItem("token");
    history.push("/gi-team/login");
    localStorage.removeItem("activeTab");
    return Observable.throw(err);
  }

  if (err.status === 503) {
    return Observable.throw(err);
  }
};

const requestHeaderCustomer = (isJson? ) => {
  let headers = {};

  if (!isJson) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  let tokenCustomer: string | boolean = false;

  if (localStorage.tokenCustomer) {
    tokenCustomer = localStorage.tokenCustomer;
    // console.log(tokenCustomer, "tokenCustomer");
  }

  if (tokenCustomer) {
    headers["sessiontoken"] = localStorage.tokenCustomer;
  } else {
    headers["sessiontoken"] = "17d26ca06932e52bbac7f1e0be00227d";
  }

  let resettoken: string | boolean = false;

  if (localStorage.resettoken) {
    resettoken = localStorage.resettoken;
    // console.log(resettoken, "resettoken");
  }

  if (resettoken) {
    headers["resettoken"] = localStorage.resettoken;
  }

  let signoutTokenCustomer: string | boolean = false;

  if (localStorage.signoutTokenCustomer) {
    signoutTokenCustomer = localStorage.signoutTokenCustomer;
    // console.log(signoutTokenCustomer, "signoutTokenCustomer");
  }

  if (signoutTokenCustomer) {
    headers["sessiontoken"] = localStorage.signoutTokenCustomer;
  }

  return headers;
};

const handleErrorCustomer = (operation: string) => (err: any) => {
  const errMsg = `Error in ${operation}()`;
  console.log(`${errMsg}:`, err);

  if (err.status === 400) {
    return Observable.throw(err);
  }

  if (err.status === 401) {
    localStorage.removeItem("tokenCustomer");
    history.push("/my-account");
    return Observable.throw(err);
  }

  if (err.status === 404) {
    history.push("/404");
    return Observable.throw(err);
  }

  if (err.status === 405) {
    return Observable.throw(err);
  }

  if (err.status === 420) {
    return Observable.throw(err);
  }

  if (err.status === 500) {
    history.push("/");
  }

  if (err.status === 503) {
    return Observable.throw(err);
  }

  if (err.status === 504) {
    history.push("/404");
    return Observable.throw(err);
  }
};

export const auth = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/IsValidAdminToken`,
  }).pipe(catchError(handleError("auth")));

export const login = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdminLogin`,
    body: payload,
    responseType: "json",
  }).pipe(catchError(handleError("login")));

export const logoutAPI = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AdminLogout`,
  }).pipe(catchError(handleError("logout")));

export const getServerTime = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GetServerTime`,
  }).pipe(catchError(handleError("getServerTime")));

export const UpdateMFASetting = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/UpdateMFASetting?${payload}`,
  }).pipe(catchError(handleError("UpdateMFASetting")));

export const GetAllInsightSheets = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllInsightSheets`,
  }).pipe(catchError(handleError("GetAllInsightSheets")));

export const AddOrUpdateInsightSheet = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateInsightSheet?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateInsightSheet")));

export const GetAllXactimateSketch = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllXactimateSketch`,
  }).pipe(catchError(handleError("GetAllXactimateSketch")));

export const AddOrUpdateXactimateSketch = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateXactimateSketch?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateXactimateSketch")));

export const AddOrUpdateMacro = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateMacro?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateMacro")));

export const GetAllMacros = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllMacros`,
  }).pipe(catchError(handleError("GetAllMacros")));

export const AddOrUpdateEvent = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateEvent?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateEvent")));

export const GetAllEvents = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllEvents`,
  }).pipe(catchError(handleError("GetAllEvents")));

export const GetEventDetails = (eventId) =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/GetEventDetails?eventId=${eventId}`,
  }).pipe(catchError(handleError("GetEventDetails")));

export const UpdateEventAttendeeInformation = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/UpdateEventAttendeeInformation?${payload}`,
  }).pipe(catchError(handleError("UpdateEventAttendeeInformation")));

export const StudentTicketTransfer = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/StudentTicketTransfer?${payload}`,
  }).pipe(catchError(handleError("StudentTicketTransfer")));

export const ShiftEventTicket = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/ShiftEventTicket?${payload}`,
  }).pipe(catchError(handleError("ShiftEventTicket")));

export const DeleteEventAttendee = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/DeleteEventAttendee?${payload}`,
  }).pipe(catchError(handleError("DeleteEventAttendee")));

export const AddOrUpdatePriceListUpdateSummary = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdatePriceListUpdateSummary?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdatePriceListUpdateSummary")));

export const GetAllPriceListUpdateSummary = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllPriceListUpdateSummary`,
  }).pipe(catchError(handleError("GetAllPriceListUpdateSummary")));

export const AddOrUpdateInsighterReport = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateInsighterReport?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateInsighterReport")));

export const GetAllPriceInsighterReports = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllPriceInsighterReports`,
  }).pipe(catchError(handleError("GetAllPriceInsighterReports")));

export const AddOrUpdateMediaRelease = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateMediaRelease?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateMediaRelease")));

export const AddAIProfilelogo = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddAIProfilelogo?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddAIProfilelogo")));

export const DeleteAILogo = (logourl) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/DeleteAILogo?${logourl}`,
  }).pipe(catchError(handleError("DeleteAILogo")));

export const GetAllMediaRelease = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllMediaRelease`,
  }).pipe(catchError(handleError("GetAllMediaRelease")));

export const AddOrUpdateCommonlyOverlookedLineItems = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateCommonlyOverlookedLineItems?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateCommonlyOverlookedLineItems")));

export const GetAllCommonlyOverlookedLineItems = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllCommonlyOverlookedLineItems`,
  }).pipe(catchError(handleError("GetAllCommonlyOverlookedLineItems")));

export const addSubscriptionCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/addSubscriptionCoupon`,
    body: payload,
  }).pipe(catchError(handleError("addSubscriptionCoupon")));

export const editSubscriptionCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/editSubscriptionCoupon`,
    body: payload,
  }).pipe(catchError(handleError("editSubscriptionCoupon")));

export const activateOrDeactivateSubscriptionCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/activateOrDeactivateSubscriptionCoupon?${payload}`,
  }).pipe(catchError(handleError("activateOrDeactivateSubscriptionCoupon")));

export const getAllSubscriptionCoupon = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getAllSubscriptionCoupon`,
  }).pipe(catchError(handleError("getAllSubscriptionCoupon")));

export const addOrUpdateCertification = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/addOrUpdateCertification?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("addOrUpdateCertification")));

export const getAIMCGraduatesData = () =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/getAIMCGraduatesData`,
  }).pipe(catchError(handleError("getAIMCGraduatesData")));

export const updateAIMCGraduatesData = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/updateAIMCGraduatesData?${payload}`,
  }).pipe(catchError(handleError("updateAIMCGraduatesData")));

export const getAllCertifications = () =>
    ajax({
      headers: requestHeader(),
      method: "POST",
      url: `${baseURL}/CMSAdmin/getAllCertifications`,
    }).pipe(catchError(handleError("getAllCertifications")));

export const deleteSubscriptionCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/archiveSubscriptionCoupon?id=${payload.id}`,
  }).pipe(catchError(handleError("deleteSubscriptionCoupon")));

export const editProductCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/editProductCoupon`,
    body: payload,
  }).pipe(catchError(handleError("editProductCoupon")));

export const addProductCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/addProductCoupon`,
    body: payload,
  }).pipe(catchError(handleError("addProductCoupon")));

export const activateOrDeactivateProductCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/activateOrDeactivateProductCoupon?${payload}`,
  }).pipe(catchError(handleError("activateOrDeactivateProductCoupon")));

export const getAllProductCoupon = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getAllProductCoupon`,
  }).pipe(catchError(handleError("getAllProductCoupon")));

export const deleteProductCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/archiveProductCoupon?id=${payload.id}`,
  }).pipe(catchError(handleError("deleteProductCoupon")));

export const getAllProductsForProductCoupons = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getAllProductsForProductCoupons`,
  }).pipe(catchError(handleError("getAllProductsForProductCoupons")));

export const addInsighterPointsCoupon = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/addInsighterPointsCoupon`,
    body: payload,
  }).pipe(catchError(handleError("addInsighterPointsCoupon")));

export const getAllCustomerInfo = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getAllCustomerInfo`,
  }).pipe(catchError(handleError("getAllCustomerInfo")));

export const getAllSubscriptions = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getAllSubscriptions`,
  }).pipe(catchError(handleError("getAllSubscriptions")));

export const getCustomerChildUserDetails = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCustomerChildUserDetails`,
  }).pipe(catchError(handleError("getCustomerChildUserDetails")));

export const GetCustomerAcountAlias = (customerid) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetCustomerAcountAlias?customerid=${customerid}`,
  }).pipe(catchError(handleError("GetCustomerAcountAlias")));

export const AddCustomerAcountAlias = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddCustomerAcountAlias?${payload}`,
  }).pipe(catchError(handleError("AddCustomerAcountAlias")));

export const RemoveCustomerAcountAlias = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/RemoveCustomerAcountAlias?${payload}`,
  }).pipe(catchError(handleError("RemoveCustomerAcountAlias")));

export const UpdateCustomerAcountAliasPassword = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/UpdateCustomerAcountAliasPassword?${payload}`,
  }).pipe(catchError(handleError("UpdateCustomerAcountAliasPassword")));

export const addCouponAgainstSubscription = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/addCouponAgainstSubscription?${payload}`,
  }).pipe(catchError(handleError("addCouponAgainstSubscription")));

export const getCustomerInfoById = (customerId) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCustomerInfoById?customerId=${customerId}`,
  }).pipe(catchError(handleError("getCustomerInfoById")));

export const getCustomerSubscriptionHistory = (customerId) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCustomerSubscriptionHistory?customerId=${customerId}`,
  }).pipe(catchError(handleError("getCustomerSubscriptionHistory")));

export const getCustomerOrderTransactionsHistoryAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCustomerOrderTransactionsHistory?${payload}`,
  }).pipe(catchError(handleError("getCustomerOrderTransactionsHistoryAdmin")));

export const getCustomerRefundHistoryAdmin = (customerId) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCustomerRefundHistory?customerId=${customerId}`,
  }).pipe(catchError(handleError("getCustomerRefundHistoryAdmin")));

export const getCustomerInvitationHistoryAdmin = (customerId) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCustomerInvitationHistory?customerId=${customerId}`,
  }).pipe(catchError(handleError("getCustomerInvitationHistoryAdmin")));

export const getCustomerCertificationDetails = (customerId) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCustomerCertificationDetails?customerId=${customerId}`,
  }).pipe(catchError(handleError("getCustomerCertificationDetails")));

export const updateCustomerInfo = (payload) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/updateCustomerInfo?${payload}`,
  }).pipe(catchError(handleError("updateCustomerInfo")));

export const updateCustomerPassword = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/updateCustomerInfo?${payload}`,
  }).pipe(catchError(handleError("updateCustomerPassword")));

export const updateXactProfileAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/updateXactProfile?${payload}`,
  }).pipe(catchError(handleError("updateXactProfileAdmin")));

export const applyCouponsAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getCouponPreview?${payload}`,
  }).pipe(catchError(handleError("applyCouponsAdmin")));

export const setDefaultPaymentMenthodAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/setDefaultPaymentMenthod?${payload}`,
  }).pipe(catchError(handleError("setDefaultPaymentMenthodAdmin")));

export const setBackupPaymentMenthodAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/setBackupCard?${payload}`,
  }).pipe(catchError(handleError("setBackupPaymentMenthodAdmin")));

export const getSetupIntentAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getSetupIntent?${payload}`,
  }).pipe(catchError(handleError("getSetupIntentAdmin")));

export const startSubscriptionPlanAdmin = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/startSubscriptionPlan?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleError("startSubscriptionPlanAdmin")));

export const cancelCustomersSubscriptionPlan = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/cancelCustomersSubscriptionPlan?customerId=${payload.customerId}`,
  }).pipe(catchError(handleError("cancelCustomersSubscriptionPlan")));

export const changeSubscriptionPlanStatusToPendingCancellationAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/changeSubscriptionPlanStatusToPendingCancellation?customerId=${payload.customerId}`,
  }).pipe(catchError(handleError("changeSubscriptionPlanStatusToPendingCancellationAdmin")));

export const refundOrderOrSubscriptionAmount = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/refundOrderOrSubscriptionAmount?${payload}`,
  }).pipe(catchError(handleError("refundOrderOrSubscriptionAmount")));

export const addOrDeductCustomerInsighterPoint = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/addOrDeductCustomerInsighterPoint?${payload}`,
  }).pipe(catchError(handleError("addOrDeductCustomerInsighterPoint")));

export const getAllInsighterPointsCoupons = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getAllInsighterPointsCoupons`,
  }).pipe(catchError(handleError("getAllInsighterPointsCoupons")));

export const getInsighterPointCouponUsage = (id) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/getInsighterPointCouponUsage?id=${id}`,
  }).pipe(catchError(handleError("getInsighterPointCouponUsage")));

export const AddOrUpdateVideoGallaryItem = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateVideoGallaryItem?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateVideoGallaryItem")));

export const GetVideoGallaryItems = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetVideoGallaryItems`,
  }).pipe(catchError(handleError("GetVideoGallaryItems")));

export const AddOrUpdateBlog = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateBlog?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateBlog")));

export const GetBlogs = () =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/GetBlogs`,
  }).pipe(catchError(handleError("GetBlogs")));

export const GetBlogByBlogId = (blogId) =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/GetBlogByBlogId?blogId=${blogId}`,
  }).pipe(catchError(handleError("GetBlogByBlogId")));

export const AddOrUpdateUmpiresManual = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateUmpiresManual?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("AddOrUpdateUmpiresManual")));

export const GetAllUmpiresManuals = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllUmpiresManuals`,
  }).pipe(catchError(handleError("GetAllUmpiresManuals")));

export const removeFeaturedImageFromUmpiresManual = (payload) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/removeFeaturedImageFromUmpiresManual?${payload}`,
  }).pipe(catchError(handleError("removeFeaturedImageFromUmpiresManual")));

export const addOrUpdateSwagProduct = (payload, formData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/addOrUpdateSwagProduct?${payload}`,
    body: formData,
  }).pipe(catchError(handleError("addOrUpdateSwagProduct")));

export const GetAllSwagProducts = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllSwagProducts`,
  }).pipe(catchError(handleError("GetAllSwagProducts")));

export const GetAllOrders = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllOrders`,
  }).pipe(catchError(handleError("GetAllOrders")));

export const UpdateOrder = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/UpdateOrder?${payload}`,
  }).pipe(catchError(handleError("UpdateOrder")));

export const GetAllUsers = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllUsers`,
  }).pipe(catchError(handleError("GetAllUsers")));
  
export const GetAllAssignableRoles = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetAllAssignableRoles`,
  }).pipe(catchError(handleError("GetAllAssignableRoles")));

export const ChangeRoleOfUser = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/ChangeRoleOfUser?${payload}`,
  }).pipe(catchError(handleError("ChangeRoleOfUser")));

export const revokeAdminRole = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/revokeAdminRole?userId=${payload.id}`,
  }).pipe(catchError(handleError("revokeAdminRole")));

export const removeChildAccountAdmin = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/removeChildAccount?${payload}`,
  }).pipe(catchError(handleError("removeChildAccountAdmin")));

export const AddOrUpdateLiveSessionDetails = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/AddOrUpdateLiveSessionDetails?${payload}`,
    body: payload,
  }).pipe(catchError(handleError("AddOrUpdateLiveSessionDetails")));

export const GetDashboardData = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/GetDashboardData`,
  }).pipe(catchError(handleError("GetDashboardData")));

export const deletePaymentMethod = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/deletePaymentMethod?${payload}`,
  }).pipe(catchError(handleError("deletePaymentMethod")));

export const inviteUsersAdmin = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/inviteAUserAsChild?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleError("inviteUsersAdmin")));

export const ChildPaymentPreviewAdmin = (toInvites, customerId) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/CMSAdmin/inviteAUserAsChildGetPaymentPreview?customerId=${customerId}`,
    body: toInvites,
  }).pipe(catchError(handleError("ChildPaymentPreviewAdmin")));

export const getCommentsTypeAndCount = () =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/getCommentsTypeAndCount`,
  }).pipe(catchError(handleError("getCommentsTypeAndCount")));

export const getCommentsDetailsByType = (type) =>
  ajax({
    headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/CMSAdmin/getCommentsDetailsByType?type=${type}`,
  }).pipe(catchError(handleError("getCommentsDetailsByType")));

export const customerAuth = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/IsValidCustomerToken`,
  }).pipe(catchError(handleErrorCustomer("customerAuth")));

export const customerLogin = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/CustomerLogin`,
    body: payload,
    responseType: "json",
  }).pipe(catchError(handleErrorCustomer("customerLogin")));

export const ForgotPassword = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/requestPasswordResetURL?${payload}`,
    responseType: "text",
  }).pipe(catchError(handleErrorCustomer("ForgotPassword")));

export const ResetPassword = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/resetPasswordWithToken?${payload}`,
    responseType: "text",
  }).pipe(catchError(handleErrorCustomer("ResetPassword")));

export const RegisterNewCustomerStep1 = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/RegisterNewCustomerStep1?${payload}`,
    responseType: "json",
  }).pipe(catchError(handleErrorCustomer("RegisterNewCustomerStep1")));

export const RegisterNewCustomerStep2 = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/RegisterNewCustomerStep2?${payload}`,
    responseType: "json",
  }).pipe(catchError(handleErrorCustomer("RegisterNewCustomerStep2")));

export const RegisterNewCustomerStep3 = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/RegisterNewCustomerStep3?${payload}`,
    responseType: "json",
  }).pipe(catchError(handleErrorCustomer("RegisterNewCustomerStep3")));

export const RegisterNewCustomerStep4 = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/RegisterNewCustomerStep4?${payload}`,
    responseType: "json",
  }).pipe(catchError(handleErrorCustomer("RegisterNewCustomerStep4")));

export const RegisterNewCustomerStep5 = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/RegisterNewCustomerStep5?${payload}`,
    responseType: "json",
  }).pipe(catchError(handleErrorCustomer("RegisterNewCustomerStep5")));

export const resendVerificationEmail = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/resendVerificationEmail?${payload}`,
    responseType: "text",
  }).pipe(catchError(handleErrorCustomer("resendVerificationEmail")));

export const customerLogout = (removeAll) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/CustomerLogout?removeAll=${removeAll}`,
  }).pipe(catchError(handleErrorCustomer("customerLogout")));

export const ActivateAccountAPI = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "GET",
    url: `${baseURL}/ConfirmEmail?${payload}`,
  }).pipe(catchError(handleErrorCustomer("")));

export const updateLoggedInUser = (payload, profilepicture) => {
  const x = profilepicture;
  return  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/updateLoggedInUser?${payload}`,
    body: x,
  }).pipe(catchError(handleErrorCustomer("updateLoggedInUser")));
};

export const getLoggedInUserInfo = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getLoggedInUserInfo`,
  }).pipe(catchError(handleErrorCustomer("getLoggedInUserInfo")));

export const getSetupIntent = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getSetupIntent?${payload}`,
  }).pipe(catchError(handleErrorCustomer("getSetupIntent")));

export const getCustomerInfoAPI = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getCustomerInfo`,
  }).pipe(catchError(handleErrorCustomer("getCardInfoAPI")));

export const updateXactProfile = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/updateXactProfile?${payload}`,
  }).pipe(catchError(handleErrorCustomer("updateXactProfile")));

export const updateChildUserXactProfile = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/updateChildUserXactProfile?${payload}`,
  }).pipe(catchError(handleErrorCustomer("updateChildUserXactProfile")));

export const setDefaultPaymentMenthod = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/setDefaultPaymentMenthod?${payload}`,
  }).pipe(catchError(handleErrorCustomer("setDefaultPaymentMenthod")));

export const setBackupPaymentMenthod = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/setBackupCard?${payload}`,
  }).pipe(catchError(handleErrorCustomer("setBackupPaymentMenthod")));

export const getDefaultPaymentMethods = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getDefaultPaymentMethods`,
  }).pipe(catchError(handleErrorCustomer("getDefaultPaymentMethods")));

export const deletePaymentMenthod = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/deletePaymentMenthod?${payload}`,
  }).pipe(catchError(handleErrorCustomer("deletePaymentMenthod")));

export const GetAllSubscriptionPlan = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllSubscriptionPlan`,
  }).pipe(catchError(handleErrorCustomer("GetAllSubscriptionPlan")));

export const GetLimitedTimeOffer = (customerId) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "GET",
    url: `${baseURL}/Customer/GetLimitedTimeOffer?customerId=${customerId}`,
  }).pipe(catchError(handleErrorCustomer("GetLimitedTimeOffer")));

export const ClaimCancellationDiscountOffer = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/ClaimCancellationDiscountOffer?${payload}`,
  }).pipe(catchError(handleErrorCustomer("ClaimCancellationDiscountOffer")));

export const getSubscriptionHistory = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getSubscriptionHistory`,
  }).pipe(catchError(handleErrorCustomer("getSubscriptionHistory")));

export const getCustomerOrderTransactionsHistory = (orderType) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getCustomerOrderTransactionsHistory?orderType=${orderType}`,
  }).pipe(catchError(handleErrorCustomer("getCustomerOrderTransactionsHistory")));

export const getCustomerRefundHistory = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getCustomerRefundHistory`,
  }).pipe(catchError(handleErrorCustomer("getCustomerRefundHistory")));

export const getCustomerInvitationHistory = (customerId) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getCustomerInvitationHistory?customerId=${customerId}`,
  }).pipe(catchError(handleErrorCustomer("getCustomerInvitationHistory")));

export const startSubscriptionPlan = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/startSubscriptionPlan?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleErrorCustomer("startSubscriptionPlan")));
  
export const cancelSubscriptionPlan = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/cancelSubscriptionPlan`,
  }).pipe(catchError(handleErrorCustomer("cancelSubscriptionPlan")));

export const changeSubscriptionPlanStatusToPendingCancellation = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/changeSubscriptionPlanStatusToPendingCancellation`,
  }).pipe(catchError(handleErrorCustomer("changeSubscriptionPlanStatusToPendingCancellation")));
  
export const applyCoupons = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getCouponPreview?${payload}`,
  }).pipe(catchError(handleErrorCustomer("applyCoupons")));

export const inviteUsers = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/inviteAUserAsChild?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleErrorCustomer("inviteUsers")));

export const ChildPaymentPreview = (toInvites) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/inviteAUserAsChildGetPaymentPreview`,
    body: toInvites,
  }).pipe(catchError(handleErrorCustomer("ChildPaymentPreview")));

export const updateInvitedUser = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/updateInviteParams?${payload}`,
  }).pipe(catchError(handleErrorCustomer("updateInvitedUser")));

export const removeChildAccount = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/removeChildAccount?${payload}`,
  }).pipe(catchError(handleErrorCustomer("removeChildAccount")));

export const getMyChildAccounts = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getMyChildAccounts`,
  }).pipe(catchError(handleErrorCustomer("getMyChildAccounts")));

export const getMyEncryptedData = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getMyEncryptedData`,
  }).pipe(catchError(handleErrorCustomer("getMyEncryptedData")));

export const applyInsighterPointCoupon = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/applyInsighterPointCoupon?insighterpointscouponcode=${payload}`,
  }).pipe(catchError(handleErrorCustomer("applyInsighterPointCoupon")));

export const getMyInsighterPointsInformation = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getMyInsighterPointsInformation?noOfPointToBuy=${10}`,
  }).pipe(catchError(handleErrorCustomer("getMyInsighterPointsInformation")));

export const buySolidifiAnalysis = (payload, formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Customer/buySolidifiAnalysis?${payload}`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("buySolidifiAnalysis")));

export const buyInsighterPoints = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/buyInsighterPoints?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleErrorCustomer("buyInsighterPoints")));

export const BuyMacro = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/BuyMacro?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleErrorCustomer("BuyMacro")));

export const getBoughtMacros = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getBoughtMacros`,
  }).pipe(catchError(handleErrorCustomer("getBoughtMacros")));

export const BuyUmpiresManual = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/BuyUmpiresManual?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleErrorCustomer("BuyUmpiresManual")));

export const getBoughtUmpiresManuals = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getBoughtUmpiresManuals`,
  }).pipe(catchError(handleErrorCustomer("getBoughtUmpiresManuals")));

export const BuySwagProduct = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/BuySwagProduct?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleErrorCustomer("BuySwagProduct")));

export const getBoughtSwagProducts = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getBoughtSwagProducts`,
  }).pipe(catchError(handleErrorCustomer("getBoughtSwagProducts")));

export const BuyEvent = (payload, objBuyEventRequest) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/BuyEvent?${payload}`,
    body: objBuyEventRequest,
  }).pipe(catchError(handleErrorCustomer("BuyEvent")));

export const buyGiftCard = (payload, formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Customer/buyGiftCard?${payload}`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("buyGiftCard")));
  
export const BuyCertificationAPI = (payload, objContactInformationForOrderDTO) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/BuyCertification?${payload}`,
    body: objContactInformationForOrderDTO,
  }).pipe(catchError(handleErrorCustomer("BuyCertification")));

export const applyCouponsProduct = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getProductCouponPreview?${payload}`,
  }).pipe(catchError(handleErrorCustomer("applyCouponsProduct")));

export const GetAllXactimateSketchCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllXactimateSketch`,
  }).pipe(catchError(handleErrorCustomer("GetAllXactimateSketchCustomer")));

export const GetAllInsightSheetsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetAllInsightSheets`,
  }).pipe(catchError(handleErrorCustomer("GetAllInsightSheetsCustomer")));

export const GetInsightSheetByPermalink = (permalink) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetInsightSheetByPermalink?permalink=${permalink}`,
  }).pipe(catchError(handleErrorCustomer("GetInsightSheetByPermalink")));

export const GetAllMacrosCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllMacros`,
  }).pipe(catchError(handleErrorCustomer("GetAllMacrosCustomer")));
  
export const getMacroByPermalink = (permalink) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getMacroByPermalink?permalink=${permalink}`,
  }).pipe(catchError(handleErrorCustomer("getMacroByPermalink")));

export const AddCommentsOnInsightSheet = (payload, formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Customer/AddCommentsOnInsightSheet?${payload}`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("AddCommentsOnInsightSheet")));

export const GetCommentsOnInsightSheet = (id) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetCommentsOnInsightSheet?insightsheetid=${id}`,
  }).pipe(catchError(handleErrorCustomer("GetCommentsOnInsightSheet")));

export const UpdateInsightSheetRating = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/UpdateInsightSheetRating?${payload}`,
  }).pipe(catchError(handleErrorCustomer("UpdateInsightSheetRating")));

export const GetAllEventsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetAllEvents`,
  }).pipe(catchError(handleErrorCustomer("GetAllEventsCustomer")));

export const getCustomerEventDetails = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getCustomerEventDetails`,
  }).pipe(catchError(handleErrorCustomer("getCustomerEventDetails")));

export const GetEventByEventId = (permaLink) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "GET",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetEventByEventId?permaLink=${permaLink}`,
  }).pipe(catchError(handleErrorCustomer("GetEventByEventId")));

export const AddCommentsOnEvent = (payload, formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Customer/AddCommentsOnEvent?${payload}`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("AddCommentsOnEvent")));

export const GetCommentsOnEvent = (id) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetCommentsOnEvent?eventId=${id}`,
  }).pipe(catchError(handleErrorCustomer("GetCommentsOnEvent")));

export const GetAllPriceInsighterReportsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetAllPriceInsighterReports`,
  }).pipe(catchError(handleErrorCustomer("GetAllPriceInsighterReportsCustomer")));

export const GetAllMediaReleaseCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllMediaRelease`,
  }).pipe(catchError(handleErrorCustomer("GetAllMediaReleaseCustomer")));

export const GetAllPriceListUpdateSummaryCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetAllPriceListUpdateSummary`,
  }).pipe(catchError(handleErrorCustomer("GetAllPriceListUpdateSummaryCustomer")));

export const GetPriceListUpdateSummaryByPermalink = (permalink) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetPriceListUpdateSummaryByPermalink?permalink=${permalink}`,
  }).pipe(catchError(handleErrorCustomer("GetPriceListUpdateSummaryByPermalink")));

export const GetAllCommonlyOverlookedLineItemsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetAllCommonlyOverlookedLineItems`,
  }).pipe(catchError(handleErrorCustomer("GetAllCommonlyOverlookedLineItemsCustomer")));

export const AddCommentsOnCommonlyOverlookedLineItems = (payload, formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Customer/AddCommentsOnCommonlyOverlookedLineItems?${payload}`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("AddCommentsOnCommonlyOverlookedLineItems")));

export const GetCommentsOnCommonlyOverlookedLineItem = (id) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetCommentsOnCommonlyOverlookedLineItem?coliId=${id}`,
  }).pipe(catchError(handleErrorCustomer("GetCommentsOnCommonlyOverlookedLineItem")));

export const AddCommentsOnPriceUpdateSummary = (payload, formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Customer/AddCommentsOnPriceUpdateSummary?${payload}`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("AddCommentsOnPriceUpdateSummary")));

export const GetCommentsOnPriceUpdateSummary = (id) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/${localStorage.getItem("tokenCustomer") ? "Customer" : "Public"}/GetCommentsOnPriceUpdateSummary?id=${id}`,
  }).pipe(catchError(handleErrorCustomer("GetCommentsOnPriceUpdateSummary")));

export const GetVideoGallaryItemsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetVideoGallaryItems`,
  }).pipe(catchError(handleErrorCustomer("GetVideoGallaryItemsCustomer")));

export const GetAllUmpiresManualsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllUmpiresManuals`,
  }).pipe(catchError(handleErrorCustomer("GetAllUmpiresManualsCustomer")));

export const GetAllSwagProductsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllSwagProducts`,
  }).pipe(catchError(handleErrorCustomer("GetAllSwagProductsCustomer")));

export const getAllCertificationsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getAllCertifications`,
  }).pipe(catchError(handleErrorCustomer("getAllCertificationsCustomer")));

export const getAllInsighterPointsProducts = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getAllInsighterPointsProducts`,
  }).pipe(catchError(handleErrorCustomer("getAllInsighterPointsProducts")));

export const ContactUsForm = (formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Public/ContactUs`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("ContactUsForm")));

export const ContactUsForPlan = (formData) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/ContactUsForPlan`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("ContactUsForPlan")));

export const FeatureRequestForm = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/FeatureRequest?${payload}`,
  }).pipe(catchError(handleErrorCustomer("FeatureRequestForm")));

export const getReviewActivity = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getReviewActivity`,
  }).pipe(catchError(handleErrorCustomer("getReviewActivity")));

export const getInsigherPointsDashboard = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getInsigherPointsDashboard`,
  }).pipe(catchError(handleErrorCustomer("getInsigherPointsDashboard")));

export const generateReferralCode = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/generateReferralCode`,
  }).pipe(catchError(handleErrorCustomer("generateReferralCode")));

export const GetAllGiftcards = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllGiftcards`,
  }).pipe(catchError(handleErrorCustomer("GetAllGiftcards")));

export const GetAllAILogos = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetAllAILogos`,
  }).pipe(catchError(handleErrorCustomer("GetAllAILogos")));

export const SearchSiteDatabase = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/SearchSiteDatabase?${payload}`,
  }).pipe(catchError(handleErrorCustomer("SearchSiteDatabase")));

export const SearchInsightSheets = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/SearchInsightSheets?${payload}`,
  }).pipe(catchError(handleErrorCustomer("SearchInsightSheets")));

export const SearchBlogs = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/SearchBlogs?${payload}`,
  }).pipe(catchError(handleErrorCustomer("SearchBlogs")));

export const SearchVideoGallary = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/SearchVideoGallary?${payload}`,
  }).pipe(catchError(handleErrorCustomer("SearchVideoGallary")));
 
export const uploadFileAndGetURL = (formData) =>
  ajax({
    headers: requestHeaderCustomer(true),
    method: "POST",
    url: `${baseURL}/Customer/uploadFileAndGetURL`,
    body: formData,
  }).pipe(catchError(handleErrorCustomer("uploadFileAndGetURL")));

export const CanBuyCertification = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/CanBuyCertification?${payload}`,
  }).pipe(catchError(handleErrorCustomer("CanBuyCertification")));

export const getPublicCertificationRecord = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/getPublicCertificationRecord`,
  }).pipe(catchError(handleErrorCustomer("getPublicCertificationRecord")));

export const GetLiveSessionDetails = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Public/GetLiveSessionDetails`,
  }).pipe(catchError(handleErrorCustomer("GetLiveSessionDetails")));

export const sendInvitesCompleteEmail = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/sendInvitesCompleteEmail`,
  }).pipe(catchError(handleErrorCustomer("sendInvitesCompleteEmail")));

export const GetCustomerAcountAliasCustomer = (customerid) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/GetCustomerAcountAlias?customerid=${customerid}`,
  }).pipe(catchError(handleErrorCustomer("GetCustomerAcountAliasCustomer")));

export const RemoveCustomerAcountAliasCustomer = (payload) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/RemoveCustomerAcountAlias?${payload}`,
  }).pipe(catchError(handleErrorCustomer("RemoveCustomerAcountAliasCustomer")));

export const GetBlogsCustomer = () =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "GET",
    url: `${baseURL}/Public/GetBlogs`,
  }).pipe(catchError(handleErrorCustomer("GetBlogsCustomer")));

export const getCertificateDetails = (certificationId) =>
  ajax({
    headers: requestHeaderCustomer(),
    method: "POST",
    url: `${baseURL}/Customer/getCertificateDetails?certificationId=${certificationId}`,
  }).pipe(catchError(handleErrorCustomer("getCertificateDetails")));
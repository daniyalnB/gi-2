import { Observable } from "rxjs/Observable";
import { ajax } from "rxjs/observable/dom/ajax";
import { catchError } from "rxjs/operators";
import history from "../history";
import { notify } from "react-notify-toast";
import { map } from "lodash";
import appConfig from "../../appConfig.json";

// const baseURL = `//${window.location.host}:${appConfig.serverPort}`;
const baseURL = `${appConfig[window.location.hostname]}:${
  appConfig.serverPort
}`;

console.log(process.env);
const randm = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const requestHeader = (isFile?) => {
  let headers = {};
  if (!isFile) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  let token: string | boolean = false;

  if (localStorage.token) {
    token = localStorage.token;
  }
  if (token) {
    headers["authString"] = localStorage.token;
  } else {
    headers["authString"] = "17d26ca06932e52bbac7f1e0be00227d";
  }

  return headers;
};

const handleError = (operation: string) => (err: any) => {
  const errMsg = `Error in ${operation}()`;
  //console.log(`${errMsg}:`, err);

  if (err.status === 401) {
    localStorage.clear();
    history.push("/login");
  }

  if (err.status === 503) {
    //console.log(err.message);
    //console.log(err.request);
    //console.log(err.response);
    //console.log(err.responseType);
    //console.log(err.status);
  }
  notify.show(err.response.message, "error", 5000);
  return Observable.throw(errMsg);
};

export const auth = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/isValidToken`,
  }).pipe(catchError(handleError("auth")));

export const login = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/AdminLogin?username=${payload.username}&password=${payload.password}`,
  }).pipe(catchError(handleError("login")));

export const logoutAPI = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/logout`,
  }).pipe(catchError(handleError("logout")));

export const resetPassword = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/reset_password`,
    body: payload,
  }).pipe(catchError(handleError("resetPassword")));

export const getBoardData = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getAllBoards`,
  }).pipe(catchError(handleError("getBoardData")));

export const getBoardDataBYID = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getBoardData?boardId=${payload.id}`,
    body: payload,
  }).pipe(catchError(handleError("getBoardData")));

export const updateBoardData = (payload, id) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/updateBoardData?boardId=${id}a`,
    body: payload,
  }).pipe(catchError(handleError("getBoardData")));

export const changeLaneOfCard = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/changeLaneOfCard?cardId=${payload.cardId}&sourceLaneId=${payload.sourceLaneId}&destinationLaneId=${payload.destinationLaneId}`,
  }).pipe(catchError(handleError("getBoardData")));

export const addPaymentInfoToClaim = (apiData) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/addPaymentInfoToClaim?${apiData}`,
  }).pipe(catchError(handleError("addPaymentInfoToClaim")));

export const submitACheck = (payload, apiData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/GIServer/submitACheck?${apiData}`,
    body: payload,
  }).pipe(catchError(handleError("submitACheck")));

export const addPHUser = (payload, apiData) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/GIServer/addAPHUser?${apiData}`,
    body: payload,
  }).pipe(catchError(handleError("addPHUser")));

export const saveCardChangesAPI = (payload, body) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/editACard?${payload}`,
    body: body,
  }).pipe(catchError(handleError("getBoardData")));

export const addBranchCollaborator = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/addBranchCollaborator?claimId=${payload.id}&emailOfCollaboratorToAdd=${payload.email}&emailOfBranch=${payload.bremail}`,
  }).pipe(catchError(handleError("getServerTime")));

export const addRelatedDocumentsToCard = (payload, cardId) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/GIServer/addRelatedDocumentsToCard?cardId=${cardId}`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

//Edit Mortgage Profile

export const editMortgageProfile = (payload, query) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/editMortgageProfile?${query}`,
    body: payload,
  }).pipe(catchError(handleError("getServerTime")));

//GetBranchCompanies
export const getCompanies = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getBranchGroupedByCompanies`,
    body: payload,
  }).pipe(catchError(handleError("getCompanies")));

export const getUsers = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getAllPhUsers`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

export const getProUsers = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getAllProUsers`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

export const updateAPhUser = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/updateAPhUser?firstName=${payload.firstName}&lastName=${payload.lastName}&userCellNo=${payload.userCellNo}&mailingAddress=${payload.mailingAddress}&IDStatus=${payload.IDStatus}&phUserId=${payload.phUserId}&APT=${payload.APT}&SSN=${payload.SSN}&SSNStatus=${payload.SSNStatus}`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

export const getBranches = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getAllBranches`,
  }).pipe(catchError(handleError("GetAllUsers")));

export const updateAProUser = (profilePicture, payload) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/GIServer/updateAProUser?firstName=${payload.firstName}&allowedtosubmitacheck=${payload.allowedtosubmitacheck}&lastName=${payload.lastName}&userCellNo=${payload.userCellNo}&mailingAddress=${payload.mailingAddress}&role=${payload.role}&APT=${payload.APT}&proUserId=${payload.phUserId}`,
    body: profilePicture,
  }).pipe(catchError(handleError("GetAllUsers")));

export const GetAllRoles = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/GetAllRoles`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

export const GetAllPrivileges = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/GetAllPrivileges`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

export const claimForm = (payload, apiData) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/addCardFromForm?boardId=${apiData.boardId}&cardTitle=${
      apiData.cardTitle
    }&description=${apiData.description}&otherData=${encodeURIComponent(
      JSON.stringify(apiData.otherData)
    )}&label=${JSON.stringify(apiData.label)}`,
    body: payload,
  }).pipe(catchError(handleError("claimForm")));

export const getServerTime = () =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/GetServerTime`,
  }).pipe(catchError(handleError("getServerTime")));

export const getTaggableUsersForComments = (id, internalcommentforadmin) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getTaggableUsersForComments?cardID=${id}&internaltaggableadmins=${internalcommentforadmin}`,
  }).pipe(catchError(handleError("getServerTime")));

export const addCommentonCliam = (payload) =>
  ajax({
    headers: requestHeader(payload.attachment ? true : false),
    method: "POST",
    url: `${baseURL}/GIServer/addCommentOnClaim?claimId=${
      payload.id
    }&internalcommentforadmin=${
      payload.internalcommentforadmin
    }&message=${encodeURIComponent(payload.message)}`,
    body: payload.attachment,
  }).pipe(catchError(handleError("getServerTime")));

export const getComments = (id, flag) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getCommentsOnClaim?claimId=${id}&internalcommentforadmin=${flag}`,
  }).pipe(catchError(handleError("getServerTime")));

export const addCollaborator = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/addCollaborator?claimId=${payload.id}&emailOfCollaboratorToAdd=${payload.email}`,
  }).pipe(catchError(handleError("getServerTime")));

export const changeBranchStatus = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/changeBranchStatus?branchId=${payload.branchId}&branchStatus=${payload.branchStatus}`,
  }).pipe(catchError(handleError("getServerTime")));

export const changeMortgageStatus = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/changeMortgageStatus?mortgageId=${payload.branchId}&mortgageStatus=${payload.branchStatus}`,
  }).pipe(catchError(handleError("getServerTime")));

export const editBranchProfile = (payload, query) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/editBranchProfile?${query}`,
    body: payload,
  }).pipe(catchError(handleError("getServerTime")));

export const editBranchDocumentStatus = (payload) =>
  ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/editBranchDocumentStatus?${payload}`,
  }).pipe(catchError(handleError("getServerTime")));

export const addApprovedScopeToClaim = (payload, claimId) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/GIServer/addApprovedScopeToClaim?claimId=${claimId}`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

export const addProposalToClaim = (payload, claimId) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/GIServer/addProposalToClaim?claimId=${claimId}`,
    body: payload,
  }).pipe(catchError(handleError("GetAllUsers")));

export const removeCollaborator = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/removeCollaborator?claimId=${payload.id}&emailOfCollaboratorToRemove=${payload.email}`,
  }).pipe(catchError(handleError("getServerTime")));
};
export const getAddedACHForBranch = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getAddedACHForBranch?branchId=${payload.id}`,
  }).pipe(catchError(handleError("getServerTime")));
};
export const getAddedACHForMortgage = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getAddedACHForMortgage?mortgageId=${payload.id}`,
  }).pipe(catchError(handleError("getServerTime")));
};

export const changeAddedACHStatus = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/changeAddedACHStatus?branchId=${payload.id}&achId=${payload.achId}&status=${payload.status}`,
  }).pipe(catchError(handleError("getServerTime")));
};

export const getMortagesForActivation = () => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getAllMortgages`,
  }).pipe(catchError(handleError("getServerTime")));
};

export const getCompaniesPartner = () => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getMortgageCompanyPartner
    `,
  }).pipe(catchError(handleError("getServerTime")));
};

export const getPaymentCards = (id) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getPaymentCards?branchOrMortageId=${id}`,
  }).pipe(catchError(handleError("getServerTime")));
};

export const getSubscriptionHistory = (id) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/getSubscriptionHistory?branchOrMortageId=${id}`,
  }).pipe(catchError(handleError("getServerTime")));
};

export const viewSubscriptionDetails = (id) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/viewSubscriptionDetails?branchOrMortgageId=${id}`,
  }).pipe(catchError(handleError("getServerTime")));
};

export const editACHManual = (payload) => {
  return ajax({
    headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/GIServer/editACHManual?${payload}`,
  }).pipe(catchError(handleError("getServerTime")));
};

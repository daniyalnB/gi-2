import { Observable } from "rxjs/Observable";
import { ajax } from "rxjs/observable/dom/ajax";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError } from "rxjs/operators";
import history from "../history";
import { notify } from "react-notify-toast";
import appConfig from "../../appConfig.json";

// const baseURL = `${appConfig[window.location.hostname]}:${
//   appConfig.serverPort
// }`;

const baseURL = "https://reactdev.getinsights.org:9000"


const requestHeader = (isJson?) => {
  let headers = {};

  if (!isJson) {
    headers = {
      "Content-Type": "text/plain",
    };
  }

  if (isJson) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  let token: string | boolean = false;

  if (localStorage.token) {
    token = localStorage.token;
    console.log(token, 'token')

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
  console.log(`${errMsg}:`, err);

  if (err.status === 401) {
    localStorage.clear();
    history.push("/admin/login");
    return Observable.throw(err);

  }

  if (err.status === 503) {
    
  }
  //notify.show(err.response.message, "error", 5000);
  //return Observable.throw(errMsg);
};

export const auth = () =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdmin/IsValidAdminToken`,

  }).pipe(catchError(handleError("auth")));

export const login = (payload) =>
  ajax({
    headers: requestHeader(true),
    method: "POST",
    url: `${baseURL}/CMSAdminLogin`,
    body: payload,
    responseType: 'text',
  }).pipe(catchError(handleError("")));

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


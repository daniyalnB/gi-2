import * as React from "react";
import {
  getUsers,
  GetAllRoles,
  GetAllPrivileges,
  getProUsers,
  getCompanies,
} from "../utils/api-routes/api-routes.util";
import { useState } from "react";
import * as jsoncompare from "js-object-compare";

interface IContextProps {
  dispatchGetUsers: Function;
  dispatchGetProUsers: Function;
  users: any;
  companies: any;
  prousers: any;
  roles: any;
  dispatchAllCompanies: Function;
  dispatchGetAllRoles: Function;
  privileges: any;
  dispatchGetAllPrivileges: Function;
  getProUserHttpStatus: string;
  getUsersHttpStatus: string;
  getAllRolesHttpStatus: string;
  getAllPrivilegesHttpStatus: string;
}

export const BackofficeContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const [users, setUsers] = useState([]);
  const [prousers, setProUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [roles, setRoles] = useState([]);
  const [
    getProUserHttpStatus,
    setGetProUserHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  const [
    getUsersHttpStatus,
    setGetUsersHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  const [
    getCompaniesHttpStatus,
    setGetCompaniesHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  const [
    getAllRolesHttpStatus,
    setGetAllRolesHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  const [
    getAllPrivilegesHttpStatus,
    setGetAllPrivilegesHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  const [privileges, setPrivileges] = useState([]);

  const dispatchGetUsers = () => {
    setGetUsersHttpStatus("pending");
    getUsers({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setUsers(response.response.data);
          console.log(response.response.data);
          setGetUsersHttpStatus("success");
        } else {
          setGetUsersHttpStatus("error");
        }
      },
      (response) => {
        console.error(response);
        setGetUsersHttpStatus("error");
      }
    );
  };

  const dispatchAllCompanies = () => {
    setGetCompaniesHttpStatus("pending");
    getCompanies({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setCompanies(response.response.data);
          setGetCompaniesHttpStatus("success");
        } else {
          setGetCompaniesHttpStatus("error");
        }
      },
      (response) => {
        console.error(response);
        setGetProUserHttpStatus("error");
      }
    );
  };

  const dispatchGetProUsers = () => {
    setGetProUserHttpStatus("pending");
    getProUsers({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setProUsers(response.response.data);
          setGetProUserHttpStatus("success");
        } else {
          setGetProUserHttpStatus("error");
        }
      },
      (response) => {
        console.error(response);
        setGetProUserHttpStatus("error");
      }
    );
  };

  const dispatchGetAllRoles = () => {
    setGetAllRolesHttpStatus("pending");
    GetAllRoles({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setRoles(response.response.data);
          setGetAllRolesHttpStatus("success");
        } else {
          setGetAllRolesHttpStatus("error");
        }
      },
      (response) => {
        console.error(response);
        setGetAllRolesHttpStatus("error");
      }
    );
  };

  const dispatchGetAllPrivileges = () => {
    setGetAllPrivilegesHttpStatus("pending");
    GetAllPrivileges({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setPrivileges(response.response.data);
          setGetAllPrivilegesHttpStatus("success");
        } else {
          setGetAllPrivilegesHttpStatus("error");
        }
      },
      (response) => {
        console.error(response);
        setGetAllPrivilegesHttpStatus("error");
      }
    );
  };

  const defaultContext = {
    dispatchGetUsers,
    dispatchGetProUsers,
    users,
    prousers,
    dispatchGetAllRoles,
    roles,
    companies,
    dispatchGetAllPrivileges,
    privileges,
    getProUserHttpStatus,
    getUsersHttpStatus,
    getAllRolesHttpStatus,
    getAllPrivilegesHttpStatus,
    dispatchAllCompanies,
  };

  return (
    <BackofficeContext.Provider value={defaultContext}>
      {children}
    </BackofficeContext.Provider>
  );
};

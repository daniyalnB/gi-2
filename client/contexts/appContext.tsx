import * as React from "react";
import { useState, useContext } from "react";
import { 
  getCustomerInfoAPI,
  setDefaultPaymentMenthod,
  setBackupPaymentMenthod,
  getMyChildAccounts,
  getMyInsighterPointsInformation,
  getMyEncryptedData,
  getLoggedInUserInfo,
  GetCustomerAcountAliasCustomer,
} from "../utils/api-routes/api-routes.util";
import queryString from "query-string";
import history from "../utils/history";
import { AuthContext } from "./authContext";

interface IContextProps {
  getCustomerInfo: Function;
  myInfo: any;
  cards: any;
  getMyInvitedUser: Function;
  invitedUsers: any;
  getMyCoAdmin: Function;
  coAdmins: any;
  getMyInsighterPoints: Function;
  insighterPoints: any;
  getMyEncryptedDataFunction: Function;
  encryptedData: any;
  getNavbarData: Function,
  navbarData: any,
  onTrial: any,
  getOnTrial: Function,
}

export const AppContext = React.createContext({} as IContextProps);

export default React.memo(({ children }) => {

  const { logoutCustomer } = useContext(AuthContext);

  const [cards, setCards] = useState(false);
  const [myInfo, setMyInfo] = useState(false);
  const [invitedUsers, getInvitedUsers] = useState([]);
  const [coAdmins, getCoAdmins] = useState([]);
  const [insighterPoints, getInsighterPoints] = useState(false);
  const [encryptedData, getEncryptedData] = useState(false);
  const [navbarData, setNavbarData] = useState(false);
  const [onTrial, setOnTrial] = useState(true);

  const getCustomerInfo = (isFirstCardAdded?) => {
    getCustomerInfoAPI().subscribe((response) => {
      if (response.response.Requested_Action) {
        if (isFirstCardAdded && response.response.data.stripeCustomerCard.length == 1) {
          const payload = {
            pmId: response.response.data.stripeCustomerCard[0].paymentMethodId,
            customerId: response.response.data.id,
          };

          const stringified = queryString.stringify(payload);

          setDefaultPaymentMenthod(stringified).subscribe((response) => {
            getCustomerInfo();
          });
        } else if (isFirstCardAdded) {
          const check = response.response.data.stripeCustomerCard.some((val) => val.backup === true);
          if (check) {
            setCards(response.response.data);
            setMyInfo(response.response.data);
          } else {
            const payload = {
              pmId: response.response.data.stripeCustomerCard[0].paymentMethodId,
              customerId: response.response.data.id,
            };
      
            const stringified = queryString.stringify(payload);

            setBackupPaymentMenthod(stringified).subscribe((response) => {
              getCustomerInfo();
            });
          }
        } else {
          setCards(response.response.data);
          setMyInfo(response.response.data);
        }       
      } else {
        logoutCustomer();
      }
    });
  };

  const getMyInvitedUser = () => {
    getMyChildAccounts().subscribe((response) => {
      getInvitedUsers(response.response.data);
    });
  };

  const getMyCoAdmin = () => {
    GetCustomerAcountAliasCustomer(myInfo.id).subscribe((response) => {
      getCoAdmins(response.response.data);
    });
  };

  const getMyInsighterPoints = () => {
    getMyInsighterPointsInformation().subscribe((response) => {
      getInsighterPoints(response.response.data);
    });
  };

  const getMyEncryptedDataFunction = () => { 
    getMyEncryptedData().subscribe((response) => {
      getEncryptedData(response.response.Message);
    });
  };

  const getNavbarData = () => {
    getLoggedInUserInfo().subscribe((response) => {
      setNavbarData(response.response.data);
    });
  }

  const getOnTrial = () => {
    setOnTrial(!onTrial);
  }

  const defaultContext = {
    getCustomerInfo,
    myInfo,
    cards,
    getMyInvitedUser,
    invitedUsers,
    getMyCoAdmin,
    coAdmins,
    getMyInsighterPoints,
    insighterPoints,
    getMyEncryptedDataFunction,
    encryptedData,
    getNavbarData,
    navbarData,
    onTrial,
    getOnTrial,
  };

  return (
    <AppContext.Provider value={defaultContext}>
      {children}
    </AppContext.Provider>
  );
});
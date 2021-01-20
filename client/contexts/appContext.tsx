import * as React from "react";
import {
  getBoardData,
  updateBoardData,
  getBoardDataBYID,
  getServerTime,
  submitACheck,
  addPHUser,
  changeLaneOfCard,
  saveCardChangesAPI,
} from "../utils/api-routes/api-routes.util";
import { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import { showNotify } from "utils/notifyToast";
import queryString from "query-string";

interface IContextProps {
  dashboard: boolean;
  dispatchGetBoardDetails: Function;
  boards: any;
  dispatchUpdateBoardDetails: Function;
  onBoardDataChange: Function;
  boardEventBus: any;
  setBoardEventBus: Function;
  addBoardLane: Function;
  renameBoardLane: Function;
  currentBoard: any;
  currentBoardId: number | undefined;
  setCurrentBoardId: Function;
  setCurrentCardId: Function;
  currentCardId: any;
  addCartToLane: Function;
  isShowBoardLink: boolean;
  setIsShowBoardLink: Function;
  serverTime: any;
  dispatchGetBoardDetailsByID: Function;
  changeCardData: Function;
  onCardMoveAcrossLanes: Function;
  saveCardChanges: Function;
  getCardByID: Function;
  refreshCurrentBoard: Function;
  //submitNewCheck: Function;
  addAPHUser: Function;
  getBoardDataHttpStatus: string;
  getBoardDataByIDHttpStatus: string;
  updateBoardDetailsHttpStatus: string;
}

export const AppContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const dashboard = false;
  const [currentBoardId, setCurrentBoardId] = useState(undefined);
  const [currentCardId, setCurrentCardId] = useState(undefined);
  const [boards, setBoards] = useState([]);
  const [oldBoardData, setOldBoardData] = useState({});
  const [currentBoard, setCurrentBoard] = useState({
    lanes: [],
  });
  const [currentCard, setCurrentCard] = useState({});
  const [isShowBoardLink, setIsShowBoardLink] = useState(true);

  const [boardEventBus, setBoardEventBusData] = useState(undefined);

  const [serverTime, setServerTime] = useState(moment().utc());
  const [
    getBoardDataHttpStatus,
    setGetBoardDataHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  const [
    getBoardDataByIDHttpStatus,
    setGetBoardDataByIDHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  const [
    updateBoardDetailsHttpStatus,
    setUpdateBoardDetailsHttpStatus,
  ] = React.useState<HttpRequestStatus>("error");
  useEffect(() => {
    if (currentBoardId !== undefined) {
      dispatchGetBoardDetailsByID({ id: currentBoardId });
    }
  }, [currentBoardId]);

  const refreshCurrentBoard = () => {
    dispatchGetBoardDetailsByID({ id: currentBoardId });
  };

  useEffect(() => {
    getServerTime().subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setServerTime(
            moment(
              Number(
                response.response.message
                  ? response.response.message
                  : response.response.Message
              )
            ).utc()
          );
        } else {
        }
      },
      (response) => {}
    );
  }, []);

  // useEffect(() => {
  //   if(currentCardId !== undefined){
  //     setCurrentCardId(currentCardId)
  //   }
  // });

  const setBoardEventBus = (handle) => {
    setBoardEventBusData(handle);
  };

  const formatBoards = (data) => {
    setOldBoardData(Object.assign({}, data));
    return data;
  };

  const addBoardLane = (data: any) => {
    const laneData = currentBoard.lanes;
    laneData.push({
      id: "lane1" + Math.random(),
      title: data.title,
      label: "",
    });
    boardEventBus.publish({
      type: "UPDATE_LANES",
      lanes: laneData,
    });
  };

  const renameBoardLane = (data: any) => {
    let laneData = currentBoard.lanes;
    laneData = laneData.map((lane) => {
      if (lane.id === data.id) {
        lane.title = data.title;
      }
      return lane;
    });
    boardEventBus.publish({
      type: "UPDATE_LANES",
      lanes: laneData,
    });
  };

  const renameBoardName = (data: any) => {
    currentBoard.name = data.name;
    const boardData = Object.assign({}, currentBoard);

    dispatchUpdateBoardDetails(
      {
        newBoardData: JSON.stringify(boardData),
        oldBoardData: JSON.stringify(oldBoardData),
      },
      currentBoard.id
    );
  };

  const addCartToLane = (data: any) => {
    let laneData = currentBoard.lanes;
    laneData = laneData.map((lane) => {
      if (lane.id === data.id) {
        lane.cards.push({
          id: "Card" + Math.random(),
          title: data.title,
          description: "Transfer via NEFT",
          label: "5 mins",
          metadata: { sha: "be312a1" },
          laneId: data.id,
        });
      }
      return lane;
    });
    boardEventBus.publish({
      type: "UPDATE_LANES",
      lanes: laneData,
    });
  };

  const onBoardDataChange = (newData) => {
    const boardData = Object.assign({}, currentBoard);

    boardData.lanes = newData.lanes;

    if (JSON.stringify(boardData) !== JSON.stringify(oldBoardData)) {
      newData.lanes = newData.lanes.map((lane, i) => {
        if (lane.cards === undefined) {
          lane.cards = [];
        }
        return lane;
      });

      dispatchUpdateBoardDetails(
        {
          newBoardData: JSON.stringify(boardData),
          oldBoardData: JSON.stringify(oldBoardData),
        },
        currentBoard.id
      );
    }
  };

  const dispatchGetBoardDetails = () => {
    setGetBoardDataHttpStatus("pending");
    getBoardData({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setBoards(response.response.data);
          setGetBoardDataHttpStatus("success");
        } else {
          setGetBoardDataHttpStatus("error");
        }
      },
      (err) => {
        console.error(err);
        setGetBoardDataHttpStatus("error");
      }
    );
  };

  const dispatchGetBoardDetailsByID = (payload) => {
    setGetBoardDataByIDHttpStatus("pending");

    getBoardDataBYID(payload).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setCurrentBoard(formatBoards(response.response.data));
          setGetBoardDataByIDHttpStatus("success");
        } else {
          setGetBoardDataByIDHttpStatus("error");
        }
      },
      (err) => {
        console.error(err);
        setGetBoardDataByIDHttpStatus("error");
      }
    );
  };

  const dispatchUpdateBoardDetails = (payload, id) => {
    setUpdateBoardDetailsHttpStatus("pending");
    updateBoardData(payload, id).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          dispatchGetBoardDetailsByID({ id: id });
          setUpdateBoardDetailsHttpStatus("success");
          showNotify(
            "success",
            response.response.message
              ? response.response.message
              : response.response.Message
          );
        } else {
          setUpdateBoardDetailsHttpStatus("error");
        }
      },
      (err) => {
        console.error(err);
        showNotify("error", err.response.message);
        setUpdateBoardDetailsHttpStatus("error");
      }
    );
  };

  const changeCardData = (card, field, value) => {
    let laneData = _.cloneDeep(currentBoard.lanes);
    laneData = laneData.map((lane) => {
      lane.cards = lane.cards.map((crd) => {
        if (crd.id === card.id) {
          crd[field] = value;
        }
        return crd;
      });
      return lane;
    });

    boardEventBus.publish({
      type: "UPDATE_LANES",
      lanes: laneData,
    });
  };

  const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    // console.log(fromLaneId, toLaneId, cardId, index);
    changeLaneOfCard({
      cardId: cardId,
      sourceLaneId: fromLaneId,
      destinationLaneId: toLaneId,
    }).subscribe((response) => {
      showNotify(
        "success",
        response.response.message
          ? response.response.message
          : response.response.Message
      );
      dispatchGetBoardDetailsByID({ id: currentBoard.id });
    });
  };

  const addAPHUser = (payload, apiData) => {
    addPHUser(payload, apiData).subscribe(
      (response) => {
        console.log(response);
        showNotify(
          "success",
          response.response.message
            ? response.response.message
            : response.response.Message
        );

        return response.response.message;
      },
      (err) => {
        showNotify("error", err.response.message);
      }
    );
  };

  //submitcheck

  // const submitNewCheck = (payload, apiData) => {
  //   submitACheck(payload, apiData).subscribe(
  //     (response) => {
  //       console.log(response);
  //       showNotify(
  //         "success",
  //         response.response.message
  //           ? response.response.message
  //           : response.response.Message
  //       );
  //     },
  //     (err) => {
  //       showNotify("error", err.response.message);
  //     }
  //   );
  // };

  const saveCardChanges = (card) => {
    const APIObj = {
      cardId: card.id,
    };
    Object.keys(card).map((key) => {
      APIObj[key] = card[key];
    });

    const payload = {
      approvedScopes: APIObj.approvedScopes,
      postMitigationScanURL: APIObj.postMitigationScanURL,
      postRepairScanURL: APIObj.postRepairScanURL,
      progressScanURL: APIObj.progressScanURL,
      proposals: APIObj.proposals,
    };
    delete APIObj.approvedScopes;
    delete APIObj.postMitigationScanURL;
    delete APIObj.postRepairScanURL;
    delete APIObj.progressScanURL;
    delete APIObj.proposals;

    const stringified = queryString.stringify(APIObj);
    console.log(payload)
    saveCardChangesAPI(stringified, payload).subscribe(
      (response) => {
        console.log(response);
        showNotify(
          "success",
          response.response.message
            ? response.response.message
            : response.response.Message
        );
        dispatchGetBoardDetailsByID({ id: currentBoard.id });
      },
      (err) => {
        showNotify("error", err.response.message);
      }
    );
  };

  const getCardByID = (id) => {
    let cardObj;
    currentBoard.lanes.map((lane) => {
      lane.cards.map((card) => {
        if (card.id == id) cardObj = card;
        return card;
      });
      return lane;
    });
    return cardObj;
  };

  const defaultContext = {
    dashboard,
    dispatchGetBoardDetails,
    boards,
    dispatchUpdateBoardDetails,
    onBoardDataChange,
    boardEventBus,
    setBoardEventBus,
    addBoardLane,
    currentBoard,
    currentBoardId,
    setCurrentBoardId,
    renameBoardLane,
    addCartToLane,
    setIsShowBoardLink,
    isShowBoardLink,
    renameBoardName,
    setCurrentCardId,
    currentCardId,
    serverTime,
    dispatchGetBoardDetailsByID,
    changeCardData,
    onCardMoveAcrossLanes,
    saveCardChanges,
    //submitNewCheck,
    addAPHUser,
    getCardByID,
    refreshCurrentBoard,
    getBoardDataHttpStatus,
    getBoardDataByIDHttpStatus,
    updateBoardDetailsHttpStatus,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import { AppContext } from "../../contexts/appContext";
import {
  AddCommentsOnInsightSheet,
  GetCommentsOnInsightSheet,
  AddCommentsOnEvent,
  GetCommentsOnEvent,
  AddCommentsOnCommonlyOverlookedLineItems,
  GetCommentsOnCommonlyOverlookedLineItem,
  AddCommentsOnPriceUpdateSummary,
  GetCommentsOnPriceUpdateSummary,
} from "../../utils/api-routes/api-routes.util";
import comment from "assets/user-eyes.svg";
import file from "assets/file.png";

const Comments = (props) => {
	
  const { navbarData } = useContext(AppContext);

  const [navbarInfo, setNavbarInfo] = useState(false);

  useEffect(() => {
    if (navbarData) {
      setNavbarInfo(navbarData);
    }
  }, [navbarData]);

  const [loadingComment, setLoadingComment] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [check, setCheck] = useState(false);

  const [viewReply, setviewReply] = useState(false);

  const [replybtn, setReplyBtn] = useState("");
  const [replyview, setReplyView] = useState("");

  const [comments, setComments] = useState({
    id: props.insightsheetid,
    comment: "",
    attachment: "",
  });

  const [replies, setReplies] = useState({
    id: props.insightsheetid,
    comment: "",
    replyToCommentsId: "",
    attachment: "",
  });

  useEffect(() => {
    setComments({
      ...comments,
      id: props.insightsheetid,
    });
    setReplies({
      ...replies,
      id: props.insightsheetid,
    });
  }, [props.insightsheetid]);

  const onSelectComment = (e) =>
    setComments({ ...comments, [e.target.name]: e.target.files[0] });

  const onSelectReply = (e) =>
    setReplies({ ...replies, [e.target.name]: e.target.files[0] });

  const [data, setData] = useState([]);

  if (props.page == "insightsheet") {
    useEffect(() => {
      GetCommentsOnInsightSheet(props.insightsheetid).subscribe((response) => {
        if (response.response.Requested_Action) {
          setData(response.response.data);
        } else {
        }
      });
    }, [props.insightsheetid]);
  } else if (props.page == "event") {
    useEffect(() => {
      GetCommentsOnEvent(props.eventid).subscribe((response) => {
        if (response.response.Requested_Action) {
          setData(response.response.data);
        } else {
        }
      });
    }, [props.eventid]);
  } else if (props.page == "pricelist") {
    useEffect(() => {
      GetCommentsOnPriceUpdateSummary(props.pricelistid).subscribe(
        (response) => {
          if (response.response.Requested_Action) {
            setData(response.response.data);
          } else {
          }
        }
      );
    }, [props.pricelistid]);
  } else {
    useEffect(() => {
      GetCommentsOnCommonlyOverlookedLineItem(props.itemid).subscribe(
        (response) => {
          if (response.response.Requested_Action) {
            setData(response.response.data);
          } else {
          }
        }
      );
    }, [props.itemid]);
  }

  const handleSubmit = (e) => {
    if (check) {
      setLoadingComment(true);
      setLoadingReply(false);
    } else {
      setLoadingComment(false);
      setLoadingReply(true);
    }
    e.preventDefault();

    const payloadComment = {
      insightsheetid: props.insightsheetid,
      comment: comments.comment,
    };
    const formDataComment = new FormData();
    formDataComment.append("attachment", comments.attachment);
    const stringifiedComment = queryString.stringify(payloadComment);

    const payloadReply = {
      insightsheetid: props.insightsheetid,
      comment: replies.comment,
      replyToCommentsId: replies.replyToCommentsId,
    };
    const formDataReply = new FormData();
    formDataReply.append("attachment", replies.attachment);
    const stringifiedReply = queryString.stringify(payloadReply);

    AddCommentsOnInsightSheet(
      check ? stringifiedComment : stringifiedReply,
      check ? formDataComment : formDataReply
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        setComments({
          id: props.insightsheetid,
          comment: "",
          attachment: "",
        });
        setReplies({
          id: props.insightsheetid,
          comment: "",
          replyToCommentsId: "",
          attachment: "",
        });
        setLoadingComment(false);
        setLoadingReply(false);
        customer();
        document.getElementById("form").reset();
      } else {
        setLoadingComment(false);
        setLoadingReply(false);
      }
    });
  };

  function customer() {
    GetCommentsOnInsightSheet(props.insightsheetid).subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
      }
    });
  }

  const handleSubmitEvent = (e) => {
    if (check) {
      setLoadingComment(true);
      setLoadingReply(false);
    } else {
      setLoadingComment(false);
      setLoadingReply(true);
    }
    e.preventDefault();

    const payloadComment = {
      eventId: props.eventid,
      comment: comments.comment,
    };
    const formDataComment = new FormData();
    formDataComment.append("attachment", comments.attachment);
    const stringifiedComment = queryString.stringify(payloadComment);

    const payloadReply = {
      eventId: props.eventid,
      comment: replies.comment,
      replyToCommentsId: replies.replyToCommentsId,
    };
    const formDataReply = new FormData();
    formDataReply.append("attachment", replies.attachment);
    const stringifiedReply = queryString.stringify(payloadReply);

    AddCommentsOnEvent(
      check ? stringifiedComment : stringifiedReply,
      check ? formDataComment : formDataReply
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        setComments({
          id: props.eventid,
          comment: "",
          attachment: "",
        });
        setReplies({
          id: props.eventid,
          comment: "",
          replyToCommentsId: "",
          attachment: "",
        });
        setLoadingComment(false);
        setLoadingReply(false);
        event_customer();
        document.getElementById("form").reset();
      } else {
        setLoadingComment(false);
        setLoadingReply(false);
      }
    });
  };

  function event_customer() {
    GetCommentsOnEvent(props.eventid).subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
      }
    });
  }

  const handleSubmitLineItem = (e) => {
    if (check) {
      setLoadingComment(true);
      setLoadingReply(false);
    } else {
      setLoadingComment(false);
      setLoadingReply(true);
    }
    e.preventDefault();

    const payloadComment = {
      itemId: props.itemid,
      comment: comments.comment,
    };
    const formDataComment = new FormData();
    formDataComment.append("attachment", comments.attachment);
    const stringifiedComment = queryString.stringify(payloadComment);

    const payloadReply = {
      itemId: props.itemid,
      comment: replies.comment,
      replyToCommentsId: replies.replyToCommentsId,
    };
    const formDataReply = new FormData();
    formDataReply.append("attachment", replies.attachment);
    const stringifiedReply = queryString.stringify(payloadReply);

    AddCommentsOnCommonlyOverlookedLineItems(
      check ? stringifiedComment : stringifiedReply,
      check ? formDataComment : formDataReply
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        setComments({
          id: props.itemid,
          comment: "",
          attachment: "",
        });
        setReplies({
          id: props.itemid,
          comment: "",
          replyToCommentsId: "",
          attachment: "",
        });
        setLoadingComment(false);
        setLoadingReply(false);
        lineitem_customer();
        document.getElementById("form").reset();
      } else {
        setLoadingComment(false);
        setLoadingReply(false);
      }
    });
  };

  function lineitem_customer() {
    GetCommentsOnCommonlyOverlookedLineItem(props.itemid).subscribe(
      (response) => {
        if (response.response.Requested_Action) {
          setData(response.response.data);
        }
      }
    );
  }

  const handleSubmitPriceList = (e) => {
    if (check) {
      setLoadingComment(true);
      setLoadingReply(false);
    } else {
      setLoadingComment(false);
      setLoadingReply(true);
    }
    e.preventDefault();

    const payloadComment = {
      id: props.pricelistid,
      comment: comments.comment,
    };
    const formDataComment = new FormData();
    formDataComment.append("attachment", comments.attachment);
    const stringifiedComment = queryString.stringify(payloadComment);

    const payloadReply = {
      id: props.pricelistid,
      comment: replies.comment,
      replyToCommentsId: replies.replyToCommentsId,
    };
    const formDataReply = new FormData();
    formDataReply.append("attachment", replies.attachment);
    const stringifiedReply = queryString.stringify(payloadReply);

    AddCommentsOnPriceUpdateSummary(
      check ? stringifiedComment : stringifiedReply,
      check ? formDataComment : formDataReply
    ).subscribe((response) => {
      if (response.response.Requested_Action) {
        setComments({
          id: props.pricelistid,
          comment: "",
          attachment: "",
        });
        setReplies({
          id: props.pricelistid,
          comment: "",
          replyToCommentsId: "",
          attachment: "",
        });
        setLoadingComment(false);
        setLoadingReply(false);
        pricelist_customer();
        document.getElementById("form").reset();
      } else {
        setLoadingComment(false);
        setLoadingReply(false);
      }
    });
  };

  function pricelist_customer() {
    GetCommentsOnPriceUpdateSummary(props.pricelistid).subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
      }
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [imageid, setImageId] = useState("");

  function scroll(element) {
    document.getElementById(element).scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="comments">
        <h3> Comments </h3>
        {data.map((val, key) => {
          return (
            <div key={key}>
              <div className="row section-1">
                <div className="col-12">
                  <div className="row" id={`${val.id}`}>
                    <div className="col-1">
                      <div className="img-section">
                        <img
                          className="comment_thumbnail"
                          src={
                            val.commenterprofilepicture
                              ? val.commenterprofilepicture
                              : comment
                          }
                          alt={val.commenter}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="comment-data">
                        <h5> {val.commenter} </h5>
                        <span className="date">
                          {" "}
                          Posted&nbsp;
                          {moment(val.createdAt).format("MM/DD/YYYY")}
                        </span>
                        <br />
                        {val.attachment == null ? (
                          ""
                        ) : (
                          <>
                            <img
                              src={val.attachment}
                              alt={val.commenter}
                              loading="lazy"
                              onClick={() => {
                                setIsOpen(!isOpen);
                                setImageId(`${val.id}`);
                              }}
                            />
                            {isOpen && val.id == imageid ? (
                              <Lightbox
                                mainSrc={val.attachment}
                                onCloseRequest={() => setIsOpen(false)}
                              />
                            ) : (
                              ""
                            )}
                          </>
                        )}
                        <h4
                          dangerouslySetInnerHTML={{
                            __html: `${
                              val.comment
                                ? val.comment
                                : ""
                            }`,
                          }}
                        >
                        </h4>
                        {val.replys.length !== 0 ? (
                          <span
                            className={
                              val.id == replyview && viewReply
                                ? "hide"
                                : "view-reply"
                            }
                            onClick={() => {
                              setReplyView(`${val.id}`);
                              setviewReply(true);
                            }}
                          >
                            {val.replys.length == 1 ? (
                              <>view reply</>
                            ) : (
                              <>view all {val.replys.length} replies</>
                            )}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-2 reply-btn">
                      <button
                        className={val.id == replybtn ? "hide" : "btn"}
                        onClick={() => setReplyBtn(`${val.id}`)}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                  {val.id == replybtn ? (
                    <div className="view-comment-border">
                      <hr />
                      <div className="row section-2">
                        <div className="col">
                          <form
                            id="form"
                            onSubmit={
                              props.page == "insightsheet"
                                ? handleSubmit
                                : props.page == "event"
                                ? handleSubmitEvent
                                : props.page == "pricelist"
                                ? handleSubmitPriceList
                                : handleSubmitLineItem
                            }
                          >
                            <div className="com-section">
                              <textarea
                                placeholder={
                                  localStorage.getItem("tokenCustomer") == null
                                    ? ""
                                    : "Add a public comment"
                                }
                                readOnly={
                                  localStorage.getItem("tokenCustomer") == null
                                    ? true
                                    : false
                                }
                                required
                                onChange={(e) =>
                                  setReplies({
                                    ...replies,
                                    comment: e.currentTarget.value,
                                  })
                                }
                              />
                              {localStorage.getItem("tokenCustomer") == null &&
                                <label className="upLabel">
                                  <Link to="/my-account">
                                    Sign in
                                  </Link>
                                  {" "}to add a public comment
                                </label>
                              }
                            </div>
                            <div className="comments-btns">
                              {replies.attachment ? (
                                <div className="file_name">
                                  {"   " + replies.attachment.name}
                                </div>
                              ) : (
                                <div></div>
                              )}
                              <label className="file_input_label">
                                <input
                                  type="file"
                                  className="hide"
                                  name="attachment"
                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                  onChange={onSelectReply}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <img src={file} alt="file" loading="lazy" />
                              </label>
                              {!loadingReply && (
                                <button
                                  className="btn"
                                  type="submit"
                                  disabled={
                                    replies.comment == "" ? true : false
                                  }
                                  onClick={() => {
                                    setReplies({
                                      ...replies,
                                      replyToCommentsId: val.id,
                                    });
                                    setCheck(false);
                                  }}
                                >
                                  Reply
                                </button>
                              )}
                              {loadingReply && (
                                <button className="btn" disabled>
                                  <i className="fas fa-spinner fa-spin"></i>
                                </button>
                              )}
                              <button
                                className="btn"
                                onClick={() => setReplyBtn("notmatch")}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {val.id == replyview ? (
                    <>
                      {val.replys.length !== 0
                        ? val.replys.map((rep, key) => {
                            return (
                              <div key={key}>
                                <div className="view-reply-border">
                                  <hr />
                                  <div className="row view-reply-comment">
                                    <div className="col-1">
                                      <div className="img-section">
                                        <img
                                          className="comment_thumbnail"
                                          src={
                                            rep.commenterprofilepicture
                                              ? rep.commenterprofilepicture
                                              : comment
                                          }
                                          alt={rep.commenter}
                                          loading="lazy"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-11">
                                      <div className="comment-data">
                                        <h5> {rep.commenter} </h5>
                                        <span className="date">
                                          {" "}
                                          Posted&nbsp;
                                          {moment(rep.createdAt).format(
                                            "MM/DD/YYYY"
                                          )}
                                        </span>
                                        <br />
                                        {rep.attachment == null ? (
                                          ""
                                        ) : (
                                          <>
                                            <img
                                              src={rep.attachment}
                                              alt={rep.commenter}
                                              loading="lazy"
                                              onClick={() => {
                                                setIsOpen(!isOpen);
                                                setImageId(`${rep.id}`);
                                              }}
                                            />
                                            {isOpen && rep.id == imageid ? (
                                              <Lightbox
                                                mainSrc={rep.attachment}
                                                onCloseRequest={() =>
                                                  setIsOpen(false)
                                                }
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        )}
                                        <h4
                                          dangerouslySetInnerHTML={{
                                            __html: `${
                                              rep.comment
                                                ? rep.comment
                                                : ""
                                            }`,
                                          }}
                                        >
                                        </h4>
                                        {val.id == replybtn ? (
                                          ""
                                        ) : (
                                          <span
                                            className="view-reply"
                                            onClick={() => {
                                              setReplyBtn(`${val.id}`);
                                              scroll(`${val.id}`);
                                            }}
                                          >
                                            Reply
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : ""}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <hr />
        <div className="row section-2">
          <div className="col">
            <form
              id="form"
              onSubmit={
                props.page == "insightsheet"
                  ? handleSubmit
                  : props.page == "event"
                  ? handleSubmitEvent
                  : props.page == "pricelist"
                  ? handleSubmitPriceList
                  : handleSubmitLineItem
              }
            >
              <div className="img-section">
                <img
                  className="comment-thumbnail"
                  src={
                    navbarInfo.profilePicture
                      ? navbarInfo.profilePicture
                      : comment
                  }
                  alt="User_Picture"
                  loading="lazy"
                />
              </div>
              <div className="com-section">
                <textarea
                  placeholder={
                    localStorage.getItem("tokenCustomer") == null
                      ? ""
                      : "Add a public comment"
                  }
                  readOnly={
                    localStorage.getItem("tokenCustomer") == null ? true : false
                  }
                  required
                  onChange={(e) =>
                    setComments({
                      ...comments,
                      comment: e.currentTarget.value,
                    })
                  }
                />
                {localStorage.getItem("tokenCustomer") == null &&
                  <label className="upLabel">
                    <Link to="/my-account">
                      Sign in
                    </Link>
                    {" "}to add a public comment
                  </label>
                }
              </div>
              <div className="comments-btns">
                {comments.attachment ? (
                  <div className="file_name">
                    {"   " + comments.attachment.name}
                  </div>
                ) : (
                  <div></div>
                )}
                <label className="file_input_label">
                  <input
                    type="file"
                    className="hide"
                    name="attachment"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onChange={onSelectComment}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <img src={file} alt="file" loading="lazy" />
                </label>
                {!loadingComment && (
                  <button
                    className="btn"
                    type="submit"
                    disabled={comments.comment == "" ? true : false}
                    onClick={() => setCheck(true)}
                  >
                    Comment
                  </button>
                )}
                {loadingComment && (
                  <button className="btn" disabled>
                    <i className="fas fa-spinner fa-spin"></i>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
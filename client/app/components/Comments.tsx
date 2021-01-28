import React, { useState } from 'react';
import comment from 'assets/comment_logo.png';
import file from 'assets/file.png';

const Comments = () => {
    const [viewReply, setviewReply] = useState(false);
    const [viewComment, setviewCommment] = useState(false);

    return (
        <>
         <h2> Comments </h2>
            <div className="row section-1">
                <div className="col-12">
                    <div className="row">
                        <div className="col-1">
                            <div className="img-section">
                                <img 
                                    className="comment_thumbnail"
                                    src={comment} 
                                />
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="comment-data">
                                <h5> David Gilmour </h5>
                                <span className="date"> Posted 2 years ago </span>
                                <h4> Need additional information for 'mudside' remedation - help!! </h4>
                                <span 
                                    className={viewReply ? "hide" : "view-reply"}
                                    onClick={ () => setviewReply(true) }
                                > 
                                    view reply 
                                </span>
                            </div>
                        </div>
                        <div className="col-2 reply-btn">
                            <button 
                                className={viewComment ? "hide" : "btn"}
                                onClick={ () => setviewCommment(true) }
                            > 
                                Reply 
                            </button>
                        </div>
                    </div>
                    { viewComment ?
                        (
                            <div className="view-comment-border">
                                <hr />
                                <div className="row section-2">
                                    <div className="col">
                                        
                                        <div className="com-section">
                                            <textarea
                                                placeholder="Sign in to add a public comment"
                                            > 
                                            </textarea>
                                        </div>
                                        <div className="comments-btns">
                                            <label className="file_input_label">
                                                <input
                                                    type="file" 
                                                    className="hide"
                                                />
                                                <img src={file} />
                                            </label>
                                            <button className="btn"> Reply </button>
                                            <button 
                                                className="btn"
                                                onClick={ () => setviewCommment(false) }
                                            > Cancel </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    }
                    { viewReply ?
                        (
                            <div className="view-reply-border">
                                <hr />
                                <div className="row view-reply-comment">
                                    <div className="col-1">
                                        <div className="img-section">
                                            <img 
                                                className="comment_thumbnail"
                                                src={comment} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-11">
                                        <div className="comment-data">
                                            <h5> Jeri Bates </h5>
                                            <span className="date"> Posted 7 months ago </span>
                                            <h4> Hey Jeri - I will be running this suggested revision by the Board alongside other Insight Sheet updates in our next meeting, thank you for the feedback. </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    } 
                </div>
            </div>
            <hr />
            <div className="row section-2">
                <div className="col">
                    <div className="img-section">
                        <img 
                            className="comment-thumbnail"
                            src={comment} 
                        />
                    </div>
                    <div className="com-section">
                        <textarea
                            placeholder="Sign in to add a public comment"
                        > 
                        </textarea>
                    </div>
                    <div className="comments-btns">
                        <label className="file_input_label">
                            <input
                                type="file" 
                                className="hide"
                            />
                            <img src={file} />
                        </label>
                        <button className="btn"> Comment </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comments;
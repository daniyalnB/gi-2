import React, { useState } from 'react';
import search1 from 'assets/search1.png';
import search2 from 'assets/search2.png';

const Search = (props) => {

    console.log("Props", location.pathname);

    const [filter, setFilter] = useState(false);

    return (
        <>
            <div className="main-search">
                <div className="form-group nogroup">
                    <div className="input-group">
                        <img 
                            className="input_icon" 
                            src={search1}
                            onClick={(e) => setFilter(!filter)}
                        />
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search by keywords"
                            required
                        />
                        <img className="input_icon" src={search2}></img>
                    </div>
                </div>
                {location.pathname === "/videogallery" ?
                    <div className={filter ? "active" : "dropdown-content" }>
                        <h5> Filter by Video Types </h5>
                        <div className="filter">
                            <input type="checkbox" id="s1" />
                            <label htmlFor="s1">
                                Matter Hacks
                            </label>
                        </div>
                        <hr />
                        <div className="filter">
                            <input type="checkbox" id="s2" />
                            <label htmlFor="s2">
                                Xact Hacks
                            </label>
                        </div>
                        <hr />
                        <div className="filter">
                            <input type="checkbox" id="s3" />
                            <label htmlFor="s3">
                                Hotkey Highlights
                            </label>
                        </div>
                        <hr />
                        <div className="filter">
                            <input type="checkbox" id="s4" />
                            <label htmlFor="s4">
                                Equipment Corral
                            </label>
                        </div>
                    </div>
                    :
                    <div className={filter ? "active" : "dropdown-content" }>
                        <h5> Filter by Categories </h5>
                        <div className="filter">
                            <input type="checkbox" id="s1" />
                            <label htmlFor="s1">
                                Mitigation
                            </label>
                        </div>
                        <hr />
                        <div className="filter">
                            <input type="checkbox" id="s2" />
                            <label htmlFor="s2">
                                Repair
                            </label>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Search;
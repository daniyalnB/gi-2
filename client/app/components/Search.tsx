import React, { useState } from 'react';
import search1 from 'assets/search1.png';
import search2 from 'assets/search2.png';

const Search = () => {

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
            </div>
        </>
    );
}

export default Search;
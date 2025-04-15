import React from "react";
import searchicon from "assets/magnifying-glass.svg";

const Search = ({ search, setSearch }) => {

	return (
		<>
			<div className="form-group nogroup">
				<div className="input-group">
					<img className="input_icon" src={searchicon}></img>
					<input 
						type="text" 
						className="form-control" 
						placeholder="Search"
						required
						value={search}
						onChange={(e) => {
							setSearch(e.currentTarget.value);
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default Search;
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AdminTable from "../.././../gi-team/components/TableExtra";
import moment from "moment";

const MyEvents = (props) => {

	const [headers, setHeaders] = useState([
		{
			Header: "Event",
			accessor: false,
		},
		{
			Header: "Location",
			accessor: false,
		},
		{
			Header: "Start Date",
			accessor: "startDate",
		},
	]);

	return (
		<>
      <div className="my-events">
				{props.events.length == 0 ? (
					<div className="no-my-events">
						<h5> No Registered Events </h5>
					</div>
				) : (
					<div className="my-events-view">
						<AdminTable
							tableClesses={"my-events-table"}
							headers={headers}
							showHeaders={true}
							data={props.events}
							Row={({ index, rowData }) => {
								return (
									<tr key={index}>
										<td style={{ wordBreak: "break-all"}}> {rowData.original.event ? rowData.original.event : "N/A"} </td>
										<td> {rowData.original.location ? rowData.original.location : "N/A"} </td>
										<td> {rowData.original.startDate ? moment(rowData.original.startDate).format("MM/DD/YYYY") : "N/A"} </td>
									</tr>
								);
							}}
						/>
					</div>
				)}
			</div>
    </>
	);
};

export default withRouter(MyEvents);
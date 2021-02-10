import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SideMenu from "../../components/SideMenu";
import UserTab from "../../components/UserTab";
import AdminTable from "../../components/Table";
import IS from "assets/InsightSheetsRed.png";
import searchicon from "assets/magnifying-glass.svg";
import vision from "assets/visibility.svg";
import MOCK_DATA from "../../components/MOCK_DATA.json";

export default function insightsheet (props) {

    const data = useMemo(() => MOCK_DATA, [])
    console.log(data);
    const length = data.length

    const [activeTab, setActiveTab] = useState({
        All: true,
        Draft: false,
        Published: false,
        Trash: false
    });

    const [headers, setHeaders] = useState([
        {
          Header: "Title",
          accessor: "id",
        },
        {
          Header: "Category",
          accessor: "first_name",
        },
        {
          Header: "Last Update",
          accessor: "lastupdate",
        },
        {
          Header: "Ratings",
          accessor: "ratings",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Action",
          accessor: false,
        },
    ]);

    const [search, setSearch] = useState("");

    return (
        <>
            <div className="insightsheet">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <SideMenu />
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <UserTab />
                            </div>
                            <div className="insightsheet-section">
                                <div className="row header">
                                    <div className="col-9">
                                        <div className="page_icon">
                                            <img src={IS} />
                                        </div>
                                        <h3 className="heading">
                                            Insight Sheets
                                        </h3>
                                    </div>
                                    <div className="col-3 text-right">
                                        <Link
                                            className="btn"
                                            to="/admin/CreateInsightSheet"
                                        >
                                            + Create New
                                        </Link>
                                    </div>
                                </div>
                                <hr />
                                <div className="inner_sub_area">
                                    <div className="row">
                                        <div className="col-8">
                                            <ul className="subs_filters">
                                                <li
                                                    className={activeTab.All == true ? "active" : ""}
                                                    onClick={() =>
                                                        setActiveTab({
                                                            All: true,
                                                            Draft: false,
                                                            Published: false,
                                                            Trash: false
                                                        })
                                                    }
                                                >
                                                    All (405)
                                                </li>
                                                <li
                                                    className={activeTab.Draft == true ? "active" : ""}
                                                    onClick={() =>
                                                        setActiveTab({
                                                            All: false,
                                                            Draft: true,
                                                            Published: false,
                                                            Trash: false
                                                        })
                                                    }
                                                >
                                                    Draft (30)
                                                </li>
                                                <li
                                                    className={activeTab.Published == true ? "active" : ""}
                                                    onClick={() =>
                                                        setActiveTab({
                                                            All: false,
                                                            Draft: false,
                                                            Published: true,
                                                            Trash: false
                                                        })
                                                    }
                                                >
                                                    Published (42)
                                                </li>
                                                <li
                                                    className={activeTab.Trash == true ? "active" : ""}
                                                    onClick={() =>
                                                        setActiveTab({
                                                            All: false,
                                                            Draft: false,
                                                            Published: false,
                                                            Trash: true
                                                        })
                                                    }
                                                >
                                                    Trash (21)
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group nogroup">
                                                <div className="input-group">
                                                    <img className="input_icon" src={searchicon}></img>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Search"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-section">
                                    <div className="row">
                                        <AdminTable
                                            tableClesses={"table-stripes bktables"}
                                            headers={headers}
                                            showHeaders={true}
                                            data={data}
                                            search={search}
                                            pageCount={length}
                                            Row={({ index, rowData }) => {
                                                return (
                                                    <tr key={index}>
                                                    <td>{rowData.original.id}</td>
                                                    <td>{rowData.original.first_name}</td>
                                                    <td>{rowData.original.email}</td>
                                                    <td>{rowData.original.phone}</td>
                                                    <td>
                                                        {"N/A"}
                                                    </td>
                                                    <td>
                                                        <div
                                                        className="view_icon_users">
                                                        <img src={vision} />
                                                        </div>
                                                    </td>
                                                    </tr>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};
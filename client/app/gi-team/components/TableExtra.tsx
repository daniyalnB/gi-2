import React, { useEffect, useState } from "react";
import sortIcon from "assets/sort.svg";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";

const AdminTable = (props) => {
  const {
    headers,
    data,
    Row,
    showHeaders,
    tableClesses,
    search,
  } = props;
  const [sortMode, setSortMode] = useState("Asc");
  const [tableSearch, setTableSearch] = useState(search);
  const columns = React.useMemo(() => Object.assign([], headers), []);
  const tableData = React.useMemo(() => Object.assign([], data), [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    setGlobalFilter(search);
  }, [search]);

  return (
    <>
      <table className={`table ${tableClesses}`} {...getTableProps()}>
        {showHeaders && (
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}{" "}
                    {column.accessor ? <img src={sortIcon} /> : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody {...getTableBodyProps()}>
          {rows.map((dItem, uindex, i) => {
            prepareRow(dItem);
            return <Row index={uindex} rowData={dItem} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdminTable;
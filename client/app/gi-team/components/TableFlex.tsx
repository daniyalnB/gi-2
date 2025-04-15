import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination, useFlexLayout } from "react-table";
import sortIcon from "assets/sort.svg";

const AdminTable = (props) => {
  const {
    headers,
    data,
    Row,
    showHeaders,
    tableClesses,
    search,
    // pageCount: controlledPageCount,
  } = props;
  const [sortMode, setSortMode] = useState("Asc");
  const [tableSearch, setTableSearch] = useState(search);
  const columns = React.useMemo(() => Object.assign([], headers), []);
  const tableData = React.useMemo(() => Object.assign([], data), [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      // pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useSortBy,
    useFlexLayout,
    usePagination
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
          {page.length > 0 &&
            page.map((dItem, uindex, i) => {
              prepareRow(dItem);
              return <Row index={uindex} rowData={dItem} />;
            })
          || 
            <tr>
              <td
                data-toggle="collapse"
                colSpan={10}
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                No matching records found
              </td>
            </tr>
          }  
        </tbody>
      </table>
      {page.length > 0 &&
        <div className="row pagination">
          <div className="col-12">
            <button className="btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button className="btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(pageNumber)
                }}
                style={{ 
                  width: "50px",
                  height: "23px",
                }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}>
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="col-6 mt-3">
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}>
              {[10, 20, 30].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span> Displaying {page.length} - {pageSize} of {controlledPageCount} records{" "} </span>
          </div> */}
           {/* Showing
            <span className="mx-1 font-semibold">
              { pageIndex * pageSize + 1 }-
              { ( pageIndex + 1 ) * pageSize -
                ( pageSize - page.length ) }
            </span>
            of {data.length}
            items */}
        </div>
      ||
        ""
      }
    </>
  );
};

export default AdminTable;
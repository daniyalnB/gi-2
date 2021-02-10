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
    pageCount: controlledPageCount,
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
      pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setGlobalFilter(search);
  }, [search]);

  console.log(pageCount);
  console.log(pageSize);
  console.log(page.length);

  const [active, setActive] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  return (
    <>
      <table className={`table ${tableClesses}`} {...getTableProps()}>
        {showHeaders && (
          <thead 
            onClick={() => 
              setActive({
                one: true,
                two: false,
                three: false,
                four: false,
                five: false,
              })
            }  
          >
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
          {page.map((dItem, uindex, i) => {
            prepareRow(dItem);
            return <Row index={uindex} rowData={dItem} />;
          })}
        </tbody>
      </table>

      <div className="m-5 row pagination">
        <div className="col-6">
          <button className="btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button 
            className={active.one == true ? "active btn" : "btn"} 
            onClick={() => [
              gotoPage(0),
              setActive({
                one: true,
                two: false,
                three: false,
                four: false,
                five: false,
              })
            ]}  
          >
            1
          </button>{' '}
          <button 
            className={active.two == true ? "active btn" : "btn"} 
            onClick={() => [
              gotoPage(1),
              setActive({
                one: false,
                two: true,
                three: false,
                four: false,
                five: false,
              })
            ]}  
          >
            2
          </button>{' '}
          <button 
            className={active.three == true ? "active btn" : "btn"} 
            onClick={() => [
              gotoPage(2),
              setActive({
                one: false,
                two: false,
                three: true,
                four: false,
                five: false,
              })
            ]}  
          >
            3
          </button>{' '}
          <button 
            className={active.four == true ? "active btn" : "btn"} 
            onClick={() => [
              gotoPage(3),
              setActive({
                one: false,
                two: false,
                three: false,
                four: true,
                five: false,
              })
            ]}  
          >
            4
          </button>{' '}
          <button 
            className={active.five == true ? "active btn" : "btn"} 
            onClick={() => [
              gotoPage(4),
              setActive({
                one: false,
                two: false,
                three: false,
                four: false,
                five: true,
              })
            ]}  
          >
            5
          </button>{' '}
          <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button className="btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          {/* <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
              }}
              style={{ width: '50px' }}
            />
          </span>{' '} */}
        </div>
        <div className="col-6 mt-3">
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}>
            {[10, 20, 30].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span> Displaying {page.length} - {pageSize} of {controlledPageCount} records{' '} </span>
        </div>
      </div>
    </>
  );
};

export default AdminTable;

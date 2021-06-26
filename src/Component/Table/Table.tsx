import React, { useEffect, useState } from "react";

import Axios from "axios";

import { TableData, Props } from "../../types";
import { getRandomNumber } from "../../helper";

import Loader from "react-loader-spinner";
import TableBody from "./TableBody/TableBody";

interface TableProps extends Props {}

const Table: React.FC<TableProps> = ({ setId, setToken }) => {
  const [tableData, setTableData] = useState<TableData[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cancelToken = Axios.CancelToken.source();
    const timerId = window.setTimeout(() => {
      Axios.get("https://fakestoreapi.com/products?limit=5", {
        cancelToken: cancelToken.token,
      })
        .then((res) => {
          console.log("table data", res);
          const a = [...res.data] as TableData[];
          setTableData(a);
        })
        .catch((err) => {
          console.log(err);
          setError("No Data found from API");
        });
    }, 1000 * getRandomNumber(6, 9));
    setId(timerId);
    setToken(cancelToken);
  }, [setId, setToken]);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Category</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tableData ? (
            tableData.map((rowData, i) => (
              <TableBody data={rowData} index={i} key={rowData.id + i} />
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <div className="d-flex justify-content-center py-5">
                  {error ? { error } : <Loader type="Puff" color="#007bff" />}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

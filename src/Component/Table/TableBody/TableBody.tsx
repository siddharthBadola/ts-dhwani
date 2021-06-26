import React from "react";

import { TableData } from "../../../types";

interface TableBodyProps {
  data: TableData;
  index: number;
}

const TableBody: React.FC<TableBodyProps> = ({ data, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data.category}</td>
      <td>{data.title}</td>
      <td>{data.price}</td>
      <td>{data.description}</td>
    </tr>
  );
};

export default TableBody;

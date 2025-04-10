// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { TbReportAnalytics } from "react-icons/tb";
// import { HiOutlineMail } from "react-icons/hi";
// import { MdOutlineAnalytics } from "react-icons/md";

// import styles from "./style.module.scss"; // Import SCSS styles

// export default function TableComponent({ columns, data }) {
//   return (
//     <TableContainer component={Paper} className={styles.tableContainer}>
//       <Table className={styles.table}>
//         <TableHead>
//           <TableRow className={styles.tableHeaderRow}>
//             {columns.map((column, index) => (
//               <TableCell key={index} className={styles.tableHeader}>
//                 {column}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, rowIndex) => (
//             <TableRow key={rowIndex} className={styles.tableRow}>
//               {columns.map((column, colIndex) => (
//                 <TableCell key={colIndex} className={styles.tableCell}>
//                   {column === "Status" ? (
//                     <span
//                       className={
//                         (row[column] === "Open") | (row[column] === "open")
//                           ? styles.open
//                           : styles.closed
//                       }
//                     >
//                       {row[column]}
//                     </span>
//                   ) : column === "Actions" ? (
//                     <div className={styles.actionButtons}>
//                       <MdOutlineAnalytics className={styles.iconButton} />
//                       <TbReportAnalytics className={styles.iconButton} />
//                       <HiOutlineMail className={styles.iconButton} />
//                     </div>
//                   ) : (
//                     row[column]
//                   )}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineAnalytics } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";

import styles from "./style.module.scss"; // Import SCSS styles

export default function TableComponent({ columns, data }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    columns.some((column) =>
      row[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.tableContainer}>
      <div className={styles.controls}>
        <h2>Restaurants status</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button className={styles.filterButton}>
          {" "}
          <VscSettings />
          Filter <MdKeyboardArrowDown />
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow className={styles.tableHeaderRow}>
              {columns.map((column, index) => (
                <TableCell key={index} className={styles.tableHeader}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={styles.tableRow}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={styles.tableCell}>
                    {column === "Status" ? (
                      <span
                        className={
                          row[column].toLowerCase() === "open"
                            ? styles.open
                            : styles.closed
                        }
                      >
                        {row[column]}
                      </span>
                    ) : column === "Actions" ? (
                      <div className={styles.actionButtons}>
                        <MdOutlineAnalytics className={styles.iconButton} />
                        <TbReportAnalytics className={styles.iconButton} />
                        <HiOutlineMail className={styles.iconButton} />
                      </div>
                    ) : (
                      row[column]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

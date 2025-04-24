// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { CgProfile } from "react-icons/cg";
// import { VscSettings } from "react-icons/vsc";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { CiCirclePlus } from "react-icons/ci";
// import { CiEdit } from "react-icons/ci";
// import { MdDeleteOutline } from "react-icons/md";

// import AddRestaurantForm from "../form/AddGRHForm"; // Import the form component

// import styles from "./Restaurant.module.scss"; // Import SCSS styles

// export default function TableComponent({ columns, data }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Open and close form
//   const openForm = () => setIsFormOpen(true);
//   const closeForm = () => setIsFormOpen(false);

//   // Filter data based on search term
//   const filteredData = data.filter((row) =>
//     columns.some((column) =>
//       row[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <div className={styles.container}>
//       {/* Blur effect on the background when form is open */}
//       <div
//         className={`${styles.tableContainer} ${
//           isFormOpen ? styles.blurred : ""
//         }`}
//       >
//         <div className={styles.controls}>
          
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className={styles.searchInput}
//           />
//           <button className={styles.filterButton}>
//             <VscSettings /> Filter <MdKeyboardArrowDown />
//           </button>
//           <button className={styles.addButton} onClick={openForm}>
//             Add <CiCirclePlus />
//           </button>
//         </div>

//         <TableContainer component={Paper}>
//           <Table className={styles.table}>
//             <TableHead>
//               <TableRow className={styles.tableHeaderRow}>
//                 {columns.map((column, index) => (
//                   <TableCell key={index} className={styles.tableHeader}>
//                     {column}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.map((row, rowIndex) => (
//                 <TableRow key={rowIndex} className={styles.tableRow}>
//                   {columns.map((column, colIndex) => (
//                     <TableCell key={colIndex} className={styles.tableCell}>
//                       {column === "Status" ? (
//                         <span
//                           className={
//                             row[column].toLowerCase() === "open"
//                               ? styles.open
//                               : styles.closed
//                           }
//                         >
//                           {row[column]}
//                         </span>
//                       ) : column === "Actions" ? (
//                         <div className={styles.actionButtons}>
//                           <CgProfile className={styles.iconButton} />
//                           <CiEdit className={styles.iconButton} />
//                           <MdDeleteOutline
//                             id="delete"
//                             className={styles.iconButtondelete}
//                           />
//                         </div>
//                       ) : (
//                         row[column]
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>

//       {/* Show form only when isFormOpen is true */}
//       {isFormOpen && (
//         <div className={styles.overlay} onClick={closeForm}>
//           <div
//             className={styles.formContainer}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <AddRestaurantForm closeForm={closeForm} />{" "}
//             {/* ✅ Matches import */}
//           </div>
//         </div>
//       )}
//     </div>
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
import { CgProfile } from "react-icons/cg";
import { VscSettings } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import AddRestaurantForm from "../form/AddGRHForm"; // Import the form component

import styles from "./Restaurant.module.scss"; // Import SCSS styles

export default function TableComponent({ columns, data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open and close form
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    columns.some((column) =>
      row[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.tableContainer} ${
          isFormOpen ? styles.blurred : ""
        }`}
      >
        <h2 className={styles.tableTitle}>GRH Management</h2>
        
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button className={styles.filterButton}>
            <VscSettings /> Filter <MdKeyboardArrowDown />
          </button>
          <button className={styles.addButton} onClick={openForm}>
            Add <CiCirclePlus />
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
                          <CgProfile className={styles.iconButton} />
                          <CiEdit className={styles.iconButton} />
                          <MdDeleteOutline
                            id="delete"
                            className={styles.iconButtondelete}
                          />
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

      {/* Show form only when isFormOpen is true */}
      {isFormOpen && (
        <div className={styles.overlay} onClick={closeForm}>
          <div
            className={styles.formContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <AddRestaurantForm closeForm={closeForm} />{" "}
            {/* ✅ Matches import */}
          </div>
        </div>
      )}
    </div>
  );
}
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
import { CiEdit, CiCirclePlus } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import AddRestaurantForm from "../form/AddRestaurantForm"; // Import the form component
import styles from "./Restaurant.module.scss"; // Import SCSS styles

export default function TableComponent({
  columns,
  data,
  refreshRestaurants,
  onRestaurantAdded,
  onRestaurantUpdated,
  onRestaurantDeleted,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const openForm = (restaurant = null) => {
    setSelectedRestaurant(restaurant);
    setIsFormOpen(true);
  };
  const closeForm = () => setIsFormOpen(false);

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      row[column.toLowerCase()]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.tableContainer} ${
          isFormOpen ? styles.blurred : ""
        }`}
      >
        <h2 className={styles.tableTitle}>Restaurant Management</h2>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button className={styles.addButton} onClick={() => openForm()}>
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
                      {column === "Actions" ? (
                        <div className={styles.actionButtons}>
                          <CiEdit
                            className={styles.iconButton}
                            onClick={() => openForm(row)}
                          />
                          <MdDeleteOutline
                            className={styles.iconButtondelete}
                            onClick={() => onRestaurantDeleted(row.id)}
                          />
                        </div>
                      ) : (
                        row[column.toLowerCase()]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {isFormOpen && (
        <div className={styles.overlay} onClick={closeForm}>
          <div
            className={styles.formContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <AddRestaurantForm
              closeForm={closeForm}
              refreshRestaurants={refreshRestaurants}
              onRestaurantAdded={onRestaurantAdded}
              onRestaurantUpdated={onRestaurantUpdated}
              restaurant={selectedRestaurant}
            />
          </div>
        </div>
      )}
    </div>
  );
}

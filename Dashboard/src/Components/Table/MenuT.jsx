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
import AddDish from "../form/AddDish";
import styles from "./Restaurant.module.scss";

export default function MenuTable({
  columns,
  data,
  menuId,
  refreshDishes,
  onDishAdded,
  onDishDeleted,
  onDishUpdated,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const openForm = () => setIsFormOpen(true);
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
        <h2 className={styles.tableTitle}>Dishes Management</h2>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
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
                      {column === "Actions" ? (
                        <div className={styles.actionButtons}>
                          <CiEdit
                            className={styles.iconButton}
                            onClick={() => {
                              setSelectedDish(row);
                              openForm();
                            }}
                          />

                          <MdDeleteOutline
                            className={styles.iconButtondelete}
                            onClick={() => onDishDeleted(row.id)}
                          />
                        </div>
                      ) : (
                        <div className={styles.cellContent}>
                          {row[column.toLowerCase()]}
                        </div>
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
          <div onClick={(e) => e.stopPropagation()}>
            <AddDish
              closeForm={closeForm}
              menuId={menuId}
              refreshDishes={refreshDishes}
              onDishAdded={onDishAdded}
              onDishUpdated={onDishUpdated}
              dish={selectedDish}
            />
          </div>
        </div>
      )}
    </div>
  );
}

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
import { VscSettings } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";

import styles from "./Restaurant.module.scss"; // your custom SCSS

export default function MenuTable({ columns, data }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      row[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.tableTitle}>Ingrediants Management</h2>
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
        <button className={styles.addButton}>
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
                        <CiEdit className={styles.iconButton} />
                        <MdDeleteOutline className={styles.iconButtondelete} />
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

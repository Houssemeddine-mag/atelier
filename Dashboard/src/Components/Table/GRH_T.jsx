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
import EditRestaurantForm from "./EditGRHForm"; // You'll need to create this component

import styles from "./Restaurant.module.scss"; // Import SCSS styles



export default function TableComponent({ columns, data: initialData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [data, setData] = useState(initialData);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Form handlers
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  
  const openEditForm = (item) => {
    setCurrentItem(item);
    setIsEditFormOpen(true);
  };
  
  const closeEditForm = () => {
    setCurrentItem(null);
    setIsEditFormOpen(false);
  };

  // Handle add new item (mock implementation)
  const handleAdd = (newItem) => {
    setData([...data, { id: Date.now(), ...newItem }]);
    closeForm();
  };

  // Handle edit item (mock implementation)
  const handleEdit = (updatedItem) => {
    setData(data.map(item => item.id === updatedItem.id ? updatedItem : item));
    closeEditForm();
  };

  // Handle delete item (mock implementation)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

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
          (isFormOpen || isEditFormOpen) ? styles.blurred : ""
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
                          <CgProfile 
                            className={styles.iconButton} 
                            title="View Profile"
                          />
                          <CiEdit 
                            className={styles.iconButton} 
                            onClick={() => openEditForm(row)}
                            title="Edit"
                          />
                          <MdDeleteOutline
                            className={styles.iconButtondelete}
                            onClick={() => handleDelete(row.id)}
                            title="Delete"
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

      {/* Show add form when isFormOpen is true */}
      {isFormOpen && (
        <div className={styles.overlay} onClick={closeForm}>
          <div
            className={styles.formContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <AddRestaurantForm 
              closeForm={closeForm}
              onSubmit={handleAdd}
            />
          </div>
        </div>
      )}

      {/* Show edit form when isEditFormOpen is true */}
      {isEditFormOpen && (
        <div className={styles.overlay} onClick={closeEditForm}>
          <div
            className={styles.formContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <EditRestaurantForm 
              closeForm={closeEditForm}
              onSubmit={handleEdit}
              initialData={currentItem}
            />
          </div>
        </div>
      )}
    </div>
  );
}


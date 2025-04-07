import React, { useState } from "react";
import styles from "./style.module.scss";

export default function AddRestaurantForm({ closeForm }) {
  const [fileName, setFileName] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Display file name
    } else {
      setFileName(""); // Reset if no file selected
    }
  };

  return (
    <div className={styles.formContent}>
      <button className={styles.closeButton} onClick={closeForm}>
        &times;
      </button>
      <h2>Add New Restaurant</h2>
      <form>
        <input type="text" placeholder="Restaurant Name" required />
        <input type="text" placeholder="Address" required />
        <input type="text" placeholder="Latitude" required />
        <input type="text" placeholder="Longitude" required />
        <input type="text" placeholder="Phone Number" required />
        <input type="text" placeholder="Currency" required />

        {/* Custom file input */}
        <div className={styles.fileInputContainer}>
          <input
            type="file"
            accept="image/*"
            id="fileUpload"
            className={styles.hiddenFileInput}
            onChange={handleFileChange}
          />
          <label htmlFor="fileUpload" className={styles.customFileButton}>
            Upload Image
          </label>
          <span className={styles.fileName}>{fileName || "No file selected"}</span>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Add</button>
          <button type="button" className={styles.cancelButton} onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

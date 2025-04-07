
// import React, { useState } from "react";
// import styles from "./style.module.scss";

// export default function AddRestaurantForm({ closeForm }) {
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFileName(file ? file.name : "");
//   };

//   return (
//     <div className={styles.formContent}>
//       <button className={styles.closeButton} onClick={closeForm}>
//         &times;
//       </button>
//       <h2>Add New Director</h2>
//       <form>
//         <input type="text" placeholder="Restaurant Name" required />
//         <input type="text" placeholder="Address" required />
//         <input type="text" placeholder="Latitude" required />
//         <input type="text" placeholder="Longitude" required />
//         <input type="text" placeholder="Phone Number" required />
//         <input type="text" placeholder="Currency" required />

//         <div className={styles.fileInputContainer}>
//           <input
//             type="file"
//             accept="image/*"
//             id="fileUpload"
//             className={styles.hiddenFileInput}
//             onChange={handleFileChange}
//           />
//           <label htmlFor="fileUpload" className={styles.customFileButton}>
//             Upload Image
//           </label>
//           <span className={styles.fileName}>{fileName || "No file selected"}</span>
//         </div>

//         <div className={styles.buttonGroup}>
//           <button type="submit" className={styles.submitButton}>Add</button>
//           <button type="button" className={styles.cancelButton} onClick={closeForm}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import styles from "./style.module.scss";

export default function AddRestaurantForm({ closeForm }) {
  const [profileFile, setProfileFile] = useState("");
  const [idCardFile, setIdCardFile] = useState("");
  const [cvFile, setCvFile] = useState("");

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file ? file.name : "");
  };

  return (
    <div className={styles.formContent}>
      <button className={styles.closeButton} onClick={closeForm}>
        &times;
      </button>
      <h2>Add New Director</h2>
      <form>
        <select className={styles.input} required>
          <option value="">Title</option>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
        </select>

        <input type="text" placeholder="First Name" className={styles.input} required />
        <input type="text" placeholder="Last Name" className={styles.input} required />
        <input type="date" className={styles.input} required />

        <input type="text" placeholder="Address" className={styles.input} required />
        <input type="tel" placeholder="Phone Number" className={styles.input} required />
        <input type="email" placeholder="Email" className={styles.input} required />

        <select className={styles.input} required>
          <option value="">Restaurant Assignment</option>
          <option value="restaurant1">Restaurant 1</option>
          <option value="restaurant2">Restaurant 2</option>
        </select>

        <select className={styles.input} required>
          <option value="">Payment Method</option>
          <option value="CCP">CCP</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <input type="text" placeholder="Card Number" className={styles.input} required />
        <input type="text" placeholder="Social Assurance Number" className={styles.input} required />

        {/* Profile Picture Upload */}
        <div className={styles.fileInputContainer}>
          <label htmlFor="profileUpload" className={styles.customFileButton}>
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            className={styles.hiddenFileInput}
            onChange={(e) => handleFileChange(e, setProfileFile)}
          />
          <span className={styles.fileName}>{profileFile || "No file chosen"}</span>
        </div>

        {/* ID Card Upload */}
        <div className={styles.fileInputContainer}>
          <label htmlFor="idCardUpload" className={styles.customFileButton}>
            ID Card
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            id="idCardUpload"
            className={styles.hiddenFileInput}
            onChange={(e) => handleFileChange(e, setIdCardFile)}
          />
          <span className={styles.fileName}>{idCardFile || "No file chosen"}</span>
        </div>

        {/* CV Upload */}
        <div className={styles.fileInputContainer}>
          <label htmlFor="cvUpload" className={styles.customFileButton}>
            CV
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            id="cvUpload"
            className={styles.hiddenFileInput}
            onChange={(e) => handleFileChange(e, setCvFile)}
          />
          <span className={styles.fileName}>{cvFile || "No file chosen"}</span>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Add</button>
          <button type="button" className={styles.cancelButton} onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

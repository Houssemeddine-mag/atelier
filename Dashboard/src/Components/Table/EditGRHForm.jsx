import React, { useState } from "react";
import styles from "Dashboard/src/Components/form/style.module.scss"; // Adjust the path as necessary

export default function EditGRHForm({ closeForm, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    title: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    email: "",
    restaurantAssignment: "",
    paymentMethod: "",
    cardNumber: "",
    socialAssuranceNumber: ""
  });

  const [profileFile, setProfileFile] = useState("");
  const [idCardFile, setIdCardFile] = useState("");
  const [cvFile, setCvFile] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      profileFile,
      idCardFile,
      cvFile
    });
  };

  return (
    <div className={styles.formContent}>
      <button className={styles.closeButton} onClick={closeForm}>
        &times;
      </button>
      <h2>Edit Director</h2>
      <form onSubmit={handleSubmit}>
        <select 
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input} 
          required
        >
          <option value="">Title</option>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
        </select>

        <input 
          type="text" 
          name="firstName"
          placeholder="First Name" 
          className={styles.input} 
          value={formData.firstName}
          onChange={handleChange}
          required 
        />
        
        <input 
          type="text" 
          name="lastName"
          placeholder="Last Name" 
          className={styles.input} 
          value={formData.lastName}
          onChange={handleChange}
          required 
        />
        
        <input 
          type="date" 
          name="birthDate"
          className={styles.input} 
          value={formData.birthDate}
          onChange={handleChange}
          required 
        />
        
        <input 
          type="text" 
          name="address"
          placeholder="Address" 
          className={styles.input} 
          value={formData.address}
          onChange={handleChange}
          required 
        />
        
        <input 
          type="tel" 
          name="phoneNumber"
          placeholder="Phone Number" 
          className={styles.input} 
          value={formData.phoneNumber}
          onChange={handleChange}
          required 
        />
        
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          className={styles.input} 
          value={formData.email}
          onChange={handleChange}
          required 
        />

        <select 
          name="restaurantAssignment"
          value={formData.restaurantAssignment}
          onChange={handleChange}
          className={styles.input} 
          required
        >
          <option value="">Restaurant Assignment</option>
          <option value="restaurant1">Restaurant 1</option>
          <option value="restaurant2">Restaurant 2</option>
        </select>

        <select 
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className={styles.input} 
          required
        >
          <option value="">Payment Method</option>
          <option value="CCP">CCP</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <input 
          type="text" 
          name="cardNumber"
          placeholder="Card Number" 
          className={styles.input} 
          value={formData.cardNumber}
          onChange={handleChange}
          required 
        />
        
        <input 
          type="text" 
          name="socialAssuranceNumber"
          placeholder="Social Assurance Number" 
          className={styles.input} 
          value={formData.socialAssuranceNumber}
          onChange={handleChange}
          required 
        />

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
          <button type="submit" className={styles.submitButton}>Save Changes</button>
          <button type="button" className={styles.cancelButton} onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
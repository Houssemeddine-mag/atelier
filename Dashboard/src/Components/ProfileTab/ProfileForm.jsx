import React from "react";
import styles from "./style.module.scss";

export default function ProfileForm() {
  return (
    <div className={styles.formBox}>
      <h2>Personal Information</h2>
      <p className={styles.subtext}>Update your personal details</p>
      <form className={styles.form}>
        <div className={styles.row}>
          <label>First Name</label>
          <input type="text" defaultValue="John" />
        </div>
        <div className={styles.row}>
          <label>Last Name</label>
          <input type="text" defaultValue="Doe" />
        </div>
        <div className={styles.row}>
          <label>Email Address</label>
          <input type="email" defaultValue="j.doe@feedme.com" />
        </div>
        <div className={styles.row}>
          <label>Phone Number</label>
          <input type="tel" defaultValue="+213 555 123 456" />
        </div>
        <div className={styles.row}>
          <label>Position</label>
          <input type="text" defaultValue="Admin Manager" />
        </div>
        <div className={styles.row}>
          <label>Date of Birth</label>
          <input type="date" defaultValue="1985-12-03" />
        </div>
        <div className={styles.row}>
          <label>Address</label>
          <input type="text" defaultValue="123 Main Street, Algiers, Algeria" />
        </div>
        <div className={styles.row}>
          <label>Bio</label>
          <textarea defaultValue="Restaurant management professional with over 10 years of experience in the food service industry. Skilled in operations, team leadership, and customer service." />
        </div>
        <div className={styles.buttonBox}>
          <button type="submit" className={styles.saveBtn}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}

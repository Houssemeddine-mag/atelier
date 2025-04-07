import React from "react";
import styles from "./style.module.scss";
import { MdEmail, MdPhone, MdLocationOn, MdCalendarToday } from "react-icons/md";

export default function ProfileCard() {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>JD</div>
      <h2>John Doe</h2>
      <p className={styles.subtitle}>Admin Manager</p>
      <div className={styles.info}>
        <p><MdEmail /> j.doe@feedme.com</p>
        <p><MdPhone /> +213 555 123 456</p>
        <p><MdLocationOn /> 123 Main Street, Algiers, Algeria</p>
        <p><MdCalendarToday /> Joined 5/10/2018</p>
      </div>
    </div>
  );
}

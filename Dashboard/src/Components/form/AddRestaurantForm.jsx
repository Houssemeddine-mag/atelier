import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import api from "../../api";

export default function AddRestaurantForm({
  closeForm,
  refreshRestaurants,
  onRestaurantAdded,
  onRestaurantUpdated,
  restaurant,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ceoid: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        location: restaurant.location || "",
        ceoid: restaurant.ceoid || "",
      });
    }
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (restaurant) {
        await onRestaurantUpdated({ ...formData, id: restaurant.id });
      } else {
        await onRestaurantAdded(formData);
      }
      refreshRestaurants();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save restaurant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContent}>
      <button className={styles.closeButton} onClick={closeForm}>
        &times;
      </button>
      <h2>{restaurant ? "Edit Restaurant" : "Add New Restaurant"}</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="ceoid"
          placeholder="CEO ID"
          value={formData.ceoid}
          onChange={handleChange}
          required
        />
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : restaurant ? "Save" : "Add"}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={closeForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

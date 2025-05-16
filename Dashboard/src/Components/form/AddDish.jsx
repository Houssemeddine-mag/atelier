import React, { useState } from "react";
import styles from "./style.module.scss";

export default function AddDish({
  closeForm,
  refreshDishes,
  onDishAdded,
  onDishUpdated,
  dish,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (dish) {
        onDishUpdated({
          ...formData,
          id: dish.id,
        });
      } else {
        onDishAdded(formData);
      }

      refreshDishes();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add dish.");
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (!dish) return;

    setFormData({
      name: dish.name || "",
      price: dish.price || "",
      description: dish.description || "",
    });
  }, [dish]);

  return (
    <div className={styles.formContent}>
      <button className={styles.closeButton} onClick={closeForm}>
        &times;
      </button>
      <h2>Add New Dish</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {dish ? (
              <>{isSubmitting ? "Updating..." : "Update Dish"}</>
            ) : (
              <>{isSubmitting ? "Adding..." : "Add Dish"}</>
            )}
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

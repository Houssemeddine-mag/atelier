import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import MenuTable from "../Components/Table/MenuT";
import PageTitle from "../Components/pagetitle";
import api from "../api"; // Adjust the import path as necessary

export default function Menu() {
  const menuId = 1; // Hardcoded menu ID
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ["Name", "Description", "Price", "Actions"];

  // Fetch dishes from backend
  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ceo/menu/${menuId}/dishes`);
      console.log("Fetched dishes:", response.data); // Debugging: Log the fetched data
      setDishes(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Failed to fetch dishes:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch dishes. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // Handle dish creation
  const handleDishAdded = async (newDish) => {
    try { 
      const response = await api.post(`/ceo/menu/${menuId}/dishes`, newDish);

      console.log("Added dish:", response.data);

      setDishes((prevDishes) => [...prevDishes, response.data]);
    } catch (err) {
      console.error("Failed to add dish:", err);
      setError(
        err.response?.data?.message || "Failed to add dish. Please try again."
      );
    }
  };

  const handleDishUpdated = async (updatedDish) => {
    try {
      await api.put(
        `/ceo/menu/${menuId}/dishes/${updatedDish.id}`,
        updatedDish
      );

      let updatedDishes = dishes.map((dish) => {
        if (dish.id === updatedDish.id) {
          return updatedDish;
        }
      });

      setDishes(updatedDishes);
    } catch (err) {
      console.error("Failed to update dish:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update dish. Please try again."
      );
    }
  };

  // Handle dish deletion
  const handleDishDeleted = async (dishId) => {
    try {
      await api.delete(`/ceo/menu/${menuId}/dishes/${dishId}`);
      setDishes((prevDishes) =>
        prevDishes.filter((dish) => dish.id !== dishId)
      );
    } catch (err) {
      console.error("Failed to delete dish:", err);
      setError(
        err.response?.data?.message ||
          "Failed to delete dish. Please try again."
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page">
      <Header />
      <div className="content">
        <PageTitle title="Menu" description="Manage dishes." />
        {error && (
          <div style={{ color: "red", marginBottom: "20px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        <MenuTable
          columns={columns}
          data={dishes}
          menuId={menuId}
          refreshDishes={fetchDishes}
          onDishAdded={handleDishAdded}
          onDishDeleted={handleDishDeleted}
          onDishUpdated={handleDishUpdated}
        />
      </div>
    </div>
  );
}

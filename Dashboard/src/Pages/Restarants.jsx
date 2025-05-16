import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import TableComponent from "../Components/Table/Restaurant_T";
import PageTitle from "../Components/pagetitle";
import api from "../api"; // Adjust the import path as necessary

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ["ID", "Name", "Location", "CEO ID", "Actions"];

  // Fetch restaurants from backend
  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors before starting the fetch
    try {
      const response = await api.get("/ceo/restaurants_list");
      console.log("Fetched restaurants:", response.data); // Debugging: Log the fetched data
      setRestaurants(response.data);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch restaurants. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Handle restaurant creation
  const handleRestaurantAdded = async (newRestaurant) => {
    try {
      const response = await api.post("/ceo/restaurants", newRestaurant);
      console.log("Added restaurant:", response.data); // Debugging: Log the added restaurant
      setRestaurants((prevRestaurants) => [...prevRestaurants, response.data]);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Failed to add restaurant:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add restaurant. Please try again."
      );
    }
  };

  // Handle restaurant update
  const handleRestaurantUpdated = async (updatedRestaurant) => {
    try {
      const response = await api.put(
        `/ceo/restaurants/${updatedRestaurant.id}`,
        updatedRestaurant
      );
      console.log("Updated restaurant:", response.data); // Debugging: Log the updated restaurant
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.id === updatedRestaurant.id ? response.data : restaurant
        )
      );
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Failed to update restaurant:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update restaurant. Please try again."
      );
    }
  };

  // Handle restaurant deletion
  const handleRestaurantDeleted = async (rid) => {
    try {
      await api.delete(`/ceo/restaurant/${rid}`);
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== rid)
      );
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Failed to delete restaurant:", err);
      setError(
        err.response?.data?.message ||
          "Failed to delete restaurant. Please try again."
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page">
      <Header />
      <div className="content">
        <PageTitle
          title="Restaurants"
          description="Manage all restaurants in your chain."
        />
        {error && (
          <div style={{ color: "red", marginBottom: "20px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        <TableComponent
          columns={columns}
          data={restaurants}
          refreshRestaurants={fetchRestaurants}
          onRestaurantAdded={handleRestaurantAdded}
          onRestaurantUpdated={handleRestaurantUpdated}
          onRestaurantDeleted={handleRestaurantDeleted}
        />
      </div>
    </div>
  );
}

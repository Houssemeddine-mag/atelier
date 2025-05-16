import React, { useState, useEffect } from "react";
import api from "../api"; // Import the API module
import styles from "./ChefDashboard.module.scss";

const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'preparing', 'ready', 'delivered', 'canceled'
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'ingredients'

  /* IOT INGREDIANT */
  const [ingredientsStock, setIngredientsStock] = useState([]);
  const [isStockLoading, setIsStockLoading] = useState(true);

  // Simulate fetching IoT ingredients data
  useEffect(() => {
    const fetchIngredientsStock = async () => {
      setIsStockLoading(true);
      try {
        // Mock IoT data with realistic values
        const mockIngredients = [
          {
            id: 1,
            name: "Beef",
            currentStock: 8.5, // kg
            threshold: 5,
            unit: "kg",
            lastUpdated: new Date().toLocaleTimeString(),
          },
          {
            id: 2,
            name: "Chicken",
            currentStock: 6.2,
            threshold: 4,
            unit: "kg",
            lastUpdated: new Date().toLocaleTimeString(),
          },
          {
            id: 3,
            name: "Tomatoes",
            currentStock: 12,
            threshold: 8,
            unit: "kg",
            lastUpdated: new Date().toLocaleTimeString(),
          },
          {
            id: 4,
            name: "Onions",
            currentStock: 15.5,
            threshold: 10,
            unit: "kg",
            lastUpdated: new Date().toLocaleTimeString(),
          },
          {
            id: 5,
            name: "Potatoes",
            currentStock: 20,
            threshold: 15,
            unit: "kg",
            lastUpdated: new Date().toLocaleTimeString(),
          },
          {
            id: 6,
            name: "Cheese",
            currentStock: 4.8,
            threshold: 3,
            unit: "kg",
            lastUpdated: new Date().toLocaleTimeString(),
          },
        ];

        setIngredientsStock(mockIngredients);
      } catch (error) {
        console.error("Error fetching IoT ingredients:", error);
      } finally {
        setIsStockLoading(false);
      }
    };

    fetchIngredientsStock();
    const iotIntervalId = setInterval(fetchIngredientsStock, 1000);
    return () => clearInterval(iotIntervalId);
  }, []);

  // Update the fetchOrders function to log the response
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("chef/orders/active");
        console.log("Orders response:", response.data); // Add this log

        // Ensure the data is properly structured
        const formattedOrders = response.data.map((order) => ({
          ...order,
          dishes: Array.isArray(order.dishes) ? order.dishes : [],
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") {
      return true;
    }
    return filter.toUpperCase() === order.status;
  });

  // Function to update order status
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await api.put(`chef/orders/${id}/status`, {
        status: newStatus,
      });
      const updatedOrder = response.data;

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading orders...</div>;
  }

  return (
    <div className={styles.chefDashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          FeedMe <span>Chef Dashboard</span>
        </h1>

        <div className={styles.tabs}>
          <button
            className={activeTab === "orders" ? styles.activeTab : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={activeTab === "ingredients" ? styles.activeTab : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients Stock
          </button>
        </div>
      </div>

      {activeTab === "orders" ? (
        <>
          <div className={styles.statusFilter}>
            <button
              className={filter === "all" ? styles.active : ""}
              onClick={() => setFilter("all")}
            >
              All Orders
            </button>
            <button
              className={filter === "pending" ? styles.active : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={filter === "preparing" ? styles.active : ""}
              onClick={() => setFilter("preparing")}
            >
              Preparing
            </button>
            <button
              className={filter === "ready_for_pickup" ? styles.active : ""}
              onClick={() => setFilter("ready_for_pickup")}
            >
              ready_for_pickup
            </button>
            <button
              className={filter === "cancelled" ? styles.active : ""}
              onClick={() => setFilter("cancelled")}
            >
              Canceled
            </button>
          </div>

          <div className={styles.ordersContainer}>
            {filteredOrders.length === 0 ? (
              <div className={styles.noOrders}>
                <p>No {filter === "all" ? "" : filter} orders to display</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.orderId}
                  className={`${styles.orderCard} ${styles[order.status]}`}
                >
                  <div className={styles.orderHeader}>
                    <h3>Order ID: {order.orderId}</h3>
                    <p className={styles.statusBadge}>
                      Status: <span>{order.status}</span>
                    </p>
                  </div>

                  <div className={styles.orderDetails}>
                    <p>
                      <strong>Type:</strong>{" "}
                      {order.type === "reservation"
                        ? "Reservation"
                        : "Take Out"}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className={styles.orderItems}>
                    <h4>Dishes:</h4>
                    {(order.dishes || []).map((dish, index) => (
                      <div key={index} className={styles.item}>
                        <span>{dish.name}</span>
                        {dish.notes && (
                          <p className={styles.notes}>Note: {dish.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderActions}>
                    {/* Status progression button */}
                    {order.status !== "READY_FOR_PICKUP" &&
                      order.status !== "CANCELLED" && (
                        <button
                          className={
                            order.status === "PENDING"
                              ? styles.acceptButton
                              : styles.readyButton
                          }
                          onClick={() => {
                            const newStatus =
                              order.status === "PENDING"
                                ? "PREPARING"
                                : "READY_FOR_PICKUP";
                            updateOrderStatus(order.orderId, newStatus);
                          }}
                        >
                          {order.status == "PENDING"
                            ? "Start Preparing"
                            : "Mark as Ready"}
                        </button>
                      )}

                    {/* Cancel button (shown for all non-canceled orders) */}
                    {order.status !== "CANCELLED" && (
                      <button
                        className={styles.rejectButton}
                        onClick={() =>
                          updateOrderStatus(order.orderId, "CANCELLED")
                        }
                      >
                        Cancel Order
                      </button>
                    )}

                    {/* Status message for canceled orders */}
                    {order.status === "CANCELLED" && (
                      <p className={styles.statusMessage}>Order cancelled</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className={styles.stockContainer}>
          {isStockLoading ? (
            <div className={styles.loading}>Loading stock data...</div>
          ) : (
            <>
              <div className={styles.stockHeader}>
                <h3>Real-time Ingredients Stock</h3>
                <p>Updated automatically via IoT sensors</p>
              </div>

              <table className={styles.stockTable}>
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Current Stock</th>
                    <th>Threshold</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientsStock.map((ingredient) => (
                    <tr
                      key={ingredient.id}
                      className={
                        ingredient.currentStock < ingredient.threshold
                          ? styles.lowStock
                          : ""
                      }
                    >
                      <td>{ingredient.name}</td>
                      <td>
                        {ingredient.currentStock} {ingredient.unit}
                      </td>
                      <td>
                        {ingredient.threshold} {ingredient.unit}
                      </td>
                      <td>
                        {ingredient.currentStock < ingredient.threshold ? (
                          <span className={styles.warning}>Low Stock!</span>
                        ) : (
                          <span className={styles.ok}>OK</span>
                        )}
                      </td>
                      <td>{ingredient.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChefDashboard;

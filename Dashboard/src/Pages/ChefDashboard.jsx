import React, { useState, useEffect } from 'react';
import styles from './ChefDashboard.module.scss';

const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'in-progress'
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'ingredients'
  
  /* IOT INGREDIANT */
  const [ingredientsStock, setIngredientsStock] = useState([]);
  const [isStockLoading, setIsStockLoading] = useState(true);

  // Simulate fetching IoT ingredients data
  useEffect(() => {
    const fetchIngredientsStock = async () => {
      setIsStockLoading(true);
      try {
        // In a real app, this would connect to IoT system
        // const response = await fetch('/api/iot/ingredients');
        // const data = await response.json();
        
        // Mock IoT data with realistic values
        const mockIngredients = [
          { 
            id: 1, 
            name: 'Beef', 
            currentStock: 8.5, // kg
            threshold: 5, 
            unit: 'kg',
            lastUpdated: new Date().toLocaleTimeString()
          },
          { 
            id: 2, 
            name: 'Chicken', 
            currentStock: 6.2, 
            threshold: 4, 
            unit: 'kg',
            lastUpdated: new Date().toLocaleTimeString()
          },
          { 
            id: 3, 
            name: 'Tomatoes', 
            currentStock: 12, 
            threshold: 8, 
            unit: 'kg',
            lastUpdated: new Date().toLocaleTimeString()
          },
          { 
            id: 4, 
            name: 'Onions', 
            currentStock: 15.5, 
            threshold: 10, 
            unit: 'kg',
            lastUpdated: new Date().toLocaleTimeString()
          },
          { 
            id: 5, 
            name: 'Potatoes', 
            currentStock: 20, 
            threshold: 15, 
            unit: 'kg',
            lastUpdated: new Date().toLocaleTimeString()
          },
          { 
            id: 6, 
            name: 'Cheese', 
            currentStock: 4.8, 
            threshold: 3, 
            unit: 'kg',
            lastUpdated: new Date().toLocaleTimeString()
          },
        ];
        
        setIngredientsStock(mockIngredients);
      } catch (error) {
        console.error('Error fetching IoT ingredients:', error);
      } finally {
        setIsStockLoading(false);
      }
    };

    fetchIngredientsStock();

    // Simulate real-time IoT updates
    const iotIntervalId = setInterval(fetchIngredientsStock, 60000); // Refresh every minute

    return () => clearInterval(iotIntervalId);
  }, []);
  /* END IOT SECTION */

  // Simulate fetching orders from an API
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Mock data
        const mockOrders = [
          {
            id: 1,
            tableNumber: 5,
            items: [
              { name: 'Burger', quantity: 2, notes: 'No onions' },
              { name: 'Fries', quantity: 1 },
              { name: 'Soda', quantity: 2 }
            ],
            status: 'pending',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          {
            id: 2,
            tableNumber: 3,
            items: [
              { name: 'Pasta', quantity: 1, notes: 'Extra cheese' },
              { name: 'Salad', quantity: 1 }
            ],
            status: 'in-progress',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();

    // Simulate real-time updates with interval
    const intervalId = setInterval(fetchOrders, 30000); // Refresh every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setOrders(prevOrders => {
        if (newStatus === 'ready') {
          return prevOrders.filter(order => order.id !== orderId);
        }
        return prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
      });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Function to reject an order
  const rejectOrder = async (orderId) => {
    try {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading orders...</div>;
  }

  return (
    <div className={styles.chefDashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>FeedMe <span>Chef Dashboard</span></h1>
        
        <div className={styles.tabs}>
          <button 
            className={activeTab === 'orders' ? styles.activeTab : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={activeTab === 'ingredients' ? styles.activeTab : ''}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients Stock
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <>
          <div className={styles.statusFilter}>
            <button 
              className={filter === 'all' ? styles.active : ''}
              onClick={() => setFilter('all')}
            >
              All Orders
            </button>
            <button 
              className={filter === 'pending' ? styles.active : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'in-progress' ? styles.active : ''}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
          </div>

          <div className={styles.ordersContainer}>
            {filteredOrders.length === 0 ? (
              <div className={styles.noOrders}>
                <p>No {filter === 'all' ? '' : filter} orders to display</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className={`${styles.orderCard} ${styles[order.status]}`}>
                  <div className={styles.orderHeader}>
                    <h3>Table {order.tableNumber}</h3>
                    <span className={styles.orderTime}>{order.time}</span>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item, index) => (
                      <div key={index} className={styles.item}>
                        <span className={styles.quantity}>{item.quantity}x</span>
                        <span className={styles.name}>{item.name}</span>
                        {item.notes && <span className={styles.notes}>({item.notes})</span>}
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderActions}>
                    {order.status === 'pending' && (
                      <>
                        <button 
                          className={styles.rejectButton}
                          onClick={() => rejectOrder(order.id)}
                        >
                          Reject
                        </button>
                        <button 
                          className={styles.acceptButton}
                          onClick={() => updateOrderStatus(order.id, 'in-progress')}
                        >
                          Start Preparing
                        </button>
                      </>
                    )}

                    {order.status === 'in-progress' && (
                      <button 
                        className={styles.readyButton}
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                      >
                        Mark as Ready
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* IOT INGREDIANT */
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
                  {ingredientsStock.map(ingredient => (
                    <tr 
                      key={ingredient.id} 
                      className={ingredient.currentStock < ingredient.threshold ? styles.lowStock : ''}
                    >
                      <td>{ingredient.name}</td>
                      <td>{ingredient.currentStock} {ingredient.unit}</td>
                      <td>{ingredient.threshold} {ingredient.unit}</td>
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
        /* END IOT SECTION */
      )}
    </div>
  );
};

export default ChefDashboard;
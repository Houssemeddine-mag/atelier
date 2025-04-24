// src/Pages/ChefDashboard.jsx
import React, { useState, useEffect } from 'react';
import styles from './ChefDashboard.module.scss';

const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'in-progress'

  // Simulate fetching orders from an API
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an actual API call
        // const response = await fetch('/api/orders');
        // const data = await response.json();
        
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
      // In a real app, you would make an API call here
      // await fetch(`/api/orders/${orderId}`, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ status: newStatus })
      // });

      setOrders(prevOrders => {
        if (newStatus === 'ready') {
          // In a real app, you would confirm the API update was successful first
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
      // In a real app, you would make an API call here
      // await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      
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
        <h1 className={styles.title}>feedMe <span>Chef Dashboard</span></h1>
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
    </div>
  );
};

export default ChefDashboard;
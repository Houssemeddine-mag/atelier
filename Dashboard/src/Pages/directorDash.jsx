// src/Pages/directorDash.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChartLine, 
  FaUtensils, 
  FaUsers, 
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFileInvoiceDollar,
  FaCheck,
  FaTrash
} from 'react-icons/fa';
import styles from './style.module.scss';

const DirectorDash = () => {
  const navigate = useNavigate();
  // State for all data sections
  const [restaurantData, setRestaurantData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [dailyMenu, setDailyMenu] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [requiredIngredients, setRequiredIngredients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    fullName: '',
    address: '',
    picture: '',
    idNumber: '',
    role: 'chef'
  });
  const [roleFilter, setRoleFilter] = useState('all');
  const [showInvoicePage, setShowInvoicePage] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    employeesSalary: 0,
    electricity: 0,
    water: 0,
    submitted: false
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState('');

  // Fetch all initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        // const restaurantRes = await fetch('/api/restaurant');
        // const ordersRes = await fetch('/api/orders');
        // const menuRes = await fetch('/api/menu');
        // const staffRes = await fetch('/api/staff');
        // const reportsRes = await fetch('/api/reports');
        // Mock data - replace with actual API calls
        setRestaurantData({
          name: "FeedMe Downtown",
          todayRevenue: 4820,
          todayOrders: 56,
          popularItem: "Chef's Special Burger",
          currentDailyMenu: []
        });
        
        setOrders([
          { id: 1, table: 5, items: ['Burger', 'Fries'], status: 'served', time: '12:30 PM' },
          { id: 2, table: 3, items: ['Pasta', 'Salad'], status: 'preparing', time: '12:45 PM' }
        ]);
        
        setMenuItems([
          { id: 1, name: 'Chef Special Burger', ingredients: [
            {name: 'Beef', quantity: 200, unit: 'g'}, 
            {name: 'Bun', quantity: 1, unit: 'pc'}
          ]},
          { id: 2, name: 'Vegetarian Pasta', ingredients: [
            {name: 'Pasta', quantity: 150, unit: 'g'}, 
            {name: 'Tomato Sauce', quantity: 100, unit: 'ml'}
          ]}
        ]);
        
        setAvailableIngredients([
          { id: 1, name: 'Beef', unit: 'g', pricePerUnit: 0.05 },
          { id: 2, name: 'Bun', unit: 'pc', pricePerUnit: 0.30 },
          { id: 3, name: 'Pasta', unit: 'g', pricePerUnit: 0.02 },
          { id: 4, name: 'Tomato Sauce', unit: 'ml', pricePerUnit: 0.01 }
        ]);
        
        setStaff([
          { id: 1, fullName: 'John Smith', role: 'chef', hireDate: '2023-01-15', address: '123 Main St', idNumber: 'EMP001', salary: 0 },
          { id: 2, fullName: 'Emma Johnson', role: 'waiter', hireDate: '2023-03-10', address: '456 Oak Ave', idNumber: 'EMP002', salary: 0 }
        ]);
        
        setReports([
          { id: 1, type: 'Inventory', date: '2023-06-15', content: 'Tomatoes running low' },
          { id: 2, type: 'Staff', date: '2023-06-14', content: 'New waiter training completed' }
        ]);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Calculate ingredients based on daily menu selections
  const calculateIngredients = () => {
    const calculated = dailyMenu.reduce((acc, dailyItem) => {
      const menuItem = menuItems.find(m => m.id === dailyItem.id);
      if (menuItem) {
        menuItem.ingredients.forEach(menuIngredient => {
          const ingredientInfo = availableIngredients.find(ai => ai.name === menuIngredient.name);
          const existing = acc.find(i => i.name === menuIngredient.name);
          
          const quantityNeeded = menuIngredient.quantity * dailyItem.quantity;
          const totalCost = quantityNeeded * (ingredientInfo?.pricePerUnit || 0);

          if (existing) {
            existing.quantity += quantityNeeded;
            existing.totalCost += totalCost;
          } else {
            acc.push({
              name: menuIngredient.name,
              quantity: quantityNeeded,
              unit: menuIngredient.unit,
              pricePerUnit: ingredientInfo?.pricePerUnit || 0,
              totalCost: totalCost
            });
          }
        });
      }
      return acc;
    }, []);

    setRequiredIngredients(calculated);
    return calculated;
  };

  useEffect(() => {
    calculateIngredients();
  }, [dailyMenu]);

  const handleAddToDailyMenu = (itemId) => {
    setEditingItemId(itemId);
    setTempQuantity(dailyMenu.find(item => item.id === itemId)?.quantity || '1');
  };

  const saveDailyMenuItem = (itemId) => {
    const quantity = Number(tempQuantity);
    if (isNaN(quantity)) return;
    
    if (quantity <= 0) {
      setDailyMenu(dailyMenu.filter(item => item.id !== itemId));
    } else {
      const existing = dailyMenu.find(item => item.id === itemId);
      if (existing) {
        setDailyMenu(dailyMenu.map(item => 
          item.id === itemId ? {...item, quantity: quantity} : item
        ));
      } else {
        setDailyMenu([...dailyMenu, { id: itemId, quantity: quantity }]);
      }
    }
    setEditingItemId(null);
  };

  const removeDailyMenuItem = (itemId) => {
    setDailyMenu(dailyMenu.filter(item => item.id !== itemId));
  };

  const submitDailyMenu = () => {
    // In a real app, this would be an API call to save the daily menu
    setRestaurantData(prev => ({
      ...prev,
      currentDailyMenu: dailyMenu.map(item => {
        const menuItem = menuItems.find(m => m.id === item.id);
        return {
          name: menuItem?.name,
          quantity: item.quantity
        };
      })
    }));
    alert('Daily menu submitted successfully!');
  };

  const generateInvoice = () => {
    const ingredientsCost = requiredIngredients.reduce((sum, ing) => sum + ing.totalCost, 0);
    const totalSalary = invoiceData.employeesSalary || 0;
    const electricityCost = invoiceData.electricity || 0;
    const waterCost = invoiceData.water || 0;
    const totalCost = ingredientsCost + totalSalary + electricityCost + waterCost;
    
    return {
      ingredientsCost,
      salaryCost: totalSalary,
      utilities: {
        electricity: electricityCost,
        water: waterCost
      },
      totalCost
    };
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const newStaffMember = {
        id: staff.length + 1,
        ...newStaff,
        hireDate: new Date().toISOString().split('T')[0],
        salary: 0
      };
      
      setStaff([...staff, newStaffMember]);
      setNewStaff({
        fullName: '',
        address: '',
        picture: '',
        idNumber: '',
        role: 'chef'
      });
      setShowAddStaffForm(false);
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  const submitInvoice = () => {
    if (invoiceData.submitted) {
      alert('Prices are already submitted!');
      return;
    }
    
    setInvoiceData(prev => ({ ...prev, submitted: true }));
    alert('Invoice submitted successfully!');
  };

  const updateInvoice = () => {
    setInvoiceData(prev => ({ ...prev, submitted: false }));
    alert('You can now modify the invoice prices.');
  };

  const filteredStaff = staff.filter(employee => 
    roleFilter === 'all' || employee.role === roleFilter
  );

  if (loading) return <div className={styles.loading}>Loading...</div>;

  const invoice = generateInvoice();

  if (showInvoicePage) {
    return (
      <div className={styles.invoicePage}>
        <div className={styles.invoiceHeader}>
          <h1>Restaurant Invoice</h1>
          <button 
            className={styles.backButton}
            onClick={() => setShowInvoicePage(false)}
          >
            Back to Daily Menu
          </button>
        </div>

        <div className={styles.invoiceContent}>
          <div className={styles.invoiceSection}>
            <h2>Ingredients Cost</h2>
            <table className={styles.invoiceTable}>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {requiredIngredients.map((ing, index) => (
                  <tr key={index}>
                    <td>{ing.name}</td>
                    <td>{ing.quantity.toFixed(2)} {ing.unit}</td>
                    <td>${ing.pricePerUnit.toFixed(2)}</td>
                    <td>${ing.totalCost.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className={styles.subtotalRow}>
                  <td colSpan="3">Subtotal</td>
                  <td>${invoice.ingredientsCost.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.invoiceSection}>
            <h2>Additional Costs</h2>
            <div className={styles.costInputs}>
              <div className={styles.costInput}>
                <label>Staff Salaries</label>
                <input
                  type="number"
                  min="0"
                  value={invoiceData.employeesSalary}
                  onChange={(e) => setInvoiceData({
                    ...invoiceData,
                    employeesSalary: Number(e.target.value)
                  })}
                  className={styles.invoiceInput}
                  disabled={invoiceData.submitted}
                />
                <span>${invoice.salaryCost.toFixed(2)}</span>
              </div>
              <div className={styles.costInput}>
                <label>Electricity</label>
                <input
                  type="number"
                  min="0"
                  value={invoiceData.electricity}
                  onChange={(e) => setInvoiceData({
                    ...invoiceData,
                    electricity: Number(e.target.value)
                  })}
                  className={styles.invoiceInput}
                  disabled={invoiceData.submitted}
                />
                <span>${invoice.utilities.electricity.toFixed(2)}</span>
              </div>
              <div className={styles.costInput}>
                <label>Water</label>
                <input
                  type="number"
                  min="0"
                  value={invoiceData.water}
                  onChange={(e) => setInvoiceData({
                    ...invoiceData,
                    water: Number(e.target.value)
                  })}
                  className={styles.invoiceInput}
                  disabled={invoiceData.submitted}
                />
                <span>${invoice.utilities.water.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className={styles.invoiceTotal}>
            <h2>Total Cost: ${invoice.totalCost.toFixed(2)}</h2>
            {!invoiceData.submitted ? (
              <button 
                className={styles.submitButton}
                onClick={submitInvoice}
              >
                Submit Prices
              </button>
            ) : (
              <button 
                className={styles.updateButton}
                onClick={updateInvoice}
              >
                Update Prices
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.directorDash}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          {sidebarOpen && <h2>FeedMe</h2>}
          <button 
            className={styles.toggleButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <nav className={styles.navMenu}>
          <button 
            className={`${styles.navButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartLine className={styles.navIcon} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'menu' ? styles.active : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <FaUtensils className={styles.navIcon} />
            {sidebarOpen && <span>Daily Menu</span>}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'grh' ? styles.active : ''}`}
            onClick={() => setActiveTab('grh')}
          >
            <FaUsers className={styles.navIcon} />
            {sidebarOpen && <span>Staff</span>}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'reports' ? styles.active : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaFileAlt className={styles.navIcon} />
            {sidebarOpen && <span>Reports</span>}
          </button>
        </nav>
        
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FaSignOutAlt className={styles.navIcon} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.feed}>Feed</span>
            <span className={styles.me}>Me</span> - Director Dashboard
          </h1>
          <p className={styles.restaurantName}>{restaurantData?.name || 'Restaurant'}</p>
        </header>

        {activeTab === 'dashboard' && (
          <div className={styles.dashboardTab}>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>Today's Revenue</h3>
                <p className={styles.statValue}>${restaurantData?.todayRevenue?.toLocaleString() || '0'}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Today's Orders</h3>
                <p className={styles.statValue}>{restaurantData?.todayOrders || '0'}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Popular Item</h3>
                <p className={styles.statValue}>{restaurantData?.popularItem || '-'}</p>
              </div>
            </div>

            <div className={styles.ordersSection}>
              <h2>Today's Menu</h2>
              {restaurantData?.currentDailyMenu?.length > 0 ? (
                <ul className={styles.dailyMenuList}>
                  {restaurantData.currentDailyMenu.map((item, index) => (
                    <li key={index} className={styles.dailyMenuItem}>
                      <span>{item.name} x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No menu submitted for today</p>
              )}
            </div>

            <div className={styles.ordersSection}>
              <h2>Recent Orders</h2>
              <div className={styles.ordersGrid}>
                {orders.map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <p>Table {order.table}</p>
                    <p>{order.items.join(', ')}</p>
                    <p className={styles.orderTime}>{order.time}</p>
                    <span className={`${styles.status} ${styles[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className={styles.menuTab}>
            <div className={styles.menuSelection}>
              <h2>Available Menu Items</h2>
              <div className={styles.menuItems}>
                {menuItems.map(item => (
                  <div key={item.id} className={styles.menuItem}>
                    <h3>{item.name}</h3>
                    {editingItemId === item.id ? (
                      <div className={styles.quantityEdit}>
                        <input
                          type="number"
                          min="1"
                          value={tempQuantity}
                          onChange={(e) => setTempQuantity(e.target.value)}
                          className={styles.quantityInput}
                          autoFocus
                        />
                        <button 
                          className={styles.saveButton}
                          onClick={() => saveDailyMenuItem(item.id)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <button 
                        className={styles.addButton}
                        onClick={() => handleAddToDailyMenu(item.id)}
                      >
                        {dailyMenu.find(dm => dm.id === item.id) ? 
                          `Edit (${dailyMenu.find(dm => dm.id === item.id).quantity})` : 
                          'Add'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.dailyMenu}>
              <div className={styles.dailyMenuHeader}>
                <h2>Daily Menu Summary</h2>
                <div className={styles.menuActions}>
                  <button 
                    className={styles.submitButton}
                    onClick={submitDailyMenu}
                    disabled={dailyMenu.length === 0}
                  >
                    Submit Daily Menu
                  </button>
                  <button 
                    className={styles.invoiceButton}
                    onClick={() => setShowInvoicePage(true)}
                    disabled={dailyMenu.length === 0}
                  >
                    <FaFileInvoiceDollar /> View Invoice
                  </button>
                </div>
              </div>

              {dailyMenu.length === 0 ? (
                <p>No items selected for today's menu</p>
              ) : (
                <div>
                  <ul className={styles.dailyMenuList}>
                    {dailyMenu.map(item => {
                      const menuItem = menuItems.find(m => m.id === item.id);
                      return (
                        <li key={item.id} className={styles.dailyMenuItem}>
                          <span>{menuItem?.name} x {item.quantity}</span>
                          <button 
                            className={styles.deleteButton}
                            onClick={() => removeDailyMenuItem(item.id)}
                          >
                            <FaTrash />
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <div className={styles.ingredientsSummary}>
                    <h3>Ingredients Required</h3>
                    <table className={styles.ingredientsTable}>
                      <thead>
                        <tr>
                          <th>Ingredient</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requiredIngredients.map((ing, index) => (
                          <tr key={index}>
                            <td>{ing.name}</td>
                            <td>{ing.quantity.toFixed(2)} {ing.unit}</td>
                            <td>${ing.pricePerUnit.toFixed(2)}</td>
                            <td>${ing.totalCost.toFixed(2)}</td>
                          </tr>
                        ))}
                        {requiredIngredients.length > 0 && (
                          <tr className={styles.subtotalRow}>
                            <td colSpan="3">Subtotal</td>
                            <td>${requiredIngredients.reduce((sum, ing) => sum + ing.totalCost, 0).toFixed(2)}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'grh' && (
          <div className={styles.grhTab}>
            <div className={styles.staffHeader}>
              <h2>Staff Management</h2>
              <div className={styles.staffControls}>
                <select 
                  className={styles.roleFilter}
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="chef">Chef</option>
                  <option value="waiter">Waiter</option>
                  <option value="cashier">Cashier</option>
                  <option value="delivery">Delivery Agent</option>
                  <option value="kitchen">Kitchen Staff</option>
                </select>
                <button 
                  className={styles.addStaffButton}
                  onClick={() => setShowAddStaffForm(true)}
                >
                  Add Staff
                </button>
              </div>
            </div>

            {showAddStaffForm && (
              <div className={styles.addStaffForm}>
                <h3>Add New Staff Member</h3>
                <form onSubmit={handleAddStaff}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={newStaff.fullName}
                      onChange={(e) => setNewStaff({...newStaff, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Address</label>
                    <input 
                      type="text" 
                      value={newStaff.address}
                      onChange={(e) => setNewStaff({...newStaff, address: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Picture URL</label>
                    <input 
                      type="text" 
                      value={newStaff.picture}
                      onChange={(e) => setNewStaff({...newStaff, picture: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>ID Number</label>
                    <input 
                      type="text" 
                      value={newStaff.idNumber}
                      onChange={(e) => setNewStaff({...newStaff, idNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Role</label>
                    <select
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    >
                      <option value="chef">Chef</option>
                      <option value="waiter">Waiter</option>
                      <option value="cashier">Cashier</option>
                      <option value="delivery">Delivery Agent</option>
                      <option value="kitchen">Kitchen Staff</option>
                    </select>
                  </div>
                  <div className={styles.formButtons}>
                    <button type="submit" className={styles.submitButton}>Add Staff</button>
                    <button 
                      type="button" 
                      className={styles.cancelButton}
                      onClick={() => setShowAddStaffForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className={styles.staffList}>
              <table className={styles.staffTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>ID Number</th>
                    <th>Hire Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map(person => (
                    <tr key={person.id}>
                      <td>{person.fullName}</td>
                      <td>{person.role}</td>
                      <td>{person.idNumber}</td>
                      <td>{person.hireDate}</td>
                      <td>
                        <button className={styles.editButton}>Edit</button>
                        <button className={styles.deleteButton}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className={styles.reportsTab}>
            <div className={styles.reportActions}>
              <h2>Reports</h2>
              <button className={styles.newReportButton}>Create New Report</button>
            </div>

            <div className={styles.reportsList}>
              {reports.map(report => (
                <div key={report.id} className={styles.reportCard}>
                  <h3>{report.type} Report - {report.date}</h3>
                  <p>{report.content}</p>
                  <div className={styles.reportActions}>
                    <button className={styles.editButton}>Edit</button>
                    <button className={styles.sendButton}>Send to Admin</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DirectorDash;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaChartLine,
//   FaUtensils,
//   FaUsers,
//   FaFileAlt,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
//   FaFileInvoiceDollar,
//   FaCheck,
//   FaTrash,
//   FaEdit,
//   FaTimesCircle,
// } from "react-icons/fa";
// import styles from "./director.module.scss";
// import api from "../api"; // Import the API module

// const DirectorDash = () => {
//   const navigate = useNavigate();

//   // State declarations
//   const [restaurantData, setRestaurantData] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [dailyMenu, setDailyMenu] = useState([]);
//   const [availableIngredients, setAvailableIngredients] = useState([]);
//   const [requiredIngredients, setRequiredIngredients] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [reports, setReports] = useState([]);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showAddStaffForm, setShowAddStaffForm] = useState(false);
//   const [newStaff, setNewStaff] = useState({
//     fullName: "",
//     address: "",
//     picture: "",
//     idNumber: "",
//     role: "chef",
//   });
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [showInvoicePage, setShowInvoicePage] = useState(false);
//   const [invoiceData, setInvoiceData] = useState({
//     employeesSalary: 0,
//     electricity: 0,
//     water: 0,
//     submitted: false,
//   });
//   const [editingItemId, setEditingItemId] = useState(null);
//   const [tempQuantity, setTempQuantity] = useState("");
//   const [editingStaffId, setEditingStaffId] = useState(null);
//   const [editStaffForm, setEditStaffForm] = useState({
//     fullName: "",
//     address: "",
//     picture: "",
//     idNumber: "",
//     role: "chef",
//   });

//   // Fetch all initial data - REAL APP IMPLEMENTATION EXAMPLE
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch restaurant summary data
//         const restaurantRes = await api.get("/manager/income");
//         setRestaurantData(restaurantRes.data);

//         // Fetch active orders
//         const ordersRes = await api.get("/manager/orders");
//         setOrders(ordersRes.data);

//         // Fetch all menu items
//         const menuRes = await api.get("/manager/menu/1/dishes"); // Replace `1` with the actual menu ID if dynamic
//         setMenuItems(menuRes.data);

//         // Fetch inventory ingredients
//         // const ingredientsRes = await api.get("/manager/ingredients");
//         // setAvailableIngredients(ingredientsRes.data);

//         // Fetch staff members
//         const staffRes = await api.get("/manager/staff");
//         setStaff(staffRes.data);

//         // Fetch reports
//         const reportsRes = await api.get("/manager/reports");
//         setReports(reportsRes.data);
//       } catch (error) {
//         console.error("Data loading error:", error);
//         alert("Failed to load data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fetch menu items from the API
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/manager/menu/1/dishes"); // Replace `1` with the actual menu ID if dynamic
//         setMenuItems(response.data); // Assuming the API returns an array of menu items
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         alert("Failed to fetch menu items. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, []);

//   // Calculate ingredients based on daily menu selections
//   const calculateIngredients = () => {
//     const calculated = dailyMenu.reduce((acc, dailyItem) => {
//       const menuItem = menuItems.find((m) => m.id === dailyItem.id);
//       if (menuItem) {
//         menuItem.ingredients.forEach((menuIngredient) => {
//           const ingredientInfo = availableIngredients.find(
//             (ai) => ai.name === menuIngredient.name
//           );
//           const existing = acc.find((i) => i.name === menuIngredient.name);

//           const quantityNeeded = menuIngredient.quantity * dailyItem.quantity;
//           const totalCost =
//             quantityNeeded * (ingredientInfo?.pricePerUnit || 0);

//           if (existing) {
//             existing.quantity += quantityNeeded;
//             existing.totalCost += totalCost;
//           } else {
//             acc.push({
//               name: menuIngredient.name,
//               quantity: quantityNeeded,
//               unit: menuIngredient.unit,
//               pricePerUnit: ingredientInfo?.pricePerUnit || 0,
//               totalCost: totalCost,
//             });
//           }
//         });
//       }
//       return acc;
//     }, []);

//     setRequiredIngredients(calculated);
//     return calculated;
//   };

//   useEffect(() => {
//     calculateIngredients();
//   }, [dailyMenu]);

//   const handleAddToDailyMenu = (itemId) => {
//     setEditingItemId(itemId);
//     setTempQuantity(
//       dailyMenu.find((item) => item.id === itemId)?.quantity || "1"
//     );
//   };

//   const saveDailyMenuItem = (itemId) => {
//     const quantity = Number(tempQuantity);
//     if (isNaN(quantity)) return;

//     if (quantity <= 0) {
//       setDailyMenu(dailyMenu.filter((item) => item.id !== itemId));
//     } else {
//       const existing = dailyMenu.find((item) => item.id === itemId);
//       if (existing) {
//         setDailyMenu(
//           dailyMenu.map((item) =>
//             item.id === itemId ? { ...item, quantity: quantity } : item
//           )
//         );
//       } else {
//         setDailyMenu([...dailyMenu, { id: itemId, quantity: quantity }]);
//       }
//     }
//     setEditingItemId(null);
//   };

//   const removeDailyMenuItem = (itemId) => {
//     setDailyMenu(dailyMenu.filter((item) => item.id !== itemId));
//   };

//   // Submit daily menu - REAL APP IMPLEMENTATION
//   const submitDailyMenu = async () => {
//     /*
//     REAL DATABASE INTEGRATION:

//     try {
//       const response = await fetch('/api/menu/daily', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           date: new Date().toISOString().split('T')[0],
//           items: dailyMenu.map(item => ({
//             menuItemId: item.id,
//             quantity: item.quantity
//           }))
//         }),
//       });

//       if (!response.ok) throw new Error('Menu submission failed');

//       const result = await response.json();
//       setRestaurantData(prev => ({
//         ...prev,
//         currentDailyMenu: result.items
//       }));

//       alert("Menu submitted successfully!");
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to submit menu. Please try again.");
//     }
//     */

//     // Mock implementation
//     setRestaurantData((prev) => ({
//       ...prev,
//       currentDailyMenu: dailyMenu.map((item) => {
//         const menuItem = menuItems.find((m) => m.id === item.id);
//         return { name: menuItem?.name, quantity: item.quantity };
//       }),
//     }));
//     alert("Daily menu submitted successfully!");
//   };

//   const generateInvoice = () => {
//     const ingredientsCost = requiredIngredients.reduce(
//       (sum, ing) => sum + ing.totalCost,
//       0
//     );
//     const totalSalary = invoiceData.employeesSalary || 0;
//     const electricityCost = invoiceData.electricity || 0;
//     const waterCost = invoiceData.water || 0;
//     const totalCost =
//       ingredientsCost + totalSalary + electricityCost + waterCost;

//     return {
//       ingredientsCost,
//       salaryCost: totalSalary,
//       utilities: {
//         electricity: electricityCost,
//         water: waterCost,
//       },
//       totalCost,
//     };
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   // Add new staff - REAL APP IMPLEMENTATION
//   const handleAddStaff = async (e) => {
//     e.preventDefault();
//     try {
//       /*
//       REAL DATABASE INTEGRATION:

//       const formData = new FormData();
//       formData.append('fullName', newStaff.fullName);
//       formData.append('address', newStaff.address);
//       formData.append('idNumber', newStaff.idNumber);
//       formData.append('role', newStaff.role);
//       if (newStaff.pictureFile) {
//         formData.append('picture', newStaff.pictureFile);
//       }

//       const response = await fetch('/api/staff', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Staff creation failed');

//       const newStaffMember = await response.json();
//       setStaff([...staff, newStaffMember]);
//       */

//       // Mock implementation
//       const newStaffMember = {
//         id: staff.length + 1,
//         ...newStaff,
//         hireDate: new Date().toISOString().split("T")[0],
//         salary: 0,
//       };

//       setStaff([...staff, newStaffMember]);
//       setNewStaff({
//         fullName: "",
//         address: "",
//         picture: "",
//         idNumber: "",
//         role: "chef",
//       });
//       setShowAddStaffForm(false);
//     } catch (error) {
//       console.error("Staff creation error:", error);
//       // In production: show error to user
//     }
//   };

//   const submitInvoice = () => {
//     if (invoiceData.submitted) {
//       alert("Prices are already submitted!");
//       return;
//     }

//     setInvoiceData((prev) => ({ ...prev, submitted: true }));
//     alert("Invoice submitted successfully!");
//   };

//   const updateInvoice = () => {
//     setInvoiceData((prev) => ({ ...prev, submitted: false }));
//     alert("You can now modify the invoice prices.");
//   };

//   // Staff editing functions
//   const handleEditStaff = (staffId) => {
//     const staffToEdit = staff.find((s) => s.id === staffId);
//     if (staffToEdit) {
//       setEditingStaffId(staffId);
//       setEditStaffForm({
//         fullName: staffToEdit.fullName,
//         address: staffToEdit.address,
//         picture: staffToEdit.picture,
//         idNumber: staffToEdit.idNumber,
//         role: staffToEdit.role,
//       });
//     }
//   };

//   // Update staff - REAL APP IMPLEMENTATION
//   const saveEditedStaff = async (e) => {
//     e.preventDefault();
//     try {
//       /*
//       REAL DATABASE INTEGRATION:

//       const formData = new FormData();
//       formData.append('fullName', editStaffForm.fullName);
//       formData.append('address', editStaffForm.address);
//       formData.append('idNumber', editStaffForm.idNumber);
//       formData.append('role', editStaffForm.role);
//       if (editStaffForm.pictureFile) {
//         formData.append('picture', editStaffForm.pictureFile);
//       }

//       const response = await fetch(`/api/staff/${editingStaffId}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Staff update failed');

//       const updatedStaff = await response.json();
//       setStaff(staff.map(s => s.id === editingStaffId ? updatedStaff : s));
//       */

//       // Mock implementation
//       const updatedStaff = {
//         id: editingStaffId,
//         ...editStaffForm,
//         hireDate: staff.find((s) => s.id === editingStaffId).hireDate,
//         salary: staff.find((s) => s.id === editingStaffId).salary,
//       };

//       setStaff(staff.map((s) => (s.id === editingStaffId ? updatedStaff : s)));
//       setEditingStaffId(null);
//       alert("Staff updated successfully!");
//     } catch (error) {
//       console.error("Staff update error:", error);
//       alert("Failed to update staff. Please try again.");
//     }
//   };

//   const cancelEdit = () => {
//     setEditingStaffId(null);
//   };

//   // Delete staff - REAL APP IMPLEMENTATION
//   const handleDeleteStaff = async (staffId) => {
//     if (!window.confirm(`Delete this staff member?`)) return;

//     try {
//       /*
//       REAL DATABASE INTEGRATION:

//       const response = await fetch(`/api/staff/${staffId}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) throw new Error('Deletion failed');
//       */

//       // Mock implementation
//       setStaff(staff.filter((s) => s.id !== staffId));
//       alert("Staff member deleted successfully!");
//     } catch (error) {
//       console.error("Deletion error:", error);
//       alert("Failed to delete staff member. Please try again.");
//     }
//   };

//   const filteredStaff = staff.filter(
//     (employee) => roleFilter === "all" || employee.role === roleFilter
//   );

//   if (loading) return <div className={styles.loading}>Loading...</div>;

//   const invoice = generateInvoice();

//   if (showInvoicePage) {
//     return (
//       <div className={styles.invoicePage}>
//         <div className={styles.invoiceHeader}>
//           <h1>Restaurant Invoice</h1>
//           <button
//             className={styles.backButton}
//             onClick={() => setShowInvoicePage(false)}
//           >
//             Back to Daily Menu
//           </button>
//         </div>

//         <div className={styles.invoiceContent}>
//           <div className={styles.invoiceSection}>
//             <h2>Ingredients Cost</h2>
//             <table className={styles.invoiceTable}>
//               <thead>
//                 <tr>
//                   <th>Ingredient</th>
//                   <th>Quantity</th>
//                   <th>Unit Price</th>
//                   <th>Total Cost</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requiredIngredients.map((ing, index) => (
//                   <tr key={index}>
//                     <td>{ing.name}</td>
//                     <td>
//                       {ing.quantity.toFixed(2)} {ing.unit}
//                     </td>
//                     <td>{ing.pricePerUnit.toFixed(2)} DZD</td>
//                     <td>{ing.totalCost.toFixed(2)} DZD</td>
//                   </tr>
//                 ))}
//                 <tr className={styles.subtotalRow}>
//                   <td colSpan="3">Subtotal</td>
//                   <td>{invoice.ingredientsCost.toFixed(2)} DZD</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className={styles.invoiceSection}>
//             <h2>Additional Costs</h2>
//             <div className={styles.costInputs}>
//               <div className={styles.costInput}>
//                 <label>Staff Salaries</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={invoiceData.employeesSalary}
//                   onChange={(e) =>
//                     setInvoiceData({
//                       ...invoiceData,
//                       employeesSalary: Number(e.target.value),
//                     })
//                   }
//                   className={styles.invoiceInput}
//                   disabled={invoiceData.submitted}
//                 />
//                 <span>{invoice.salaryCost.toFixed(2)} DZD</span>
//               </div>
//               <div className={styles.costInput}>
//                 <label>Electricity</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={invoiceData.electricity}
//                   onChange={(e) =>
//                     setInvoiceData({
//                       ...invoiceData,
//                       electricity: Number(e.target.value),
//                     })
//                   }
//                   className={styles.invoiceInput}
//                   disabled={invoiceData.submitted}
//                 />
//                 <span>{invoice.utilities.electricity.toFixed(2)} DZD</span>
//               </div>
//               <div className={styles.costInput}>
//                 <label>Water</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={invoiceData.water}
//                   onChange={(e) =>
//                     setInvoiceData({
//                       ...invoiceData,
//                       water: Number(e.target.value),
//                     })
//                   }
//                   className={styles.invoiceInput}
//                   disabled={invoiceData.submitted}
//                 />
//                 <span>{invoice.utilities.water.toFixed(2)} DZD</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.invoiceTotal}>
//             <h2>Total Cost: {invoice.totalCost.toFixed(2)} DZD</h2>
//             {!invoiceData.submitted ? (
//               <button className={styles.submitButton} onClick={submitInvoice}>
//                 Submit Prices
//               </button>
//             ) : (
//               <button className={styles.updateButton} onClick={updateInvoice}>
//                 Update Prices
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.directorDash}>
//       {/* Sidebar */}
//       <div
//         className={`${styles.sidebar} ${
//           sidebarOpen ? styles.open : styles.closed
//         }`}
//       >
//         <div className={styles.sidebarHeader}>
//           {sidebarOpen && <h2>FeedMe</h2>}
//           <button
//             className={styles.toggleButton}
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             {sidebarOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         <nav className={styles.navMenu}>
//           <button
//             className={`${styles.navButton} ${
//               activeTab === "dashboard" ? styles.active : ""
//             }`}
//             onClick={() => setActiveTab("dashboard")}
//           >
//             <FaChartLine className={styles.navIcon} />
//             {sidebarOpen && <span>Dashboard</span>}
//           </button>
//           <button
//             className={`${styles.navButton} ${
//               activeTab === "menu" ? styles.active : ""
//             }`}
//             onClick={() => setActiveTab("menu")}
//           >
//             <FaUtensils className={styles.navIcon} />
//             {sidebarOpen && <span>Daily Menu</span>}
//           </button>
//           <button
//             className={`${styles.navButton} ${
//               activeTab === "grh" ? styles.active : ""
//             }`}
//             onClick={() => setActiveTab("grh")}
//           >
//             <FaUsers className={styles.navIcon} />
//             {sidebarOpen && <span>Staff</span>}
//           </button>
//           <button
//             className={`${styles.navButton} ${
//               activeTab === "reports" ? styles.active : ""
//             }`}
//             onClick={() => setActiveTab("reports")}
//           >
//             <FaFileAlt className={styles.navIcon} />
//             {sidebarOpen && <span>Reports</span>}
//           </button>
//         </nav>

//         <button className={styles.logoutButton} onClick={handleLogout}>
//           <FaSignOutAlt className={styles.navIcon} />
//           {sidebarOpen && <span>Logout</span>}
//         </button>
//       </div>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         <header className={styles.header}>
//           <h1 className={styles.title}>
//             <span className={styles.feed}>Feed</span>
//             <span className={styles.me}>Me</span> - Director Dashboard
//           </h1>
//           <p className={styles.restaurantName}>
//             {restaurantData?.name || "Restaurant"}
//           </p>
//         </header>

//         {activeTab === "dashboard" && (
//           <div className={styles.dashboardTab}>
//             <div className={styles.stats}>
//               <div className={styles.statCard}>
//                 <h3>Today's Revenue</h3>
//                 <p className={styles.statValue}>
//                   {restaurantData?.todayRevenue?.toLocaleString() || "0"} DZD
//                 </p>
//               </div>
//               <div className={styles.statCard}>
//                 <h3>Today's Orders</h3>
//                 <p className={styles.statValue}>
//                   {restaurantData?.todayOrders || "0"}
//                 </p>
//               </div>
//               <div className={styles.statCard}>
//                 <h3>Popular Item</h3>
//                 <p className={styles.statValue}>
//                   {restaurantData?.popularItem || "-"}
//                 </p>
//               </div>
//             </div>

//             <div className={styles.ordersSection}>
//               <h2>Today's Menu</h2>
//               {restaurantData?.currentDailyMenu?.length > 0 ? (
//                 <ul className={styles.dailyMenuList}>
//                   {restaurantData.currentDailyMenu.map((item, index) => (
//                     <li key={index} className={styles.dailyMenuItem}>
//                       <span>
//                         {item.name} x {item.quantity}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No menu submitted for today</p>
//               )}
//             </div>

//             <div className={styles.ordersSection}>
//               <h2>Recent Orders</h2>
//               <div className={styles.ordersGrid}>
//                 {orders.map((order) => (
//                   <div key={order.id} className={styles.orderCard}>
//                     <p>Table {order.table}</p>
//                     <p>{order.items.join(", ")}</p>
//                     <p className={styles.orderTime}>{order.time}</p>
//                     <span
//                       className={`${styles.status} ${styles[order.status]}`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "menu" && (
//           <div className={styles.menuTab}>
//             <div className={styles.menuSelection}>
//               <h2>Available Menu Items</h2>
//               <div className={styles.menuItems}>
//                 {menuItems.map((item) => (
//                   <div key={item.id} className={styles.menuItem}>
//                     <h3>{item.name}</h3>
//                     <p>
//                       <strong>ID:</strong> {item.id}
//                     </p>
//                     <p>
//                       <strong>Price:</strong> {item.price} DZD
//                     </p>
//                     {editingItemId === item.id ? (
//                       <div className={styles.quantityEdit}>
//                         <input
//                           type="number"
//                           min="1"
//                           value={tempQuantity}
//                           onChange={(e) => setTempQuantity(e.target.value)}
//                           className={styles.quantityInput}
//                           autoFocus
//                         />
//                         <button
//                           className={styles.saveButton}
//                           onClick={() => saveDailyMenuItem(item.id)}
//                         >
//                           <FaCheck />
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         className={styles.addButton}
//                         onClick={() => handleAddToDailyMenu(item.id)}
//                       >
//                         {dailyMenu.find((dm) => dm.id === item.id)
//                           ? `Edit (${
//                               dailyMenu.find((dm) => dm.id === item.id).quantity
//                             })`
//                           : "Add"}
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className={styles.dailyMenu}>
//               <div className={styles.dailyMenuHeader}>
//                 <h2>Daily Menu Summary</h2>
//                 <div className={styles.menuActions}>
//                   <button
//                     className={styles.submitButton}
//                     onClick={submitDailyMenu}
//                     disabled={dailyMenu.length === 0}
//                   >
//                     Submit Daily Menu
//                   </button>
//                   <button
//                     className={styles.invoiceButton}
//                     onClick={() => setShowInvoicePage(true)}
//                     disabled={dailyMenu.length === 0}
//                   >
//                     <FaFileInvoiceDollar /> View Invoice
//                   </button>
//                 </div>
//               </div>

//               {dailyMenu.length === 0 ? (
//                 <p>No items selected for today's menu</p>
//               ) : (
//                 <div>
//                   <ul className={styles.dailyMenuList}>
//                     {dailyMenu.map((item) => {
//                       const menuItem = menuItems.find((m) => m.id === item.id);
//                       return (
//                         <li key={item.id} className={styles.dailyMenuItem}>
//                           <span>
//                             {menuItem?.name} x {item.quantity}
//                           </span>
//                           <button
//                             className={styles.deleteButton}
//                             onClick={() => removeDailyMenuItem(item.id)}
//                           >
//                             <FaTrash />
//                           </button>
//                         </li>
//                       );
//                     })}
//                   </ul>

//                   <div className={styles.ingredientsSummary}>
//                     <h3>Ingredients Required</h3>
//                     <table className={styles.ingredientsTable}>
//                       <thead>
//                         <tr>
//                           <th>Ingredient</th>
//                           <th>Quantity</th>
//                           <th>Unit Price</th>
//                           <th>Total Cost</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {requiredIngredients.map((ing, index) => (
//                           <tr key={index}>
//                             <td>{ing.name}</td>
//                             <td>
//                               {ing.quantity.toFixed(2)} {ing.unit}
//                             </td>
//                             <td>{ing.pricePerUnit.toFixed(2)} DZD</td>
//                             <td>{ing.totalCost.toFixed(2)} DZD</td>
//                           </tr>
//                         ))}
//                         {requiredIngredients.length > 0 && (
//                           <tr className={styles.subtotalRow}>
//                             <td colSpan="3">Subtotal</td>
//                             <td>
//                               {requiredIngredients
//                                 .reduce((sum, ing) => sum + ing.totalCost, 0)
//                                 .toFixed(2)}{" "}
//                               DZD
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "grh" && (
//           <div className={styles.grhTab}>
//             <div className={styles.staffHeader}>
//               <h2>Staff Management</h2>
//               <div className={styles.staffControls}>
//                 <select
//                   className={styles.roleFilter}
//                   value={roleFilter}
//                   onChange={(e) => setRoleFilter(e.target.value)}
//                 >
//                   <option value="all">All Roles</option>
//                   <option value="chef">Chef</option>
//                   <option value="waiter">Waiter</option>
//                   <option value="cashier">Cashier</option>
//                   <option value="delivery">Delivery Agent</option>
//                   <option value="kitchen">Kitchen Staff</option>
//                 </select>
//                 <button
//                   className={styles.addStaffButton}
//                   onClick={() => setShowAddStaffForm(true)}
//                 >
//                   Add Staff
//                 </button>
//               </div>
//             </div>

//             {showAddStaffForm && (
//               <div className={styles.addStaffForm}>
//                 <h3>Add New Staff Member</h3>
//                 <form onSubmit={handleAddStaff}>
//                   <div className={styles.formGroup}>
//                     <label>Full Name</label>
//                     <input
//                       type="text"
//                       value={newStaff.fullName}
//                       onChange={(e) =>
//                         setNewStaff({ ...newStaff, fullName: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>Address</label>
//                     <input
//                       type="text"
//                       value={newStaff.address}
//                       onChange={(e) =>
//                         setNewStaff({ ...newStaff, address: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>Profile Picture</label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (file) {
//                           const reader = new FileReader();
//                           reader.onload = (event) => {
//                             setNewStaff({
//                               ...newStaff,
//                               picture: event.target.result,
//                             });
//                           };
//                           reader.readAsDataURL(file);
//                         }
//                       }}
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>ID Number</label>
//                     <input
//                       type="text"
//                       value={newStaff.idNumber}
//                       onChange={(e) =>
//                         setNewStaff({ ...newStaff, idNumber: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>Role</label>
//                     <select
//                       value={newStaff.role}
//                       onChange={(e) =>
//                         setNewStaff({ ...newStaff, role: e.target.value })
//                       }
//                     >
//                       <option value="chef">Chef</option>
//                       <option value="waiter">Waiter</option>
//                       <option value="cashier">Cashier</option>
//                       <option value="delivery">Delivery Agent</option>
//                       <option value="kitchen">Kitchen Staff</option>
//                     </select>
//                   </div>
//                   <div className={styles.formButtons}>
//                     <button type="submit" className={styles.submitButton}>
//                       Add Staff
//                     </button>
//                     <button
//                       type="button"
//                       className={styles.cancelButton}
//                       onClick={() => setShowAddStaffForm(false)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {editingStaffId && (
//               <div className={styles.editStaffForm}>
//                 <div className={styles.formHeader}>
//                   <h3>Edit Staff Member</h3>
//                   <button onClick={cancelEdit} className={styles.closeButton}>
//                     <FaTimesCircle />
//                   </button>
//                 </div>
//                 <form onSubmit={saveEditedStaff}>
//                   <div className={styles.formGroup}>
//                     <label>Full Name</label>
//                     <input
//                       type="text"
//                       value={editStaffForm.fullName}
//                       onChange={(e) =>
//                         setEditStaffForm({
//                           ...editStaffForm,
//                           fullName: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>Address</label>
//                     <input
//                       type="text"
//                       value={editStaffForm.address}
//                       onChange={(e) =>
//                         setEditStaffForm({
//                           ...editStaffForm,
//                           address: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>Profile Picture</label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (file) {
//                           const reader = new FileReader();
//                           reader.onload = (event) => {
//                             setEditStaffForm({
//                               ...editStaffForm,
//                               picture: event.target.result,
//                             });
//                           };
//                           reader.readAsDataURL(file);
//                         }
//                       }}
//                     />
//                     {editStaffForm.picture && (
//                       <img
//                         src={editStaffForm.picture}
//                         alt="Preview"
//                         className={styles.picturePreview}
//                       />
//                     )}
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>ID Number</label>
//                     <input
//                       type="text"
//                       value={editStaffForm.idNumber}
//                       onChange={(e) =>
//                         setEditStaffForm({
//                           ...editStaffForm,
//                           idNumber: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label>Role</label>
//                     <select
//                       value={editStaffForm.role}
//                       onChange={(e) =>
//                         setEditStaffForm({
//                           ...editStaffForm,
//                           role: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="chef">Chef</option>
//                       <option value="waiter">Waiter</option>
//                       <option value="cashier">Cashier</option>
//                       <option value="delivery">Delivery Agent</option>
//                       <option value="kitchen">Kitchen Staff</option>
//                     </select>
//                   </div>
//                   <div className={styles.formButtons}>
//                     <button type="submit" className={styles.submitButton}>
//                       Save Changes
//                     </button>
//                     <button
//                       type="button"
//                       className={styles.cancelButton}
//                       onClick={cancelEdit}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             <div className={styles.staffList}>
//               <table className={styles.staffTable}>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Role</th>
//                     <th>ID Number</th>
//                     <th>Hire Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStaff.map((person) => (
//                     <tr key={person.id}>
//                       <td>
//                         <div className={styles.staffInfo}>
//                           {person.picture && (
//                             <img
//                               src={person.picture}
//                               alt={person.fullName}
//                               className={styles.staffImage}
//                             />
//                           )}
//                           {person.fullName}
//                         </div>
//                       </td>
//                       <td>{person.role}</td>
//                       <td>{person.idNumber}</td>
//                       <td>{person.hireDate}</td>
//                       <td>
//                         <button
//                           className={styles.editButton}
//                           onClick={() => handleEditStaff(person.id)}
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           className={styles.deleteButton}
//                           onClick={() => handleDeleteStaff(person.id)}
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeTab === "reports" && (
//           <div className={styles.reportsTab}>
//             <div className={styles.reportActions}>
//               <h2>Reports</h2>
//               <button className={styles.newReportButton}>
//                 Create New Report
//               </button>
//             </div>

//             <div className={styles.reportsList}>
//               {reports.map((report) => (
//                 <div key={report.id} className={styles.reportCard}>
//                   <h3>
//                     {report.type} Report - {report.date}
//                   </h3>
//                   <p>{report.content}</p>
//                   <div className={styles.reportActions}>
//                     <button className={styles.editButton}>Edit</button>
//                     <button className={styles.sendButton}>Send to Admin</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default DirectorDash;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaUtensils,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFileInvoiceDollar,
  FaCheck,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import styles from "./director.module.scss";
import api from "../api";

const DirectorDash = () => {
  const navigate = useNavigate();

  // State declarations
  const [restaurantData, setRestaurantData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [dailyMenu, setDailyMenu] = useState([]);
  const [staff, setStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    fullName: "",
    address: "",
    picture: "",
    idNumber: "",
    role: "chef",
  });
  const [roleFilter, setRoleFilter] = useState("all");
  const [invoiceData, setInvoiceData] = useState({
    employeesSalary: 0,
    electricity: 0,
    water: 0,
    submitted: false,
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState("");
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editStaffForm, setEditStaffForm] = useState({
    fullName: "",
    address: "",
    picture: "",
    idNumber: "",
    role: "chef",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const restaurantRes = await api.get("/manager/income");
        setRestaurantData(restaurantRes.data);

        const ordersRes = await api.get("/manager/orders");
        setOrders(ordersRes.data);

        const menuRes = await api.get("/manager/menu/1/dishes");
        setMenuItems(menuRes.data);

        const staffRes = await (async () => {
          let chefs = await api.get("/manager/chefs");
          let agents = await api.get("/manager/delivery-agents");

          chefs = chefs.data?.map((chef) => ({ ...chef, role: "CHEF" }));
          agents = agents.data?.map((agent) => ({
            ...agent,
            role: "DELIVERY",
          }));

          return [...chefs, ...agents];
        })();

        console.log(staffRes);

        setStaff(staffRes);
      } catch (error) {
        console.error("Data loading error:", error);
        alert("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(staff);
  }, [staff]);

  const handleAddToDailyMenu = (itemId) => {
    setEditingItemId(itemId);
    setTempQuantity(
      dailyMenu.find((item) => item.id === itemId)?.quantity || "1"
    );
  };

  const saveDailyMenuItem = (itemId) => {
    const quantity = Number(tempQuantity);
    if (isNaN(quantity)) return;

    if (quantity <= 0) {
      setDailyMenu(dailyMenu.filter((item) => item.id !== itemId));
    } else {
      const existing = dailyMenu.find((item) => item.id === itemId);

      if (existing) {
        setDailyMenu(
          dailyMenu.map((item) =>
            item.id === itemId ? { ...item, quantity: quantity } : item
          )
        );
      } else {
        setDailyMenu([...dailyMenu, { id: itemId, quantity: quantity }]);
      }
    }
    setEditingItemId(null);
  };

  const removeDailyMenuItem = (itemId) => {
    setDailyMenu(dailyMenu.filter((item) => item.id !== itemId));
  };

  // const submitDailyMenu = async () => {
  //   setRestaurantData((prev) => ({
  //     ...prev,
  //     currentDailyMenu: dailyMenu.map((item) => {
  //       const menuItem = menuItems.find((m) => m.id === item.id);
  //       return { name: menuItem?.name, quantity: item.quantity };
  //     }),
  //   }));
  //   alert("Daily menu submitted successfully!");
  // };

  const submitDailyMenu = async () => {
    try {
      // Transform the daily menu state to match the backend DTO structure
      const items = dailyMenu.map((item) => {
        let menuItem = menuItems.find((m) => m.id === item.id);

        return {
          dishId: menuItem?.id,
          dishName: menuItem?.name,
          availableQuantity: item.quantity,
          price: menuItem?.price,
        };
      });

      // Create the request body according to DailyMenuCreateRequest
      const requestBody = {
        dishes: items,
      };

      // Make API call to create daily menu
      const response = await api.post("/manager/dailymenus", requestBody);

      // Update local state with the response data
      setRestaurantData((prev) => ({
        ...prev,
        currentDailyMenu: response.data.dishes.map((item) => ({
          name: item.dishName,
          quantity: item.availableQuantity,
          price: item.price,
        })),
      }));

      // Clear the daily menu selection
      setDailyMenu([]);

      alert("Daily menu submitted successfully!");
    } catch (error) {
      console.error("Menu submission error:", error);
      alert("Failed to submit daily menu. Please try again.");
    }
  };

  const generateInvoice = () => {
    const totalSalary = invoiceData.employeesSalary || 0;
    const electricityCost = invoiceData.electricity || 0;
    const waterCost = invoiceData.water || 0;
    const totalCost = totalSalary + electricityCost + waterCost;

    return {
      salaryCost: totalSalary,
      utilities: {
        electricity: electricityCost,
        water: waterCost,
      },
      totalCost,
    };
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    const newStaffMember = {
      id: staff.length + 1,
      ...newStaff,
      hireDate: new Date().toISOString().split("T")[0],
      salary: 0,
    };

    setStaff([...staff, newStaffMember]);
    setNewStaff({
      fullName: "",
      address: "",
      picture: "",
      idNumber: "",
      role: "chef",
    });
    setShowAddStaffForm(false);
  };

  const submitInvoice = () => {
    if (invoiceData.submitted) {
      alert("Prices are already submitted!");
      return;
    }

    setInvoiceData((prev) => ({ ...prev, submitted: true }));
    alert("Invoice submitted successfully!");
  };

  const updateInvoice = () => {
    setInvoiceData((prev) => ({ ...prev, submitted: false }));
    alert("You can now modify the invoice prices.");
  };

  const handleEditStaff = (staffId) => {
    const staffToEdit = staff.find((s) => s.id === staffId);
    if (staffToEdit) {
      setEditingStaffId(staffId);
      setEditStaffForm({
        fullName: staffToEdit.fullName,
        address: staffToEdit.address,
        picture: staffToEdit.picture,
        idNumber: staffToEdit.idNumber,
        role: staffToEdit.role,
      });
    }
  };

  const saveEditedStaff = async (e) => {
    e.preventDefault();
    const updatedStaff = {
      id: editingStaffId,
      ...editStaffForm,
      hireDate: staff.find((s) => s.id === editingStaffId).hireDate,
      salary: staff.find((s) => s.id === editingStaffId).salary,
    };

    setStaff(staff.map((s) => (s.id === editingStaffId ? updatedStaff : s)));
    setEditingStaffId(null);
    alert("Staff updated successfully!");
  };

  const cancelEdit = () => {
    setEditingStaffId(null);
  };

  const handleDeleteStaff = async (staffId) => {
    if (!window.confirm(`Delete this staff member?`)) return;
    setStaff(staff.filter((s) => s.id !== staffId));
    alert("Staff member deleted s((uccessfully!");
  };

  const filteredStaff = staff.filter(
    (employee) => roleFilter === "all" || employee.role === roleFilter
  );

  if (loading) return <div className={styles.loading}>Loading...</div>;

  const InvoiceTab = () => {
    const invoice = generateInvoice();

    return (
      <div className={styles.invoiceTab}>
        <div className={styles.invoiceHeader}>
          <h2>Restaurant Invoice</h2>
        </div>

        <div className={styles.invoiceContent}>
          <div className={styles.invoiceSection}>
            <h2>Costs</h2>
            <div className={styles.costInputs}>
              <div className={styles.costInput}>
                <label>Staff Salaries</label>
                <input
                  type="number"
                  min="0"
                  value={invoiceData.employeesSalary}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      employeesSalary: Number(e.target.value),
                    })
                  }
                  className={styles.invoiceInput}
                  disabled={invoiceData.submitted}
                />
                <span>{invoice.salaryCost.toFixed(2)} DZD</span>
              </div>
              <div className={styles.costInput}>
                <label>Electricity</label>
                <input
                  type="number"
                  min="0"
                  value={invoiceData.electricity}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      electricity: Number(e.target.value),
                    })
                  }
                  className={styles.invoiceInput}
                  disabled={invoiceData.submitted}
                />
                <span>{invoice.utilities.electricity.toFixed(2)} DZD</span>
              </div>
              <div className={styles.costInput}>
                <label>Water</label>
                <input
                  type="number"
                  min="0"
                  value={invoiceData.water}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      water: Number(e.target.value),
                    })
                  }
                  className={styles.invoiceInput}
                  disabled={invoiceData.submitted}
                />
                <span>{invoice.utilities.water.toFixed(2)} DZD</span>
              </div>
            </div>
          </div>

          <div className={styles.invoiceTotal}>
            <h2>Total Cost: {invoice.totalCost.toFixed(2)} DZD</h2>
            {!invoiceData.submitted ? (
              <button className={styles.submitButton} onClick={submitInvoice}>
                Submit Prices
              </button>
            ) : (
              <button className={styles.updateButton} onClick={updateInvoice}>
                Update Prices
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.directorDash}>
      <div
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.open : styles.closed
        }`}
      >
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
            className={`${styles.navButton} ${
              activeTab === "dashboard" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaChartLine className={styles.navIcon} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "menu" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("menu")}
          >
            <FaUtensils className={styles.navIcon} />
            {sidebarOpen && <span>Daily Menu</span>}
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "grh" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("grh")}
          >
            <FaUsers className={styles.navIcon} />
            {sidebarOpen && <span>Staff</span>}
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "invoice" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("invoice")}
          >
            <FaFileInvoiceDollar className={styles.navIcon} />
            {sidebarOpen && <span>Invoice</span>}
          </button>
        </nav>

        <button className={styles.logoutButton} onClick={handleLogout}>
          <FaSignOutAlt className={styles.navIcon} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.feed}>Feed</span>
            <span className={styles.me}>Me</span> - Director Dashboard
          </h1>
          <p className={styles.restaurantName}>
            {restaurantData?.name || "Restaurant"}
          </p>
        </header>

        {activeTab === "dashboard" && (
          <div className={styles.dashboardTab}>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>Today's Revenue</h3>
                <p className={styles.statValue}>
                  {restaurantData?.todayRevenue?.toLocaleString() || "0"} DZD
                </p>
              </div>
              <div className={styles.statCard}>
                <h3>Today's Orders</h3>
                <p className={styles.statValue}>
                  {restaurantData?.todayOrders || "0"}
                </p>
              </div>
              <div className={styles.statCard}>
                <h3>Popular Item</h3>
                <p className={styles.statValue}>
                  {restaurantData?.popularItem || "-"}
                </p>
              </div>
            </div>

            <div className={styles.ordersSection}>
              <h2>Today's Menu</h2>
              {restaurantData?.currentDailyMenu?.length > 0 ? (
                <ul className={styles.dailyMenuList}>
                  {restaurantData.currentDailyMenu.map((item, index) => (
                    <li key={index} className={styles.dailyMenuItem}>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
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
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <p>Table {order.table}</p>
                    <p>{order.items.join(", ")}</p>
                    <p className={styles.orderTime}>{order.time}</p>
                    <span
                      className={`${styles.status} ${styles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "menu" && (
          <div className={styles.menuTab}>
            <div className={styles.menuSelection}>
              <h2>Available Menu Items</h2>
              <div className={styles.menuItems}>
                {menuItems.map((item) => (
                  <div key={item.id} className={styles.menuItem}>
                    <h3>{item.name}</h3>
                    <p>
                      <strong>ID:</strong> {item.id}
                    </p>
                    <p>
                      <strong>Price:</strong> {item.price} DZD
                    </p>
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
                        {dailyMenu.find((dm) => dm.id === item.id)
                          ? `Edit (${
                              dailyMenu.find((dm) => dm.id === item.id).quantity
                            })`
                          : "Add"}
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
                </div>
              </div>

              {dailyMenu.length === 0 ? (
                <p>No items selected for today's menu</p>
              ) : (
                <div>
                  <ul className={styles.dailyMenuList}>
                    {dailyMenu.map((item) => {
                      const menuItem = menuItems.find((m) => m.id === item.id);
                      return (
                        <li key={item.id} className={styles.dailyMenuItem}>
                          <span>
                            {menuItem?.name} x {item.quantity}
                          </span>
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
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "grh" && (
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
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Address</label>
                    <input
                      type="text"
                      value={newStaff.address}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, address: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Profile Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setNewStaff({
                              ...newStaff,
                              picture: event.target.result,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>ID Number</label>
                    <input
                      type="text"
                      value={newStaff.idNumber}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, idNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Role</label>
                    <select
                      value={newStaff.role}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, role: e.target.value })
                      }
                    >
                      <option value="chef">Chef</option>
                      <option value="waiter">Waiter</option>
                      <option value="cashier">Cashier</option>
                      <option value="delivery">Delivery Agent</option>
                      <option value="kitchen">Kitchen Staff</option>
                    </select>
                  </div>
                  <div className={styles.formButtons}>
                    <button type="submit" className={styles.submitButton}>
                      Add Staff
                    </button>
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

            {editingStaffId && (
              <div className={styles.editStaffForm}>
                <div className={styles.formHeader}>
                  <h3>Edit Staff Member</h3>
                  <button onClick={cancelEdit} className={styles.closeButton}>
                    ✕
                  </button>
                </div>
                <form onSubmit={saveEditedStaff}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={editStaffForm.fullName}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Address</label>
                    <input
                      type="text"
                      value={editStaffForm.address}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Profile Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setEditStaffForm({
                              ...editStaffForm,
                              picture: event.target.result,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {editStaffForm.picture && (
                      <img
                        src={editStaffForm.picture}
                        alt="Preview"
                        className={styles.picturePreview}
                      />
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label>ID Number</label>
                    <input
                      type="text"
                      value={editStaffForm.idNumber}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          idNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Role</label>
                    <select
                      value={editStaffForm.role}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="chef">Chef</option>
                      <option value="waiter">Waiter</option>
                      <option value="cashier">Cashier</option>
                      <option value="delivery">Delivery Agent</option>
                      <option value="kitchen">Kitchen Staff</option>
                    </select>
                  </div>
                  <div className={styles.formButtons}>
                    <button type="submit" className={styles.submitButton}>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={cancelEdit}
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
                    <th>ID Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((person) => (
                    <tr key={person.id}>
                      <td>{person.id}</td>
                      <td>
                        <div className={styles.staffInfo}>
                          {person.firstName}
                        </div>
                      </td>
                      <td>{person.lastName}</td>
                      <td>{person.role}</td>
                      <td>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditStaff(person.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteStaff(person.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "invoice" && <InvoiceTab />}
      </main>
    </div>
  );
};

export default DirectorDash;

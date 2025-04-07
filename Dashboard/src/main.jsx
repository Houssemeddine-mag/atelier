// import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Sidebar from "./Components/Sidebar";
// import Dashboard from "./Pages/Dashboard";
// import Restaurants from "./Pages/Restarants";
// import GRH from "./Pages/GRH";
// import MenuPage from "./Pages/Menu";
// import Settings from "./Pages/Settings";
// import Profile from "./Pages/Profile";

// import "./index.scss";

// // eslint-disable-next-line react-refresh/only-export-components
// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Sidebar />

//         <div className="main-content">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/restaurants" element={<Restaurants />} />
//             <Route path="/grh" element={<GRH />} />
//             <Route path="/menu" element={<MenuPage />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="*" element={<Dashboard />} />{" "}
//             {/* Fallback to Dashboard */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Restaurants from "./Pages/Restarants";
import GRH from "./Pages/GRH";
import MenuPage from "./Pages/Menu";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Login from "./Pages/login/login"; // Import the Login page

import "./index.scss";

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page First */}
        <Route path="/" element={<Login />} />

        {/* Dashboard & Other Pages (With Sidebar) */}
        <Route
          path="/*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/grh" element={<GRH />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Dashboard />} /> {/* Fallback */}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

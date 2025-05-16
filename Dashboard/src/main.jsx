// // import React, { StrictMode } from "react";
// // import { createRoot } from "react-dom/client";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import Sidebar from "./Components/Sidebar";
// // import Dashboard from "./Pages/Dashboard";
// // import Restaurants from "./Pages/Restarants";
// // import GRH from "./Pages/GRH";
// // import MenuPage from "./Pages/Menu";
// // import Settings from "./Pages/Settings";
// // import Profile from "./Pages/Profile";
// // import Login from "./Pages/login/login"; // Import the Login page

// // import "./index.scss";

// // // eslint-disable-next-line react-refresh/only-export-components
// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Login Page First */}
// //         <Route path="/" element={<Login />} />

// //         {/* Dashboard & Other Pages (With Sidebar) */}
// //         <Route
// //           path="/*"
// //           element={
// //             <div className="app-container">
// //               <Sidebar />
// //               <div className="main-content">
// //                 <Routes>
// //                   <Route path="/dashboard" element={<Dashboard />} />
// //                   <Route path="/restaurants" element={<Restaurants />} />
// //                   <Route path="/grh" element={<GRH />} />
// //                   <Route path="/menu" element={<MenuPage />} />
// //                   <Route path="/settings" element={<Settings />} />
// //                   <Route path="/profile" element={<Profile />} />
// //                   <Route path="*" element={<Dashboard />} /> {/* Fallback */}
// //                 </Routes>
// //               </div>
// //             </div>
// //           }
// //         />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // createRoot(document.getElementById("root")).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>
// // );
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
// import Login from "./Pages/login/login";
// import ChefDashboard from "./Pages/ChefDashboard"; // Import the ChefDashboard
// import DirectorDash from "./Pages/directorDash";

// import "./index.scss";

// // eslint-disable-next-line react-refresh/only-export-components
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Login Page First */}
//         <Route path="/" element={<Login />} />

//         {/* Chef Dashboard (standalone without Sidebar) */}
//         <Route path="/chefdashboard" element={<ChefDashboard />} />

//         <Route path="/directorDash" element={<DirectorDash />} />
//         {/* Dashboard & Other Pages (With Sidebar) */}
//         <Route
//           path="/*"
//           element={
//             <div className="app-container">
//               <Sidebar />
//               <div className="main-content">
//                 <Routes>
//                   <Route path="/dashboard" element={<Dashboard />} />
//                   <Route path="/restaurants" element={<Restaurants />} />
//                   <Route path="/grh" element={<GRH />} />
//                   <Route path="/menu" element={<MenuPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/profile" element={<Profile />} />
//                   <Route path="*" element={<Dashboard />} /> {/* Fallback */}
//                 </Routes>
//               </div>
//             </div>
//           }
//         />
//       </Routes>
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Restaurants from "./Pages/Restarants";
import GRH from "./Pages/GRH";
import MenuPage from "./Pages/Menu";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Login from "./Pages/login/login";
import ChefDashboard from "./Pages/ChefDashboard";
import DirectorDash from "./Pages/directorDash";

import Sidebar from "./Components/Sidebar";
import WithAuth from "./hocs/WithAuth";
import { AuthProvider } from "./hooks/UseAuth"; // Import the AuthProvider

import "./index.scss";

// Layout Component for routes with Sidebar
const MainLayout = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <div className="main-content">{children}</div>
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          {/* Chef Dashboard (standalone) */}
          <Route
            path="/chefdashboard"
            element={
              <WithAuth allowedRoles={["chef"]}>
                <ChefDashboard />
              </WithAuth>
            }
          />

          {/* Director Dashboard (standalone) */}
          <Route
            path="/directordash"
            element={
              <WithAuth allowedRoles={["director"]}>
                <DirectorDash />
              </WithAuth>
            }
          />

          {/* Protected Routes with Sidebar */}
          <Route
            path="/*"
            element={
              <WithAuth allowedRoles={["admin", "manager", "ceo"]}>
                <MainLayout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/grh" element={<GRH />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />
                  </Routes>
                </MainLayout>
              </WithAuth>
            }
          />

          {/* Fallback for invalid routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

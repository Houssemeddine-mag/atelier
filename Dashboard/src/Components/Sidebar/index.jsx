// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { MdOutlineTableRestaurant, MdOutlineDashboard } from "react-icons/md";
// import { IoPersonSharp } from "react-icons/io5";
// import { BiFoodMenu } from "react-icons/bi";
// import { LuSettings } from "react-icons/lu";
// import { CgProfile } from "react-icons/cg";
// import { VscDebugDisconnect } from "react-icons/vsc";

// import C from "./style.module.scss";

// export default function Sidebar() {
//   const location = useLocation(); // Get current route

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <MdOutlineDashboard /> },
//     {
//       name: "Restaurants",
//       path: "/restaurants",
//       icon: <MdOutlineTableRestaurant />,
//     },
//     { name: "GRH", path: "/grh", icon: <IoPersonSharp /> },
//     { name: "Menu", path: "/menu", icon: <BiFoodMenu /> },
//   ];

//   const settingsItems = [
//     { name: "Settings", path: "/settings", icon: <LuSettings /> },
//     { name: "Profile", path: "/profile", icon: <CgProfile /> },
//   ];

//   return (
//     <div className={C.sidebar}>
//       <div className={C.aside}>
//         <div className={C["title-div"]}>
//           <h1 className={C.Title}>
//             <span className={C.feed}>Feed</span>
//             <span className={C.me}>Me</span>
//           </h1>
//         </div>

//         <div className={C["list-div"]}>
//           <dl>
//             {menuItems.map((item) => (
//               <NavLink
//                 to={item.path}
//                 key={item.name}
//                 className={`${C.item} ${
//                   location.pathname === item.path ? C.active : ""
//                 }`}
//               >
//                 {item.icon} {item.name}
//               </NavLink>
//             ))}
//           </dl>
//         </div>
//       </div>

//       <div className={C["down-list-div"]}>
//         <dt>
//           {settingsItems.map((item) => (
//             <NavLink
//               to={item.path}
//               key={item.name}
//               className={`${C.item} ${
//                 location.pathname === item.path ? C.active : ""
//               }`}
//             >
//               {item.icon} {item.name}
//             </NavLink>
//           ))}
//           <div
//             className={`${C.item} ${C.disconnect}`}
//             onClick={() => alert("Logging out...")}
//           >
//             <VscDebugDisconnect /> Disconnect
//           </div>
//           <p>&#169; FeedMe 2025</p>
//         </dt>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineTableRestaurant, MdOutlineDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { VscDebugDisconnect } from "react-icons/vsc";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

import C from "./style.module.scss";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <MdOutlineDashboard /> },
    { name: "Restaurants", path: "/restaurants", icon: <MdOutlineTableRestaurant /> },
    { name: "GRH", path: "/grh", icon: <IoPersonSharp /> },
    { name: "Menu", path: "/menu", icon: <BiFoodMenu /> },
  ];

  const settingsItems = [
    { name: "Settings", path: "/settings", icon: <LuSettings /> },
    { name: "Profile", path: "/profile", icon: <CgProfile /> },
  ];

  return (
    <div className={`${C.sidebar} ${isOpen ? C.open : C.closed}`}>
      <div className={C.aside}>
        <div className={C["title-div"]}>
          {isOpen && (
            <h1 className={C.Title}>
              <span className={C.feed}>Feed</span>
              <span className={C.me}>Me</span>
            </h1>
          )}
          <button className={C.toggleButton} onClick={toggleSidebar}>
            {isOpen ? <IoMdArrowDropleft /> : <IoMdArrowDropright />}
          </button>
        </div>

        <div className={C["list-div"]}>
          <dl>
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className={`${C.item} ${location.pathname === item.path ? C.active : ""}`}
              >
                {item.icon} {isOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </dl>
        </div>
      </div>

      <div className={C["down-list-div"]}>
        <dt>
          {settingsItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={`${C.item} ${location.pathname === item.path ? C.active : ""}`}
            >
              {item.icon} {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
          <div className={`${C.item} ${C.disconnect}`} onClick={() => alert("Logging out...")}>
            <VscDebugDisconnect /> {isOpen && <span>Disconnect</span>}
          </div>
          {isOpen && <p>&#169; FeedMe 2025</p>}
        </dt>
      </div>
    </div>
  );
}

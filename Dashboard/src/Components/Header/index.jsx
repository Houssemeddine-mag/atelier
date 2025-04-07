import React, { useState, useEffect, useRef } from "react";
import C from "./style.module.scss"; // Import CSS module
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  const [time, setTime] = useState(new Date());
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",  
  });

  const notifications = [
    "New order received",
    "Reminder: Meeting at 3 PM",
    "New user signed up",
  ];

  return (
    <div className={C.header} ref={dropdownRef}>
      <div className={C.welcome}>
        <h2>Welcome Back, Manager!</h2>
        <p className={C.date}>{formattedDate}</p>
      </div>

      <div className={C.rightSection}>
        <span className={C.time}>{formattedTime}</span>
        <input type="text" placeholder="Search..." className={C.searchBar} />

        <div className={C.notifContainer}>
          <button
            className={`${C.notification} ${showNotifDropdown ? C.active : ""}`}
            onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowProfileDropdown(false);
            }}
          >
            <IoNotificationsOutline size={24} />
          </button>

          {showNotifDropdown && (
            <div className={C.dropdown}>
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <div key={index} className={C.dropdownItem}>
                    {notif}
                  </div>
                ))
              ) : (
                <div className={C.dropdownItem}>No notifications</div>
              )}
            </div>
          )}
        </div>

        <div className={C.profileContainer}>
          <div
            className={`${C.profile} ${showProfileDropdown ? C.active : ""}`}
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifDropdown(false);
            }}
          >
            <CgProfile size={30} />
            <span>Manager</span>
          </div>

          {showProfileDropdown && (
            <div className={C.dropdown}>
              <div className={C.dropdownItem}>Profile</div>
              <div className={C.dropdownItem}>Settings</div>
              <div className={C.dropdownItemLogout}>Log Out</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

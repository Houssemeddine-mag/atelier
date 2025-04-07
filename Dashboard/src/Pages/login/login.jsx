import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoLockClosedOutline } from "react-icons/io5";

import C from "./login.module.scss";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className={C.login}>
      <div className={C.loginform}>
        <div className={C.logo}>
          <span className={C.feed}>Feed</span>
          <span className={C.me}>Me</span>
        </div>
        <div className={C.title_div}>
          <h2 className={C.title}>Your buddy for restaurant management</h2>
          <h5>Access your restaurant chain dashboard</h5>
        </div>
        <form className={C.form} onSubmit={handleLogin}>
          <p>
            <CgProfile /> UserName or Email
          </p>
          <input
            type="text"
            placeholder="Enter your Username or email"
            required
          />
          <p>
            <IoLockClosedOutline /> Password
          </p>
          <input type="password" placeholder="Enter your Password" required />

          <button type="submit" className={C.loginButton}>
            Log In
          </button>
        </form>
        <div className={C.copy}>
          <p className={C.copymsg}>
            &copy; FeedMe Restaurant Management. All rights Preserved
          </p>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
// import { IoLockClosedOutline } from "react-icons/io5";

// import C from "./login.module.scss";

// export default function Login() {
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate("/Dashboard");
//   };

//   return (
//     <div className={C.login}>
//       <div className={C.loginform}>
//         <div className={C.logo}>
//           <span className={C.feed}>Feed</span>
//           <span className={C.me}>Me</span>
//         </div>
//         <div className={C.title_div}>
//           <h2 className={C.title}>Your buddy for restaurant management</h2>
//           <h5>Access your restaurant chain dashboard</h5>
//         </div>
//         <form className={C.form} onSubmit={handleLogin}>
//           <p>
//             <CgProfile /> UserName or Email
//           </p>
//           <input
//             type="text"
//             placeholder="Enter your Username or email"
//             required
//           />
//           <p>
//             <IoLockClosedOutline /> Password
//           </p>
//           <input type="password" placeholder="Enter your Password" required />

//           <button type="submit" className={C.loginButton}>
//             Log In
//           </button>
//         </form>
//         <div className={C.copy}>
//           <p className={C.copymsg}>
//             &copy; FeedMe Restaurant Management. All rights Preserved
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoLockClosedOutline } from "react-icons/io5";
import C from "./login.module.scss";
import DineFlowLogo from './DineFlow.png';
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Simple authentication logic (in a real app, this would be an API call)
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    if (username.toLowerCase() === "admin") {
      if (password === "admin123") {
        navigate("/dashboard"); // lowercase to match route
      } else {
        setError("Invalid password for admin");
      }
    } else if (username.toLowerCase() === "chef") {
      if (password === "chef123") {
        navigate("/chefdashboard"); // lowercase to match route
      } else {
        setError("Invalid password for chef");
      }
    } else if (username.toLowerCase() === "director") {
      if (password === "director123") {
        navigate("/directordash"); // lowercase to match route
      } else {
        setError("Invalid password for chef");
      }
    }
  };

  return (
    <div className={C.login}>
      <div className={C.loginform}>
        <div className={C.logo}>
          {/* <span className={C.feed}>Feed</span> */}
          {/* <span className={C.me}>Me</span> */}
          <img src={DineFlowLogo} alt="logo" className={C.logoimg} />
        </div>
        <div className={C.title_div}>
          <h2 className={C.title}>Your buddy for restaurant management</h2>
          <h5>Access your restaurant chain dashboard</h5>
        </div>

        {error && <div className={C.error}>{error}</div>}

        <form className={C.form} onSubmit={handleLogin}>
          <p>
            <CgProfile /> UserName or Email
          </p>
          <input
            type="text"
            placeholder="Enter your Username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p>
            <IoLockClosedOutline /> Password
          </p>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoLockClosedOutline } from "react-icons/io5";
import C from "./login.module.scss";
import DineFlowLogo from "./DineFlow.png";

/*
  BACKEND INTEGRATION NOTES (Spring Boot):

  In a real application, you would replace the simple authentication logic
  with an API call to your Spring Boot backend. Here's how to implement it:

  1. First, set up your Spring Boot backend with:
     - A User model/entity
     - A UserRepository for database operations
     - A AuthenticationController with a login endpoint
     - JWT or session-based authentication

  2. Example Spring Boot Login Endpoint (Controller):
     @PostMapping("/api/auth/login")
     public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
         Authentication authentication = authenticationManager.authenticate(
             new UsernamePasswordToken(loginRequest.getUsername(), loginRequest.getPassword())
         );
         
         SecurityContextHolder.getContext().setAuthentication(authentication);
         String jwt = jwtUtils.generateJwtToken(authentication);
         
         UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();        
         return ResponseEntity.ok(new JwtResponse(
             jwt, 
             userDetails.getId(), 
             userDetails.getUsername(), 
             userDetails.getEmail(), 
             userDetails.getRole()
         ));
     }

  3. In this React component, modify the handleLogin function to:
     - Make an API call to your Spring Boot backend
     - Handle the response (store JWT, redirect based on role, etc.)

     const handleLogin = async (e) => {
         e.preventDefault();
         setError("");
         
         try {
             const response = await fetch('http://your-springboot-api/api/auth/login', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ username, password })
             });
             
             const data = await response.json();
             
             if (!response.ok) throw new Error(data.message || 'Login failed');
             
             // Store token and user data (in localStorage or context)
             localStorage.setItem('token', data.token);
             localStorage.setItem('userRole', data.role);
             
             // Redirect based on role
             switch(data.role.toLowerCase()) {
                 case 'admin': navigate('/dashboard'); break;
                 case 'chef': navigate('/chefdashboard'); break;
                 case 'director': navigate('/directordash'); break;
                 default: navigate('/');
             }
         } catch (err) {
             setError(err.message || 'Login failed. Please try again.');
         }
     };

  4. Remember to:
     - Add proper CORS configuration in your Spring Boot app
     - Implement proper error handling
     - Add loading states during API calls
     - Secure your endpoints with proper authentication/authorization
*/

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
          <span className={C.feed}>Feed</span>
          <span className={C.me}>Me</span>
          {/* <img src={DineFlowLogo} alt="logo" className={C.logoimg} /> */}
        </div>
        <div className={C.title_div}>
          <h2 className={C.title}>Your buddy for restaurant management</h2>
          <h5>Access your restaurant chain dashboard</h5>
        </div>

        {error && <div className={C.error}>{error}</div>}

        <form className={C.form} onSubmit={handleLogin}>
          <p>
            <CgProfile /> Username or Email
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
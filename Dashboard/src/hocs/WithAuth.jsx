import React from "react";
import { useNavigate } from "react-router";
import api from "../api";

function WithAuth({ children, allowedRoles }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .get(`${import.meta.env.VITE_API_BASE_URL}/v1/auth/user`)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));

        if (!allowedRoles.includes(res.data.role)) {
          localStorage.clear();
          navigate("/");

          return;
        }
      })
      .catch(() => {
        localStorage.clear();
        navigate("/");
      });
  }, []);

  return children;
}

export default WithAuth;

import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import Spinner from "../Spinner";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Protected = () => {
  const [ok, setOk] = useState(false); // To track if the user is authenticated
  const [auth, setAuth] = useAuth(); // Access the auth context

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user-dashboard", {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // Pass token in headers for auth
          },
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setOk(false); // In case of error, deny access
      }
    };

    // Only run auth check if token is present
    if (auth?.token) {
      authCheck();
    } else {
      setOk(false); // If no token, deny access
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Protected;

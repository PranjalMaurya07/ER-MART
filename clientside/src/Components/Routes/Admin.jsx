import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import Spinner from "../Spinner";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AdminRoute = () => {
  const [ok, setOk] = useState(false); // To track if the user is authenticated
  const [auth, setAuth] = useAuth(); // Access the auth context

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin-dashboard", {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Include token in header
          },
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log("Error during authentication check:", error);
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

  return ok ? <Outlet /> : <Spinner path="" page="home" />;
};

export default AdminRoute;

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../Context/auth";
// import Spinner from "../Spinner";
// import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate to handle redirects
// import axios from "axios";

// const AdminRoute = () => {
//   const [ok, setOk] = useState(false); // To track if the user is authenticated
//   const [auth] = useAuth(); // Access the auth context (assuming `useAuth` is correctly set up)
//   const navigate = useNavigate(); // To redirect users if needed

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         if (auth?.token) {
//           // Ensure token is available
//           // Send the token in the Authorization header
//           const res = await axios.get("http://localhost:8000/admin-dashboard", {
//             headers: {
//               Authorization: `Bearer ${auth.token}`, // Include token in header
//             },
//           });

//           if (res.data.ok) {
//             setOk(true); // Allow access if authenticated
//           } else {
//             setOk(false); // Deny access otherwise
//             navigate("/login"); // Redirect to login if not authenticated
//           }
//         } else {
//           setOk(false);
//           navigate("/login"); // Redirect to login if no token is found
//         }
//       } catch (error) {
//         console.log("Error during authentication check:", error);
//         setOk(false);
//         navigate("/login"); // Redirect to login on error
//       }
//     };

//     authCheck(); // Call the authentication check function
//   }, [auth?.token, navigate]); // Re-run effect if token changes or on initial render

//   // Show the protected component (Outlet) if authenticated, or Spinner otherwise
//   return ok ? <Outlet /> : <Spinner path="" page="home" />;
// };

// export default AdminRoute;

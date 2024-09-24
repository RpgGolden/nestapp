import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3000/api/auth/validate",
        {},
        {
          headers: {
            Authorization: token, // Send the token in the Authorization header
          },
        }
      )
      .then((response) => {
        if (response.data.valid) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setHasAccess(false); // Handle error by denying access
        setLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (hasAccess) {
    return <Component {...rest} />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;

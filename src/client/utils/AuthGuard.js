import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./auth.util";

const AuthGuard = ({ isLoggedIn, children }) => {
  const user = getCurrentUser();
  if (!isLoggedIn && !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default AuthGuard;

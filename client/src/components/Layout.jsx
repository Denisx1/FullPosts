import React from "react";
import { useSelector } from "react-redux";
import { ADMIN_PAGE } from "../const";
import AdminPage from "../pages/AdminPage";
import { checkRole } from "../redux/feautures/auth/authSlice";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  const role = useSelector(checkRole);
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </React.Fragment>
  );
};

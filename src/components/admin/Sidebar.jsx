import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeStyle = { fontWeight: "bold", color: "blue" };

  return (
    <div style={{ width: "200px", background: "#f5f5f5", height: "100vh", padding: "20px" }}>
      <h3>Admin Panel</h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <NavLink to="/admin/dashboard" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

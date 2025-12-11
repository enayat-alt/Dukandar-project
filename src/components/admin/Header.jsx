import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.adminAuth.admin);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin-login");
  };

  return (
    <div style={{ padding: "10px 20px", background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <h2>Welcome, {admin?.name || "Admin"}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;

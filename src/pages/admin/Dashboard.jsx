

import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/adminAuthSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());                         // remove from redux
    localStorage.removeItem("adminToken");      // remove token
    navigate("/admin-login");                   // redirect to login
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-gray-700 p-2 rounded"
                : "p-2 rounded hover:bg-gray-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/admin/dashboard/products"
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-gray-700 p-2 rounded"
                : "p-2 rounded hover:bg-gray-700"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/dashboard/orders"
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-gray-700 p-2 rounded"
                : "p-2 rounded hover:bg-gray-700"
            }
          >
            Orders
          </NavLink>

          {/* 🔥 LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 hover:bg-red-700 p-2 rounded text-left"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

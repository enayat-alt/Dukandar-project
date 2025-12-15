

import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import logo from "/logo.png";

// Material UI Icons
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.items?.length || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (location.pathname === "/") {
      navigate(`/?search=${encodeURIComponent(value)}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            <Link to="/" className="font-bold text-xl text-gray-900">
              Dukandar.com
            </Link>
          </div>

          {/* Search Bar */}
          {!isAuthPage && (
            <form
              onSubmit={handleSearchSubmit}
              className="flex-grow max-w-md flex bg-gray-100 rounded overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow px-3 py-2 text-gray-800 outline-none"
              />
              <button
                type="submit"
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                Search
              </button>
            </form>
          )}

          {/* Navigation Links */}
          <div className="flex items-center gap-4 text-sm font-medium text-gray-800">
            {!isAuthPage && (
              <>
                {/* Home */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition ${
                      isActive ? "bg-gray-200" : ""
                    }`
                  }
                >
                  <HomeIcon fontSize="small" /> Home
                </NavLink>

                {/* Orders / Profile */}
                {user && (
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition ${
                        isActive ? "bg-gray-200" : ""
                      }`
                    }
                  >
                    <AccountCircleIcon fontSize="small" /> Orders
                  </NavLink>
                )}

                {/* Cart */}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition ${
                      isActive ? "bg-gray-200" : ""
                    }`
                  }
                >
                  <ShoppingCartIcon fontSize="small" /> Cart
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full px-1">
                      {cartItems}
                    </span>
                  )}
                </NavLink>
              </>
            )}

            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-gray-200 text-red-400 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                <LogoutIcon fontSize="small" /> Logout
              </button>
            ) : (
              !isAuthPage && (
                <>
                  <NavLink
                    to="/login"
                    className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    <LoginIcon fontSize="small" /> Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    <PersonAddIcon fontSize="small" /> Signup
                  </NavLink>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import logo from "/logo.png"; // <- your small PNG logo

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => dispatch(logout());

  // Live search on typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Only update URL if on Home page
    if (location.pathname === "/") {
      navigate(`/?search=${encodeURIComponent(value)}`);
    }
  };

  // Optional: also allow pressing Enter to navigate
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="bg-pink-600 text-white p-4 flex flex-wrap justify-between items-center gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        <Link to="/" className="font-bold text-xl">
          Dukandar.com
        </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-grow max-w-md flex bg-white rounded overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow px-3 py-1 text-gray-800 outline-none"
        />
        <button
          type="submit"
          className="bg-pink-700 text-white px-4 py-1 hover:bg-pink-800"
        >
          Search
        </button>
      </form>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Home
        </NavLink>
        {user && (
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            Orders
          </NavLink>
        )}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Cart
        </NavLink>

        {/* Auth Buttons */}
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

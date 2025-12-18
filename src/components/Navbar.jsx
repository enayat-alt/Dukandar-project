
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import logo from "/logo.png";

// Material UI Components
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Cart Context
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const { cart } = useCart(); // get cart from context
  const cartItems = cart.length; // number of items
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [location.search]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            <Link
              to="/"
              className="font-bold text-xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
            >
              Dukandar.com
            </Link>
          </div>

          {/* Search Bar */}
          {!isAuthPage && (
            <form onSubmit={handleSearchSubmit} className="flex-grow max-w-md">
              <TextField
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products and brands..."
                size="small"
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
                  <HomeIcon fontSize="small" />
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
                    <AccountCircleIcon fontSize="small" />
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
                  <ShoppingCartIcon fontSize="small" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full px-1">
                      {cartItems}
                    </span>
                  )}
                </NavLink>
              </>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-800 font-medium">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-gray-200 text-red-400 px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  <LogoutIcon fontSize="small" />
                </button>
              </div>
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

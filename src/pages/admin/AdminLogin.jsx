

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginAdminMutation } from "../../services/adminApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/adminAuthSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginAdmin({ email, password }).unwrap();
      dispatch(setCredentials({ admin: res.admin, token: res.token }));
      localStorage.setItem("adminToken", res.token); // optional: persist token
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
          }}
        >
          Admin Login
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              background: "#007bff",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.background = "#007bff")}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </form>

        {/* 🔗 Register Admin Link */}
        <p style={{ textAlign: "center", marginTop: "15px", color: "#555" }}>
          Don't have an admin account?{" "}
          <Link
            to="/admin/register"
            style={{ color: "#007bff", textDecoration: "underline" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;


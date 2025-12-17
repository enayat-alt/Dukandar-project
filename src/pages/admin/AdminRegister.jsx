
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/adminAuthSlice";
import {
  useRegisterAdminMutation,
  useLoginAdminMutation,
} from "../../services/adminApi";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ RTK Query mutations
  const [registerAdmin, { isLoading: registering }] =
    useRegisterAdminMutation();
  const [loginAdmin, { isLoading: loggingIn }] =
    useLoginAdminMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ 1. Register Admin
      await registerAdmin({ name, email, password }).unwrap();

      // ✅ 2. Auto Login
      const loginData = await loginAdmin({ email, password }).unwrap();

      // ✅ 3. Save auth data
      dispatch(
        setCredentials({
          admin: loginData.admin,
          token: loginData.token,
        })
      );

      localStorage.setItem("adminToken", loginData.token);

      // ✅ 4. Redirect
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Something went wrong");
    }
  };

  const loading = registering || loggingIn;

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
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
          Admin Register
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              background: "#007bff",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;

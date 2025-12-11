import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/adminAuthSlice";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call your backend admin register API
      const res = await fetch("http://localhost:5000/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // OPTIONAL: Auto-login after registration
      const loginRes = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.message || "Login failed");

      // Save token in redux and localStorage
      dispatch(setCredentials({ admin: loginData.admin, token: loginData.token }));
      localStorage.setItem("adminToken", loginData.token);

      navigate("/admin/dashboard"); // Navigate to dashboard after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
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

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;

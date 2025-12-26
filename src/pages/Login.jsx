
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { motion } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password }).unwrap();

      // 🔹 MINIMAL CHANGE START
      if (!res?.user || !res?.accessToken || !res?.refreshToken) {
        setError(res?.message || "Invalid credentials");
        return;
      }

      dispatch(
        setCredentials({
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        })
      );
      

      navigate("/");
    } catch (err) {
      setError(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDEEF3] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-24"></div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Login <span className="font-normal text-slate-500">or</span> Signup
          </h2>

          <p className="text-sm text-slate-500 mb-6">
            Use your email & password to continue
          </p>

          {error && (
            <div className="mb-4 text-sm bg-red-50 text-red-600 p-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {isLoading ? "Logging in..." : "CONTINUE"}
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-pink-600 font-medium">Terms of Use</span> and{" "}
            <span className="text-pink-600 font-medium">Privacy Policy</span>
          </p>

          <p className="mt-4 text-sm text-center text-slate-600">
            New user?{" "}
            <Link to="/signup" className="text-pink-600 font-semibold">
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

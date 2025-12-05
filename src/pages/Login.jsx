// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../store/slices/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//     const loggedInUser = JSON.parse(localStorage.getItem("user"));
//     if (loggedInUser) {
//       navigate("/");
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
//           Login
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-pink-600">
//           Signup
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../services/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend login API
      const res = await login({ email, password }).unwrap();

      // Save token and user in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // Redirect to home/dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-pink-600">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;

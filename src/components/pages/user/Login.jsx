import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginForm.username || !loginForm.password) {
      alert("All fields are required.");
      setError("All fields are required.");
      return;
    }

    try {
      const res = await loginUser(loginForm).then((res) => {
        setSuccess(res.data.message);
        navigate("/product/create");
      });
    } catch (err) {
      setError(err.response.data.message);
      alert("Login failed.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">Login to your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginForm.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Register
            </Link>
          </p>
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;

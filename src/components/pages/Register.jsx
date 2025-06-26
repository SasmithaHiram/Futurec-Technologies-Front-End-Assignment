import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, phoneNumber, password } = form;

    if (!form.username || !form.email || !form.phoneNumber || !form.password) {
      alert("All fields are required.");
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await registerUser(form);
      setSuccess(res.data.message);
      setForm({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data.message || "Registration failed");
      alert("Registration failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Join us today! It’s quick and easy.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mt-3 text-center">{success}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation in React Router v6
import "./user.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For navigating after successful login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8070/api/user/login",
        formData
      );

      setLoading(false);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        if (email === "sithma2002@gmail.com") {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="backimage"></div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

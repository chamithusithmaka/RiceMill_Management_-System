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

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Simple client-side validation
    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }
    setError(""); // Clear any previous error messages
    setLoading(true);

    try {
      // Make the POST request to the backend login route
      const response = await axios.post("http://localhost:8070/api/user/login", formData);

      setLoading(false);

      // If login is successful, store the token and navigate
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage or cookie
        alert("Login successful!");
        navigate("/dashboard"); // Navigate to the dashboard or any page you want after login
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>} {/* Display error message */}

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

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;

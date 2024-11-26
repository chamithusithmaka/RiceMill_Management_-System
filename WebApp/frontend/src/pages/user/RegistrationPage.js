import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation in React Router v6
import "./user.css";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "", // Change to 'username'
    email: "",    // Change to 'email'
    password: "", // Change to 'password'
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For navigating after successful registration

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Simple client-side validation
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError(""); // Clear any previous error messages
    setLoading(true);

    try {
      // Make the POST request to the backend
      const response = await axios.post("http://localhost:8070/api/user/register", formData);

      setLoading(false);

      // If registration is successful, navigate to login page
      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/login"); // Navigate to login page using useNavigate
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>} {/* Display error message */}

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username" // Ensure the 'name' attribute is 'username'
            value={formData.username} // Use 'username' here
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email" // Ensure the 'name' attribute is 'email'
            value={formData.email} // Use 'email' here
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password" // Ensure the 'name' attribute is 'password'
            value={formData.password} // Use 'password' here
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegistrationPage;

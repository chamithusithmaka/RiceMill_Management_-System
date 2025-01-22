import React, { useState } from "react";
import axios from "axios";
import "../../css/AddSeller.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/SeedSeller/SeedSellerHeader";

function AddSeedSeller() {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new seed seller
  const handleAddSeller = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/api/seed-sellers/add", formData);
      setFormData({ name: "", contactNumber: "", email: "", address: "" }); // Reset form
      alert("Seed seller added successfully!");
    } catch (error) {
      console.error("Error adding seed seller:", error);
      alert("Failed to add seed seller. Please try again.");
    }
  };

  return (
    <div className="AddSeedSeller-container">
      <Sidebar />
      <div className="AddSeedSeller-content">
        <Header />
        <div className="AddSeedSeller-main-content">
          <h2>Add New Seed Seller</h2>
          <form onSubmit={handleAddSeller}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Seller</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSeedSeller;

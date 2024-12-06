import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../../css/SeedSeller.css";

function SeedSeller() {
  const [seedSellers, setSeedSellers] = useState([]); // To store all seed sellers
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [transactionHistory, setTransactionHistory] = useState([]); // For individual seller transactions
  const [selectedSeller, setSelectedSeller] = useState(null); // Seller selected for update or view
  const navigate = useNavigate();

  // Fetch all seed sellers
  useEffect(() => {
    const fetchSeedSellers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/seed-sellers");
        setSeedSellers(response.data);
      } catch (error) {
        console.error("Error fetching seed sellers:", error);
      }
    };
    fetchSeedSellers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new seed seller
  const handleAddSeller = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/api/seed-sellers/add", formData);
      setSeedSellers([...seedSellers, response.data]); // Update state
      setFormData({ name: "", contactNumber: "", email: "", address: "" }); // Reset form
      alert("Seed seller added successfully!");
    } catch (error) {
      console.error("Error adding seed seller:", error);
      alert("Failed to add seed seller. Please try again.");
    }
  };

  // Delete a seed seller
  const handleDeleteSeller = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/seed-sellers/${id}`);
      setSeedSellers(seedSellers.filter((seller) => seller._id !== id)); // Update state
      alert("Seed seller deleted successfully!");
    } catch (error) {
      console.error("Error deleting seed seller:", error);
      alert("Failed to delete seed seller.");
    }
  };

  // Fetch transaction history for a seller
  const fetchTransactionHistory = async (id) => {
    console.log("Fetching transaction history for seller with ID:", id);
    try {
      const response = await axios.get(`http://localhost:8070/api/seed-sellers/transactions/${id}`);
      console.log("Transaction history response:", response.data);

      setTransactionHistory(response.data.transactions);
      setSelectedSeller(null); // Reset selectedSeller here to avoid switching to the "Update Seller" form
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  // Handle updating a seed seller
  const handleUpdateSeller = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8070/api/seed-sellers/${selectedSeller}`, formData);
      setSeedSellers(
        seedSellers.map((seller) =>
          seller._id === selectedSeller ? { ...seller, ...formData } : seller
        )
      );
      setFormData({ name: "", contactNumber: "", email: "", address: "" });
      setSelectedSeller(null); // Reset selected seller
      alert("Seed seller updated successfully!");
    } catch (error) {
      console.error("Error updating seed seller:", error);
      alert("Failed to update seed seller.");
    }
  };

  return (
    <div className="SeedSeller-container">
      <Sidebar />
      <div className="SeedSeller-main">
        <h1>Seed Seller Management</h1>

        {/* Add or Update Seed Seller Form */}
        <div className="add-seller-form">
          <h2>{selectedSeller ? "Update Seed Seller" : "Add New Seed Seller"}</h2>
          <form onSubmit={selectedSeller ? handleUpdateSeller : handleAddSeller}>
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
            <button type="submit">{selectedSeller ? "Update Seller" : "Add Seller"}</button>
          </form>
        </div>

        {/* Display Seed Sellers */}
        <div className="seller-list">
          <h2>Seed Seller List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {seedSellers.map((seller) => (
                <tr key={seller._id}>
                  <td>{seller.name}</td>
                  <td>{seller.contactNumber}</td>
                  <td>{seller.email}</td>
                  <td>{seller.address}</td>
                  <td>
                    <button onClick={() => fetchTransactionHistory(seller._id)}>View Transactions</button>
                    <button
                      onClick={() => {
                        setSelectedSeller(seller._id);
                        setFormData({
                          name: seller.name,
                          contactNumber: seller.contactNumber,
                          email: seller.email,
                          address: seller.address,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteSeller(seller._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transaction History */}
        {selectedSeller === null && transactionHistory.length > 0 && (
          <div className="transaction-history">
            <h2>Transaction History</h2>
            <ul>
              {transactionHistory.map((transaction, index) => (
                <li key={index}>
                  <strong>Date:</strong> {transaction.date} | <strong>Amount:</strong> {transaction.amount} |{" "}
                  <strong>Details:</strong> {transaction.details}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No transaction found message */}
        {selectedSeller === null && transactionHistory.length === 0 && (
          <div className="no-transaction">
            <p>No transactions found for the selected seller.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeedSeller;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/AddSeller.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/SeedSeller/SeedSellerHeader";

// Modal Component for Update
function UpdateSellerModal({ showModal, setShowModal, seller, handleUpdate }) {
  const [updatedData, setUpdatedData] = useState({
    name: seller.name || "",
    contactNumber: seller.contactNumber || "",
    email: seller.email || "",
    address: seller.address || "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(seller._id, updatedData); // Pass seller ID and updated data to the parent
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Update Seller</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={updatedData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={updatedData.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={updatedData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={updatedData.address}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Seller</button>
        </form>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
}

function AllSellers() {
  const [sellers, setSellers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  // Fetch all sellers when the component mounts
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/seed-sellers");
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };
    fetchSellers();
  }, []);

  // Handle update seller request
  const handleUpdate = async (id, updatedData) => {
    try {
      // Update the seller in the database
      const response = await axios.put(`http://localhost:8070/api/seed-sellers/${id}`, updatedData);
      // After successful update, update the sellers list in the state
      setSellers(sellers.map((seller) => (seller._id === id ? { ...seller, ...updatedData } : seller)));
      setShowModal(false); // Close the modal
      alert("Seller updated successfully!");
    } catch (error) {
      console.error("Error updating seller:", error);
      alert("Failed to update seller. Please try again.");
    }
  };

  // Handle delete seller request
  const handleDelete = async (id) => {
    try {
      // Delete the seller from the database
      await axios.delete(`http://localhost:8070/api/seed-sellers/${id}`);
      // After successful deletion, remove the seller from the state
      setSellers(sellers.filter((seller) => seller._id !== id));
      alert("Seller deleted successfully!");
    } catch (error) {
      console.error("Error deleting seller:", error);
      alert("Failed to delete seller. Please try again.");
    }
  };

  return (
    <div className="AddSeedSeller-container">
      <Sidebar />
      <div className="AddSeedSeller-content">
        <Header />
        <div className="AddSeedSeller-main-content">
          <h2>All Seed Sellers</h2>
          <table className="sellers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id}>
                  <td>{seller.name}</td>
                  <td>{seller.contactNumber}</td>
                  <td>{seller.email}</td>
                  <td>{seller.address}</td>
                  <td>
                    <button onClick={() => { setSelectedSeller(seller); setShowModal(true); }}>Update</button>
                    <button onClick={() => handleDelete(seller._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && selectedSeller && (
            <UpdateSellerModal
              showModal={showModal}
              setShowModal={setShowModal}
              seller={selectedSeller}
              handleUpdate={handleUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AllSellers;

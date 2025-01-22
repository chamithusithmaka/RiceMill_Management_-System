import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Type.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Supply/SupplyHeader";

function SeedType() {
    const [typeName, setTypeName] = useState("");
    const [types, setTypes] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch all types on component mount
    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get("http://localhost:8070/types");
            setTypes(response.data);
        } catch (err) {
            console.error("Error fetching types:", err.message);
        }
    };

    const handleAddType = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:8070/types", { typeName });
            setSuccess(response.data.message);
            fetchTypes(); // Refresh the list of types
            setTypeName(""); // Clear the input field
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add type");
        }
    };

    const handleDeleteType = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/types/${id}`);
            fetchTypes(); // Refresh the list of types
        } catch (err) {
            console.error("Error deleting type:", err.message);
        }
    };

    return (
        <div className="seed-container">
            <Sidebar />
            <div className="seed-content">
                <Header />
                <div className="seed-main-content">
                    <h2>Seed Type Management</h2>

                    {/* Form to Add a New Seed Type */}
                    <div className="add-type-form">
                        <h3>Add a New Seed Type</h3>
                        <form onSubmit={handleAddType}>
                            <input
                                type="text"
                                placeholder="Enter Seed Type Name"
                                value={typeName}
                                onChange={(e) => setTypeName(e.target.value)}
                                required
                            />
                            <button type="submit">Add Type</button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                    </div>

                    {/* Display All Seed Types */}
                    <div className="view-types">
                        <h3>All Seed Types</h3>
                        {types.length > 0 ? (
                            <ul>
                                {types.map((type) => (
                                    <li key={type._id}>
                                        {type.typeName}
                                        <button onClick={() => handleDeleteType(type._id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No seed types found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeedType;

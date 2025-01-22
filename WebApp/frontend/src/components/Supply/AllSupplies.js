import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/AllSupply.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Supply/SupplyHeader";

function AllSupply() {
    const [supplies, setSupplies] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch all supplies when component mounts
        const fetchSupplies = async () => {
            try {
                const response = await axios.get("http://localhost:8070/all-supplies");
                setSupplies(response.data);
            } catch (error) {
                console.error("Error fetching supplies", error);
            }
        };
        fetchSupplies();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8070/delete-supply/${id}`);
            setMessage("Supply deleted successfully!");
            setSupplies(supplies.filter((supply) => supply._id !== id)); // Remove the deleted supply from the list
        } catch (error) {
            console.error("Error deleting supply", error);
            setMessage("Failed to delete supply. Please try again.");
        }
    };

    return (
        <div className="allsupply-container">
            <Sidebar />
            <div className="allsupply-content">
                <Header />
                <div className="allsupply-main-content">
                    <h2>All Supplies</h2>
                    {message && <div className="message">{message}</div>}
                    <table className="supply-table">
                        <thead>
                            <tr>
                                <th>Supplier Name</th>
                                <th>Seed Type</th>
                                <th>Price Per Kg</th>
                                <th>Quantity</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplies.length > 0 ? (
                                supplies.map((supply) => (
                                    <tr key={supply._id}>
                                        <td>{supply.supplierName}</td>
                                        <td>{supply.seedType ? supply.seedType.typeName : "N/A"}</td>
                                        <td>{supply.pricePerKg}</td>
                                        <td>{supply.quantity}</td>
                                        <td>{supply.totalAmount}</td>
                                        <td>
                                            <button onClick={() => handleDelete(supply._id)} className="delete-btn">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No supplies available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllSupply;

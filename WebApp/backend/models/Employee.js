const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, // Reference to Role model
    contactNumber: { type: String },
    address: { type: String },
    dateOfHire: { type: Date, default: Date.now },
    attendanceRecord: { type: Array, default: [] }, // Array of attendance objects or dates
    performanceMetrics: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);

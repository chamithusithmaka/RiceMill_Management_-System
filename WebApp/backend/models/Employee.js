const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    contactNumber: { type: String },
    address: { type: String },
    dateOfHire: { type: Date, default: Date.now },
    salaryType: { type: String, enum: ['Daily', 'Monthly'], required: true }, // Daily or Monthly salary
    salaryAmount: { type: Number, required: true }, // Salary amount based on the type
    attendanceRecord: [
        {
            date: { type: Date, required: true },
            status: { type: String, enum: ['Present', 'Absent'], required: true },
        }
    ],
    performanceMetrics: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);

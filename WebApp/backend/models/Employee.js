const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    contactNumbers: [{ type: String, match: /^[0-9]{10,15}$/ }], // Array for multiple phone numbers with validation
    address: { type: String },
    dateOfHire: { type: Date, default: Date.now },
    salaryType: { type: String, enum: ['Daily', 'Monthly'], required: true }, // Daily or Monthly salary
    salaryAmount: { type: Number, required: true }, // Salary amount based on the type
    attendanceRecord: [
        {
            date: { type: Date},
            status: { type: String, enum: ['Present', 'Absent'] },
        }
    ],
    performanceMetrics: { type: String },
    salaryPayments: [ // Array to store salary payment history
        {
            paymentDate: { type: Date}, // When the payment was made
            paymentMonth: { type: String, match: /^[A-Za-z]{3,}$/ }, // Month of the salary payment (e.g., "January")
            paymentYear: { type: Number }, // Year of the payment
            amountPaid: { type: Number }, // Amount paid during this transaction
        }
    ]
});

module.exports = mongoose.model('Employee', EmployeeSchema);

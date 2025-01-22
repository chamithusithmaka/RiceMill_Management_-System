const mongoose = require('mongoose');

const SupplySchema = new mongoose.Schema(
    {
        supplierName: { type: String, required: true }, // Name of the supplier
        seedType: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }, // Reference to the seed type
        pricePerKg: { type: Number, required: true }, // Price per kilogram
        quantity: { type: Number, required: true }, // Quantity supplied
        totalAmount: { type: Number, required: true }, // Calculated total amount (pricePerKg * quantity)
    },
    {
        timestamps: true, // Automatically generate createdAt and updatedAt fields
    }
);

// Pre-save middleware to calculate totalAmount
SupplySchema.pre('save', function (next) {
    this.totalAmount = this.pricePerKg * this.quantity;
    next();
});

module.exports = mongoose.model('Supply', SupplySchema);

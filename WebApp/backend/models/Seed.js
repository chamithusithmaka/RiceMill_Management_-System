const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    seedType: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }, // Reference to Type
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'SeedSeller', required: true }, // Supplier of the seed
    quantity: { type: Number, required: true }, // Quantity of seeds
    qualityGrade: { type: String }, // Quality grade (e.g., A, B, etc.)
    dateReceived: { type: Date, default: Date.now }, // Date the seed was received
    pricePerUnit: { type: Number, required: true }, // Cost per unit
});

module.exports = mongoose.model('Seed', SeedSchema);

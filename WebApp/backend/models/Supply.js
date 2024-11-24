const mongoose = require('mongoose');

const SupplySchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'SeedSeller', required: true }, // Supplier reference
    seedType: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }, // Type reference
    quantity: { type: Number, required: true }, // Quantity supplied
    dateSupplied: { type: Date, default: Date.now }, // Date of supply
    price: { type: Number }, // Optional price per unit
},
    {timeseries: true }
);

module.exports = mongoose.model('Supply', SupplySchema);

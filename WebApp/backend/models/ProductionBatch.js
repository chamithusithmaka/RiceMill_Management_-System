const mongoose = require('mongoose');

const ProductionBatchSchema = new mongoose.Schema({
    seedType: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }, // Type reference
    seedQuantityUsed: { type: Number, required: true }, // Quantity of seeds used
    riceType: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }, // Type reference
    riceProduced: { type: Number, required: true }, // Quantity of rice produced
    waste: { type: Number, default: 0 }, // Waste generated (seedQuantityUsed - riceProduced)
    dateProduced: { type: Date, default: Date.now }, // Date of production
});

module.exports = mongoose.model('ProductionBatch', ProductionBatchSchema);

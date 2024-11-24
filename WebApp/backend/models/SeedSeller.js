const mongoose = require('mongoose');

const SeedSellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    transactionHistory: { type: Array, default: [] }, // Array of supply IDs or detailed transactions
  },
  { timestamps: true } // Pass timestamps as an option to the schema
);

module.exports = mongoose.model('SeedSeller', SeedSellerSchema);

const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    typeName: { type: String, required: true, unique: true }, // Name of the type (e.g., Basmati, Jasmine)
    description: { type: String }, // Optional description of the type
});

module.exports = mongoose.model('Type', TypeSchema);

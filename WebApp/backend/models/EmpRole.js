const mongoose = require('mongoose');

const emprole = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Ensure 'name' is correct
    description: { type: String, required: true }
});

const Emprole = mongoose.model('Emprole', emprole);
module.exports = Emprole;

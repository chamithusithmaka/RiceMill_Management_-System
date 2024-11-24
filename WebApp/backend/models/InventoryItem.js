const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
    itemType: { 
        type: String, 
        required: true, 
        enum: ['Seed', 'Rice'] // Specifies whether the item is a seed or rice
    },
    typeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Type', 
        required: true // References the Type model for seed or rice type
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 0 // Current quantity in inventory
    },
    unit: { 
        type: String, 
        default: 'kg' // Unit of measurement (e.g., kg, tons)
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now // Tracks the last time the inventory was updated
    },
    location: { 
        type: String // Optional field for storage location
    }
});

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);

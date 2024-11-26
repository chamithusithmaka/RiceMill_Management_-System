const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    FirstName: {  // Corrected this line
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: true,
    },
  }
);


module.exports = mongoose.model('userRequests', userSchema);
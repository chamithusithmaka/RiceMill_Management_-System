const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes


// Connect to MongoDB
mongoose.connect('mongodb+srv://sithmaka:sithmaka1122@cluster.pvqvoqf.mongodb.net/student_db?retryWrites=true&w=majority&appName=Cluster', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
const PORT = 8070;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

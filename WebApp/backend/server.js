const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const seedSellerRoutes = require('./routes/seedSellerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const typeRoutes = require('./routes/typeRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const productionRoutes = require('./routes/productionBatchRoutes');
const supplyRoutes = require('./routes/supplyRoutes');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the environment variable for the connection URI
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/seed-sellers', seedSellerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/productions', productionRoutes);
app.use('/api/supplies', supplyRoutes);
app.use("/api/user", loginRoute);
app.use("/userRequests", userRoute);

// Basic route to test server
app.get('/', (req, res) => {
    res.send('Rice Mill Management System API is running!');
});

// Start the server
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

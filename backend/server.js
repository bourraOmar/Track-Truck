require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const tripRoutes = require('./routes/trip.routes');
const statsRoutes = require('./routes/stats.routes');
const tireRoutes = require('./routes/tire.routes');
const { verifyToken, protectRoute } = require('./middleware/auth.middleware');

const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); 
    }
};
connectDB();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);

app.use('/api/vehicles', verifyToken, protectRoute(['Admin']), vehicleRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/tires', tireRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Centralized error handler should be registered last so route handlers run first.
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Internal Server Error' });
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const { errorHandler } = require('./middleware/error.middleware');
const authRoutes = require('./routes/auth.routes');


// const vehicleRoutes = require('./routes/vehicle.routes'); 
// const tripRoutes = require('./routes/trip.routes');

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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
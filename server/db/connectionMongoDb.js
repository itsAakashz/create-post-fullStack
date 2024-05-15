
const mongoose = require('mongoose');

const dbURI = "mongodb+srv://zatrop:qwertyuiop@cluster0.gweezxm.mongodb.net/post-data"; // Replace with your actual connection string

const connect = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process on error
    }
};

module.exports = { connect };  // Export the connect function

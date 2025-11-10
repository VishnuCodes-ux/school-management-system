const mongoose = require('mongoose');
const defaultLocalUri = 'mongodb://127.0.0.1:27017/my-express-app';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || defaultLocalUri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
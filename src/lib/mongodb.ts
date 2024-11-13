// lib/mongodb.ts
import mongoose from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        await mongoose.connect('mongodb+srv://zunohoang:adminzunohoang@cluster0.v3sz9.mongodb.net/sfit-classmanagement?retryWrites=true&w=majority&appName=Cluster0&ssl=true&tls=true');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("RRRR");
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Could not connect to MongoDB');
    }
};

export default connectToDatabase;

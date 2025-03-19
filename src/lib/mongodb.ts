
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import mongoose from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    console.log(process.env.MONGODB_URI);


    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("RRRR");
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Could not connect to MongoDB');
    }
};

export default connectToDatabase;

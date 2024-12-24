import mongoose from 'mongoose';

const connect = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    return; 
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  try {
    console.log('Connecting to the database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to the database.');
  } catch (error : any) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }

};

export { connect };

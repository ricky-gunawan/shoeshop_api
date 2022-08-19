import mongoose from "mongoose";
import "dotenv/config";

const mongodb_uri = process.env.MONGODB_URI || "";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongodb_uri);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Failed to connect MongoDB - ${error}`);
  }
};

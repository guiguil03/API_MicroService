import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to the database Time...");
    const mongoUrl =
      process.env.MONGO_URL1 || "mongodb://time-db:27017/MicroService-Time";
    if (!mongoUrl) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;

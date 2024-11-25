import mongoose from "mongoose";
import "colors";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri);
    console.log("DB connected".bgGreen.black);
  } catch (err) {
    console.log(err);
  }
};

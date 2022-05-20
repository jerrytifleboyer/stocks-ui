import mongoose from "mongoose";
import connectDB from "../backend/connectDB";
connectDB();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 40,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
});

const COLLECTION_NAME = "user";
// const COLLECTION_NAME = "test";
export default mongoose.models.user ||
  mongoose.model(COLLECTION_NAME, userSchema);

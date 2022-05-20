import mongoose from "mongoose";
import connectDB from "../backend/connectDB";
connectDB();

const stockSchema = new mongoose.Schema({
  ticker: String,
  date: String,
  previousClosePrice: Number,
  priceTarget: String,
  notes: String,
  price: [Number],
  time: [Number],
});

const COLLECTION_NAME = "monkey";
// const COLLECTION_NAME = "test";
export default mongoose.models.monkey ||
  mongoose.model(COLLECTION_NAME, stockSchema);

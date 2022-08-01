import mongoose from "mongoose";
import connectDB from "../backend/connectDB";
connectDB();

const stockSchema = new mongoose.Schema({
  ticker: String,
  name: String,
  date: String,
  previousClosePrice: Number,
  currentPrice: Number,
  price: [Number],
  time: [Number],
});

const COLLECTION_NAME = "stock";
export const StockModel =
  mongoose.models.stock || mongoose.model(COLLECTION_NAME, stockSchema);

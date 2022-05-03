import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  ticker: String,
  date: String,
  previousClosePrice: Number,
  price: [Number],
  time: [Number],
});

const COLLECTION_NAME = "ticker";
export default mongoose.models.ticker ||
  mongoose.model(COLLECTION_NAME, stockSchema);

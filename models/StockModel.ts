import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  ticker: String,
  date: String,
  previousClosePrice: Number,
  price: [Number],
  time: [Number],
});

const COLLECTION_NAME = "test";
export default mongoose.models.test ||
  mongoose.model(COLLECTION_NAME, stockSchema);

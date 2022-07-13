import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  ticker: String,
  name: String,
  date: String,
  previousClosePrice: Number,
  price: [Number],
  time: [Number],
});

const COLLECTION_NAME = "stock";
// const COLLECTION_NAME = "test";
export const StockModel =
  mongoose.models.stock || mongoose.model(COLLECTION_NAME, stockSchema);

export const StockSchema = stockSchema;

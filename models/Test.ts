import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  ticker: String,
  name: String,
  date: String,
  previousClosePrice: Number,
  price: [Number],
  time: [Number],
});

const COLLECTION_NAME = "test";
export const TestModel =
  mongoose.models.test || mongoose.model(COLLECTION_NAME, testSchema);

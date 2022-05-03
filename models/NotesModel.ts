import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  ticker: String,
  date: String,
  previousClosePrice: Number,
  price: [Number],
  time: [Number],
});

const COLLECTION_NAME = "test";
export default mongoose.models.test ||
  mongoose.model(COLLECTION_NAME, noteSchema);

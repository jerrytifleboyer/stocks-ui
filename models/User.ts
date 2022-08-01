import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 63,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 99,
  },
  watchlist: [{ type: mongoose.SchemaTypes.ObjectId, ref: "stock" }], //ref just tells the user what model it's getting data from
  notes: [
    {
      ticker: { type: String, maxlength: 7 },
      name: { type: String },
      date: { type: String },
      price: { type: Number },
      priceTarget: { type: String, maxlength: 7 },
      notes: { type: String, maxlength: 99 },
    },
  ],
});

const COLLECTION_NAME = "user";
export const UserModel =
  mongoose.models.user || mongoose.model(COLLECTION_NAME, userSchema);

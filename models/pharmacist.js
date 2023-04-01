const mongoose = require("mongoose");
const { Schema } = mongoose;

const pharmacistSchema = new Schema(
  {
    name: { type: String, required: true },
    defaultStore: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    checkedInStore: {
      type: mongoose.Types.ObjectId,
      ref: "Store",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacist", pharmacistSchema);

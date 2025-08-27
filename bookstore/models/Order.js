const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      quantity: Number
    }
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);

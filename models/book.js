// models/books.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  rating: Number,
  // The reference to the Publisher model
  _publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' }
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
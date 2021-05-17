const mongoose = require("mongoose");

// create schema --> gives structure to database; sometimes sets rules b/t app and db; adds middleman b/t application and database
// acts as intermediary between application and database
// schema does not restrict database, only serves as a "check" b/t application and database
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // requires a title field when creating a document
    minLength: 2,
  },
  author: String,
  category: {
    type: String,
    enum: ["fiction", "non-fiction", "mystery", "other"], // requires one of these values when creating book
  },
  purchaseCount: Number,
  imageUrl: String,
  description: String,
  tags: {
    type: Array,
    default: "book"
  },
  color: String
});

// Book represents new collection in bookstore database using bookSchema
// Mongoose will pluralize 
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
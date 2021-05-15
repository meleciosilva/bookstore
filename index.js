const express = require("express");
const app = express();
const port = 4000;

// SET UP MONGOOSE
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/bookstore";

// connect application to database
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (err) return console.log(err);
  console.log("Database Connection is Successful!");
});

// create schema --> gives structure to database; sometimes sets rules b/t app and db; adds middleman b/t application and database
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  purchaseCount: Number,
  imageUrl: String,
  description: String,
  tags: Array
});

// Book represents new collection in bookstore database using bookSchema
// Mongoose will pluralize 
const Book = mongoose.model("Book", bookSchema);

// db.collection('books).find() --> mongoDB --> represented as Book

// Book.create({
//   title: "New book",
//   author: "Michael Smith",
//   description: "Very new book",
//   category: "finance",
//   purchaseCount: 40,
//   imageUrl: "http://www.randomurl.com",
//   tags: ["tag1", "tag2"]
// }, (err, book) => { // book represents newly created document
//   if (err) return console.log(err);
//   console.log(book);
// })

Book.find({}, (err, books) => {
  if (err) return console.log(err);
  console.log({ books });
});

app.listen(port, () => console.log("Server is running on port" + " " + port));
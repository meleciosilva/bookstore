const express = require("express");
const app = express();
const port = 4000;

// SET UP MONGOOSE
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/bookstore";

app.use(express.json());

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
// acts as intermediary between application and database
// schema does not restrict database, only serves as a "check" b/t application and database
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  purchaseCount: Number,
  imageUrl: String,
  description: String,
  tags: Array,
  color: String
});

// Book represents new collection in bookstore database using bookSchema
// Mongoose will pluralize 
const Book = mongoose.model("Book", bookSchema);

// POST route
app.post("/books", (req, res, next) => {
  const { title, author, description, category, purchaseCount, imageUrl, tags, color } = req.body;
  Book.create({
    title, author, description, category, purchaseCount, imageUrl, tags, color
  }, (err, newBook) => {
    if (err) return next(err);
    res.status(201).json({ message: "new book created", newBook })
  });
});

// GET route for all books
app.get("/books", (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return next();
    res.status(200).json({ books });
  });
});

// GET route for one book
app.get("/books/:bookId", (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId, (err, book) => {
    if (err) return next();
    if (!book) return next({
      status: 404,
      message: `Book id ${bookId} cannot be found`
    });
    res.json({ book });
  });
});

// PUT route
app.put("/books/:bookId", (req, res, next) => {
  const { title, category } = req.body;
  Book.findByIdAndUpdate(req.params.bookId, { title, category }, (err, book) => {
    if (err) return next();
    if (!book) return next({
      status: 404,
      message: `Book id ${req.params.bookId} cannot be found`
    });
    book.save((err, savedBook) => {
      if (err) return next({
        status: 400,
        message: err
      });
      res.json({ message: "Book successfaully updated", savedBook });
    });
  });
}); 

// DELETE route
app.delete("/books/:bookId", (req, res, next) => {
  Book.findByIdAndDelete(req.params.bookId, (err, book) => {
    if (err) return next();
    if (!book) return next({
      status: 400,
      message: `Book id ${req.params.bookId} cannot be found`
    });
    res.json({ message: "Book deleted successfully" })
  });
});

// Error Handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ message });
});

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

app.listen(port, () => console.log("Server is running on port" + " " + port));
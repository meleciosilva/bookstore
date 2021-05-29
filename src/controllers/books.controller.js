const Book = require("../models/book");

function create(req, res, next) {
  Book.create({ ...req.body }, (err, newBook) => {
    if (err) return next(err);
    res.status(201).json({ message: "new book created", newBook })
  });
}

function list(req, res, next) {
  const conditions = {};
  if (req.query) {
    for (let [key, value] of Object.entries(req.query)) {
      conditions[key] = value
    }
  }
  Book.find(conditions, (err, books) => {
    if (err) return next();
    res.status(200).json({ books });
  });
}

function read(req, res, next) {
  const bookId = req.params.bookId;
  Book.findById(bookId, (err, book) => {
    if (err) return next();
    if (!book) return next({
      status: 404,
      message: `Book id ${bookId} cannot be found`
    });
    res.json({ book });
  });
}

function update(req, res, next) {
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
}

function destroy(req, res, next) {
  Book.findByIdAndDelete(req.params.bookId, (err, book) => {
    if (err) return next();
    if (!book) return next({
      status: 400,
      message: `Book id ${req.params.bookId} cannot be found`
    });
    res.json({ message: "Book deleted successfully" })
  });
}


module.exports = {
  list,
  create,
  read,
  update,
  destroy,
}
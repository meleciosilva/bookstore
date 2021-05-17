const express = require("express");
const app = express();

const booksRouter = require("./routes/books.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/books", booksRouter);
// Not Found
app.use(notFound);
// Error Handler
app.use(errorHandler);

module.exports = app;


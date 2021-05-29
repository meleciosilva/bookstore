const express = require("express");
const app = express();

// ROUTERS
const authRouter = require("./routes/auth.router");
const booksRouter = require("./routes/books.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// SEEDERS
const { seedAdmin } = require("./seeders/admins");
// console.log(seedAdmin())

app.use(express.json());

app.use("/auth", authRouter);
app.use("/books", booksRouter);

// Not Found
app.use(notFound);
// Error Handler
app.use(errorHandler);

module.exports = app;


require("dotenv").config();
// SET UP MONGOOSE
const mongoose = require("mongoose");
const connectionString = process.env.DB_URL;

// connect application to database
module.exports = () => {
  mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  }, (err) => {
    if (err) return console.log(err);
    console.log("Database Connection is Successful!");
    }
  );
}
require("dotenv").config();
const app = require("./index");
const port = process.env.PORT;

// Setup Mongoose
const dbSetup = require("./database/setup");
dbSetup();

app.listen(port, () => console.log("Server is running on port" + " " + port));
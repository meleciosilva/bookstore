const port = 4000;
const app = require("./index");

// Setup Mongoose
const dbSetup = require("./database/setup");
dbSetup();

app.listen(port, () => console.log("Server is running on port" + " " + port));
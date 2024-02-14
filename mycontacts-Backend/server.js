const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const loggerMiddleware = require("./middlewares/logger");
require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(loggerMiddleware);
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Contact test is UP... listing at ${port}`);
});

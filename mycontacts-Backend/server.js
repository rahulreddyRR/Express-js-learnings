const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 3000;

const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
  next();
};
app.use(loggerMiddleware);

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Contact test is UP... listing at ${port}`);
});

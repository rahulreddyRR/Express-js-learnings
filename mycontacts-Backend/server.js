const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
    next();
};
app.use(express.json())
app.use(loggerMiddleware);

app.use('/api/contacts',require('./routes/contactRoute'))

app.use(errorHandler)
app.listen(port, () => {
    console.log("Contact test is UP... listing at 3000")
})
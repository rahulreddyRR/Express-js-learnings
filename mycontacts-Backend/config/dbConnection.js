const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Datebase connected :",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("Datebase Error :", error);
    process.exit(1);
  }
};

module.exports = connectDb;

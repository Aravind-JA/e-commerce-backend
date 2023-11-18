const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DataBase :", mongoose.connection.name);
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }

}

module.exports = connectDB;
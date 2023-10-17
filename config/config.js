const mongoose = require('mongoose');
const url = 'mongodb+srv://Aravind:a12345678@cluster.c8xnhd7.mongodb.net/e-commerce?retryWrites=true&w=majority';

async function connectDB() {
    try {
        await mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to DataBase :",mongoose.connection.name);
      } catch (error) {
        console.log("Error connecting to the database:", error);
      }
      
}

module.exports = connectDB;
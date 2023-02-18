import mongoose from "mongoose";

const connectionString = "mongodb+srv://alura:bananacoxinha123@alura.lnkio8g.mongodb.net/alura-node";

mongoose.connect(connectionString);

let db = mongoose.connection;

export default db;
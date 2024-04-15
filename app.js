require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("../BACKEND/Config/db");
const router = require('../BACKEND/Routes/Routes');

// connectDB();
//------------------------------------------DATABASE CONNECTION-------------------------------------------------------------
const dbUrl = process.env.DB_URL;
if(!dbUrl){
    throw new Error("dbUrl not defined")
}

mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log("error beginning  to connecting DB", err);
  });
//------------------------------------------DATABASE CONNECTION END---------------------------------------------------------

app.use(express.json())
app.use(router)



app.listen(4000, () => {
  console.log("server running ");
});


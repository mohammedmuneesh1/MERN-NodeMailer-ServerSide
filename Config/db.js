const mongoose = require("mongoose")
//----------------------------------MONGO DB CONNECTION------------------------------------------------
function connectDB(){

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
throw new Error('DB_URL not defined');
}


mongoose.connect(dbUrl).then((res)=>{
console.log("database connected successfully");
}).catch((err)=>{
console.log('Error occurred while connecting to the database:', err);
})

mongoose.connection.on("error",(err)=>{
console.error("Error connecting to MongoDB:", err);
})

mongoose.connection.on("disconnected",()=>{
console.log("Disconnected from MongoDB");
})
}

module.exports = connectDB
//----------------------------------MONGO DB CONNECTION END------------------------------------------------

// const dotenv = require("dotenv").config({
// path: "server/.env"
// })
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')
const bodyParser = require("body-parser")
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Expection`);
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true
}))

app.use("/user", require("./routes/userRouter"))
app.use("/api", require("./routes/productRouter"))
app.use("/api", require("./routes/orderRouter"))
app.use("/api", require("./routes/paymentRouter"))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

/*-- Connected to mongodb-*/
const URI = process.env.MONGODB_URL
mongoose.connect(URI, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB")
})


const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})


//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})
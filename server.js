const express = require('express')
const {json} = require("express")
const routes = require("./routes/todoRoute")
const dbConfig = require("./config/dbConfig")
const mongoose = require("mongoose")
const cors = require("cors")
const db = mongoose
const app = express()

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

app.use(json())
app.use(cors())
app.use("/", routes)

const connectionString = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`


db.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected");
}).catch(error => {
    console.error("Connection error", error);
    process.exit();
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> console.log(`listening on PORT: ${PORT}`))
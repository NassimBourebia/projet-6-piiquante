//database

const mongoose = require('mongoose')

const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME
const uri = `mongodb+srv://${username}:${password}@cluster0.qrgc5fo.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose
.connect(uri)
.then(()=> console.log("Connected to mongo"))
.catch((err) => console.error("Error connecting to mongo :", err))



module.exports = {mongoose}
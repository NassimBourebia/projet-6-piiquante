//database

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME
const uri = `mongodb+srv://${username}:${password}@cluster0.qrgc5fo.mongodb.net/?retryWrites=true&w=majority`;


mongoose
.connect(uri)
.then(()=> console.log("Connected to mongo"))
.catch((err) => console.error("Error connecting to mongo :", err))

const userSchema = new mongoose.Schema({

    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema); 

module.exports = {mongoose, User}
//database

const mongoose = require('mongoose')

// Désactive la vérification stricte des requêtes.
mongoose.set('strictQuery', false);

// Connecte Mongoose à la base de données MongoDB en utilisant l'URI construit.
mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to mongo"))
.catch((err) => console.error("Error connecting to mongo :", err))


// Exporte l'objet mongoose pour permettre à d'autres modules de l'utiliser.
module.exports = {mongoose}
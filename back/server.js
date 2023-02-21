// Charge les variables d'environnement depuis un fichier .env
require('dotenv').config()
const express = require('express'); 
const app = express();

// Middleware pour autoriser les requêtes cross-domain
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware pour parser le corps des requêtes en JSON

app.use(express.json()); 

module.exports = {app,express}
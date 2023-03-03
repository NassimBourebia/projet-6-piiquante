//Importe le module jsonwebtoken pour générer des jetons JWT pour l'authentification des utilisateurs.
const jwt = require('jsonwebtoken')

exports.createToken = (userId) => {
    
    const jwtPassword = process.env.JWT_PASSWORD
    // Générer un jeton JWT signé avec la clé secrète et l'ID utilisateur fourni, avec une durée de validité de 24 heures
    return jwt.sign(userId, jwtPassword , {expiresIn : "24h"})
   
 
 }
//Importe le module jsonwebtoken pour générer des jetons JWT pour l'authentification des utilisateurs.
const jwt = require('jsonwebtoken')

exports.createToken = (userId) => {
    
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign(userId, jwtPassword , {expiresIn : "24h"})
   
 
 }
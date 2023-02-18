//Importe le modèle de l'utilisateur à partir du module ../mongo dans une variable appelée User.
const User = require("../mongo").User
//Importe le module bcrypt pour le chiffrement des mots de passe.
const bcrypt = require("bcrypt")
//Importe le module jsonwebtoken pour générer des jetons JWT pour l'authentification des utilisateurs.
const jwt = require('jsonwebtoken')


async function createUser (req, res) {
  
    try {

    const email = req.body.email                         //const {email, password} = req.body
    const password = req.body.password
    const hashedPassword = await hashPassword(password)
    const user = new User({email: email, password: hashedPassword});   // const user = new User({email, password});
    await user.save()
    res.status(201).send({ message : "Utilisateur enregistré"})
    }

catch(err) {
    res.status(409).send({ message: "User pas enregistré :" + err})
}
}

function hashPassword(password){
    const saltRounds = 10; 
    return bcrypt.hash(password, saltRounds)
} 

async function logUser(req, res) {

    try {

    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email: email})

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) {
        res.status(403).send({message: "Mot de passe incorrect"})
    }
    const token = createToken(email);
    res.status(200).send({userId: user?._id, token: token})
} catch(err) {

    console.error(err);
    res.status(500).send({message: "Erreur interne"})
 }
}

function createToken (email){
    
   const jwtPassword = process.env.JWT_PASSWORD
   const token = jwt.sign({email: email}, jwtPassword , {expiresIn : "24h"})
   return token

}

module.exports = {createUser, logUser}
//Importe le modèle de l'utilisateur à partir du module ../mongo dans une variable appelée User.
const User = require("../models/auth.model")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt")





// Fonction pour authentifier un utilisateur en vérifiant le mot de passe.
exports.createUser = async (req, res) => {
  
    try {
      // Récupère l'email et le mot de passe du corps de la requête.
    const email = req.body.email                        
    const password = req.body.password

     // Chiffre le mot de passe avant de l'enregistrer dans la base de données.
    const hashedPassword = await bcrypt.hashPassword(password)
    const user = new User({email, password: hashedPassword});   // const user = new User({email, password});
    await user.save()
    res.status(201).send({ message : "Utilisateur enregistré"})
    }

catch(err) {
    res.status(409).send({ message: "User pas enregistré :" + err})
}
}

// Fonction pour authentifier un utilisateur en vérifiant le mot de passe.
exports.logUser = async (req, res) => {

    try {
    // Récupérer l'email et le mot de passe à partir du corps de la requête.
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email})
    
   // Vérifier que le mot de passe fourni correspond au mot de passe enregistré pour l'utilisateur.
    const isPasswordValid = await bcrypt.comparePassword(password, user.password)
    if(!isPasswordValid) {
     return res.status(403).send({message: "Mot de passe incorrect"})
    }
    const userId = user._id
    const token = jwt.createToken({userId});
    res.status(200).send({userId, token})
} catch(err) {

    console.error(err);
    res.status(500).send({message: "Erreur interne"})
 }
}



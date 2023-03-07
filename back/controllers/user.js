//Importe le modèle de l'utilisateur à partir du module ../mongo dans une variable appelée User.
const User = require("../models/auth")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt")





exports.createUser = async (req, res) => {
  
    try {
      // Récupère l'email et le mot de passe du corps de la requête.
    const email = req.body.email                        
    const password = req.body.password

    const userFound = await User.findOne({ email }); // Permet de récupérer l'utilisateur par son email, s'il existe
    if (userFound) return response.status(409).json({ error: "User already exists" }); // si l'utilisateur existe en return le message d'erreur

     // Chiffre le mot de passe avant de l'enregistrer dans la base de données.
    const hashedPassword = await bcrypt.hashPassword(password)
    const user = new User({email, password: hashedPassword});   // const user = new User({email, password});
    await user.save()
    res.status(201).send({ message : "Utilisateur enregistré"})
    } catch(err) {
        res.status(409).send({ message: "User pas enregistré :" + err})
    }
}

exports.logUser = async (req, res) => {

    try {
    // Récupérer l'email et le mot de passe à partir du corps de la requête.
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email})
    if (!user) return res.status(404).json({ error: "user not found" }); // permet d'envoyer un message d'erreur si l'utilisateur n'est pas trouvé
    
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


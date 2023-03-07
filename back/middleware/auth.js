const jwt = require("jsonwebtoken")

// Middleware pour vérifier l'authentification de l'utilisateur
exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).send({ message: "Token Invalid" })

    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    if (!decodedToken) return res.status(403).send({ message: "Token invalid " });

    const userId = decodedToken.userId;
    req.auth = { userId };

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}

// //Le code auth.js définit une fonction middleware qui utilise JSON Web Tokens 
//   pour vérifier si l'utilisateur est authentifié. Le middleware extrait le token 
//   d'authentification de l'en-tête Authorization de la requête HTTP, vérifie le token 
//   en utilisant la méthode verify de la bibliothèque JWT, et ajoute l'identifiant
//    de l'utilisateur à l'objet de la requête si la vérification est réussie. 
//    Si le token est manquant ou invalide, le middleware renvoie une réponse d'erreur.
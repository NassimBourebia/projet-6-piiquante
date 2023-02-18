const jwt = require("jsonwebtoken")

// Middleware pour vérifier l'authentification de l'utilisateur
function authenticateUser(req, res, next) {
    console.log("authenticate user");

    const header = req.header("Authorization")
    if (header == null) return res.status(403).send({ message: "Invalid" })
  
    const token = header.split(" ")[1]
    if (token == null) return res.status(403).send({ message: "Token Invalid" })
  
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
      if (err) return res.status(403).send({ message: "Token invalid " + err })
      console.log("Le token est bien valide");
      next()
    })
  }

module.exports = { authenticateUser}
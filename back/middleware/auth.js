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

const jwt = require("jsonwebtoken")

function getSauces (req, res) {

     const header = req.header("Authorization")
     if (header == null) return res.status(403).send({message: "Invalid"})


     const token = header.split(" ")[1]
     if (token == null) return res.status(403).send({message: "Token Invalid"})


    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => handleToken(err, decoded, res))
   
}

function handleToken (err, decoded, res) { 

    if (err) res.status(403).send({message: "Token invalid" + err})
    else {
        console.log("Good token", decoded)
        res.send({message: "Voici toutes les sauces"})
    }
   

 }

module.exports = {getSauces}
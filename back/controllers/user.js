const User = require("../mongo").User


function createUser (req, res) {
    
    const email = req.body.email                         //const {email, password} = req.body
    const password = req.body.password

    const user = new User({email: email, password: password});   // const user = new User({email, password});

user
.save()
.then(() => res.send({message : "utilisateur enregistré" }))
.catch((err) => console.log("User pas enregistré", err))

}

module.exports = {createUser}
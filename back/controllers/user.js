const User = require("../mongo").User
const bcrypt = require('bcrypt')


async function createUser (req, res) {

    const email = req.body.email                         //const {email, password} = req.body
    const password = req.body.password

    const hashedPassword = await hashPassword(password)
    console.log('hashedPassword:', hashedPassword);

    const user = new User({email: email, password: hashedPassword});   // const user = new User({email, password});

user
.save()
.then(() => res.send({message : "utilisateur enregistré" }))
.catch((err) => console.log("User pas enregistré", err))

}
function hashPassword(password){
    const saltRounds = 10; 
    return bcrypt.hash(password, saltRounds)
    return "nas"
}
module.exports = {createUser}
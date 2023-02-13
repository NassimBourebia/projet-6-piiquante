const User = require("../mongo").User
const bcrypt = require("bcrypt")


async function createUser (req, res) {

    const email = req.body.email                         //const {email, password} = req.body
    const password = req.body.password

    const hashedPassword = await hashPassword(password)

    console.log("password:", password);
    console.log('hashedPassword:', hashedPassword);

    const user = new User({email: email, password: hashedPassword});   // const user = new User({email, password});

user
.save()
.then(() => res.status(201).send({ message : "Utilisateur enregistré" }))
.catch((err) => res.status(409).send({ message: "User pas enregistré :" + err}))
}

function hashPassword(password){
    const saltRounds = 10; 
    return bcrypt.hash(password, saltRounds)
} 

async function logUser(req, res) {

    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email: email})

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) {
        res.status(403).send({message: "Mot de passe incorrect"})
    }
    if(isPasswordValid) {
        res.status(200).send({message: "Connection réussie"})
    }
    console.log('user:', user);
    console.log('isPasswordValid:',isPasswordValid);

}

module.exports = {createUser, logUser}
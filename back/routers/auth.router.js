// Importe le framework Express
const express = require ("express")
const authRouter = express.Router()


const {createUser, logUser} = require("../controllers/user")
const limiter = require("../config/limiter")


// Crée une route POST pour l'inscription et la connextion est utilise des fonctions
authRouter.post("/signup", createUser)
authRouter.post("/login", limiter, logUser)



module.exports = authRouter



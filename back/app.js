const express = require('express'); 
const saucesRouter = require("./routers/sauces.router")
const authRouter = require("./routers/auth.router")
const helmet = require("helmet");
const path = require("path"); 
const cors = require('./middleware/cors');

require('dotenv').config()
require("./config/mongo")

const app = express();
app.use(helmet({crossOriginResourcePolicy: false}))


// Middleware pour autoriser les requêtes cross-domain
app.use(cors);


app.use(express.json())
app.use("/images",express.static(path.join(__dirname,'images')))

app.use("/api/sauces", saucesRouter)
app.use("/api/auth/", authRouter)

//Routes  
app.get('/', (req, res) => res.send("hello world"))


module.exports = app
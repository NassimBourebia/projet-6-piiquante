require('dotenv').config()
//Connection to database
require("./config/mongo")

const express = require('express'); 
const {saucesRouter} = require("./routers/sauces.router")
const {authRouter} = require("./routers/auth.router")
const helmet = require("helmet");
const path = require("path"); 
const limiter = require("./config/limiter")
const app = express();

app.use('/api',limiter)
app.use(helmet({crossOriginResourcePolicy: false}))


// Middleware pour autoriser les requêtes cross-domain
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(express.json())
app.use("/images",express.static(path.join(__dirname,'images')))
app.use("/api/sauces", saucesRouter)
app.use("/api/auth/", authRouter)

//Routes  
app.get('/', (req, res) => res.send("hello world"))


module.exports = app
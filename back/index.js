require('dotenv').config()
const express = require('express'); 
const app = express();
const port = 3000;

//Connection to database
require("./mongo")

//Controllers
const createUser = require("./controllers/user").createUser



//Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(express.json()); 


//Routes  
app.post("/api/auth/signup", createUser)
app.get('/', (req, res) => res.send("hello wolrd"))


//Listen
app.listen(port, () => console.log("Listening on port" + port)); 



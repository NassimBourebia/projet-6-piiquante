const express = require('express'); 
const app = express();
const port = 3000; 

//database

const mongoose = require('mongoose')
const uri = "mongodb+srv://nassim:nassimAPI@cluster0.qrgc5fo.mongodb.net/?retryWrites=true&w=majority";
mongoose
.connect(uri)
.then((()=> console.log("Connected to mongo")))
.catch(err => console.error("erro connectiing to mongo", err))

const userSchema = new mongoose.Schema({

    name: String, 
    password: String
})



//Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(express.json()); 


//Routes  


app.post("/api/auth/signup", (req, res) => {
    console.log("Signup request:", req.body)
    res.send({message : "utilisateur enregistré" })
})
app.get('/', (req, res) => res.send("hello wolrd"))
app.listen(port, () => console.log("Listening on port" + port)); 


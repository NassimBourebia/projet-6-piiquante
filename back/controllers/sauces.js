const mongoose = require("mongoose")

// Schéma de données pour les produits
const productSchema = new mongoose.Schema ({
    userId: String, 
    name : String ,
    manufacturer : String ,
    description : String ,
    mainPepper : String, 
    imageUrl : String, 
    heat : Number ,
    likes : Number, 
    dislikes : Number, 
    usersLiked : [String] ,
    usersDisliked : [String] 
})
// Modèle de données pour les produits
const Product = mongoose.model("Product", productSchema)

// Fonction pour récupérer la liste des sauces
function getSauces (req, res) { 

    console.log("le token est validé, get sauces");
    // console.log("Good token", decoded)
    Product.find({}).then(products => res.send(products))
     // res.send({message: [{sauce: "sauté1"}, {sauce: "sauté2"}]})  
 }

 // Fonction pour créer une nouvelle sauce
 function createSauce (req, res) {

    const {body, file} = req
    console.log((file));
    const {fileName} = file     //const fileName = file.fileName
    const sauce = JSON.parse(body.sauce)
    const {name, manufacturer, description, mainPepper, heat, userId} = sauce

    function makeImageUrl (req, fileName) {
        return req.protocol + "://" + req.get("host") +  "/images/" + fileName
    }

    const product = new Product({
        
        userId: userId, 
        name : name ,
        manufacturer : manufacturer ,
        description : description ,
        mainPepper : mainPepper, 
        imageUrl : makeImageUrl(req, fileName), 
        heat : heat ,
        likes : 0,    
        dislikes : 0, 
        usersLiked : [] ,
        usersDisliked : []
    })
    product
    .save()
    .then((res)=> console.log("product register", res))
    .catch(console.error)


 }

module.exports = {getSauces, createSauce}
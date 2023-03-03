// Importation de modules
const { unlink } = require("fs/promises");
const Product = require("../models/sauce.model")
// const {deleteImage, updateVote} = require("../utils")


// Récupération de toutes les sauces
exports.getSauces = (req, res) => { 
    Product.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(500).json(error));
  };
  

// Récupération d'une sauce par ID
exports.getSauceById = (req, res) => {
    Product.findById(req.params.id)
    .then(sauceFound => {
      if (!sauceFound) return res.status(404).json({ message: 'sauce not found' });
      res.status(200).json(sauceFound);
    })
    .catch(error => res.status(500).json(error));
  };

// Création d'une nouvelle sauce
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
  
    const newSauce = new Product({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    newSauce.save()
    .then(() => res.status(201).json({ message: "sauce successfully created" }))
    .catch(error => res.status(500).json(error))
  };
  
 // Modification d'une sauce existante
  exports.modifySauce = (req, res) => { 
    Product.findById(req.params.id)
    .then(sauceFound => {
      if (!sauceFound) return res.status(404).json({ message: 'sauce not found' });
      if (sauceFound.userId !== req.auth.userId) return res.status(401).json({ message: "unauthorized request" });
  
      const sauceObject = req.file
      ? { ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${ req.file.filename }` } 
      : { ...req.body };
  
      Product.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => {
        const filename = sauceFound.imageUrl.split('/images/')[1];
        if (req.file) unlink(`images/${ filename }`);
  
        res.status(200).json({ message: "Sauce successfully updated!" });
      })
      .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
  }

// Suppression d'une sauce existante
  exports.deleteSauce = (req, res) => {
    Product.findById(req.params.id)
    .then(sauceFound => {
      if (!sauceFound) return res.status(404).json({ message: 'sauce not found' });
      if (sauceFound.userId !== req.auth.userId) return res.status(401).json({ message: "unauthorized request" });
  
      const filename = sauceFound.imageUrl.split('/images/')[1];
      unlink(`images/${filename}`);
  
      sauceFound.deleteOne()
      .then(() => res.status(200).json({ message: "Sauce successfully deleted" }))
      .catch(error => res.status(401).json(error));
    })
    .catch(error => res.status(500).json(error))
  }


// Mise à jour des likes/dislikes d'une sauce
  exports.likeSauce = (req, res) => {
    const { like } = req.body
    const { userId } = req.auth
   
    const status = [ -1, 0, 1 ];
    if (!status.includes(like)) return res.status(403).json({ error: "Invalid like value" })
    
    Product.findById(req.params.id)
    .then(sauceFound => {
      if (!sauceFound) return res.status(404).json({ error: 'sauce not found' });
  
      const { usersLiked, usersDisliked } = sauceFound;
  
      switch (like) {
        case 1:
          if (usersLiked.includes(userId)) return res.status(400).json({ error });
          usersLiked.push(userId);
          break;
        case -1:
          if (usersDisliked.includes(userId)) return res.status(400).json({ error });
          usersDisliked.push(userId);
          break;
        case 0:
          if (usersLiked.includes(userId)) {
            const index = usersLiked.indexOf(userId);
            usersLiked.splice(index, 1);
          } else {
            const index = usersDisliked.indexOf(userId);
            usersDisliked.splice(index, 1);
          }
          break;
        default: res.status(400).json({ error });
      }
  
      sauceFound.likes = usersLiked.length;
      sauceFound.dislikes = usersDisliked.length;
  
      sauceFound.save()
      .then(() => {res.status(200).json({ message: "Sauce updated" })
    console.log(sauceFound);
    })

      .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
  }
  


    
    


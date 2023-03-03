// Importer la bibliothèque bcrypt
const bcrypt = require('bcrypt');

// Fonction pour hacher le mot de passe
exports.hashPassword = async password => {
  try {
    // Salage du mot de passe (utilise 10 rounds)
    const saltRounds = await bcrypt.genSalt(10)

    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    console.error(error.message)
  }
}
// Fonction pour comparer le mot de passe avec son hachage 
exports.comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error(error.message)
  }
}



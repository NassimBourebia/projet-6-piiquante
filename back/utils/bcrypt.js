const bcrypt = require('bcrypt');

exports.hashPassword = async password => {
  try {
    const saltRounds = await bcrypt.genSalt(10)

    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    console.error(error.message)
  }
}

exports.comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error(error.message)
  }
}



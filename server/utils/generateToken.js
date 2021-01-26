const jwt = require('jsonwebtoken')

// from this guide:
// https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle

const generateToken = async (id, name) => {
    const token =  jwt.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d'
    })
    return { token }
}

module.exports = generateToken
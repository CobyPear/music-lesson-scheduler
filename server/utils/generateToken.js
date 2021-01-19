const jwt = require('jsonwebtoken')

// from this guide:
// https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle

const generateToken = (res, id, firstname) => {
    const expiration = process.env.DB_ENV === 'testing' ? 100 : 604_800_000
    const token = jwt.sign({ id, firstName }, process.env.JWT_SECRET, {
        expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d'
    })
    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if using https
        httpOnly: true
    })
}

module.exports = generateToken
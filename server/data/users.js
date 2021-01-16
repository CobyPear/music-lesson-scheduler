const bcrypt = require('bcryptjs')

module.exports = [
    {
        name: 'Admin',
        email:'admin@example.com',
        password: '123456',
        instrument: 'Piano',
        isAdmin: true
    },
    {
        name: 'Todd Anderson',
        email:'todd@example.com',
        password: '123456',
        instrument: 'Guitar',
        isAdmin: false
    },
    {
        name: 'Tim M',
        email:'tim@example.com',
        password: '123456',
        instrument: 'Drums',
        isAdmin: false
    }
]
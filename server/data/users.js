const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        instrument: 'Piano',
        isAdmin: true
    },
    {
        name: 'Todd Anderson',
        email:'todd@example.com',
        password: bcrypt.hashSync('123456', 10),
        instrument: 'Guitar',
        isAdmin: false
    },
    {
        name: 'Tim M',
        email:'tim@example.com',
        password: bcrypt.hashSync('123456', 10),
        instrument: 'Drums',
        isAdmin: true
    }
]
const express = require('express')
const path = require('path')
const logger = require('morgan')

const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()

// mongoose connection to db
connectDB()

const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())

// Static routes depending on production or development environment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))

} else {
    // use Morgan logger if in development environment
    app.use(logger('dev'))

    app.get('/', (req, res) => {
        return res.send('API is running... on port ' + PORT)
    })
}

// ROUTES
const userRoutes = require('./routes/userRoutes')

app.use('/api/users', userRoutes)

module.exports = { app, PORT }
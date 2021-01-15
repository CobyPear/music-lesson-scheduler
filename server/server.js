const express = require('express')
const path = require('path')
const logger = require('morgan')

const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()

connectDB()

const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))

} else {
    // use Morgan logger if in development environment
    app.use(logger('dev'))

    app.get('/', (req, res) => {
        return res.send('API is running... on port' + PORT)
    })
}

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
const express = require('express')
const path = require('path')
const logger = require('morgan')
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()

// mongoose connection to db
connectDB()

const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())


// ROUTES
const userRoutes = require('./routes/userRoutes')
const lessonRoutes = require('./routes/lessonRoutes')

app.use('/api/users', userRoutes)
app.use('/api/lessons', lessonRoutes)

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

app.use(errorHandler)


module.exports = { app, PORT }
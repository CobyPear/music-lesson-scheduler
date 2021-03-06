const express = require('express')
const path = require('path')
const errorHandler = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()

// mongoose connection to db
connectDB()

const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
        checkPeriod: 900_000_000
    }),
    cookie: {
        maxAge: 900_000_000,
        httpOnly: true,
        secure: false
    }
}))
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        null
    ],
    credentials: true
}))

// ROUTES
const userRoutes = require('./routes/userRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const authRoutes = require('./routes/authRoutes')

app.use('/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/lessons', lessonRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Static routes depending on production or development environment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')))

} else {
    const logger = require('morgan')
    // use Morgan logger if in development environment
    app.use(logger('dev'))

    app.get('/', (req, res) => {
        return res.send('API is running... on port ' + PORT)
    })
}

app.use(errorHandler)


module.exports = { app, PORT }
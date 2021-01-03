const express = require('express')
const logger = require('morgan')

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()
if (process.env.NODE_ENV) {
    app.use(logger('dev'))
}

app.use(express.json())

app.get('/', (req,res) => {
    res.send('<h1>Hello World</h1>')
})

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
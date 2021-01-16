const { app, PORT } = require('./app')

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))

module.exports = server
const { app, PORT } = require('./app')

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
const mongoose = require('mongoose')

module.exports = connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
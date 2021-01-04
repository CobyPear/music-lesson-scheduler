const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()


const users = require('./data/users')
const User = require('./models/userModel')


connectDB()

const importData = async () => {
    try {
        await User.deleteMany()

        await User.insertMany(users)

        console.log('Data Imported!')
        process.exit()
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

process.argv[2] === '-d' ? destroyData() : importData()
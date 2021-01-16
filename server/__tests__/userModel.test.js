// reference: https://medium.com/javascript-in-plain-english/how-i-setup-unit-test-for-mongodb-using-jest-mongoose-103b772ee164

const mongoose = require('mongoose')
const User = require('../models/userModel')
const usersData = require('../data/users')
const dotenv = require('dotenv').config()

describe('User Model Test', () => {
    // connect to the MongoDB Memory Server which stores the information only in memory
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
        })
    })

    // test for creating and saving a new user
    it('create and save user successfully', async () => {
        const validUser = new User(usersData[0])
        const savedUser = await validUser.save()
        // Object Id should be defined when saved to MongoDB
        expect(savedUser._id).toBeDefined()
        expect(savedUser.name).toBe(usersData[0].name)
        expect(savedUser.email).toBe(usersData[0].email)
        expect(savedUser.instrument).toBe(usersData[0].instrument)
        expect(savedUser.isAdmin).toBe(usersData[0].isAdmin)
    })

    // Test to make sure a user can't add any fields that don't exist in the db
    it('insert user successfully, but field that is not defined in the schema should be undefined', async () => {
        const userWithInvalidField = new User({
            name: "Smokey Muffins",
            email: "smuffins@test.com",
            password: "ilovetune325",
            instrument: "guitar",
            favoriteFood: "tuna",
        })
        const savedUserWithInvalidField = await userWithInvalidField.save()
        expect(savedUserWithInvalidField._id).toBeDefined()
        expect(savedUserWithInvalidField.favoriteFood).toBeUndefined()
    })

    // Test to make sure a user missing required fields wont be added
    it('create user without email field should fail', async () => {
        const invalidUser = new User({
            name: "Smokey Muffins",
            password: "acceptablePassword!53"
        })
        let err
        try {
            const savedInvalidUser = await invalidUser.save()
            error = savedInvalidUser
        } catch (error) {
            err = error 
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    })

    afterAll(async () => {
        await User.deleteMany()
    })
})
// reference: https://medium.com/javascript-in-plain-english/how-i-setup-unit-test-for-mongodb-using-jest-mongoose-103b772ee164

const mongoose = require('mongoose')
const User = require('../models/userModel')
const Lesson = require('../models/lessonModel')
const usersData = require('../data/users')

describe('User Model Test', () => {
    // connect to the MongoDB Memory Server which stores the information only in memory
    beforeAll(async() => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
        })
    })

    // test for creating and saving a new user
    it('create and save user successfully', async() => {
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
    it('insert user successfully, but field that is not defined in the schema should be undefined', async() => {
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
    it('create user without email field should fail', async() => {
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

    afterAll(async() => await User.deleteMany())
})


describe('Lesson Model Test', () => {
    // connect to the MongoDB Memory Server which stores the information only in memory
    beforeAll(async() => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
        })
    })

    it('creates a new lesson in the database associated with a user', async() => {
        const newUser = new User(usersData[1])
        const savedUser = await newUser.save()

        let date = new Date().toLocaleDateString()
        let time = new Date().toLocaleTimeString()
        const lessonDetails = {
            user: savedUser._id,
            date: date,
            time: time,
            length: 30,
            location: 'Remote',
            confirmed: false,
            price: '30',
            isPaid: false,
            isCanceled: false,
            isRescheduled: false,
        }

        const lesson = new Lesson(lessonDetails)

        const savedLesson = await lesson.save()
        // push the new lesson id into the user's lesson array
        await savedUser.lessons.push(savedLesson._id)

        // populate the user with the lesson to see if it was correctly populated
        savedUser.populate('lessons')
            .execPopulate((err, user) => {
                if (err) return err
                
                expect(lesson._id).toStrictEqual(user.lessons[0]._id)
                expect(lesson.user).toStrictEqual(user.lessons[0].user)
                expect(lesson.date).toStrictEqual(user.lessons[0].date)
                expect(lesson.time).toBe(user.lessons[0].time)
                expect(lesson.length).toBe(user.lessons[0].length)
                expect(lesson.location).toBe(user.lessons[0].location)
                expect(lesson.price).toBe(user.lessons[0].price)
                expect(lesson.confirmed).toBe(user.lessons[0].confirmed)
                expect(lesson.isPaid).toBe(user.lessons[0].isPaid)
                expect(lesson.isCanceled).toBe(user.lessons[0].isCanceled)
                expect(lesson.isRescheduled).toBe(user.lessons[0].isRescheduled)
            })
        // console.log(savedUser)
        
        expect(savedLesson._id).toBeDefined()
        expect(savedLesson.user).toBe(lessonDetails.user)
        expect(new Date(savedLesson.date).toISOString()).toBe(new Date(lessonDetails.date).toISOString())
        expect(savedLesson.time).toBe(lessonDetails.time)
        expect(savedLesson.length).toBe(lessonDetails.length)
        expect(savedLesson.location).toBe(lessonDetails.location)
        expect(savedLesson.confirmed).toBe(lessonDetails.confirmed)
        expect(savedLesson.price).toBe(lessonDetails.price)
        expect(savedLesson.isPaid).toBe(lessonDetails.isPaid)
        expect(savedLesson.isCanceled).toBe(lessonDetails.isCanceled)
        expect(savedLesson.isRescheduled).toBe(lessonDetails.isRescheduled)
        
        // check to see if the lesson is associated with the user
        expect(savedUser.lessons[0]).toBe(savedLesson._id)
        
    })


    afterAll(async() => {
        await User.deleteMany()
        await Lesson.deleteMany()
        await mongoose.connection.close()
    })

})
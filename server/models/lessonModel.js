const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    // user/name
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // date
    date: {
        type: Date,
        required: true
    },
    // time
    time: {
        type: Date,
        required: true
    },
    // length
    length: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return /30|45|60|90/.test(value)
            },
            message: props => `${props.value} is not a valid lesson length`
        }
    },
    // location
    location: {
        type: String,
        required: true
    },
    // confirmed
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    // price
    price: {
        type: Number,
        required: true,
    },
    // isPaid
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    // isCanceled
    isCanceled: {
        type: Boolean,
        required: true,
        default: false
    },
    // isRescheduled
    isRescheduled: {
        type: Boolean,
        default: false,
        rescheduleDetails: {
            time: {
                type: Date,
            },
            date: {
                type: Date,
            },
            location: {
                type: String
            },
            required: function(isRescheduled) {
                this.isRescheduled ? true : false
            }
        },
    }
})

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson
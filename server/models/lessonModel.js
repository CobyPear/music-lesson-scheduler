const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
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
    location: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    price: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    isCanceled: {
        type: Boolean,
        required: true,
        default: false
    },
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
            // if this works, it will only require these fields if isRescheduled is true.
            required: () => this.isRescheduled ? true : false
        },
    }
})

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating trainer model
const Trainer = new Schema (
    {
        name: {
            type: String, 
            required: [true, 'please add name'],
        },

        surname: {
            type: String, 
            required: [true, 'please add surname'],
        },

        dob: {
            type: Date,
            required: [true, 'please enter dob'],
        }
    }
)

module.exports = mongoose.model('Trainer', Trainer)
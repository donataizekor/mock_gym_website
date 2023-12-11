const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating course model
const Course = new Schema (
    {
        name: {
            type: String, 
            required: [true, 'please add class name']
        },

        description: {
            type: String, 
            required: [true, 'please add class description']
        },

        duration: {
            type: Number, 
            required: [true, 'please add class duration']
        },

        trainer: {
            type: String,
            required: [true, 'please add class trainer']
        }
    }
)

module.exports = mongoose.model('Course', Course)
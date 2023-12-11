const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating induction form model
const InductionForm = new Schema (
    {
        name: {
            type: String, 
            required: [true, 'please add name'],
        },

        email: {
            type: String, 
            required: [true, 'please add email'],
        },

        message:{
            type: String,
            required: [true, 'please add message']
        }
    }
)

module.exports = mongoose.model('InductionForm', InductionForm)
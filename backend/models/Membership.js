const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating membership model
const Membership = new Schema (
    {
        name: {
            type: String, 
            required: [true, 'please add membership name'],
        },
        
        description: {
            type: String, 
            required: [true, 'please add membership description'],
        },

        price: {
            type: Number,
            required: [true, 'please add membership price']
        }
    }
)

module.exports = mongoose.model('Membership', Membership)
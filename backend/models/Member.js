const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating member model
const Member = new Schema (
    {
        member: {
            type: Schema.Types.ObjectId, ref: 'User',
            required: [true, 'please add user']
        },
       
        membershipType: {
            type: Schema.Types.ObjectId.name, ref: 'Membership', 
            required: [true, 'please add membership type'],
        },
    }
)

module.exports = mongoose.model('Member', Member)
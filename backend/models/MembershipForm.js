const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating membership form model
const MembershipForm = new Schema (
    {
        name: {
            type: String, 
            required: [true, 'please add name'],
        },

        surname: {
            type: String, 
            required: [true, 'please add surname'],
        },

        email: {
            type: String, 
            unique: true,
            required: [true, 'please add email'],
        },

        dob: {
            type: Date, 
            required: [true, 'please add dob'],
        },

        mobileNumber: {
            type: Number,
            required: [true, 'please add number']
        },

        address: {
            type: String,
            required: [true, 'please add address']
        },

        city: {
            type: String,
            required: [true, 'please add city']
        },

        postCode: {
            type: String,
            required: [true, 'please add postcode']
        },

        membershipType: {
            type: String,
            required:[true, 'please add membership']
        },

        // highPressure: Boolean, default: false,
        // highColesterol: Boolean, default: false,
        // asthma: Boolean, default: false,
        // diabetes: Boolean, default: false,
        // epilepsy: Boolean, default: false,
        // highStress: Boolean, default: false,
    
        extraInfo: {
            type: String,
        },

        photo:{
            type: String,
            // required: [true, 'please add photo']
        },

        status: {
            type: String,
            enum: ['pending', 'succesful', 'rejected'],
            default: 'pending'

        },
    }
)

module.exports = mongoose.model('MembershipForm', MembershipForm)
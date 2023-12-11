const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

//creating user model
const User = new Schema (
    {
        name: {
            type: String, 
            required: [true, 'please enter name'],
        },

        surname: {
            type: String, 
            required: [true, 'please enter surname'],
        },

        email: {
            type: String, 
            required: [true, 'please enter email'],
            unique: [true, 'user already exixst'],
            lowercase: true,
            validate: [validator.isEmail, 'please enter valid email']
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'

        },
        
        password: {
            type: String,
            required: [true, 'please enter password'],
            minlength: [8, 'password too short '],
             //hides password from table when retrieving it
            select: false,
            validate: 
            {
                validator: function(val) {
                    return val.length >= 8
                }
            }
        },

        passwordChanged: {
            type: Date
        }
    }
)

//hashing password
User.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

User.methods.correctPassword = async function(inputPass, userPass) {
    return await bcrypt.compare(inputPass, userPass)
}

User.methods.changedPassword = function(JWTTimestamp) {
    if(this.passwordChanged){
        const chagedTimestamp = parseInt(this.passwordChanged.getTime()/1000, 10)
        return JWTTimestamp < chagedTimestamp
    }
    //when returning false the user password was not changed
    return false
}

module.exports = mongoose.model('User', User)
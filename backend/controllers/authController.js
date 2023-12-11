require('dotenv').config({path:'../dotenv'})
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const AppError = require('../AppError')

const jwttoken = id => {
    return jwt.sign({ id }, process.env.JWYKEY, {expiresIn: process.env.JWYKEY_EXP})
}

exports.signupUser = async (req, res, next) => {
    const body = req.body
 
    const user = new User({
        name: body.name,
        surname: body.surname,
        email: body.email,
        role: body.role,
        password: body.password,
        passwordChanged: body.passwordChanged
    })

    try{
        const newUser = await user.save()
        const token = jwttoken(newUser._id)
        //created status
        res.status(201).json({
            status : "succes",
            token, 
            data : {
                user: newUser
            }
        })
    }catch(err){
        res.status(400).send(err)
    }
    next()
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body

    try{
        //checking if email  & password exist
        if(!email || !password) {
            return next(new AppError('please check', 400))
        }
        //checking if user & password exist
        const user = await User.findOne({email}).select('+password')
       
        if(!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('incorrect details', 401))
        }
        //sending data
        const token = jwttoken(user._id)
        res.status(200).json({
            status: "succes",
            token
        })
    }catch(err){
        res.status(400).json(err)
    }
    next()
}

exports.accessUser = async (req, res, next) => {
    
    //getting token
    let token
    if( req.headers.authorization && 
        req.headers.authorization.startsWith('token')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new AppError('please log in', 403))
    }

    try{
    //validating token
    const validate = await promisify(jwt.verify)(token, process.env.JWYKEY)

    //checking for user
    const currentUser = await User.findById(validate.id)
    if(!currentUser){
        return next(new AppError('User no longer exist', 401))
    }

    //checkig if user has changed password
    if(currentUser.changedPassword(validate.iat)) {
        return next(new AppError('password has been changed', 401))
    }
    //access to protect route
    req.user = currentUser
    next();
    }catch(err){
        res.status(400).json(err)
    }
}

exports.restricTo = (...roles) => {
    //setting permissions
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('denied access'))
        }     
        next()
    }
}
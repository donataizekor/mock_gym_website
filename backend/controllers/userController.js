const User = require('../models/User')

exports.getUsers = async (req, res) => {
    
    try{
        const queryObj = {...req.query}
        const exclude = ['page', 'sort', 'limit', 'fields']
        exclude.forEach(el => delete queryObj[el])

        const user = await User.find(queryObj)
                
        res.status(200).json({status : "succes", data : user})
    }catch(err){
        res.json({message : "page not found"})
    }
}

// exports.createUser = async (req, res) => {
//     const body = req.body
//     const user = new User(body)

//     try{
//         const saveUser = await user.save()
//         //creating status
//         res.status(201).json({status : "succes", data : saveUser})
//     }catch(err){
//         res.status(400).send(err)
//     } 
// }

exports.getUser = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.params.id })
        res.status(200).json({status : "succes", data : user})
    }catch (err){ 
        res.status(404).json({message: "page not found"}) 
    }
}

exports.updateUser = async (req, res) => {
    const body = req.body 

    try{
        //querying mongo database while using operators $
        await User.findOneAndUpdate({_id: req.params.id}, {
            $set: { 
            name : body.name,
            surname: body.surname,
            email : body.email,
            role: body.role,
            password : body.password
        }})

        const updated = await User.find({ _id: req.params.id })
        res.status(200).json({status : "succes 🐱‍👤", data : updated})  
    }catch(err){
        res.status(400).json({status : "failure", message : "user not found :("})
    }
}

exports.deleteUser = async (req, res) => {
    try{
        await User.findOneAndDelete({_id: req.params.id})
        res.status(200).json({status : "succes 🐱‍👤", message : "record deleted"})
    }catch(err){
        res.status(400).json({status : "failure", message : "user not found :("})
    }
}
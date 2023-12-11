const Membership = require('../models/Membership')

exports.getMemberships = async (req, res) => {
    try{
        const membership = await Membership.find()        
        res.status(200).json({status : "succes", data : membership})
    }catch(err){
        res.json({message : "page not found"})
    }
}

exports.createMembership = async (req, res) => {
    const body = req.body
    const membership = new Membership(body)

    try{
        const saveMembership = await membership.save()
        //creating status
        res.status(201).json({status : "succes", data : saveMembership})
    }catch(err){
        res.status(400).send(err)
    } 
}

exports.getMembership = async (req, res) => {
    try{
        const membership = await Membership.findOne({ _id: req.params.id })
        res.status(200).json({status : "succes", data : membership})
    }catch (err){ 
        res.status(404).json({message: "page not found"}) 
    }
}

exports.updateMembership = async (req, res) => {
    const body = req.body 

    try{
        //querying mongo database while using operators $
        await Membership.findOneAndUpdate({_id: req.params.id}, {
            $set: { 
            name : body.name,
            description: body.description,
            price : body.price,
        }})

        const updated = await Membership.find({ _id: req.params.id })
        res.status(200).json({status : "succes 🐱‍👤", data : updated})  
    }catch(err){
        res.status(400).json({status : "failure", message : "membership not found :("})
    }
}

exports.deleteMembership = async (req, res) => {
    try{
        await Membership.findOneAndDelete({_id: req.params.id})
        res.status(200).json({status : "succes 🐱‍👤", message : "record deleted"})
    }catch(err){
        res.status(400).json({status : "failure", message : "membership not found :("})
    }
}
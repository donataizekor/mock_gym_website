const Trainer = require('../models/Trainer')

exports.getTrainers = async (req, res) => {
    try{
        const trainer = await Trainer.find()        
        res.status(200).json({status : "succes", data : trainer})
    }catch(err){
        res.json({message : "page not found"})
    }
}

exports.createTrainer = async (req, res) => {
    const body = req.body
    const trainer = new Trainer(body)

    try{
        const saveTrainer = await trainer.save()
        //creating status
        res.status(201).json({status : "succes", data : saveTrainer})
    }catch(err){
        res.status(400).send(err)
    } 
}

exports.getTrainer = async (req, res) => {
    try{
        const trainer = await Trainer.findOne({ _id: req.params.id })
        res.status(200).json({status : "succes", data : trainer})
    }catch (err){ 
        res.status(404).json({message: "page not found"}) 
    }
}

exports.updateTrainer = async (req, res) => {
    const body = req.body 

    try{
        //querying mongo database while using operators $
        await Trainer.findOneAndUpdate({_id: req.params.id}, {
            $set: { 
            name : body.name,
            surname: body.surname,
            dob : body.dob,

        }})

        const updated = await Trainer.find({ _id: req.params.id })
        res.status(200).json({status : "succes 🐱‍👤", data : updated})  
    }catch(err){
        res.status(400).json({status : "failure", message : "trainer not found :("})
    }
}

exports.deleteTrainer = async (req, res) => {
    try{
        await Trainer.findOneAndDelete({_id: req.params.id})
        res.status(200).json({status : "succes 🐱‍👤", message : "record deleted"})
    }catch(err){
        res.status(400).json({status : "failure", message : "trainer not found :("})
    }
}
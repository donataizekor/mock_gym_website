const InductionForm = require('../models/InductionForm')

exports.getInductionForms = async (req, res) => {
    try{
        const inductionForm = await InductionForm.find()        
        res.status(200).json({status : "succes", data : inductionForm})
    }catch(err){
        res.json({message : "page not found"})
    }
}

exports.createInductionForm = async (req, res) => {
    const body = req.body
    const inductionForm = new InductionForm(body)

    try{
        const saveInductionForm = await inductionForm.save()
        //creating status
        res.status(201).json({status : "succes", data : saveInductionForm})
    }catch(err){
        res.status(400).send(err)
    } 
}

exports.getInductionForm = async (req, res) => {
    try{
        const inductionForm = await InductionForm.findOne({ _id: req.params.id })
        res.status(200).json({status : "succes", data : inductionForm})
    }catch (err){ 
        res.status(404).json({message: "page not found"}) 
    }
}

exports.updateInductionForm = async (req, res) => {
    const body = req.body 

    try{
        //querying mongo database while using operators $
        await InductionForm.findOneAndUpdate({_id: req.params.id}, {
            $set: { 
            name : body.name,
            email : body.email,
            message: body.message
        }})

        const updated = await InductionForm.find({ _id: req.params.id })
        res.status(200).json({status : "succes 🐱‍👤", data : updated})  
    }catch(err){
        res.status(400).json({status : "failure", message : "inductionForm not found :("})
    }
}

exports.deleteInductionForm = async (req, res) => {
    try{
        await InductionForm.findOneAndDelete({_id: req.params.id})
        res.status(200).json({status : "succes 🐱‍👤", message : "record deleted"})
    }catch(err){
        res.status(400).json({status : "failure", message : "inductionForm not found :("})
    }
}
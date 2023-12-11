const MembershipForm = require('../models/MembershipForm')

exports.getMembershipForms = async (req, res) => {
    try{
        const membershipForm = await MembershipForm.find()        
        res.status(200).json({status : "succes", data : membershipForm})
    }catch(err){
        res.json({message : "page not found"})
    }
}

exports.createMembershipForm = async (req, res) => {
    const body = req.body
    const membershipForm = new MembershipForm(body)

    try{
        const saveMembershipForm = await membershipForm.save()
        //creating status
        res.status(201).json({status : "succes", data : saveMembershipForm})
    }catch(err){
        res.status(400).send(err)
    } 
}

exports.getMembershipForm = async (req, res) => {
    try{
        const membershipForm = await MembershipForm.findOne({ _id: req.params.id })
        res.status(200).json({status : "succes", data : membershipForm})
    }catch (err){ 
        res.status(404).json({message: "page not found"}) 
    }
}

exports.updateMembershipForm = async (req, res) => {
    const body = req.body 

    try{
        //querying mongo database while using operators $
        await MembershipForm.findOneAndUpdate({_id: req.params.id}, {
            $set: { 
            name : body.name,
            surname: body.surname,
            email : body.email,
            dob : body.dob,
            mobileNumber : body.mobileNumber,
            address: body.address,
            city : body.city,
            medical: body.medical,
            postCode : body.postCode,
            membershipType: body.membershipType,
            extraInfo : body.extraInfo,
            photo : body.photo,
            status: body.status
        }})

        const updated = await MembershipForm.find({ _id: req.params.id })
        res.status(200).json({status : "succes 🐱‍👤", data : updated})  
    }catch(err){
        res.status(400).json({status : "failure", message : "membershipForm not found :("})
    }
}

exports.deleteMembershipForm = async (req, res) => {
    try{
        await MembershipForm.findOneAndDelete({_id: req.params.id})
        res.status(200).json({status : "succes 🐱‍👤", message : "record deleted"})
    }catch(err){
        res.status(400).json({status : "failure", message : "membershipForm not found :("})
    }
}
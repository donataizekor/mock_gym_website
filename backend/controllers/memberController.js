const Member = require('../models/Member')

exports.getMembers = async (req, res) => {
    try{
        const member = await Member.find()        
        res.status(200).json({status : "succes", data : member})
    }catch(err){
        res.json({message : "page not found"})
    }
}

exports.createMember = async (req, res) => {
    const body = req.body
    const member = new Member(body)

    try{
        const saveMember = await member.save()
        //creating status
        res.status(201).json({status : "succes", data : saveMember})
    }catch(err){
        res.status(400).send(err)
    } 
}

exports.getMember = async (req, res) => {
    try{
        const member = await Member.findOne({ _id: req.params.id })
        res.status(200).json({status : "succes", data : member})
    }catch (err){ 
        res.status(404).json({message: "page not found"}) 
    }
}

exports.updateMember = async (req, res) => {
    const body = req.body 

    try{
        //querying mongo database while using operators $
        await Member.findOneAndUpdate({_id: req.params.id}, {
            $set: { 
            member : body.member,
            membershipType: body.membershipType
        }})

        const updated = await Member.find({ _id: req.params.id })
        res.status(200).json({status : "succes 🐱‍👤", data : updated})  
    }catch(err){
        res.status(400).json({status : "failure", message : "member not found :("})
    }
}

exports.deleteMember = async (req, res) => {
    try{
        await Member.findOneAndDelete({_id: req.params.id})
        res.status(200).json({status : "succes 🐱‍👤", message : "record deleted"})
    }catch(err){
        res.status(400).json({status : "failure", message : "member not found :("})
    }
}
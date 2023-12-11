const Course = require('../models/Course')

exports.getCourses = async (req, res) => {
    try{
        const course = await Course.find()        
        res.status(200).json({status : "succes", data : course})
    }catch(err){
        res.json({message : "page not found"})
    }
}

exports.createCourse = async (req, res) => {
    const body = req.body
    const course = new Course(body)

    try{
        const saveCourse = await course.save()
        //creating status
        res.status(201).json({status : "succes", data : saveCourse})
    }catch(err){
        res.status(400).send(err)
    } 
}

exports.getCourse = async (req, res) => {
    try{
        const course = await Course.findOne({ _id: req.params.id })
        res.status(200).json({status : "succes", data : course})
    }catch (err){ 
        res.status(404).json({message: "page not found"}) 
    }
}

exports.updateCourse = async (req, res) => {
    const body = req.body 

    try{
        //querying mongo database while using operators $
        await Course.findOneAndUpdate({_id: req.params.id}, {
            $set: { 
            name : body.name,
            description: body.description,
            duration : body.duration,
            trainer: body.trainer,
        }})

        const updated = await Course.find({ _id: req.params.id })
        res.status(200).json({status : "succes 🐱‍👤", data : updated})  
    }catch(err){
        res.status(404).json({status : "failure", message : "course not found :("})
    }
}

exports.deleteCourse = async (req, res) => {
    try{
        await Course.findOneAndDelete({_id: req.params.id})
        res.status(200).json({status : "succes 🐱‍👤", message : "record deleted"})
    }catch(err){
        res.status(400).json({status : "failure", message : "course not found :("})
    }
}
require('dotenv')
const mongoose = require('mongoose')

//creating database 
const db = async () => {
    try{

        //fixing deprecated messages
        const params = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        //using enviroment variable
        await mongoose.connect(process.env.DB_LOCAL, params)
        console.log('Connected to database 🦆')
    }catch(err){
        console.log('Connection to database failed 🦆 ', err)
    }
}

module.exports = db
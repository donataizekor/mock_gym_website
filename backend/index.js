require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

//api docs config
const  options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jim website',
            version: '3.0.0',
            description: 'RESTful API Software'
        },
        servers: [
            {
                url: 'http://localhost:333/jim/v1'
            }
        ]
    },
    apis: ['./routes/*.js']
}

const specs = swaggerJsDoc(options)

//initializing app
const app = express()

//api docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs)  )

//for sending data across
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//setting routes
const user = require('./routes/userRoutes')
app.use('/jim/v1/users', user)

const trainer = require('./routes/trainerRoutes')
app.use('/jim/v1/trainers', trainer)

const membershipForm = require('./routes/membershipFormRoutes')
app.use('/jim/v1/membership-forms', membershipForm)

const membership = require('./routes/membershipRoutes')
app.use('/jim/v1/memberships', membership)

const member = require('./routes/memberRoutes')
app.use('/jim/v1/members', member)

const inductionForm = require('./routes/inductionFormRoutes')
app.use('/jim/v1/induction-forms', inductionForm)

const course = require('./routes/courseRoutes')
app.use('/jim/v1/courses', course)

const auth = require('./routes/authRoutes')
app.use('/jim/v1/auth', auth)

//connecting to database
db()

//starting server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on port ${port} 😈`)
})
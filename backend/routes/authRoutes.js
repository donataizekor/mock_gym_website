const router = require('express').Router()
const authController = require('../controllers/authController')

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Authorization      
 *  schemas:
 *      User:
 *          type: object
 *          required: 
 *              - name
 *              - surname
 *              - email
 *              - password
 *          properties: 
 *              id:
 *                  type: string
 *                  description: auto generated id for the user
 *              name:
 *                  type: string
 *                  description: name of the user
 *              surname:
 *                  type: string
 *                  description: surname of the user
 *              email:
 *                  type: string
 *                  description: email of the user
 *              password:
 *                   type: string
 *                   description: password of the user
 *          example:
 *               id: 618079b85d2c569cdb312cfd
 *               name: Gino
 *               surname: Bello
 *               email: gino@bello.com
 *               password: $2b$12$OD/T4LopBSbV1g.dsRMnN.8/WAxS2R2wLL7SQi/8pO4jFCWpdfUT6 
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: auth api
 */

/**
 * @swagger
 * /auth/signup:
 *  post:
 *      security: 
 *          ApiKeyAuth: []
 *      summary: creates new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: user created succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: bad request
 */
router.post('/signup', authController.signupUser)

/**
 * @swagger
 * /auth/login:
 *  post:
 *      security: 
 *          ApiKeyAuth: []
 *      summary: logs in the user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: user logged in succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: bad request
 */
router.post('/login', authController.loginUser)


module.exports = router
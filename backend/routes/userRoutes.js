const router = require('express').Router()
const userController = require('../controllers/userController')
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
 *  name: User
 *  description: user api
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: returns the list of all the users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: list of the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get('/', authController.accessUser, authController.restricTo('admin'), userController.getUsers)

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: returns the user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      responses:
 *          200:
 *              description: user by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: user not found
 */
router.get('/:id', authController.accessUser, userController.getUser);

/**
 * @swagger
 * /users/update{id}:
 *  patch:
 *      summary: update user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      responses:
 *          200:
 *              description: update user by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.patch('/update/:id', authController.accessUser, userController.updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *  delete:
 *      summary: deletes the user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: user id
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: user by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: user not found
 */
router.delete('/delete/:id', authController.accessUser, userController.deleteUser);

module.exports = router

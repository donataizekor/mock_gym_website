const router = require('express').Router()
const trainerController = require('../controllers/trainerController')
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
 *      Trainer:
 *          type: object
 *          required: 
 *              - name
 *              - surname
 *              - dob
 *          properties: 
 *              id:
 *                  type: string
 *                  description: auto generated id for the trainer
 *              surname:
 *                  type: string
 *                  description: surname of the trainer
 *              dob:
 *                   type: string
 *                   description: dob of the trainer
 *          example:
 *               id: 618042b12c6e601ceb1319f2
 *               name: Gino
 *               surname: Bello
 *               dob: 1980-01-01 
 */ 


/**
 * @swagger
 * tags:
 *  name: Trainer
 *  description: trainer api
 */

/**
 * @swagger
 * /trainers:
 *  get:
 *      summary: returns the list of all the trainers
 *      tags: [Trainer]
 *      responses:
 *          200:
 *              description: list of the trainers
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Trainer'
 */
router.get('/', trainerController.getTrainers)

/**
 * @swagger
 * /trainers/new:
 *  post:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: creates new trainers
 *      tags: [Trainer]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Trainer'
 *      responses:
 *          200:
 *              description: trainer created succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Trainer'
 *          400:
 *              description: bad request
 */
router.post('/new', authController.accessUser, authController.restricTo('admin'), trainerController.createTrainer)

/**
 * @swagger
 * /trainers/{id}:
 *  get:
 *      summary: returns the trainer by id
 *      tags: [Trainer]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: trainers id
 *      responses:
 *          201:
 *              description: trainers by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Trainer'
 *          404:
 *              description: trainer not found
 */
router.get('/:id', trainerController.getTrainer);

/**
 * @swagger
 * /trainers/{id}:
 *  patch:
 *      summary: returns trainers by id
 *      tags: [Trainer]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: trainers id
 *      responses:
 *          200:
 *              description: update trainer by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Trainer'
 */
router.patch('/update/:id', authController.accessUser, authController.restricTo('admin'), trainerController.updateTrainer);

/**
 * @swagger
 * /trainer/delete/{id}:
 *  delete:
 *      summary: deletes the trainer by id
 *      tags: [Trainer]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: trainer id
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Trainer'
 *      responses:
 *          200:
 *              description: trainer by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Trainer'
 *          404:
 *              description: trainer not found
 */
router.delete('/delete/:id', authController.accessUser, authController.restricTo('admin'), trainerController.deleteTrainer);

module.exports = router
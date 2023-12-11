const router = require('express').Router()
const inductionFormController = require('../controllers/inductionFormController')
const authController = require('../controllers/authController')

/**
 * @swagger
 * components:    
 *  schemas:
 *      InductionForm:
 *          type: object
 *          required: 
 *              - name
 *              - email
 *              - message
 *          properties: 
 *              id:
 *                  type: string
 *                  description: auto generated id for the induction form
 *              name:
 *                  type: string
 *                  description: name of the user completing the form
 *              email:
 *                   type: string
 *                   description: email of the user completing the form
 *              message:
 *                   type: string
 *                   description: message of the user completing the form
 *          example:
 *               id: 61804c310330e58c2d2dd5ff
 *               name: Filomena
 *               email: filomena@mail.com
 *               message: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
 */ 


/**
 * @swagger
 * tags:
 *  name: Induction Form
 *  description: induction form api
 */

/**
 * @swagger
 * /induction-forms:
 *  get:
 *      summary: returns the list of all the induction forms
 *      tags: [Induction Form]
 *      responses:
 *          200:
 *              description: list of the induction forms
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/InductionForm'
 */
router.get('/', authController.accessUser, authController.restricTo('admin'), inductionFormController.getInductionForms)

/**
 * @swagger
 * /induction-forms/new:
 *  post:
 *      summary: creates new induction form
 *      tags: [Induction Form]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/InductionForm'
 *      responses:
 *          200:
 *              description: induction form created succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/InductionForm'
 *          400:
 *              description: bad request
 */
router.post('/new', inductionFormController.createInductionForm)

/**
 * @swagger
 * /induction-forms/{id}:
 *  get:
 *      summary: returns the course by id
 *      tags: [Induction Form]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: induction form id
 *      responses:
 *          200:
 *              description: induction form by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/InductionForm'
 *          404:
 *              description: form not found
 */
router.get('/:id', authController.accessUser, authController.restricTo('admin'), inductionFormController.getInductionForm);

/**
 * @swagger
 * /induction-forms/delete/{id}:
 *  delete:
 *      summary: deletes the induction form by id
 *      tags: [Induction Form]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: induction form id
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/InductionForm'
 *      responses:
 *          200:
 *              description: induction form by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/InducionForm'
 *          404:
 *              description: form not found
 */
router.delete('/delete/:id', authController.accessUser, authController.restricTo('admin'), inductionFormController.deleteInductionForm);

module.exports = router
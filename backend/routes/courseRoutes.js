const router = require('express').Router()
const courseController = require('../controllers/courseController')
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
 *      Course:
 *          type: object
 *          required: 
 *              - name
 *              - description
 *              - duration
 *              - trainer
 *          properties: 
 *              id:
 *                  type: string
 *                  description: auto generated id for the course
 *              name:
 *                  type: string
 *                  description: name of the course
 *              description:
 *                   type: string
 *                   description: description of the course
 *              duration:
 *                   type: string
 *                   description: duration of the course
 *              trainer:
 *                   type: string
 *                   description: trainer of the course
 *          example:
 *               id: 618fe82e7476f041f0baf581
 *               name: Spin Cycle
 *               description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo
 *               duration: 30
 *               trainer: Dina   
 */ 


/**
 * @swagger
 * tags:
 *  name: Course
 *  description: course api
 */

/**
 * @swagger
 * /courses:
 *  get:
 *      summary: returns the list of all the courses
 *      tags: [Course]
 *      responses:
 *          200:
 *              description: list of the courses
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Course'
 */
router.get('/', courseController.getCourses)

/**
 * @swagger
 * /courses/new:
 *  post:
 *      security: 
 *          ApiKeyAuth: []
 *      summary: creates new course
 *      tags: [Course]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *      responses:
 *          201:
 *              description: course created succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          400:
 *              description: bad request
 */
router.post('/new', authController.accessUser, authController.restricTo('admin'), courseController.createCourse)

/**
 * @swagger
 * /courses/{id}:
 *  get:
 *      summary: returns the course by id
 *      tags: [Course]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: course id
 *      responses:
 *          200:
 *              description: course by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Course'
 *          404:
 *              description: course not found
 */
router.get('/:id', courseController.getCourse);

/**
 * @swagger
 * /courses/update{id}:
 *  patch:
 *      summary: update course by id
 *      tags: [Course]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: course id
 *      responses:
 *          200:
 *              description: lupdate course by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Course'
 */
router.patch('/update/:id', authController.accessUser, authController.restricTo('admin'), courseController.updateCourse);

/**
 * @swagger
 * /courses/delete/{id}:
 *  delete:
 *      summary: deletes the course by id
 *      tags: [Course]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: course id
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *      responses:
 *          200:
 *              description: course by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Course'
 *          404:
 *              description: course not found
 */
router.delete('/delete/:id', authController.accessUser, authController.restricTo('admin'), courseController.deleteCourse);

module.exports = router
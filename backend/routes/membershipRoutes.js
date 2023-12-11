const router = require('express').Router()
const membershipController = require('../controllers/membershipController')
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
 *      Membership:
 *          type: object
 *          required: 
 *              - name
 *              - description
 *              - price
 *          properties: 
 *              id:
 *                  type: string
 *                  description: auto generated id for the membership
 *              name:
 *                  type: string
 *                  description: name of the membership
 *              description:
 *                   type: string
 *                   description: description of the membership
 *              price:
 *                   type: string
 *                   description: price of the membership
 *          example:
 *               id: 618fe82e7476f041f0baf581
 *               name: basic
 *               description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo
 *               price: 10   
 */ 


/**
 * @swagger
 * tags:
 *  name: Membership
 *  description: membership api
 */

/**
 * @swagger
 * /memberships:
 *  get:
 *      summary: returns the list of all the memberships
 *      tags: [Membership]
 *      responses:
 *          200:
 *              description: list of the memberships
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Membership'
 */
router.get('/', membershipController.getMemberships)

/**
 * @swagger
 * /memberships/new:
 *  post:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: creates new membership
 *      tags: [Membership]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Membership'
 *      responses:
 *          200:
 *              description: membership created succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Membership'
 *          400:
 *              description: bad request
 */
router.post('/new', authController.accessUser, authController.restricTo('admin'), membershipController.createMembership)

/**
 * @swagger
 * /memberships/{id}:
 *  get:
 *      summary: returns the membership by id
 *      tags: [Membership]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: membership id
 *      responses:
 *          201:
 *              description: membership by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Membership'
 *          404:
 *              description: memberships not found
 */
router.get('/:id', membershipController.getMembership);

/**
 * @swagger
 * /memberships/update{id}:
 *  patch:
 *      summary: update memberships by id
 *      tags: [Membership]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: memberships id
 *      responses:
 *          200:
 *              description: list of the memberships
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Memberhips'
 */
router.patch('/update/:id', authController.accessUser, authController.restricTo('admin'), membershipController.updateMembership);

/**
 * @swagger
 * /memberships/delete/{id}:
 *  delete:
 *      summary: deletes the memberships by id
 *      tags: [Membership]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: memberships id
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Membership'
 *      responses:
 *          200:
 *              description: memberships by id
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Membership'
 *          404:
 *              description: memberships not found
 */
router.delete('/delete/:id', authController.accessUser, authController.restricTo('admin'), membershipController.deleteMembership);

module.exports = router
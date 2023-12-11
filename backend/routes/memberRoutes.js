const router = require('express').Router()
const memberController = require('../controllers/memberController')
const authController = require('../controllers/authController')


router.get('/', authController.accessUser, authController.restricTo('admin'), memberController.getMembers)
router.post('/new', memberController.createMember)
router.get('/:id', memberController.getMember);
router.patch('/update/:id', authController.accessUser, authController.restricTo('admin'), memberController.updateMember);
router.delete('/delete/:id', authController.accessUser, authController.restricTo('admin'), memberController.deleteMember);

module.exports = router
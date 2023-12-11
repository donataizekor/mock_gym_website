const router = require('express').Router()
const membershipFormController = require('../controllers/membershipFormController')
const authController = require('../controllers/authController')


router.get('/', authController.accessUser, authController.restricTo('admin'), membershipFormController.getMembershipForms)
router.post('/new', membershipFormController.createMembershipForm)
router.get('/:id', membershipFormController.getMembershipForm);
router.patch('/update/:id', authController.accessUser, authController.restricTo('admin'), membershipFormController.updateMembershipForm);
router.delete('/delete/:id', authController.accessUser, authController.restricTo('admin'), membershipFormController.deleteMembershipForm);

module.exports = router
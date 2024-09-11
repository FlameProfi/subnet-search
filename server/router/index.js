const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');

router.get('/refresh', userController.refresh);
router.get('/params/:ip/:subnet', userController.getParams);

module.exports = router

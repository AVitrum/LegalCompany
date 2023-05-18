const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const RequestController = require('./controllers/RequestController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', UserController.profile);
router.post('/logout', UserController.logout);

router.post('/application', RequestController.create);
router.get('/application', RequestController.getAll);
router.put('/application', RequestController.update);
router.get('/application/:id', RequestController.getById);
router.delete('/application/:id', RequestController.deleteById);

module.exports = router;

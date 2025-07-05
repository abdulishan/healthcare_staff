const express = require('express');
const router = express.Router();
const UserController = require('../controllers/patient.contorller');
const authMiddleware = require('../middlewares/jwtAuth.middleware');

router.post('/signin', UserController.authLogin);
router.post('/signup', UserController.authSignup);
router.put('/profileUpdate', authMiddleware, UserController.updateProfile);
router.get('/patientByEmail/:email', authMiddleware, UserController.getDetailByEmailId);
router.get('/getAllPetients', authMiddleware, UserController.allPatientLists);

module.exports = router;
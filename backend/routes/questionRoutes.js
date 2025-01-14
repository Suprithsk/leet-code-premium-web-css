const express = require('express');
const router = express.Router();
const questionController=require('../controllers/questionController');

router.get('/getQuestionsByParams',questionController.getQuestionsByParams);
router.get('/getAllCompanies',questionController.getAllCompanies);

module.exports = router;
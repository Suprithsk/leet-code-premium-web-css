const express=require('express');
const router=express.Router();

const solvedQuestionController=require('../controllers/solvedQuestionController');

router.post('/addSolvedQuestion',solvedQuestionController.createSolvedQuestion);
router.get('/isSolvedByUser/:questionId',solvedQuestionController.checkIfSolved);
router.delete('/removeSolvedQuestion/:questionId',solvedQuestionController.removeSolvedQuestion);

module.exports=router;
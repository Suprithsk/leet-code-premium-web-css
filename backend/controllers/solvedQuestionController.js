const User = require('../models/User');

const createSolvedQuestion = async (req, res) => {
    const userId = req.user;
    try {
        const user=await User.findById(userId);
        const questionAlreadySolved=user.solved_questions.includes(req.body.questionId);
        if(questionAlreadySolved){
            return res.status(400).json({error:'Question already marked as solved'});
        }
        user.solved_questions.push(req.body.questionId);
        await user.save();
        res.status(201).json({ message: 'Question marked as solved', user });
    } catch (error) {
        console.error('Error creating solved question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const checkIfSolved = async (req, res) => {
    const userId=req.user;
    // console.log(userId);
    try {
        const user=await User.findById(userId);
        // console.log(user);
        console.log(req.params.questionId);
        const isSolved=user.solved_questions.includes(req.params.questionId);
        console.log(isSolved);
        res.status(200).json({isSolved});
    } catch (error) {
        console.error('Error checking if solved:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const removeSolvedQuestion = async (req, res) => {
    const userId = req.user;
    try {
        const user = await User.findById(userId);
        user.solved_questions = user.solved_questions.filter(
            (questionId) => questionId != req.params.questionId
        );
        await user.save();
        res.status(200).json({ message: 'Question removed from solved', user });
    }
    catch (error) {
        console.error('Error removing solved question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { createSolvedQuestion, checkIfSolved, removeSolvedQuestion };
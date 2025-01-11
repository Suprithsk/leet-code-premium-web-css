const Question = require('../models/Question');

exports.getQuestionsByParams = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit; 

    try {
        const query = {};
        const companies=req.query.companies?req.query.companies.split(','):null;

        if (req.query.difficulty) query.Difficulty = req.query.difficulty;
        if (req.query.searchTerm) query.Title = { $regex: req.query.searchTerm, $options: 'i' };
        if (req.query.companies) query.asked_by = { $all: companies };

        const questions = await Question.find(query).skip(skip).limit(limit);
        const totalQuestions = await Question.countDocuments(query);
        const totalPages = Math.ceil(totalQuestions / limit);

        return res.json({
            totalQuestions,
            totalPages,
            currentPage: page,
            pageSize: limit,
            questions,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Question.distinct('asked_by');
        return res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
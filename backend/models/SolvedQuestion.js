const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SolvedQuestionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    solved_questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        }
    ]
});

module.exports = mongoose.model('SolvedQuestion', SolvedQuestionSchema);
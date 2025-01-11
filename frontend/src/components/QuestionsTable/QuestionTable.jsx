import QuestionCard from "../QuestionCard/QuestionCard"
import styles from './QuestionTable.module.css';
import PropTypes from 'prop-types'


function QuestionTable({questionsList}) {

    return (
        <div className={styles.questions_table}>
            {questionsList.map((question) => (
                <QuestionCard key={question._id} question={question}/>
            ))}
        </div>
    )
}

QuestionTable.propTypes = {
    questionsList: PropTypes.array.isRequired
};

export default QuestionTable
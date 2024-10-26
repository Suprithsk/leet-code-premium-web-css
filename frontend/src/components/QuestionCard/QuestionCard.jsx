import styles from './QuestionCard.module.css';
import PropTypes from 'prop-types';

const QuestionCard = ({ question }) => {
    const solveClickHandler = () => {
        window.open(question['Leetcode Question Link'], '_blank');
    }
    return (
        <div className={styles.question_card}>
            <div className={styles.upper_div}>
                <div className={styles.title_div}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> */}
                    <h2>{question.Title}</h2>
                </div>
                {question.Difficulty == 'Easy' && <div className={styles.difficulty_div_easy}>Easy</div>}
                {question.Difficulty == 'Hard' && <div className={styles.difficulty_div_hard}>
                    Hard
                </div>}
                {question.Difficulty == 'Medium' && <div className={styles.difficulty_div_medium}>
                    Medium
                </div>}
            </div>
            <div className={styles.company_filter_div}>
                <div className={styles.company_div} >
                    {`name`}
                </div>
                <div className={styles.company_div} >
                    {`name`}
                </div>
            </div>
            <div className={styles.lower_div}>
                <div className={styles.input_select}>
                    <select id="difficultySelect" >
                        <option value="notsolved">Not solved</option>
                        <option value="solved">Solved</option>
                    </select>
                </div>
                <button className={styles.input_btn} onClick={solveClickHandler}>Solve</button>
            </div>
        </div>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired
};
export default QuestionCard;
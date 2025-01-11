import styles from "./QuestionCard.module.css";
import PropTypes from "prop-types";
import CompaniesModal from "../../pages/CompaniesModal/CompaniesModal";
import { useState } from "react";
import { useEffect } from "react";
import { isSolvedByUser, addSolvedQuestion, removeSolvedQuestion } from "../../apis/solvedQuestionService";
const QuestionCard = ({ question }) => {
    const token = localStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const [selectTerm, setSelectTerm] = useState("");
    useEffect(() => {
        async function fetchData() {
            if (token) {
                console.log("token first use effect", token);
                const isSolved = await isSolvedByUser(question._id);
                if (isSolved.isSolved) {
                    setSelectTerm("solved");
                }else{
                    setSelectTerm("notsolved");
                }
            }
        }
        fetchData();
    }, []);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const solveClickHandler = () => {
        window.open(question["Leetcode Question Link"], "_blank");
    };
    useEffect(() => {
        async function updateSolvedQuestion() {
            if(selectTerm===""){
                return
            }
            console.log("selectTerm caleed", selectTerm);
            if (!token) {
                return;
            }
            try {
                if (selectTerm === "notsolved") {
                    await removeSolvedQuestion(question._id);
                    return;
                }
                const res = await addSolvedQuestion(question._id);
                console.log(res);
            } catch (error) {
                console.error("Error updating solved question:", error);
                throw error;
            }
        }
        updateSolvedQuestion();
    }, [selectTerm]);
    const selectChangeHandler = (e) => {
        
       setSelectTerm(e.target.value);
        
    }
    return (
        <>
            <div className={styles.question_card}>
                <div className={styles.upper_div}>
                    <div className={styles.title_div}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> */}
                        <h2>{question.Title}</h2>
                    </div>
                    {question.Difficulty == "Easy" && (
                        <div className={styles.difficulty_div_easy}>Easy</div>
                    )}
                    {question.Difficulty == "Hard" && (
                        <div className={styles.difficulty_div_hard}>Hard</div>
                    )}
                    {question.Difficulty == "Medium" && (
                        <div className={styles.difficulty_div_medium}>
                            Medium
                        </div>
                    )}
                </div>
                <div className={styles.company_filter_div}>
                    <div className={styles.company_div}>
                        {question.asked_by[0]}
                    </div>
                    {question.asked_by.length > 1 && (
                        <div className={styles.company_div}>
                            {question.asked_by[1]}
                        </div>
                    )}
                    {question.asked_by.length > 2 && (
                        <div className={styles.company_plus_div} onClick={handleOpenModal}>
                            +{question.asked_by.length - 2}
                        </div>
                    )}
                </div>
                <div className={styles.lower_div}>
                    <div className={styles.input_select}>
                        <select value={selectTerm} onChange={selectChangeHandler} className={selectTerm==="solved"?styles.solved:styles.not_solved} id="difficultySelect" disabled={!token} title={token ? null : "Sign in to solve"} >
                            <option value="">Select</option>
                            <option value="notsolved">Not solved</option>
                            <option value="solved" >Solved</option>
                        </select>
                    </div>
                    <button
                        className={styles.input_btn}
                        onClick={solveClickHandler}
                    >
                        Solve
                    </button>
                </div>
            </div>
            <CompaniesModal
                show={showModal}
                onClose={handleCloseModal}
                companies={question.asked_by}
            />
        </>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
};
export default QuestionCard;

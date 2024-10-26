import styles from './Filter.module.css'
import PropTypes from 'prop-types'

function Filter({ propsResetHandler, searchTerm, propsSetSearchTerm, selectTerm, propsSetSelectTerm, propsSetIsSearchClicked }) {
    const onInputChangeHandler = (e) => {
        propsSetSearchTerm(e.target.value)
    }
    const onSelectChangeHandler = (e) => {
        propsSetSelectTerm(e.target.value)
    }
    const searchClickHandler = () => {
        propsSetIsSearchClicked(true)
    }
    const resetClickHandler = () => {
        propsResetHandler()
    }
    return (
        <div className={styles.filter_div}>
            <div className={styles.input_filter}>
                <input type="text" value={searchTerm} placeholder="Search for problems" onChange={onInputChangeHandler} />
                <button onClick={searchClickHandler} className={styles.search_btn}>Search</button>
                <button className={styles.reset_btn} onClick={resetClickHandler}>Reset</button>
            </div>
            <div className={styles.input_select}>
                <label htmlFor="difficultySelect">Difficulty: </label>
                <select id="difficultySelect" value={selectTerm} onChange={onSelectChangeHandler} >
                    <option value="all">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        </div>
    )
}

Filter.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    propsSetSearchTerm: PropTypes.func.isRequired,
    selectTerm: PropTypes.string.isRequired,
    propsSetSelectTerm: PropTypes.func.isRequired,
    propsSetIsSearchClicked: PropTypes.func.isRequired,
    propsResetHandler: PropTypes.func.isRequired
};

export default Filter
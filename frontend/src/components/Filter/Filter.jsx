import { useEffect } from 'react'
import styles from './Filter.module.css'
import PropTypes from 'prop-types'

function Filter({ propsResetHandler, searchTerm, propsSetSearchTerm, selectTerm, propsSetSelectTerm, propsSetCurrentPage,propsSetDebouncedSearchTerm }) {
    const onInputChangeHandler = (e) => {
        propsSetSearchTerm(e.target.value)
    }
    const onSelectChangeHandler = (e) => {
        propsSetSelectTerm(e.target.value)
        propsSetCurrentPage(1)
    }
    
    const resetClickHandler = () => {
        propsResetHandler()
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            propsSetDebouncedSearchTerm(searchTerm)
            propsSetCurrentPage(1)
        }, 600)
        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm, propsSetDebouncedSearchTerm, propsSetCurrentPage])
    return (
        <div className={styles.filter_div}>
            <div className={styles.input_filter}>
                <input type="text" value={searchTerm} placeholder="Search for problems" onChange={onInputChangeHandler} />
                <button className={styles.reset_btn} onClick={resetClickHandler}>Reset</button>
            </div>
            <div className={styles.input_select}>
                <label htmlFor="difficultySelect">Difficulty: </label>
                <select id="difficultySelect" value={selectTerm} onChange={onSelectChangeHandler} >
                    <option value="all">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
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
    propsResetHandler: PropTypes.func.isRequired,
    propsSetCurrentPage: PropTypes.func.isRequired,
    propsSetDebouncedSearchTerm: PropTypes.func.isRequired
};

export default Filter
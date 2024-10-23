import styles from './Filter.module.css'

function Filter() {
  return (
    <div className={styles.filter_div}>
        <div className={styles.input_filter}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> */}
            <input type="text" placeholder="Search for problems" />
            <button>Search</button>
        </div>
        <div className={styles.input_select}>
            <select>
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    </div>
  )
}

export default Filter
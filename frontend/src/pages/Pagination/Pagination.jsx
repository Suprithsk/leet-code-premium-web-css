import styles from "./Pagination.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
function Pagination({totalPages,itemsPerPage,propsSetItemsPerPage, currentPage,onPageChange }) {

    const [pageNumber, setPageNumber] = useState(currentPage);
    const pageNumberChange = () => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    }
    return (
        <div className={styles.pagination}>
            <div className={styles.itemsPerPage}>
                <p>Items per page:</p>
                <select value={itemsPerPage} onChange={(e) => propsSetItemsPerPage(e.target.value)}>
                    <option>10</option>
                    <option>20</option>
                </select>
            </div>
            <div className={styles.pageNavigation}>
                <div className={styles.goToPage}>
                    <p>Go to page:</p>
                    <input type="number" min={1} placeholder="1" value={pageNumber} onChange={(e)=>setPageNumber(e.target.value)} />
                    <button className={styles.btn_apply} onClick={pageNumberChange}>Apply</button>
                </div>
                <div className={styles.pageButtons}>
                    <button disabled={currentPage == 1 ? true : false}
                        onClick={()=>onPageChange(1)}
                    >
                        First
                    </button>
                    <button disabled={currentPage == 1 ? true : false}
                        onClick={() => {
                            if (currentPage > 1) {
                                onPageChange(currentPage - 1);
                            }
                        }}
                    >
                        Previous
                    </button>
                    <p>
                        {currentPage}/{totalPages}
                    </p>
                    <button
                        disabled={currentPage == totalPages ? true : false}
                        onClick={() => {
                            if (currentPage < totalPages) {
                                onPageChange(currentPage + 1);
                            }
                        }}
                    >
                        Next
                    </button>
                    <button
                        disabled={currentPage == totalPages ? true : false}
                        onClick={() => onPageChange(totalPages)}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    propsSetItemsPerPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
export default Pagination;

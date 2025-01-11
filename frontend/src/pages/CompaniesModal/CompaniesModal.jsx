import PropTypes from "prop-types";
import styles  from "./CompaniesModal.module.css";

function CompaniesModal({ show, onClose, companies }) {
    if (!show) return null;

  return (
    <div className={styles['modal-backdrop']} onClick={onClose}>
      <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
        <button className= {styles["modal-close"]}onClick={onClose}>×</button>
        <h2>Company List</h2>
        
        <div className={styles["modal-list"]}>
          {companies.map((company) => (
            <div key={company} className={styles["modal-item"]}>
              <h3>{company}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CompaniesModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired,
};

export default CompaniesModal;

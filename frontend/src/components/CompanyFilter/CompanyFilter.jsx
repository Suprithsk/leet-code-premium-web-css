/* eslint-disable react/prop-types */
import styles from "./CompanyFilter.module.css";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

function CompanyFilter({ companies, propSetCompanies, propsSetCurrentPage, unChangedCompanies,propsSetUnchangedCompanies }) {
    console.log("CompanyFilter");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const pageSize = 25;
    const totalPages = Math.ceil(companies.length / pageSize);

    useEffect(() => {
        setCurrentPage(1);
        propSetCompanies(unChangedCompanies.filter((company) => {
            return company.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 600);
        return () => {
            clearTimeout(timer);
        };
    }, [ searchTerm, debouncedSearchTerm]);
    const paginatedCompanies = companies.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleCompanyClick = (name) => {
        propsSetCurrentPage(1);
        const newCompanies = companies.map((company) => {
            if (company.name === name) {
                return {
                    ...company,
                    isSelected: !company.isSelected,
                };
            }
            return company;
        });
        const newUnChangedCompanies = unChangedCompanies.map((company) => {
            if (company.name === name) {
                return {
                    ...company,
                    isSelected: !company.isSelected,
                };
            }
            return company;
        });
        propsSetUnchangedCompanies(newUnChangedCompanies);
        propSetCompanies(newCompanies);

    };
    const searchTermHandler = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className={styles.companies_full_div}>
            <div className={styles.input_filter}>
                <input
                    type="text"
                    placeholder="Search for companies"
                    value={searchTerm}
                    onChange={searchTermHandler}
                />
            </div>

            <div className={styles.company_filter_div}>
                {paginatedCompanies.map((company) => (
                    <div
                        className={`${styles.company_div} ${
                            company.isSelected ? styles.selected : ""
                        }`}
                        key={company.name}
                        onClick={() => handleCompanyClick(company.name)}
                    >
                        {company.name}
                        {company.isSelected && (
                            <X size={20} className={styles.selected_icon} />
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.selected_companies_div}>
                <p>
                    {companies.filter((company) => company.isSelected).length >
                        0 && "Selected companies: "}
                    {companies
                        .filter((company) => company.isSelected)
                        .map((company) => company.name)
                        .join(", ")}
                </p>
            </div>

            <div className={styles.pageNavigation}>
                <div className={styles.pageButtons}>
                    <button
                        disabled={currentPage == 1 ? true : false}
                        onClick={() => handlePageChange(1)}
                    >
                        First
                    </button>
                    <button
                        disabled={currentPage == 1 ? true : false}
                        onClick={() => {
                            if (currentPage > 1) {
                                handlePageChange(currentPage - 1);
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
                                handlePageChange(currentPage + 1);
                            }
                        }}
                    >
                        Next
                    </button>
                    <button
                        disabled={currentPage == totalPages ? true : false}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompanyFilter;

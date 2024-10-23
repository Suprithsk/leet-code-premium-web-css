import styles from './CompanyFilter.module.css'
import { useState } from 'react'

function CompanyFilter() {
    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: 'amazon',
            isSelected: false
        },
        {
            id: 2,
            name: 'apple',
            isSelected: false
        },
        {
            id: 3,
            name: 'google',
            isSelected: false
        },
        {
            id: 4,
            name: 'microsoft',
            isSelected: false
        },
        {
            id: 5,
            name: 'facebook',
            isSelected: false
        },
        {
            id: 6,
            name: 'netflix',
            isSelected: false
        }
    ])

    const handleCompanyClick = (id) => {
        const newCompanies = companies.map(company => company.id === id ? { ...company, isSelected: !company.isSelected } : company)
        setCompanies(newCompanies)
    }
    return (
        <div className={styles.companies_full_div}>
            <div className={styles.input_filter}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> */}
                <input type="text" placeholder="Search for problems" />
                <button>Search</button>
            </div>
            <div className={styles.company_filter_div}>
                {companies.map(company => (
                    <div className={`${styles.company_div} ${company.isSelected ? styles.selected : ''}`} key={company.id} onClick={() => {
                        handleCompanyClick(company.id)
                    }}>
                        {company.name}
                        {company.isSelected && <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x ml-1 h-3 w-3"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompanyFilter

import GradientDiv from '../../pages/GradientDiv/GradientDiv'
import CompanyFilter from '../CompanyFilter/CompanyFilter'
import Filter from '../Filter/Filter'
import styles from './HomePage.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import questions from '../../mock_data/questions'
import QuestionTable from '../QuestionsTable/QuestionTable'

function HomePage() {

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
        }, {
            id: 7,
            name: 'alation',
            isSelected: false
        }
    ])
    console.log('called hoe page')
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchClicked, setIsSearchClicked] = useState(false)
    const [selectTerm, setSelectTerm] = useState('all')
    const [questionsList, setQuestionsList] = useState(questions)
    const resetHandler = () => {
        setSearchTerm('')
        setSelectTerm('all')
        setCompanies(companies.map(company => ({ ...company, isSelected: false })))
    }
    useEffect(() => {
        console.log('searchTerm', searchTerm)
        const newQuestionsList = questions.filter((question) => {
            const filterCompaniesList = companies.filter((company) => company.isSelected)
            const mappedCompanies = filterCompaniesList.map((company) => company.name)
            const companiesCount = question.asked_by.filter((company) => mappedCompanies.includes(company)).length
            return (searchTerm !== '' ? question.Title.toLowerCase().includes(searchTerm.toLowerCase()) : true) && (selectTerm !== 'all' ? question.Difficulty.toLowerCase() === selectTerm.toLowerCase() : true) && (mappedCompanies.length > 0 ? mappedCompanies.length === companiesCount : true)
        })
        setQuestionsList(newQuestionsList)
        if (isSearchClicked) {
            setIsSearchClicked(false)
        }
        // eslint-disable-next-line
    }, [companies, isSearchClicked, selectTerm])
    return (
        <div className={styles.homepage_div}>
            <h3>Welcome, Suprith S K</h3>
            <GradientDiv />
            <Filter propsResetHandler={resetHandler} propsSetIsSearchClicked={setIsSearchClicked} searchTerm={searchTerm} propsSetSearchTerm={setSearchTerm} selectTerm={selectTerm} propsSetSelectTerm={setSelectTerm} />
            <CompanyFilter companies={companies} propSetCompanies={setCompanies} />
            <QuestionTable questionsList={questionsList} />
        </div>
    )
}

export default HomePage
import GradientDiv from "../../pages/GradientDiv/GradientDiv";
import CompanyFilter from "../CompanyFilter/CompanyFilter";
import Filter from "../Filter/Filter";
import styles from "./HomePage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QuestionTable from "../QuestionsTable/QuestionTable";
import Pagination from "../../pages/Pagination/Pagination";
import Header from "../Header/Header";

function HomePage() {
    const location = useLocation();
    const [companies, setCompanies] = useState([]);
    const [unChangedCompanies, setUnChangedCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [selectTerm, setSelectTerm] = useState("all");
    const [questionsList, setQuestionsList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const state = location.state|| null;
    const resetHandler = () => {
        setSearchTerm("");
        setSelectTerm("all");
        setCompanies(
            companies.map((company) => ({ ...company, isSelected: false }))
        );
        setCurrentPage(1);

    };
    function handlePageChange(page) {
        setCurrentPage(page);
    }
    useEffect(() => {
        
        const fetchCompanies = async () => {
            try {
                const url =
                    "http://localhost:5000/api/questions/getAllCompanies";
                const response = await fetch(url);
                const data = await response.json();
                console.log("data",data);
                setCompanies(
                    data.map((company) => ({
                        name: company,
                        isSelected: false,
                    }))
                );
                setUnChangedCompanies(
                    data.map((company) => ({
                        name: company,
                        isSelected: false,
                    })));
            } catch (err) {
                console.log(err);
            }
        };
        fetchCompanies();
    }, []);
    useEffect(() => {
        const fetchQuestions = async () => {
            const url = `http://localhost:5000/api/questions/getQuestionsByParams?searchTerm=${
                debouncedSearchTerm ? debouncedSearchTerm : ""
            }&companies=${
                companies.length > 0
                    ? companies
                          .filter((company) => company.isSelected)
                          .map((company) => company.name)
                          .join(",")
                    : ""
            }&difficulty=${
                selectTerm == "all" ? "" : selectTerm
            }&page=${currentPage}&limit=${itemsPerPage}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setQuestionsList(data.questions);
            setTotalPages(data.totalPages);
        };
        fetchQuestions();
        
        // eslint-disable-next-line
    }, [companies, , debouncedSearchTerm, selectTerm, currentPage, itemsPerPage]);

    return (
        <>
        <Header />
        <div className={styles.homepage_div}>
        {state && <h3>Welcome, {state.user.username}</h3>}
            <GradientDiv />
            <Filter
                propsResetHandler={resetHandler}
                
                searchTerm={searchTerm}
                propsSetSearchTerm={setSearchTerm}
                propsSetDebouncedSearchTerm={setDebouncedSearchTerm}
                selectTerm={selectTerm}
                propsSetSelectTerm={setSelectTerm}
                propsSetCurrentPage={setCurrentPage}
            />
            <CompanyFilter
                companies={companies}
                propSetCompanies={setCompanies}
                propsSetCurrentPage={setCurrentPage}
                unChangedCompanies={unChangedCompanies}
                propsSetUnchangedCompanies={setUnChangedCompanies}
            />
            <QuestionTable questionsList={questionsList} />
            <Pagination totalPages={totalPages} itemsPerPage={itemsPerPage} propsSetItemsPerPage={setItemsPerPage} currentPage={Number(currentPage)} onPageChange={(page)=>handlePageChange(page)}  />
        </div>
        </>
    );
}

export default HomePage;

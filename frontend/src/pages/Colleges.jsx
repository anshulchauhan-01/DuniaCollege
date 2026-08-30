import { useEffect, useState } from "react";
import CollegeCard from "../components/CollegeCard/CollegeCard";
import SearchBar from "../components/SearchBar/SearchBar";
import "./Colleges.css";

const url = import.meta.env.VITE_HOST_URL;

function Colleges() {
    const [colleges, setColleges] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

const fetchColleges = (searchValue = search, pageNumber = page) => {
    setLoading(true);

    fetch(`${url}/colleges?search=${encodeURIComponent(searchValue)}&page=${pageNumber}&limit=10`)
        .then((response) => response.json())
        .then((data) => {
            setColleges(data);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            setLoading(false);
        });
};

    useEffect(() => {
        fetchColleges("", 1);
    }, []);

    const searchColleges = (searchValue) => {
        setSearch(searchValue);
        setPage(1);
        fetchColleges(searchValue, 1);
    };

    const changePage = (newPage) => {
        setPage(newPage);
        fetchColleges(search, newPage);
    };

    return (
        <main className="colleges-page">
            <section className="hero">
                <h1>Find Your College</h1>
                <p>
                    Search and explore colleges across India.
                </p>

                <SearchBar onSearch={searchColleges} />
            </section>

            <section className="results">
                <h2>Colleges</h2>

                <div className="college-grid">
                    {loading ? (
                        <div className="spinner"></div>
                    ) : (
                        colleges.map((college) => (
                            <CollegeCard
                                key={college.id}
                                college={college}
                            />
                        ))
                    )}
                </div>

                <div className="pagination">
                    <button
                        onClick={() => changePage(page - 1)}
                        disabled={page === 1}
                    >
                        ← Previous
                    </button>

                    <span>Page {page}</span>

                    <button
                        onClick={() => changePage(page + 1)}
                    >
                        Next →
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Colleges;
{/* <div key={college.college_id}>
    <h2>{college.college_name}</h2>
    <p>{college.college_city}, {college.state}</p>
    <p>Rating: {college.rating}</p>
    </div> */
}
    {/* 
        8 <input
    //     type="text"
    //     placeholder="Search colleges..."
    //     value={search}
    //     onChange={(e) => setSearch(e.target.value)}
    // />
    // <button onClick={searchColleges}> */}
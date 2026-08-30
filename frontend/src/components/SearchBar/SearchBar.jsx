import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const url = import.meta.env.VITE_HOST_URL;

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearch(value);

        if (value.length < 2) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(`${url}/institutions?term=${encodeURIComponent(value)}`)
            .then((response) => response.json())
            .then((data) => {
                setSuggestions(data.college || []);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const selectCollege = (college) => {
        setSearch(college.college_name);
        setSuggestions([]);

        navigate(`/colleges/${college.college_id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSearch(search);
        setSuggestions([]);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search colleges..."
                value={search}
                onChange={handleSearch}
            />

            {loading && (
                <div className="spinner"></div>
            )}

            <button type="submit">
                Search
            </button>

            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((college) => (
                        <div
                            key={college.college_id}
                            onClick={() => selectCollege(college)}
                        >
                            {college.college_name}
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SearchBar;
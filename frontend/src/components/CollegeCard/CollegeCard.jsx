import { Link } from "react-router-dom";
import "./CollegeCard.css";

function CollegeCard({ college }) {
    return (
        <div className="college-card">
            <div>
                <h2>{college.name}</h2>

                <p className="location">
                    {college.city}, {college.state}
                </p>

                <p className="rating">
                    ⭐ {college.rating || "N/A"}
                </p>
            </div>
            {college.fees && (
                <p className="fees">
                    Fees: {college.fees}
                </p>
            )}

            <Link
                className="details-button"
                to={`/colleges/${college.id}`}
            >
                View Details →
            </Link>
        </div>
    );
}

export default CollegeCard;
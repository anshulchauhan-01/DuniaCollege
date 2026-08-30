import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CollegeDetails.css";

const url = import.meta.env.VITE_HOST_URL;

function CollegeDetails() {
    const { id } = useParams();
    const [college, setCollege] = useState(null);

    useEffect(() => {
        fetch(`${url}/colleges/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCollege(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

    if (!college) {
        return <p>Loading...</p>;
    }

    return (
        <div className="college-details">

            
            <div className="college-header">
                <div>
                    <h1>{college.name}</h1>
                    <p>
                        {college.city}, {college.state}
                    </p>
                </div>

                <div className="college-rating">
                    ⭐ {college.rating || "N/A"}
                </div>
            </div>

            <section className="details-section">
                <h2>Overview</h2>
                <p>
                    {college.name} is located in {college.city},{" "}
                    {college.state}.
                </p>
            </section>

            {college.fees && (
                <p>Fees: {college.fees}</p>
            )}

            <section className="details-section">
                <h2>Placements</h2>

                <div className="stats">
                    <div>
                        <span>Average Salary</span>
                        <strong>
                            {college.average_salary || "N/A"}
                        </strong>
                    </div>

                    <div>
                        <span>Highest Salary</span>
                        <strong>
                            {college.highest_salary || "N/A"}
                        </strong>
                    </div>

                    <div>
                        <span>Placement</span>
                        <strong>
                            {college.placement_percentage || "N/A"}%
                        </strong>
                    </div>
                </div>
            </section>

            <section className="details-section">
                <h2>Reviews</h2>

                <div className="stats">
                    <div>
                        <span>Overall</span>
                        <strong>{college.review_rating || "N/A"}</strong>
                    </div>

                    <div>
                        <span>Academic</span>
                        <strong>{college.academic_rating || "N/A"}</strong>
                    </div>

                    <div>
                        <span>Faculty</span>
                        <strong>{college.faculty_rating || "N/A"}</strong>
                    </div>

                    <div>
                        <span>Infrastructure</span>
                        <strong>{college.infrastructure_rating || "N/A"}</strong>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CollegeDetails;
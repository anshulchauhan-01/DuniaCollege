import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <Link className="logo" to="/">
                DuniaCollege
            </Link>

            <div className="nav-links">
                <Link to="/">Colleges</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;
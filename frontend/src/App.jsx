import Colleges from "./pages/Colleges";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CollegeDetails from "./pages/CollegeDetails";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Colleges />} />
                <Route path="/colleges/:id" element={<CollegeDetails />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
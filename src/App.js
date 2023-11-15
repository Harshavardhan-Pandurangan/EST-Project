import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectDetails from "./pages/ProjectDetails";

import "./App.css";
import CountryDetails from "./pages/CountryDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/country_stats/:country_param/:year_param/:type_param"
                    element={<CountryDetails />}
                />
                <Route path="/about" element={<ProjectDetails />} />
            </Routes>
        </Router>
    );
}

export default App;

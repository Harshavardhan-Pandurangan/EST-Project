import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectDetails from "./pages/ProjectDetails";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<ProjectDetails />} />
            </Routes>
        </Router>
    );
}

export default App;

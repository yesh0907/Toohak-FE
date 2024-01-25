import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/join/:room_id" element={<App />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

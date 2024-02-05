import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./routes/JoinRoom";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Hello !Toohak</h1>} />
                <Route path="/join/:room_id" element={<JoinRoom />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

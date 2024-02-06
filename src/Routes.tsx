import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./routes/JoinRoom";
import WaitingForNextQuestion from "./routes/WaitingForNextQuestion";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Hello !Toohak</h1>} />
                <Route path="/join/:room_id" element={<JoinRoom />} />
                <Route path="/waiting-for-next-question" element={<WaitingForNextQuestion />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

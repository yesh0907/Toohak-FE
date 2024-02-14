import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./routes/player/JoinRoom";
import WaitingForNextQuestion from "./routes/player/WaitingForNextQuestion";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Hello !Toohak</h1>} />
                <Route path="/join/:room_id" element={<JoinRoom />} />
                <Route path="/room/:room_id/waiting-for-next-question" element={<WaitingForNextQuestion />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

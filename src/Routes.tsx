import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./routes/player/JoinRoom";
import WaitingForQuiz from "./routes/host/WaitingForQuiz";
import QuizInProgress from "./routes/host/QuizInProgress";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Hello !Toohak</h1>} />
                <Route path="/join/:room_id" element={<JoinRoom />} />
                <Route path="/room/:room_id/waiting" element={<WaitingForQuiz />} />
                <Route path="/room/:room_id/in-progress" element={<QuizInProgress />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

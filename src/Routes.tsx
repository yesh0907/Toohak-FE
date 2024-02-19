import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import CreateRoom from "./routes/host/CreateRoom";
import JoinRoom from "./routes/player/JoinRoom";
import WaitingForQuiz from "./routes/host/WaitingForQuiz";
import QuizInProgress from "./routes/host/QuizInProgress";
import WaitingForNextQuestion from "./routes/player/WaitingForNextQuestion";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

// enable legend global state manager in all react components
enableReactTracking({
  auto: true,
});

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join/:room_id" element={<JoinRoom />} />
        <Route path="/room/:room_id/waiting" element={<WaitingForQuiz />} />
        <Route path="/room/:room_id/in-progress" element={<QuizInProgress />} />
        <Route path="/room/:room_id/waiting-for-next-question" element={<WaitingForNextQuestion />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

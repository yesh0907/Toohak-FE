import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./routes/JoinRoom";
import LandingPage from "./routes/LandingPage";
import CreateRoomPage from "./routes/CreateRoomPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/join/:room_id" element={<JoinRoom />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

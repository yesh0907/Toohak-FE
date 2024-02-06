import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./routes/JoinRoom";
import LandingPage from "./routes/LandingPage";
import CreateRoom from "./routes/CreateRoom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join/:room_id" element={<JoinRoom />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

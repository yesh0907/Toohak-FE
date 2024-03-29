import { Link } from "react-router-dom";
import Header from "../components/shared/Header";

function LandingPage() {
  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div>
        <p className="text-4xl">Kahoot! but better.</p>
      </div>
      <div className="flex gap-3">
        <Link
          to="/create-room"
          className="text-white text-xl rounded-lg bg-fuchsia-800 hover:bg-fuchsia-700 hover:text-gray-50 p-3"
        >
          Play
        </Link>
        <Link
          to="/build-quiz"
          className="text-white text-xl rounded-lg bg-fuchsia-800 hover:bg-fuchsia-700 hover:text-gray-50 p-3"
        >
          Build Quiz
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

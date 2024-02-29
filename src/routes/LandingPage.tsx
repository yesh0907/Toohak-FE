import { Link } from "react-router-dom";
import Header from "../components/Header";

function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div>
        <p className="text-4xl">Kahoot! but better.</p>
      </div>
      <div className="flex gap-3">
        <Link to="/create-room" className="text-white text-xl rounded-lg bg-fuchsia-800 p-3">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

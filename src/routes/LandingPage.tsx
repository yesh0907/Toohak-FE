import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-5">
      <div className="bg-purple-800 min-w-full p-5">
        <Link to="/" className="text-6xl text-white font-bold">
          !Toohak
        </Link>
      </div>
      <div>
        <p className="text-4xl">Kahoot! but better.</p>
      </div>
      <div className="flex gap-3">
        <Link
          to="/create-room"
          className="text-white text-xl rounded-2xl bg-fuchsia-800 p-2"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

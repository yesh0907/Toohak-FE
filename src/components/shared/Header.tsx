import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-purple-800 min-w-full p-5">
      <Link to="/" className="text-6xl text-white font-bold">
        !Toohak
      </Link>
    </div>
  );
}

export default Header;

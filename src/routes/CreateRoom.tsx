import { Link } from "react-router-dom";

function CreateRoom() {
  // NOTE: No backend API call implemented rn cuz it's not set up
  const handleCreateRoomClick = () => {
    console.log("Create Room Clicked");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-5">
        <div className="bg-purple-800 min-w-full p-5">
          <Link to="/" className="text-6xl text-white font-bold">
            !Toohak
          </Link>
        </div>
        <div>
          <p className="text-4xl">Host a room to start!</p>
        </div>
        <div className="flex gap-3">
          <button
            className="text-white text-xl rounded-2xl bg-fuchsia-800 p-2"
            onClick={handleCreateRoomClick}
          >
            Create Room
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateRoom;

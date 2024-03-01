import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import Header from "../../components/Header";

// get api endpoint from env
const apiEndpoint = import.meta.env.VITE_BACKEND_URL;

function CreateRoom() {
  const navigate = useNavigate();

  const handleCreateRoomClick = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/create-room`, {
        method: "POST",
        body: JSON.stringify({ hostWsId: socket.id }),
      });
      const result = await response.json();
      // check if there was an error with request
      if (response.ok) {
        // navigate to host view of waiting room
        const { roomId } = result;
        navigate(`/room/${roomId}/waiting`);
      } else {
        // throw error using error provided by endpoint
        const { error } = result;
        throw new Error(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="bg-purple-100 min-h-screen flex flex-col items-center gap-5">
        <Header />
        <div>
          <p className="text-4xl">Host a room to start!</p>
        </div>
        <div className="flex gap-3">
          <button
            className="text-white text-xl rounded-lg bg-fuchsia-800 p-3"
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

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";

function WaitingForOtherPlayers() {
    useEffect(() => {
      const showAnswer = () => {
        // change state to show answer green/red
      }
      socket.on(WS_EVENTS.SHOW_ANSWER, showAnswer);

      return () => {
        socket.off(WS_EVENTS.SHOW_ANSWER);
      }
    });
    
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-5">
        <div className="bg-purple-800 min-w-full p-5">
          <Link to="/" className="text-6xl text-white font-bold">
            !Toohak
          </Link>
        </div>
        <div className="flex gap-3">
          <>
            <h1 className="test-3x1 font-bold underline">Waiting for other players to answer...</h1>
          </>
        </div>
      </div>
    </>
  );
}

export default WaitingForOtherPlayers;

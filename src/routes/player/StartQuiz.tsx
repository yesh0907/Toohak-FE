import { Link } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";

export default function StartQuiz() {

    useEffect(() => {
        const newQuestion = () => {
            socket.emit(WS_EVENTS.RECV_QUESTION);
        }
        socket.on(WS_EVENTS.NEW_QUESTION, newQuestion);

        return () => {
            socket.off(WS_EVENTS.NEW_QUESTION);
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
            <h1 className="text-3x1 font-bold underline">Quiz starting now!</h1>
          </>
        </div>
      </div>
    </>
  );
}
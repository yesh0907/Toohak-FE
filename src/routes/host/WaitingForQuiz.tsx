import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";

export default function WaitingForQuiz() {
    const navigate = useNavigate();
    const { room_id: roomId } = useParams();
    const origin = window.location.origin;

    const [players, setPlayers] = useState<string[]>([]);

    // workaround to get test this feature without going through the whole flow
    useEffect(() => {
        socket.emit('isHost', roomId);
    }, [roomId])

    useEffect(() => {
        // handle new player event
        const handleNewPlayer = (player: string) => {
            // set state this way to avoid calling this effect again
            // see https://socket.io/how-to/use-with-react#remarks-about-the-useeffect-hook
            setPlayers(prevPlayers => [...prevPlayers, player]);
        };

        // listen for new player event
        socket.on(WS_EVENTS.NEW_PLAYER, handleNewPlayer);

        // stop listening for event when component is unmounted
        return () => {
            socket.off(WS_EVENTS.NEW_PLAYER);
        }
    }, []);

    const startQuiz = () => {
        // emit start quiz event
        socket.emit(WS_EVENTS.START_QUIZ);
        // transition to next page
        navigate(`/room/${roomId}/in-progress`);
    }

    return (
        <div className="p-2">
            <p className="text-3xl font-bold pb-4">Waiting for Quiz to start...</p>
            <p className="text-2xl">
                Go to the following link to join the quiz:&nbsp;
                <span className="font-bold">{`${origin}/join/${roomId}`}</span>
            </p>
            <div className="mt-4">
                <p className="font-bold text-xl">Current Players:</p>
                <ul className="list-disc pl-10">
                    {players.map((player, idx) => {
                        return (
                            <li key={idx}>{player}</li>
                        );
                    })}
                </ul>
            </div>
            <button
                className="bg-blue-700 hover:bg-blue-500 text-white hover:text-gray-50 p-2 rounded-lg mt-4"
                onClick={startQuiz}>
                Start Quiz!
            </button>
        </div>
    )
}

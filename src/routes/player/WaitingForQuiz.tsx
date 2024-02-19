import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";

export default function WaitingForQuizPlayer() {
    const navigate = useNavigate();
    const { room_id: roomId } = useParams();
    const origin = window.location.origin;

    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        socket.emit(WS_EVENTS.JOIN_ROOM, roomId);
    }, [roomId])

    useEffect(() => {
        // handle new player event
        const handleNewPlayer = ({ playerId }: { playerId: string }) => {
            // set state this way to avoid calling this effect again
            // see https://socket.io/how-to/use-with-react#remarks-about-the-useeffect-hook
            setPlayers(prevPlayers => [...prevPlayers, playerId]);
        };

        const startQuiz = () => {
            navigate(`/room/${roomId}/in-progress`);
        }
        
        socket.on(WS_EVENTS.START_QUIZ, startQuiz);
        socket.on(WS_EVENTS.NEW_PLAYER, handleNewPlayer);

        return () => {
            socket.off(WS_EVENTS.START_QUIZ);
            socket.off(WS_EVENTS.NEW_PLAYER);
        }
    }, [navigate, roomId]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-5">
            <div className="bg-purple-800 min-w-full p-5">
                <Link to="/" className="text-6xl text-white font-bold">
                    !Toohak
                </Link>
            </div>
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
            </div>
        </div>
    )
}
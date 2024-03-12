import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";
import Header from "../../components/shared/Header";

// get api endpoint from env
const apiEndpoint = import.meta.env.VITE_BACKEND_URL;

// api response type
interface IGetAllQuizzesRes {
  quizzes: Array<{
    _id: string;
    QuizName: string;
  }>;
}

// state data object type
interface IQuiz {
  id: string;
  name: string;
}

export default function WaitingForQuiz() {
  const navigate = useNavigate();
  const { room_id: roomId } = useParams();
  const origin = window.location.origin;
  const [players, setPlayers] = useState<string[]>([]);
  const [quizzes, setQuizzes] = useState<Array<IQuiz>>();
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [error, setError] = useState(false);

  // Host joins the websocket room for the quiz
  useEffect(() => {
    socket.emit(WS_EVENTS.JOIN_ROOM, roomId);
  }, [roomId]);

  useEffect(() => {
    // remove any previous socket event listeners
    socket.removeAllListeners();

    // handle new player event
    const handleNewPlayer = ({ playerId }: { playerId: string }) => {
      setPlayers((prevPlayers) => [...prevPlayers, playerId]);
    };

    // listen for new player event
    socket.on(WS_EVENTS.NEW_PLAYER, handleNewPlayer);

    // stop listening for event when component is unmounted
    return () => {
      socket.off(WS_EVENTS.NEW_PLAYER);
    };
  }, []);

  const startQuiz = () => {
    if (!selectedQuiz) {
      setError(true);
      return;
    }
    // emit start quiz event
    socket.emit(WS_EVENTS.START_QUIZ, roomId, selectedQuiz);
    // transition to next page
    navigate(`/room/${roomId}/in-progress`);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`${apiEndpoint}/get-all-quizzes`);
        if (!res.ok) {
          throw new Error("request failed");
        }
        const json: IGetAllQuizzesRes = await res.json();
        const { quizzes } = json;
        const processedQuizzes = new Array<IQuiz>();
        for (const quiz of quizzes) {
          if (quiz.QuizName) {
            processedQuizzes.push({ id: quiz._id, name: quiz.QuizName });
          }
        }
        setQuizzes(processedQuizzes);
      } catch (e) {
        console.error(`fetchQuizzes: ${e}`);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div className="p-2">
        <p className="text-3xl font-bold pb-4">Waiting for Quiz to start...</p>
        <p className="text-2xl">
          Go to the following link to join the quiz:&nbsp;
          <span className="font-bold">{`${origin}/join/${roomId}`}</span>
        </p>
        <div className="mt-4">
          {error && <p className="font-semibold text-lg text-red-500">Please select a quiz</p>}
          <div className="flex gap-3">
            <label htmlFor="select-quiz" className="font-bold text-xl">
              Selected Quiz:
            </label>
            <select
              name="quiz"
              id="select-quiz"
              className="rounded-lg p-1 font-normal"
              onChange={(e) => setSelectedQuiz(e.target.value)}
            >
              <option value="">Please choose a quiz</option>
              {quizzes?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold text-xl">Current Players:</p>
          <ul className="list-disc pl-10">
            {players.map((player, idx) => {
              return <li key={idx}>{player}</li>;
            })}
          </ul>
        </div>
        <button
          className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white hover:text-gray-50 p-2 rounded-lg mt-4"
          onClick={startQuiz}
        >
          Start Quiz!
        </button>
      </div>
    </div>
  );
}

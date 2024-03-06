import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";
import { state$ } from "../../state";
import Header from "../../components/shared/Header";

// generate a random number from 1-1000 and append to string 'player'
const generatePlayerId = () => `player${Math.floor(Math.random() * 1000) + 1}`;

function JoinRoom() {
  // Extract room_id from the URL
  const { room_id: roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if roomId is available before emitting the message
    if (roomId) {
      state$.roomId.set(roomId);
      // join websocket room for communication of specific events
      socket.emit(WS_EVENTS.JOIN_ROOM, roomId);
      // set playerId
      state$.player.id.set(generatePlayerId());
      // let everyone in the room know there is a new player
      socket.emit(WS_EVENTS.NEW_PLAYER, {
        roomId,
        playerId: state$.player.id.get(),
      });

      const handleNewQuestion = ({
        question,
        answers,
      }: {
        question: string;
        answers: Array<string>;
      }) => {
        // set state
        state$.quiz.question.set(question);
        state$.quiz.answers.set(answers);
        // navigate to play quiz view
        navigate(`/quiz/${roomId}`);
      };
      socket.on(WS_EVENTS.NEW_QUESTION, handleNewQuestion);

      return () => {
        socket.off(WS_EVENTS.NEW_QUESTION);
      };
    }
  }, [roomId, navigate]);

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div className="flex flex-row-reverse w-full gap-3 p-2">
        <p className="text-lg">ID: {state$.player.id.get()}</p>
        <h1 className="flex-1 text-center text-3xl font-bold">
          Get ready! The quiz will start soon
        </h1>
      </div>
    </div>
  );
}

export default JoinRoom;

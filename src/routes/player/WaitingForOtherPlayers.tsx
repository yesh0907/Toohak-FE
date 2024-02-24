import { socket } from "../../socket";
import { Link } from "react-router-dom";
import { observable } from "@legendapp/state";
import { WS_EVENTS } from "../../socket/events";
import { useObserveEffect } from "@legendapp/state/react"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"

// ShowAnswer not implemented yet (accepts bool representing correct/not)
import ShowAnswer from "./ShowAnswer"

const state$ = observable({
  player: {
    id: '',
  },
  isAnswerCorrect: false,
  waitingForOthers: true, 
  showAnswerPage: false, 
  correctAnswer: '',
  selectedAnswer: '',
});

function WaitingForOtherPlayersPage() {
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
  )
}

function WaitingForOtherPlayers() {

  enableReactTracking({ auto: true });

  useObserveEffect(() => {
    const handleShowAnswer = (data: { correctAnswer: string }) => {
      const isCorrect = state$.selectedAnswer.get() === data.correctAnswer;
      
      state$.correctAnswer.set(data.correctAnswer);
      state$.isAnswerCorrect.set(isCorrect);
      state$.waitingForOthers.set(false);
      state$.showAnswerPage.set(true);
    };

    socket.on(WS_EVENTS.SHOW_ANSWER, handleShowAnswer);

    return () => {
      socket.off(WS_EVENTS.SHOW_ANSWER, handleShowAnswer);
    };
  });

  return (
    <>
        {state$.showAnswerPage.get() ? ( // check to change page to red/green
            <ShowAnswer 
                answerCorrect={state$.isAnswerCorrect.get()}
            />
        ) : ( 
            <WaitingForOtherPlayersPage />
        )}
    </>
);
    
  
}

export default WaitingForOtherPlayers;

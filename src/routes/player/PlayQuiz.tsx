import DisplayQuestion from "../../components/player/DisplayQuestion";
import { useEffect } from "react";
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";
import { useCountdown } from "usehooks-ts";
import { state$ } from "../../state";
import ShowAnswer from "../../components/player/ShowAnswer";
import WaitingForOtherPlayers from "../../components/player/WaitingForOtherPlayers";
import WaitingForQuestion from "../../components/player/WaitingForQuestion";
import {
  observer,
  useObservable,
  useObserveEffect,
} from "@legendapp/state/react";
import Header from "../../components/Header";

// 30 seconds
const TIMER_DURATION = 30;

const PlayQuiz = observer(() => {
  // nice hook to simplify the timer logic, default interval: 1000 ms (1 second)
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: TIMER_DURATION,
  });
  const showTimer = useObservable(true);

  // send recv question event after component is mounted
  useEffect(() => {
    // let server know client is ready to answer question
    socket.emit(WS_EVENTS.RECV_QUESTION, state$.roomId.get());
  }, []);

  // Start timer logic
  useObserveEffect(() => {
    const handleStartTimer = () => {
      showTimer.set(true);
      state$.quiz.displayQuestion.set(true);
      console.log("starting timer now!");
      startCountdown();
    };

    socket.on(WS_EVENTS.START_TIMER, handleStartTimer);

    return () => {
      socket.off(WS_EVENTS.START_TIMER);
    };
  });

  // show answer
  useObserveEffect(() => {
    const handleShowAnswer = (data: { correctAnswer: string }) => {
      stopCountdown();
      showTimer.set(false);
      console.log(data);
      const isCorrect = state$.quiz.selectedAnswer.get() === data.correctAnswer;

      state$.quiz.isAnswerCorrect.set(isCorrect);
      state$.quiz.displayQuestion.set(false);
      state$.quiz.waitingForOthers.set(false);
      state$.quiz.answered.set(true);
      console.log("showing answer: " + data.correctAnswer);
      state$.quiz.correctAnswer.set(data.correctAnswer);
    };

    socket.on(WS_EVENTS.SHOW_ANSWER, handleShowAnswer);

    return () => {
      socket.off(WS_EVENTS.SHOW_ANSWER, handleShowAnswer);
    };
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div className="flex w-full p-2 justify-end">
        <p className="text-lg">ID: {state$.player.id.get()}</p>
      </div>
      <div className="flex flex-col items-center min-w-full gap-6">
        {showTimer.get() && (
          <div className="text-2xl text-center">
            <span className="font-semibold">Time Left:</span>&nbsp;{count}{" "}
            seconds
          </div>
        )}
        {state$.quiz.displayQuestion.get() && <DisplayQuestion />}
        {state$.quiz.waitingForOthers.get() && <WaitingForOtherPlayers />}
        {state$.quiz.answered.get() && !state$.quiz.waitingForOthers.get() && (
          <ShowAnswer correctAnswer={state$.quiz.correctAnswer.get()} />
        )}
        {!state$.quiz.displayQuestion.get() &&
          !state$.quiz.waitingForOthers.get() &&
          !state$.quiz.answered.get() && <WaitingForQuestion />}
      </div>
    </div>
  );
});

export default PlayQuiz;

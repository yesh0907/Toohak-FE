import { useEffect } from "react";
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";
import { useCountdown } from "usehooks-ts";
import { resetQuizState, state$ } from "../../state";
import DisplayQuestion from "../../components/player/DisplayQuestion";
import Header from "../../components/shared/Header";
import QuizCompleted from "../../components/player/QuizCompleted";
import ShowAnswer from "../../components/player/ShowAnswer";
import WaitingForOtherPlayers from "../../components/player/WaitingForOtherPlayers";
import WaitingForQuestion from "../../components/player/WaitingForQuestion";
import { observer, useObservable, useObserveEffect } from "@legendapp/state/react";

// 30 seconds
const TIMER_DURATION = 30;

const PlayQuiz = observer(() => {
  // nice hook to simplify the timer logic, default interval: 1000 ms (1 second)
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: TIMER_DURATION,
  });
  const showTimer = useObservable(true);

  // send recv question event to first question in quiz after component is mounted
  useEffect(() => {
    // let server know client is ready to answer question
    socket.emit(WS_EVENTS.RECV_QUESTION, state$.roomId.get());
  }, []);

  // Start timer logic
  useObserveEffect(() => {
    const handleStartTimer = () => {
      if (!state$.quiz.displayQuestion.get()) {
        showTimer.set(true);
        state$.quiz.displayQuestion.set(true);
        console.log("starting timer now!");
        startCountdown();
      }
    };

    socket.on(WS_EVENTS.START_TIMER, handleStartTimer);

    return () => {
      socket.off(WS_EVENTS.START_TIMER);
    };
  });

  // show answer
  useObserveEffect(() => {
    const handleShowAnswer = (correctAnswer: string) => {
      const isCorrect = state$.quiz.selectedAnswer.get() === correctAnswer;

      // stop, reset & hide timer
      stopCountdown();
      resetCountdown();
      showTimer.set(false);

      // update state
      state$.quiz.isAnswerCorrect.set(isCorrect);
      state$.quiz.displayQuestion.set(false);
      state$.quiz.waitingForOthers.set(false);
      state$.quiz.answered.set(true);
      console.log("showing answer:", correctAnswer);
      state$.quiz.correctAnswer.set(correctAnswer);

      // emit waiting for quiz event after 5 seconds of showing answer
      const waitForQuizTimeout = setTimeout(() => {
        console.log("waiting for quiz");
        socket.emit(WS_EVENTS.WAIT_FOR_QUIZ, state$.roomId.get(), state$.player.id.get());
        resetQuizState();
        clearTimeout(waitForQuizTimeout);
      }, 5000);
    };

    socket.on(WS_EVENTS.SHOW_ANSWER, handleShowAnswer);

    return () => {
      socket.off(WS_EVENTS.SHOW_ANSWER, handleShowAnswer);
    };
  });

  // get new question
  useObserveEffect(() => {
    const handleNewQuestion = ({
      question,
      answers,
    }: {
      question: string;
      answers: Array<string>;
    }) => {
      if (!state$.quiz.displayQuestion.get()) {
        // set state
        state$.quiz.question.set(question);
        state$.quiz.answers.set(answers);
        // let server know client is ready
        socket.emit(WS_EVENTS.RECV_QUESTION, state$.roomId.get());
      }
    };

    socket.on(WS_EVENTS.NEW_QUESTION, handleNewQuestion);

    return () => {
      socket.off(WS_EVENTS.NEW_QUESTION);
    };
  });

  // quiz is completed
  useObserveEffect(() => {
    const handleQuizCompleted = ({
      leaderboard,
      playerScore,
    }: {
      leaderboard: Array<[string, number]>;
      playerScore: number;
    }) => {
      state$.quiz.leaderboard.set(leaderboard);
      state$.quiz.playerFinalScore.set(playerScore);
      state$.quiz.quizCompleted.set(true);
      console.log("yay we are done with the quiz!");
    };

    socket.on(WS_EVENTS.QUIZ_COMPLETED, handleQuizCompleted);

    return () => {
      socket.off(WS_EVENTS.QUIZ_COMPLETED);
    };
  });

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div className="flex w-full p-4 justify-end">
        <p className="text-lg">ID: {state$.player.id.get()}</p>
      </div>
      <div className="flex flex-col gap-6">
        {showTimer.get() && (
          <div className="text-2xl text-center">
            <span className="font-semibold">Time Left:</span>&nbsp;{count} seconds
          </div>
        )}
        {state$.quiz.displayQuestion.get() && <DisplayQuestion />}
        {state$.quiz.waitingForOthers.get() && <WaitingForOtherPlayers />}
        {state$.quiz.answered.get() && !state$.quiz.waitingForOthers.get() && <ShowAnswer />}
        {!state$.quiz.displayQuestion.get() &&
          !state$.quiz.waitingForOthers.get() &&
          !state$.quiz.answered.get() &&
          !state$.quiz.quizCompleted && <WaitingForQuestion />}
        {state$.quiz.quizCompleted.get() && <QuizCompleted />}
      </div>
    </div>
  );
});

export default PlayQuiz;

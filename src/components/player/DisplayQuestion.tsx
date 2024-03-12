import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";
import { state$ } from "../../state";

function DisplayQuestion() {
  // Get question and answers from quiz state
  const question = state$.quiz.question.get();
  const answers = state$.quiz.answers.get();

  const handleSubmitAnswer = (answer: string) => {
    console.log(`selected answer: ${answer}`);
    state$.quiz.selectedAnswer.set(answer);
    state$.quiz.answered.set(true);
    state$.quiz.waitingForOthers.set(true);
    state$.quiz.displayQuestion.set(false);
    // send answer to BE
    socket.emit(WS_EVENTS.ANSWER_QUESTION, state$.roomId.get(), state$.player.id.get(), answer);
  };

  return (
    <div className="flex flex-col max-w-3xl gap-4">
      <h1 className="text-2xl font-bold">Question: {question}</h1>
      <div className="flex flex-col gap-2">
        {answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmitAnswer(answer)}
            className="text-lg w-full border-2 border-solid border-purple-600
                            p-2 hover:bg-purple-600 hover:text-white"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DisplayQuestion;

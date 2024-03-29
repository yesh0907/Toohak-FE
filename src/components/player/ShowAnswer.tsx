import { state$ } from "../../state";

function ShowAnswer() {
  if (state$.quiz.isAnswerCorrect.get()) {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center gap-10 bg-green-600">
        <div className="text-8xl font-thin text-gray-100">Correct!</div>
        <span className="text-3xl text-gray-100">
          You answered: {state$.quiz.correctAnswer.get()}!
        </span>
      </div>
    );
  } else {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center gap-10 bg-red-700">
        <div className="text-8xl font-thin text-gray-100">Incorrect.</div>
        <span className="text-3xl text-gray-100">
          The answer was: {state$.quiz.correctAnswer.get()}
        </span>
      </div>
    );
  }
}

export default ShowAnswer;

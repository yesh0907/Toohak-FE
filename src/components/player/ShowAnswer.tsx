import { state$ } from "../../state";

type ShowAnswerProps = {
  correctAnswer: string;
};

function ShowAnswer({ correctAnswer }: ShowAnswerProps) {
  return (
    <>
      {state$.quiz.isAnswerCorrect.get() ? (
        <>
          <div className="w-auto h-auto flex flex-col justify-center items-center p-12 rounded-3xl bg-green-600">
            <div className="text-8xl font-thin text-gray-100">Correct!</div>
          </div>
          <div>You answered: {correctAnswer}!</div>
        </>
      ) : (
        <>
          <div className="w-auto h-auto flex flex-col justify-center items-center p-12 rounded-3xl bg-red-700">
            <div className="text-8xl font-thin text-gray-100">Incorrect.</div>
          </div>
          <div className="text-3xl">The answer was: {correctAnswer}.</div>
        </>
      )}
    </>
  );
}

export default ShowAnswer;

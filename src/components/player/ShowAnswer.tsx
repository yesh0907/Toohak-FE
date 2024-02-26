import { state$ } from "../../state";

function ShowAnswer() {
  return (
    <>
      {state$.quiz.isAnswerCorrect.get() ? (
        <div className="w-auto h-auto flex flex-col justify-center items-center p-12 rounded-3xl bg-green-600">
          <div className="text-8xl font-thin text-gray-100">Correct!</div>
        </div>
      ) : (
        <div className="w-auto h-auto flex flex-col justify-center items-center p-12 rounded-3xl bg-red-700">
          <div className="text-8xl font-thin text-gray-100">Incorrect.</div>
    </>
  );
}

export default ShowAnswer;

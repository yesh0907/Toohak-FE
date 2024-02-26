import { Link } from "react-router-dom";

// DUMMY DATA
const playerScores = [
  { name: "Player 1", score: 100 },
  { name: "Player 2", score: 85 },
  { name: "Player 3", score: 70 },
];

function QuizCompleted() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between items-center gap-10">
        <h1 className="text-6xl">Quiz Completed</h1>
        <h2 className="text-3xl">Scores</h2>
        <div className="w-96 flex flex-col justify-between items-center gap-2">
          {playerScores.map((player, idx) => (
            <div
              key={idx}
              className="w-full flex justify-between text-2xl p-4 rounded-xl bg-purple-600"
            >
              <span className="text-white">{player.name}</span>
              <span className="text-white">{player.score}</span>
            </div>
          ))}
        </div>
        <Link
          to="/"
          className="bg-purple-800 p-5 rounded-3xl text-2xl text-white"
        >
          Continue to Home
        </Link>
      </div>
    </>
  );
}

export default QuizCompleted;

import { Link } from "react-router-dom";
import { state$ } from "../../state";

function QuizCompleted() {
  let leaderboard = state$.quiz.leaderboard.get(); // leaderboard of top 3 scores
  let playerScore = state$.quiz.playerFinalScore.get(); // current player's score
  let currentPlayer = state$.player.id.get();
  let playerPlaced = false; // did player place in top 3?
  // Check if the player's ID is in the leaderboard array
  console.log(leaderboard);
  if (leaderboard.some((player) => player[0] === currentPlayer)) {
    playerPlaced = true;
  }
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between items-center gap-10">
        <h1 className="text-6xl">Quiz Completed</h1>
        <h2 className="text-3xl font-semibold">Leaderboard</h2>
        <div className="w-96 flex flex-col justify-between items-center gap-2">
          {leaderboard.map((player, idx) => (
            <div
              key={idx}
              className={`w-full flex justify-between text-2xl p-4 rounded-xl ${
                player[0] === currentPlayer
                  ? "bg-yellow-600" // Gold background for the current player
                  : "bg-purple-600" // Purple background for others
              }`}
            >
              <span className="text-white">
                {player[0] === currentPlayer ? "You" : player[0]}
              </span>
              <span className="text-white">{player[1]}</span>
            </div>
          ))}
          {!playerPlaced && (
            <div className="w-full flex justify-between text-2xl p-4 rounded-xl bg-yellow-600">
              <span className="text-white">You</span>
              <span className="text-white">{playerScore}</span>
            </div>
          )}
        </div>
        <Link
          to="/"
          className="bg-purple-800 p-5 rounded-3xl text-2xl text-white"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default QuizCompleted;

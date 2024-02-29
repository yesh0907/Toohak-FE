import { Link } from "react-router-dom";
import { state$ } from "../../state";
import ScoreEntry from "./ScoreEntry";

function QuizCompleted() {
  const leaderboard = state$.quiz.leaderboard.get(); // leaderboard of top 3 scores
  const currentPlayerScore = state$.quiz.playerFinalScore.get(); // current player's score
  const currentPlayer = state$.player.id.get();
  const playerPlaced = leaderboard.some((player) => player[0] === currentPlayer); // did player place in top 3?
  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-10">
      <h1 className="text-6xl">Quiz Completed</h1>
      <h2 className="text-3xl font-semibold">Leaderboard</h2>
      <div className="w-96 flex flex-col justify-between items-center gap-2">
        {leaderboard.map((player, idx) => (
          <ScoreEntry
            key={idx}
            player={player}
            currentPlayer={currentPlayer}
            playerScore={player[1]}
          />
        ))}
        {!playerPlaced && (
          <div className="w-full flex justify-between text-2xl p-4 rounded-xl bg-yellow-600">
            <span className="text-white">You</span>
            <span className="text-white">{currentPlayerScore}</span>
          </div>
        )}
      </div>
      <Link to="/" className="bg-purple-800 p-5 rounded-3xl text-2xl text-white">
        Back to Home
      </Link>
    </div>
  );
}

export default QuizCompleted;

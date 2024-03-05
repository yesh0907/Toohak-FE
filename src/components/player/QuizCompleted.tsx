import { state$ } from "../../state";
import ScoreEntry from "./ScoreEntry";
import BackToHome from "../BackToHome";

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
            isCurrPlayer={player[0] === currentPlayer}
            playerName={player[0]}
            playerScore={player[1]}
          />
        ))}
        {!playerPlaced && (
          <ScoreEntry
            isCurrPlayer={true}
            playerName={currentPlayer}
            playerScore={currentPlayerScore}
          />
        )}
      </div>
      <BackToHome />
    </div>
  );
}

export default QuizCompleted;

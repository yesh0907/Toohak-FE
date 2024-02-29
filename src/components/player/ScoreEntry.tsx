function ScoreEntry({
  player,
  currentPlayer,
  playerScore,
}: {
  player: [string, number];
  currentPlayer: string;
  playerScore: number;
}) {
  return (
    <div
      className={`w-full flex justify-between text-2xl p-4 rounded-xl ${
        player[0] === currentPlayer
          ? "bg-yellow-600" // Gold background for the current player
          : "bg-purple-600" // Purple background for others
      }`}
    >
      <span className="text-white">{player[0] === currentPlayer ? "You" : player[0]}</span>
      <span className="text-white">{playerScore}</span>
    </div>
  );
}

export default ScoreEntry;

function ScoreEntry({
  isCurrPlayer,
  playerName,
  playerScore,
}: {
  isCurrPlayer: boolean;
  playerName: string;
  playerScore: number;
}) {
  return (
    <div
      className={`w-full flex justify-between text-2xl p-4 rounded-xl ${
        isCurrPlayer
          ? "bg-yellow-600" // Gold background for the current player
          : "bg-purple-600" // Purple background for others
      }`}
    >
      <span className="text-white">{isCurrPlayer ? "You" : playerName}</span>
      <span className="text-white">{playerScore}</span>
    </div>
  );
}

export default ScoreEntry;

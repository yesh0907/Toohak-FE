export default function WaitingForOtherPlayers() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold underline">Waiting for other players to answer</h1>
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-purple-800 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}

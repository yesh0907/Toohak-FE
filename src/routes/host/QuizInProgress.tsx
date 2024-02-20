import { useParams } from "react-router-dom";
import Header from "../../components/Header";

export default function QuizInProgress() {
  const { room_id: roomId } = useParams();
  return (
    <>
      <Header />
      <div className="p-2">
        <h1 className="text-2xl">
          <span className="font-bold">Room {roomId} Status:</span>&nbsp; Quiz In
          Progress
        </h1>
      </div>
    </>
  );
}

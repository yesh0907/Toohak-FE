import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import BackToHome from "../../components/BackToHome";

export default function QuizInProgress() {
  const { room_id: roomId } = useParams();
  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div className="p-2">
        <h1 className="text-2xl">
          <span className="font-bold">Room {roomId} Status:</span>&nbsp; Quiz In Progress
        </h1>
      </div>
      <BackToHome />
    </div>
  );
}

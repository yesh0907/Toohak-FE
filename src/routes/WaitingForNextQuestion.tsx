import { useEffect } from "react";
import { socket } from "../socket";

function WaitingForNextQuestion() {
    useEffect(() => {
        // When all players send WAITING_FOR_QUIZ and quiz is incomplete, emit "newQuestion" event
        socket.emit("newQuestion");

        // When all players send WAITING_FOR_QUIZ and quiz is complete, emit "quizCompleted" event
        socket.emit("quizCompleted");
    });

    return (
        <>
            <h1 className="text-3xl font-bold underline">Waiting for next question...</h1>
        </>
    );
}

export default WaitingForNextQuestion;

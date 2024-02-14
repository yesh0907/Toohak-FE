import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { useNavigate, useParams } from "react-router-dom"
import { observable } from "@legendapp/state";

// global state
const state$ = observable({
  player: {
    id: '',
  },
  question: '',
  answers: [],
  timer: 30,

});

function WaitingForNextQuestion() {

    const navigate = useNavigate();
    const { room_id: roomId } = useParams();
    const [waitingForNextQuestion, setWaitingForNextQuestion] = useState<boolean>(true);

    useEffect(() => {
        // handle newQuestion event to send recvQuestion event to server
        const handleNewQuestion = (data: { question: string, answers: [] }) => {

            state$.question.set(data.question);
            state$.answers.set(data.answers);

            // send WS event to server to start timer
            socket.emit('recvQuestion', roomId);
        }

        // receive next question
        socket.on("newQuestion", handleNewQuestion);
    });

    useEffect(() => {
        // handle startTimer event to display question
        const handleStartTimer = () => {
            // update page
            setWaitingForNextQuestion(false);
        }
        
        // start timer
        socket.on("startTimer", handleStartTimer);
    })

    useEffect(() => {
        // handles quiz completed event to navigate to quiz completed page
        const handleQuizCompleted = () => {
            setWaitingForNextQuestion(false);
            navigate(`/room/${roomId}/quiz-completed`);
        }

        // quiz is completed
        socket.on("quizCompleted", handleQuizCompleted);

        // stop listening for event when component is unmounted
        return () => {
            socket.off('quizCompleted');
        }
    }, [roomId]);

    return (
        <>
            {waitingForNextQuestion ? ( // if still waiting 
                <>
                    <h1 className="text-3xl font-bold underline">Waiting for next question...</h1>
                </>
            ) : ( // if received nextQuestion event 
                <>
                    <p>question: {state$.question.get()}</p>
                    <ul className="answers">
                        {Array.from(state$.answers.entries()).map(([key, answer]) => (
                            <li key={key}>
                                {answer}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

export default WaitingForNextQuestion;

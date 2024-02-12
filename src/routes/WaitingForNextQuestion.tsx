import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useNavigate, useParams } from "react-router-dom"

function WaitingForNextQuestion() {

    const navigate = useNavigate();
    const { room_id: roomId } = useParams();
    const [question, setQuestion] = useState<string>("question");
    const [answers, setAnswers] = useState<Map<string, string>>(new Map());
    const [waitingForNextQuestion, setWaitingForNextQuestion] = useState<boolean>(true);

    useEffect(() => {
        socket.emit('startQuiz', roomId);
    });

    useEffect(() => {
        // handle newQuestion event to send recvQuestion event to server
        const handleNewQuestion = (question: string, answers: Map<string, string>) => {

            setQuestion(question);
            setAnswers(answers);
            console.log("New Question: ", question, answers);

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
            navigate(`/join/${roomId}/quiz-completed`);
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
                    <p>question: {question}</p>
                    <ul className="answers">
                        {Array.from(answers.entries()).map(([key, answer]) => (
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

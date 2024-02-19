import { socket } from "../../socket";
import { useParams } from "react-router-dom";
import { observable } from "@legendapp/state";
import { useObserveEffect } from "@legendapp/state/react"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"

import DisplayQuestion from "./DisplayQuestion";

// global state
const state$ = observable({
  player: {
    id: '',
  },
  question: '',
  answers: [],
  timer: 30,
  displayQuestion: false,
});

function WaitingForNextQuestion() {

    const { room_id: roomId } = useParams();

    // Enable React components to automatically track observables and rerender on change
    enableReactTracking({ auto: true });

    useObserveEffect(() => {
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

    useObserveEffect(() => {
        // handle startTimer event to display question
        const handleStartTimer = () => {
            // update page
            state$.displayQuestion.set(true);
        }
        
        // start timer
        socket.on("startTimer", handleStartTimer);
    })

    return (
        <>
            {state$.displayQuestion.get() ? ( // if received question
                <DisplayQuestion 
                    question={state$.question.get()}
                    answers={Array.from(state$.answers.entries())}
                />
            ) : ( // still waiting for next question
                <>
                    <h1 className="text-3xl font-bold underline">Waiting for next question...</h1>
                </>
            )}
        </>
    );
}

export default WaitingForNextQuestion;

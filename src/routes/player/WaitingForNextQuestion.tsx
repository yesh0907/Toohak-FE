import { socket } from "../../socket";
import { useParams } from "react-router-dom";
import { observable } from "@legendapp/state";
import { useObserveEffect } from "@legendapp/state/react"
import { persistObservable } from "@legendapp/state/persist"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'


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

function WaitingForNextQuestionPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 min-h-screen">
        <h1 className="text-3xl text-white mb-3">Waiting for next question...</h1>
        <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
        </div>
    </div>
    )
}

function WaitingForNextQuestion() {

    const { room_id: roomId } = useParams();

    // enable React components to automatically track observables and rerender on change
    enableReactTracking({ auto: true });
    // automatically persist state$ (upon refresh, etc.)
    persistObservable(state$, {
        pluginLocal: ObservablePersistLocalStorage,
        local: "state", 
    })

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
                <WaitingForNextQuestionPage />
            )}
        </>
    );
}

export default WaitingForNextQuestion;


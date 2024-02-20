import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";
import { observable } from "@legendapp/state";
import { useObserveEffect } from "@legendapp/state/react";
import { persistObservable } from "@legendapp/state/persist";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

// global state
const state$ = observable({
  isAnswerCorrect: true,
});

function ShowAnswer() {
  // enable React components to automatically track observables and rerender on change
  enableReactTracking({ auto: true });
  // automatically persist state$ (upon refresh, etc.)
  persistObservable(state$, {
    pluginLocal: ObservablePersistLocalStorage,
    local: "state",
  });

  useObserveEffect(() => {
    // Listen for the "SHOW_ANSWER" event from the server
    socket.on(WS_EVENTS.SHOW_ANSWER, () => {
      // TODO
      // Receive correct answer from BE
      // Check if answer received from SHOW_ANSWER WS event equals selected answer

      // After 5 seconds, emit "WAITING_FOR_QUIZ" event
      setTimeout(() => {
        socket.emit(WS_EVENTS.WAIT_FOR_QUIZ);
        console.log("waiting for next question");
      }, 5000);
    });

    // Cleanup socket event listener when the component unmounts
    return () => {
      socket.off(WS_EVENTS.SHOW_ANSWER);
    };
  });

  return (
    <div className="min-h-screen min-w-full flex flex-col items-center">
      {state$.isAnswerCorrect.get() ? (
        <div className="min-h-screen min-w-full bg-green-600 flex justify-center items-center ">
          <div className="text-8xl font-thin text-gray-100">Correct!</div>
        </div>
      ) : (
        <div className="min-h-screen min-w-full bg-red-700 flex justify-center items-center ">
          <div className="text-8xl font-thin text-gray-100">Incorrect.</div>
        </div>
      )}
    </div>
  );
}

export default ShowAnswer;

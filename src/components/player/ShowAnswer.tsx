import { state$ } from "../../state";

function ShowAnswer() {    
    
    // wait 5 sec
    // emit WS(waitingforquiz)
    // navigate to WaitingForNextQuestion

    return (
        <div>
            {state$.quiz.isAnswerCorrect.get() ? 'yay you got it right' : 'boo wrong'}
        </div>
    );
}

export default ShowAnswer;

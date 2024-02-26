import { state$ } from "../../state";

function ShowAnswer() {
    return (
        <div>
            {state$.quiz.isAnswerCorrect.get() ? 'yay you got it right' : 'boo wrong'}
        </div>
    );
}

export default ShowAnswer;

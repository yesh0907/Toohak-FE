
function ShowAnswer( { answerCorrect }: {answerCorrect: boolean} ) {
    
    // wait 5 sec
    // emit WS(waitingforquiz)
    // navigate to WaitingForNextQuestion

    return (
        <div>
            {answerCorrect}
        </div>
    );
}

export default ShowAnswer;

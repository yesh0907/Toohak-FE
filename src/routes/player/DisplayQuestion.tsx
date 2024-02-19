
function DisplayQuestion({ question, answers }: { question: string; answers: [number, string][] }) {
    return (
        <div>
            <p>Question: {question}</p>
                <ul className="answers">
                    {answers.map(([key, answer]) => (
                        <li key={key}>
                            {answer}
                        </li>
                    ))}
                </ul>
        </div>
    );
}

export default DisplayQuestion;

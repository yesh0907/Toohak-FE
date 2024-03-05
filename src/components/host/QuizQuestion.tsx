import { useState } from "react";
import deleteButton from "../../assets/icons/trash-alt-svgrepo-com.svg";

export interface Question {
  question: string;
  type: "MCQ" | "TF";
  answers: string[];
  correctAnswer?: string; // Updated to store the text of the correct answer
}

interface QuizQuestionProps {
  index: number;
  question: Question;
  onUpdate: (index: number, updatedQuestion: Question) => void;
  onDelete: (index: number) => void;
}

function QuizQuestion({ index, question, onUpdate, onDelete }: QuizQuestionProps) {
  const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(question.correctAnswer);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(index, { ...question, question: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as Question["type"];
    const newCorrectAnswer = type === "TF" ? "True" : undefined;
    onUpdate(index, {
      ...question,
      type,
      answers: type === "TF" ? ["True", "False"] : ["", "", "", ""],
      correctAnswer: newCorrectAnswer,
    });
    setCorrectAnswer(newCorrectAnswer);
  };

  const handleAnswerChange = (answerIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = e.target.value;
    const answers = [...question.answers];
    // check if we need to update correctAnswer state too
    // Note: when correctAnswer is undefined, the default correct answer value is at index 0
    const correctAnswerIndex = correctAnswer ? answers.findIndex((ans) => ans === correctAnswer) : 0;
    const updateCorrectAnswer = correctAnswerIndex === answerIndex;
    // update state
    answers[answerIndex] = newAnswer;
    let newState = {
      ...question,
      answers
    };
    if (updateCorrectAnswer) {
      setCorrectAnswer(newAnswer);
      newState = {
        ...newState,
        correctAnswer: newAnswer,
      }
    }
    onUpdate(index, newState);
  };

  const handleSetCorrectAnswer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const text = e.target.value;
    console.log("Selected answer: " + text);

    // Check if the selected answer is different from the current correct answer
    if (text !== correctAnswer) {
      onUpdate(index, { ...question, correctAnswer: text });
    }

    // Update the local state for correctAnswer
    setCorrectAnswer(text);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  // Array of letters to map over for answer labels (MCQ)
  const answerLabels = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col gap-3 bg-white p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center w-10/12">
          <label className="flex gap-1 items-center w-full font-medium">
            Question:
            <input
              className="rounded-lg w-full p-1 bg-gray-100 font-normal"
              type="text"
              value={question.question}
              onChange={handleQuestionChange}
            />
          </label>
          <label className="flex gap-1 items-center font-medium">
            Type:
            <select
              className="rounded-lg p-1 bg-gray-100 font-normal"
              value={question.type}
              onChange={handleTypeChange}
            >
              <option value="MCQ">Multiple Choice</option>
              <option value="TF">True/False</option>
            </select>
          </label>
        </div>
        <button className="bg-red-700 hover:bg-red-600 p-2 rounded-lg" onClick={handleDelete}>
          <img src={deleteButton} alt="" />
        </button>
      </div>

      {question.type === "MCQ" && (
        <div className="flex flex-col gap-3 w-full">
          {question.answers.map((answer, answerIndex) => (
            <label className="flex gap-1 items-center w-full font-medium" key={answerIndex}>
              <span className="w-4">{answerLabels[answerIndex]}:</span>
              <input
                className="rounded-lg w-8/12 p-1 bg-gray-100 font-normal"
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(answerIndex, e)}
              />
            </label>
          ))}
          <label className="flex gap-1 items-center w-full font-medium">
            Correct Answer:
            <select
              className="rounded-lg p-1 bg-gray-100 font-normal"
              value={correctAnswer}
              onChange={handleSetCorrectAnswer}
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={answer}>
                  {answerLabels[index]}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {question.type === "TF" && (
        <div className="flex flex-col gap-3 w-full">
          <label className="flex gap-1 items-center w-full font-medium">
            Correct Answer:
            <select
              className="rounded-lg p-1 bg-gray-100 font-normal"
              value={correctAnswer}
              onChange={handleSetCorrectAnswer}
            >
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;

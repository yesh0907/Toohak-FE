import { useState } from "react";
import Header from "../../components/Header";
import QuizQuestion, { Question } from "../../components/host/QuizQuestion";

function BuildQuiz() {
  const [quizName, setQuizName] = useState("Untitled Quiz");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleQuizNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(e.target.value);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", type: "MCQ", answers: ["", "", "", ""] }]);
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div className="flex flex-col items-center gap-4 w-full">
        <p className="text-4xl">Build your quiz!</p>
        <label className="text-lg font-medium">
          <input
            className="rounded-lg w-full p-2"
            type="text"
            value={quizName}
            onChange={handleQuizNameChange}
          />
        </label>
        <div className="flex flex-col gap-4 w-6/12">
          {questions.map((question, index) => (
            <QuizQuestion
              key={index}
              index={index}
              question={question}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
            />
          ))}
        </div>
        <button className="text-white text-xl rounded-lg bg-fuchsia-800 p-3" onClick={addQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
}

export default BuildQuiz;

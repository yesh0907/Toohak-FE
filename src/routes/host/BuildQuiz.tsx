import { useState } from "react";
import Header from "../../components/shared/Header";
import QuizQuestion, { Question } from "../../components/host/QuizQuestion";
import addButton from "../../assets/icons/add-square-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

// get api endpoint from env
const apiEndpoint = import.meta.env.VITE_BACKEND_URL;

// used as keys for answer choices
const keys = { MCQ: ["A", "B", "C", "D"], TF: ["True", "False"] };

const createQuestion = async (question: Question) => {
  const { type } = question;
  // transforms answers from ["answer1", "answer2", ...] to {"A": "answer1", "B": "answer2"} for API to insert into DB
  const possibleAnswers = Object.fromEntries(
    question.answers.map((answer, idx) => [keys[type][idx], answer])
  );
  try {
    const res = await fetch(`${apiEndpoint}/create-question`, {
      method: "POST",
      body: JSON.stringify({
        question: question.question,
        possibleAnswers,
        correctAnswer: question.correctAnswer,
        questionType: type,
      }),
    });
    if (!res.ok) {
      throw new Error("request failed");
    }
    const json: { id: string } = await res.json();
    return json.id;
  } catch (e) {
    console.error("createQuestion:", e);
  }
};

const createQuiz = async (quizName: string, quizQuestions: Array<string>) => {
  try {
    const res = await fetch(`${apiEndpoint}/create-quiz`, {
      method: "POST",
      body: JSON.stringify({ quizName, quizQuestions }),
    });
    if (!res.ok) {
      throw new Error("request failed");
    }
    const json: { quizId: string } = await res.json();
    return json.quizId;
  } catch (e) {
    console.error("createQuestion:", e);
  }
};

function BuildQuiz() {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("Untitled Quiz");
  // Initialize questions state with one default question
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", type: "MCQ", answers: ["", "", "", ""] },
  ]);

  const handleQuizNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(e.target.value);
  };

  // add a new empty question
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

  const publishQuiz = async () => {
    // call create question endpoint for all questions in quiz and store their id
    const questionIds = await Promise.all(
      questions.map(async (question) => await createQuestion(question))
    );
    // filter out any ids that are null/undefined/empty
    const filteredQuestionIds: Array<string> = questionIds.filter((id) => id) as Array<string>;
    const quizId = await createQuiz(quizName, filteredQuestionIds);
    if (quizId) {
      // go to home page on success
      navigate("/");
    } else {
      console.error("Failed to create quiz");
    }
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
        <button
          className="text-white rounded-lg bg-fuchsia-800 hover:bg-fuchsia-700 hover:text-gray-50 p-2"
          onClick={addQuestion}
        >
          <img src={addButton} alt="" />
        </button>
        <button
          className="text-white text-xl rounded-lg bg-fuchsia-800 hover:bg-fuchsia-700 hover:text-gray-50 p-3"
          onClick={publishQuiz}
        >
          Publish Quiz
        </button>
      </div>
    </div>
  );
}

export default BuildQuiz;

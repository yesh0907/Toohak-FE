import Header from "../../components/Header";

function BuildQuiz() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-5">
      <Header />
      <div>
        <p className="text-4xl">Build your quiz!</p>
      </div>
    </div>
  );
}

export default BuildQuiz;

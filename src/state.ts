import { observable } from "@legendapp/state";

interface IQuizState {
  displayQuestion: boolean;
  question: string;
  answers: Array<string>;
  selectedAnswer: string;
  answered: boolean;
  correctAnswer: string;
  isAnswerCorrect: boolean;
  waitingForOthers: boolean;
  quizCompleted: boolean;
  leaderboard: Array<[string, number]>;
  playerFinalScore: number;
}

interface IState {
  roomId: string;
  player: {
    id: string;
  };
  quiz: IQuizState;
}

const defaultQuizState: IQuizState = {
  displayQuestion: false,
  question: "",
  answers: [],
  selectedAnswer: "",
  answered: false,
  correctAnswer: "",
  isAnswerCorrect: false,
  waitingForOthers: false,
  quizCompleted: false,
  leaderboard: [],
  playerFinalScore: 0,
};

export const state$ = observable({
  roomId: "",
  player: {
    id: "",
  },
  quiz: { ...defaultQuizState },
} as IState);

export const resetQuizState = () => {
  state$.quiz.set({ ...defaultQuizState });
};

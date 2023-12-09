import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  selectedQuiz: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.selectedQuiz = action.payload;
    },

    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, action) => {
      const newQuiz = {
        ...action.payload,
        id: new Date().getTime().toString(),
      };
      state.quizzes = [newQuiz, ...state.quizzes];
    },

    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
    },

    updateQuestion: (state, action) => {
      state.quizzes = state.quizzes.map((q) => {
        if (q._id === action.payload._id) {
          return action.payload;
        } else {
          return q;
        }
      });
    },

    togglePublishStatus: (state, action) => {
      const quizId = action.payload;
      state.quizzes = state.quizzes.map((quiz) => {
        return quiz.id === quizId ? { ...quiz, published: !quiz.published } : quiz;
      });
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
  togglePublishStatus,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;

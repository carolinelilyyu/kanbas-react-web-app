import { createSlice } from "@reduxjs/toolkit";
// import db from "../../Database";

const initialState = {
  // questions: db.questions,
  questions: [],
  selectedQuestion: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionList: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.questions,
      ];
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    setQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setQuestion,
  setQuestionList,
} = questionsSlice.actions;
export default questionsSlice.reducer;
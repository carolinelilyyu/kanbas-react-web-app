// src/Kanbas/Courses/Questions/questionsReducer.js

import db from "../../Database";

import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    // ... other reducers
  },
});

export const { setQuestions } = questionsSlice.actions;

export const selectQuestions = (state) => state.questions.questions;

// Initial state with questions from the database
const initialState = {
  questions: db.questions,
  selectedQuestion: null,
};

// Action Types
const ADD_QUESTIONS = 'questions/ADD_QUESTIONS';
const DELETE_QUESTIONS = 'questions/DELETE_QUESTIONS';
const UPDATE_QUESTIONS = 'questions/UPDATE_QUESTIONS';
const SELECT_QUESTIONS = 'questions/SELECT_QUESTIONS';

// Action Creators
export const addQuestion = (question) => ({
  type: ADD_QUESTIONS,
  question,
});

export const deleteQuestion = (questionId) => ({
  type: DELETE_QUESTIONS,
  questionId,
});

export const updateQuestion = (question) => ({
  type: UPDATE_QUESTIONS,
  question,
});

export const selectQuestion = (question) => ({
  type: SELECT_QUESTIONS,
  question,
});

// Reducer
const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTIONS:
      return {
        ...state,
        questions: [...state.questions, action.question],
      };
    case DELETE_QUESTIONS:
      return {
        ...state,
        questions: state.questions.filter((question) => question._id !== action.questionId),
      };
    case UPDATE_QUESTIONS:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question._id === action.question._id ? action.question : question
        ),
      };
    case SELECT_QUESTIONS:
      return {
        ...state,
        selectedQuestion: action.question,
      };
    default:
      return state;
  }
};

export default questionsReducer;

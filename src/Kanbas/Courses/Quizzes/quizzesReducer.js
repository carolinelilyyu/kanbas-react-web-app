// src/Kanbas/Quizzes/quizzesReducer.js
import db from "../../Database";

// Initial state with quizzes from the database
const initialState = {
  quizzes: db.quizzes,
  selectedQuiz: null,
};

// Action Types
const ADD_QUIZ = 'quizzes/ADD_QUIZ';
const DELETE_QUIZ = 'quizzes/DELETE_QUIZ';
const UPDATE_QUIZ = 'quizzes/UPDATE_QUIZ';
const SELECT_QUIZ = 'quizzes/SELECT_QUIZ';

// Action Creators
export const addQuiz = (quiz) => ({
  type: ADD_QUIZ,
  quiz,
});

export const deleteQuiz = (quizId) => ({
  type: DELETE_QUIZ,
  quizId,
});

export const updateQuiz = (quiz) => ({
  type: UPDATE_QUIZ,
  quiz,
});

export const selectQuiz = (quiz) => ({
  type: SELECT_QUIZ,
  quiz,
});

// Reducer
const quizzesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUIZ:
      return {
        ...state,
        quizzes: [...state.quizzes, action.quiz],
      };
    case DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz.id !== action.quizId),
      };
    case UPDATE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz) =>
          quiz.id === action.quiz.id ? action.quiz : quiz
        ),
      };
    case SELECT_QUIZ:
      return {
        ...state,
        selectedQuiz: action.quiz,
      };
    default:
      return state;
  }
};

export default quizzesReducer;

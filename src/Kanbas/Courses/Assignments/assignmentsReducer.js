// src/Kanbas/Courses/Assignments/assignmentsReducer.js

import db from "../../Database";

// Initial state with assignments from the database
const initialState = {
  assignments: db.assignments,
  selectedAssignment: null,
};

// Action Types
const ADD_ASSIGNMENT = 'assignments/ADD_ASSIGNMENT';
const DELETE_ASSIGNMENT = 'assignments/DELETE_ASSIGNMENT';
const UPDATE_ASSIGNMENT = 'assignments/UPDATE_ASSIGNMENT';
const SELECT_ASSIGNMENT = 'assignments/SELECT_ASSIGNMENT';

// Action Creators
export const addAssignment = (assignment) => ({
  type: ADD_ASSIGNMENT,
  assignment,
});

export const deleteAssignment = (assignmentId) => ({
  type: DELETE_ASSIGNMENT,
  assignmentId,
});

export const updateAssignment = (assignment) => ({
  type: UPDATE_ASSIGNMENT,
  assignment,
});

export const selectAssignment = (assignment) => ({
  type: SELECT_ASSIGNMENT,
  assignment,
});

// Reducer
const assignmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [...state.assignments, action.assignment],
      };
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.filter((assignment) => assignment._id !== action.assignmentId),
      };
    case UPDATE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.map((assignment) =>
          assignment._id === action.assignment._id ? action.assignment : assignment
        ),
      };
    case SELECT_ASSIGNMENT:
      return {
        ...state,
        selectedAssignment: action.assignment,
      };
    default:
      return state;
  }
};

export default assignmentsReducer;

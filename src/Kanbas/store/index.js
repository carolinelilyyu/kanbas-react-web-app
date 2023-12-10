import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import questionsReducer from "../Courses/Questions/questionsReducer";
import thunk from 'redux-thunk'
import quizzesReducer from "../Courses/Quizzes/quizzesReducer"



const store = configureStore({
  reducer: {
    modulesReducer,
    questionsReducer,
    middleware: [thunk], // add the thunk middleware
    quizzesReducer,
  }
});


export default store;
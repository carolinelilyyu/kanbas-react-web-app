import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import questionsReducer from "../Courses/Questions/questionsReducer";
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    modulesReducer,
    questionsReducer,
    middleware: [thunk] // add the thunk middleware
  }
});


export default store;
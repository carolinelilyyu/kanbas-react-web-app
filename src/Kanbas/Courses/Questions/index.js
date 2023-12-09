import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {
    addQuestion,
    deleteQuestion, 
    setModule,
    setModules,
  } from "./questionsReducer";
import * as client from "./client";

const QuestionsList = () => {
    const { courseId } = useParams();

//   const { quizId } = useParams();
    const quizId = "75510e70870c092d5441bc94";
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    console.log(quizId);
    client.findQuestionsForQuiz(quizId)
      .then((questions) =>
        (setQuestions(questions))
    );
  }, [quizId]);
//   const dispatch = useDispatch();

  return (
    <div>
      <h1>Questions for Quiz {quizId}</h1>
      <Link to={`/Kanbas/Courses/${courseId}/Questions/${quizId}/Edit`}>
        <button>Edit Question</button>
      </Link>
      <ul>
        {questions.map(question => (
          <li key={question._id}>
            {question.question} {/* Display other details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;

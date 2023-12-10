import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { 
    addQuestion,
    deleteQuestion,
    setQuestionList,
    setQuestion,
 } from './questionsReducer';
import "./index.css";
function QuestionsList({ quizId }) {
    const dispatch = useDispatch();

  const { courseId } = useParams();
  // const quizId = "75510e70870c092d5441bc94";
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = async () => {
    //change to have questions saved into the state, do not add to redux yet
    //until hit is clicked
    const newQuestion = {
      title: 'New Question',
      format: 'Multiple Choice',
      options: [],
    };
  
    const status = await client.addQuestion(quizId, newQuestion).then((newQuestion) => {
      dispatch(addQuestion(newQuestion));
      setQuestions(prevQuestions => [...prevQuestions, newQuestion]); // Use functional form of setQuestions
    });
  };
  
  const handleDeleteQuestion = async (questionId) => {
    const status = await  client.deleteQuestion(questionId).then((status) => {
      dispatch(deleteQuestion(questionId));
      setQuestions(prevQuestions => prevQuestions.filter(question => question._id !== questionId)); // Use functional form of setQuestions
    });
  };
  
  useEffect(() => {
    client.findQuestionsForQuiz(quizId)
      .then((questions) => {
        dispatch(setQuestionList(questions));
        setQuestions(questions);
      });
  }, [quizId, dispatch]);
  

  return (
    <div>
      <h5><b>Questions for Quiz</b></h5>
        <button type="button" class="btn btn-light" 
            onClick={handleAddQuestion}>
            + New Question
        </button>
      <ul>
        {questions.map(question => (
          <li class="no-bullet" key={question._id}>
             <li class="list-group-item d-flex justify-content-between align-items-center">
             <Link to={`/Kanbas/Courses/${courseId}/Questions/${question._id}/Edit`}>
              {question.title}
            </Link>
            <div>
            <button
                type="button" class="btn btn-danger"                                 
                onClick={() => handleDeleteQuestion(question._id)}>
                Delete
            </button>
            </div>
          </li>
            
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default QuestionsList;